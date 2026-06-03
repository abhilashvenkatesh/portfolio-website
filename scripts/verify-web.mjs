#!/usr/bin/env node
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { get } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import net from "node:net";

const DEFAULT_PORT = 3100;
const DEFAULT_DEBUG_PORT = 9223;
const DEFAULT_VIEWPORTS = [
  { name: "desktop", width: 1280, height: 900, mobile: false },
  { name: "mobile", width: 375, height: 812, mobile: true },
];
const DEFAULT_THEMES = ["light", "dark"];

const args = parseArgs(process.argv.slice(2));
const root = process.cwd();
const port = Number(args.port ?? process.env.VERIFY_WEB_PORT ?? DEFAULT_PORT);
const debugPort = Number(
  args.debugPort ?? process.env.VERIFY_WEB_DEBUG_PORT ?? DEFAULT_DEBUG_PORT,
);
const paths = String(args.paths ?? args.path ?? "/")
  .split(",")
  .map((item) => normalizeRoute(item.trim()))
  .filter(Boolean);
const outputRoot = path.resolve(root, args.out ?? ".visual-evidence");
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputDir = path.join(outputRoot, stamp);
const baseUrl = `http://127.0.0.1:${port}`;
const chromePath = findChrome();

async function main() {
  if (!chromePath) {
    fail(
      "Chrome was not found. Set CHROME_PATH to the browser executable and rerun npm run verify:web.",
    );
  }

  await assertPortFree(port, "Next dev server");
  await assertPortFree(debugPort, "Chrome DevTools");
  await mkdir(outputDir, { recursive: true });

  const nextProcess = startNext(port);
  let chromeProcess;
  let chromeUserDataDir;

  try {
    await waitForHttp(baseUrl, 45_000, nextProcess);
    chromeUserDataDir = await mkdtemp(path.join(tmpdir(), "portfolio-verify-web-"));
    chromeProcess = startChrome(chromePath, debugPort, chromeUserDataDir);
    const browserWsUrl = await waitForChrome(debugPort, 20_000);
    const cdp = await CdpClient.connect(browserWsUrl);

    const captures = [];
    for (const route of paths) {
      for (const viewport of DEFAULT_VIEWPORTS) {
        for (const theme of DEFAULT_THEMES) {
          const name = `${slugForRoute(route)}-${viewport.name}-${theme}`;
          const file = path.join(outputDir, `${name}.png`);
          await capturePage(cdp, {
            url: `${baseUrl}${route}`,
            file,
            viewport,
            theme,
          });
          captures.push({
            route,
            theme,
            viewport: viewport.name,
            size: `${viewport.width}x${viewport.height}`,
            file: path.relative(root, file),
          });
          console.log(`captured ${path.relative(root, file)}`);
        }
      }
    }

    const manifest = {
      generatedAt: new Date().toISOString(),
      baseUrl,
      port,
      debugPort,
      paths,
      captures,
    };
    await writeFile(
      path.join(outputDir, "manifest.json"),
      JSON.stringify(manifest, null, 2),
    );
    await writeFile(path.join(outputDir, "verify-web-summary.md"), summary(manifest));

    await cdp.close();
    console.log(`\nweb verification evidence: ${path.relative(root, outputDir)}`);
  } finally {
    if (chromeProcess) await stopProcess(chromeProcess);
    await stopProcess(nextProcess);
    if (chromeUserDataDir) {
      await rmWithRetry(chromeUserDataDir);
    }
  }
}

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) continue;
    const [rawKey, inlineValue] = arg.slice(2).split("=", 2);
    parsed[rawKey] =
      inlineValue ?? (argv[index + 1]?.startsWith("--") ? true : argv[++index]);
  }
  return parsed;
}

function normalizeRoute(route) {
  if (!route) return "/";
  return route.startsWith("/") ? route : `/${route}`;
}

function slugForRoute(route) {
  return route === "/"
    ? "home"
    : route.replace(/^\/+/, "").replace(/[^a-z0-9]+/gi, "-").replace(/-$/, "");
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate));
}

