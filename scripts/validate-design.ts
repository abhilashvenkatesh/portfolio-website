import fs from "fs";
import path from "path";

const SCAN_DIRS = ["app", "components"];
const EXTENSIONS = new Set([".tsx", ".ts", ".jsx", ".js"]);
const ALLOWED_RADIUS = new Set([
  "4px", "6px", "8px", "10px", "12px", "14px", "100px",
]);

type Violation = {
  file: string;
  line: number;
  rule: string;
  snippet: string;
};

const violations: Violation[] = [];

function collectFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectFiles(full));
    else if (EXTENSIONS.has(path.extname(entry.name))) results.push(full);
  }
  return results;
}

function flag(
  violations: Violation[],
  file: string,
  lineNum: number,
  rule: string,
  raw: string
) {
  violations.push({ file, line: lineNum, rule, snippet: raw.trim() });
}

function isComment(line: string, matchIdx: number): boolean {
  const commentAt = line.indexOf("//");
  return commentAt !== -1 && matchIdx > commentAt;
}

function lintFile(file: string) {
  const src = fs.readFileSync(file, "utf8");
  const lines = src.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const n = i + 1;

    // ── Rule 1: No hardcoded hex as Tailwind arbitrary value ────────────────
    // Catches bg-[#abc], text-[#001122ff], etc. Skips var(--...) and oklch().
    const hexArbitrary = /\[#([0-9a-fA-F]{3,8})\]/g;
    let m: RegExpExecArray | null;
    while ((m = hexArbitrary.exec(line)) !== null) {
      if (!isComment(line, m.index))
        flag(violations, file, n, "no-hardcoded-hex", line);
    }

    // ── Rule 2: No font weight > 600 ────────────────────────────────────────
    const heavyFont = /\b(font-bold|font-extrabold|font-black)\b/;
    const hfm = heavyFont.exec(line);
    if (hfm && !isComment(line, hfm.index))
      flag(violations, file, n, "no-heavy-font", line);

    // ── Rule 3: No arbitrary border-radius outside allowed scale ────────────
    // Catches rounded-[15px], rounded-[50%], etc.
    const radArbitrary = /rounded-\[([^\]]+)\]/g;
    while ((m = radArbitrary.exec(line)) !== null) {
      if (isComment(line, m.index)) continue;
      const val = m[1].trim();
      if (!ALLOWED_RADIUS.has(val))
        flag(violations, file, n, "no-arbitrary-radius", line);
    }

    // ── Rule 4: No text-white (never allowed) ───────────────────────────────
    const twm = /\btext-white\b/.exec(line);
    if (twm && !isComment(line, twm.index))
      flag(violations, file, n, "no-text-white", line);

    // ── Rule 5: No text-black except on accent-fill buttons ─────────────────
    // Allow when the same className string clearly contains an accent fill.
    const tbm = /\btext-black\b/.exec(line);
    if (tbm && !isComment(line, tbm.index)) {
      const accentFill =
        /bg-\[var\(--color-tertiary\)\]|bg-tertiary|bg-accent\b/.test(line);
      if (!accentFill)
        flag(violations, file, n, "no-text-black", line);
    }

    // ── Rule 6: No box-shadow in dark mode ──────────────────────────────────
    const dsm = /\bdark:shadow/.exec(line);
    if (dsm && !isComment(line, dsm.index))
      flag(violations, file, n, "no-dark-shadow", line);
  }
}

const cwd = process.cwd();
const allFiles = SCAN_DIRS.flatMap((d) => collectFiles(path.join(cwd, d)));
allFiles.forEach(lintFile);

if (violations.length === 0) {
  console.log(`✓ design-lint passed (${allFiles.length} files scanned)`);
  process.exit(0);
} else {
  const grouped = new Map<string, Violation[]>();
  for (const v of violations) {
    const rel = path.relative(cwd, v.file);
    if (!grouped.has(rel)) grouped.set(rel, []);
    grouped.get(rel)!.push(v);
  }
  console.error(`\n✗ design-lint: ${violations.length} violation(s)\n`);
  for (const [rel, vs] of grouped) {
    for (const v of vs) {
      console.error(`  ${rel}:${v.line}  [${v.rule}]`);
      console.error(`    ${v.snippet}\n`);
    }
  }
  process.exit(1);
}