function startNext(nextPort) {
  const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(
    process.execPath,
    [nextBin, "dev", "--hostname", "127.0.0.1", "--port", String(nextPort)],
    {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PORT: String(nextPort) },
    },
  );
  child.stdout.on("data", (chunk) => process.stdout.write(prefix(chunk, "next")));
  child.stderr.on("data", (chunk) => process.stderr.write(prefix(chunk, "next")));
  child.on("exit", (code) => {
    if (code !== null && code !== 0) {
      console.error(`next dev exited with code ${code}`);
    }
  });
  child.exitPromise = new Promise((resolve) => {
    child.once("exit", (code, signal) => resolve({ code, signal }));
  });
  return child;
}

function startChrome(executable, remotePort, userDataDir) {
  const child = spawn(
    executable,
    [
      "--headless=new",
      "--disable-gpu",
      "--disable-background-networking",
      "--disable-component-update",
      "--disable-sync",
      "--disable-extensions",
      "--no-first-run",
      `--remote-debugging-port=${remotePort}`,
      `--user-data-dir=${userDataDir}`,
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "ignore"] },
  );
  child.exitPromise = new Promise((resolve) => {
    child.once("exit", (code, signal) => resolve({ code, signal }));
  });
  return child;
}

async function capturePage(cdp, { url, file, viewport, theme }) {
  const { browserContextId } = await cdp.send("Target.createBrowserContext", {
    disposeOnDetach: true,
  });
  const { targetId } = await cdp.send("Target.createTarget", {
    url: "about:blank",
    browserContextId,
  });
  const { sessionId } = await cdp.send("Target.attachToTarget", {
    targetId,
    flatten: true,
  });

  await cdp.send("Page.enable", {}, sessionId);
  await cdp.send("Runtime.enable", {}, sessionId);
  await cdp.send(
    "Emulation.setDeviceMetricsOverride",
    {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: viewport.mobile,
    },
    sessionId,
  );

  await navigate(cdp, sessionId, url);
  await delay(750);
  await cdp.send(
    "Runtime.evaluate",
    {
      expression:
        theme === "dark"
          ? `
            localStorage.setItem("theme", "dark");
            document.documentElement.setAttribute("data-theme", "dark");
          `
          : `
            localStorage.removeItem("theme");
            document.documentElement.removeAttribute("data-theme");
          `,
      awaitPromise: true,
    },
    sessionId,
  );
  await cdp.send(
    "Runtime.evaluate",
    {
      expression: `
        document.querySelectorAll("nextjs-portal").forEach((node) => node.remove());
        var style = document.createElement("style");
        style.setAttribute("data-verify-web", "true");
        style.textContent = [
          "nextjs-portal",
          "[data-nextjs-dev-overlay]",
          "[data-nextjs-dev-tools-button]",
          "[data-nextjs-toast]",
          ".__next-dev-overlay",
          ".__next-dev-indicator"
        ].join(",") + "{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important;}";
        document.head.appendChild(style);
      `,
      awaitPromise: true,
    },
    sessionId,
  );
  await cdp.send(
    "Runtime.evaluate",
    {
      expression:
        "document.fonts && document.fonts.ready ? document.fonts.ready.then(() => true) : true",
      awaitPromise: true,
    },
    sessionId,
  );
  await delay(500);

  const { data } = await cdp.send(
    "Page.captureScreenshot",
    { format: "png", fromSurface: true },
    sessionId,
  );
  await writeFile(file, Buffer.from(data, "base64"));
  await cdp.send("Target.closeTarget", { targetId });
  await cdp.send("Target.disposeBrowserContext", { browserContextId });
}

async function navigate(cdp, sessionId, url) {
  const loaded = cdp.waitFor("Page.loadEventFired", sessionId, 15_000);
  await cdp.send("Page.navigate", { url }, sessionId);
  await loaded;
}

function prefix(chunk, label) {
  return String(chunk)
    .split("\n")
    .filter(Boolean)
    .map((line) => `[${label}] ${line}\n`)
    .join("");
}

function summary(manifest) {
  const rows = manifest.captures
    .map(
      (capture) =>
        `| ${capture.route} | ${capture.viewport} | ${capture.size} | ${capture.theme} | ${capture.file} |`,
    )
    .join("\n");

  return `# Web Visual Verification

- Generated: ${manifest.generatedAt}
- Base URL: ${manifest.baseUrl}
- Evidence directory: ${path.dirname(manifest.captures[0]?.file ?? "")}

| Route | Viewport | Size | Theme | Screenshot |
|---|---|---:|---|---|
${rows}
`;
}

async function waitForHttp(url, timeoutMs, serverProcess) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (serverProcess.exitCode !== null) {
      fail(`Next dev server exited before ${url} became available.`);
    }
    if (await httpOk(url)) return;
    const exit = await Promise.race([serverProcess.exitPromise, delay(500)]);
    if (exit) {
      fail(`Next dev server exited before ${url} became available.`);
    }
  }
  fail(`Timed out waiting for ${url}`);
}

function httpOk(url) {
  return new Promise((resolve) => {
    const request = get(url, (response) => {
      response.resume();
      resolve(response.statusCode >= 200 && response.statusCode < 500);
    });
    request.on("error", () => resolve(false));
    request.setTimeout(1000, () => {
      request.destroy();
      resolve(false);
    });
  });
}

async function waitForChrome(remotePort, timeoutMs) {
  const started = Date.now();
  const versionUrl = `http://127.0.0.1:${remotePort}/json/version`;
  while (Date.now() - started < timeoutMs) {
    try {
      const version = await getJson(versionUrl);
      if (version.webSocketDebuggerUrl) return version.webSocketDebuggerUrl;
    } catch {
      await delay(250);
    }
  }
  fail(`Timed out waiting for Chrome DevTools on port ${remotePort}`);
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    const request = get(url, (response) => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        body += chunk;
      });
      response.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
    request.on("error", reject);
    request.setTimeout(1000, () => {
      request.destroy(new Error("timeout"));
    });
  });
}

async function assertPortFree(targetPort, label) {
  const free = await new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", (error) => resolve(error));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(targetPort, "127.0.0.1");
  });
  if (free === true) return;

  if (free.code === "EADDRINUSE") {
    fail(`${label} port ${targetPort} is already in use. Set --port or --debugPort explicitly.`);
  }
  fail(`${label} port ${targetPort} could not be checked: ${free.message}`);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function stopProcess(child) {
  if (child.exitCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([child.exitPromise, delay(3000)]);
  if (child.exitCode === null) {
    child.kill("SIGKILL");
    await Promise.race([child.exitPromise, delay(1000)]);
  }
}

async function rmWithRetry(target) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      await rm(target, { recursive: true, force: true });
      return;
    } catch (error) {
      if (attempt === 4) throw error;
      await delay(250 * (attempt + 1));
    }
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

class CdpClient {
  static connect(url) {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket(url);
      const client = new CdpClient(socket);
      socket.addEventListener("open", () => resolve(client));
      socket.addEventListener("error", reject);
    });
  }

  constructor(socket) {
    this.socket = socket;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = [];
    socket.addEventListener("message", (event) => this.onMessage(event));
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const message = { id, method, params };
    if (sessionId) message.sessionId = sessionId;
    this.socket.send(JSON.stringify(message));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  waitFor(method, sessionId, timeoutMs) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.listeners = this.listeners.filter((item) => item.resolve !== resolve);
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
      this.listeners.push({ method, sessionId, resolve, timeout });
    });
  }

  onMessage(event) {
    const message = JSON.parse(event.data);
    if (message.id) {
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result ?? {});
      return;
    }

    const listener = this.listeners.find(
      (item) =>
        item.method === message.method &&
        (!item.sessionId || item.sessionId === message.sessionId),
    );
    if (listener) {
      clearTimeout(listener.timeout);
      this.listeners = this.listeners.filter((item) => item !== listener);
      listener.resolve(message.params ?? {});
    }
  }

  close() {
    this.socket.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
