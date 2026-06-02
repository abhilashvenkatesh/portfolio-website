# Nav Light/Dark Theme Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> Evidence captured in verify.md after implementation.

**Goal:** Add a sun/moon icon toggle button to the site nav that switches the colour theme, using a new ThemeProvider client component that wraps the root layout.

**Architecture:** ThemeProvider (client component) holds `theme` + `toggleTheme` in React context, reading/writing localStorage and setting `data-theme` on `<html>`. Nav stays a Server Component; a new `ThemeToggle` client component consumes `useTheme()` and is inserted as a fourth flex child in the header. The existing anti-flash inline script in layout.tsx handles the pre-hydration paint — ThemeProvider syncs state after mount.

**Tech Stack:** Next.js 15 App Router, TypeScript, React context, Tailwind CSS v4 (CSS custom properties), Jest + @testing-library/react (jsdom)

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `components/providers/ThemeProvider.tsx` | Context provider: theme state, toggleTheme, localStorage sync |
| Create | `components/providers/useTheme.ts` | `useContext` hook with guard |
| Create | `components/nav/ThemeToggle.tsx` | 36×36px button, sun/moon SVG, consumes useTheme |
| Create | `components/providers/__tests__/ThemeProvider.test.tsx` | Provider + hook tests |
| Create | `components/nav/__tests__/ThemeToggle.test.tsx` | Toggle component tests |
| Modify | `app/layout.tsx` | Wrap body children in ThemeProvider |
| Modify | `components/nav/Nav.tsx` | Add ThemeToggle, hide nav links on mobile |
| Modify | `components/nav/__tests__/Nav.test.tsx` | Wrap renders in ThemeProvider, add toggle test |

---

## Task 1: ThemeProvider and useTheme hook

**Expanded** — new file with localStorage I/O + DOM side-effects; risk of hydration mismatch if initial state is wrong.

**Files:**
- Create: `components/providers/ThemeProvider.tsx`
- Create: `components/providers/useTheme.ts`
- Create: `components/providers/__tests__/ThemeProvider.test.tsx`

### Step 1.1: Write failing tests for ThemeProvider

Create `components/providers/__tests__/ThemeProvider.test.tsx`:

```tsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeProvider from "../ThemeProvider";
import { useTheme } from "../useTheme";

function ThemeDisplay() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("defaults to light when no localStorage value", () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
  });

  it("reads stored dark theme from localStorage on mount", async () => {
    localStorage.setItem("theme", "dark");
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    await act(async () => {});
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("toggleTheme switches light→dark and writes to localStorage", async () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    await userEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("toggleTheme switches dark→light and writes to localStorage", async () => {
    localStorage.setItem("theme", "dark");
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    await act(async () => {});
    await userEvent.click(screen.getByText("toggle"));
    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("toggleTheme sets data-theme on document.documentElement", async () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    await userEvent.click(screen.getByText("toggle"));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
});

describe("useTheme outside provider", () => {
  it("throws when used outside ThemeProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeDisplay />)).toThrow(
      "useTheme must be used within ThemeProvider"
    );
    spy.mockRestore();
  });
});
```

### Step 1.2: Run tests to verify they fail

```bash
npx jest components/providers/__tests__/ThemeProvider.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module '../ThemeProvider'`

### Step 1.3: Create ThemeProvider.tsx

Create `components/providers/ThemeProvider.tsx`:

```tsx
"use client";
import React, { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial: Theme = stored === "dark" ? "dark" : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Step 1.4: Create useTheme.ts

Create `components/providers/useTheme.ts`:

```ts
import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
```

### Step 1.5: Run tests to verify they pass

```bash
npx jest components/providers/__tests__/ThemeProvider.test.tsx --no-coverage
```

Expected: PASS — all 6 tests green

### Step 1.6: Commit

```bash
git add components/providers/ThemeProvider.tsx components/providers/useTheme.ts components/providers/__tests__/ThemeProvider.test.tsx
git commit -m "feat(theme): add ThemeProvider context with localStorage sync"
```

---

## Task 2: ThemeToggle component

**Expanded** — new client component; tests need ThemeProvider wrapper; icon SVGs + aria-label require care.

**Files:**
- Create: `components/nav/ThemeToggle.tsx`
- Create: `components/nav/__tests__/ThemeToggle.test.tsx`

### Step 2.1: Write failing tests for ThemeToggle

Create `components/nav/__tests__/ThemeToggle.test.tsx`:

```tsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "../ThemeToggle";
import ThemeProvider from "@/components/providers/ThemeProvider";

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders a button", () => {
    renderToggle();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has aria-label 'Switch to dark mode' in light mode", () => {
    renderToggle();
    expect(
      screen.getByRole("button", { name: "Switch to dark mode" })
    ).toBeInTheDocument();
  });

  it("has aria-label 'Switch to light mode' in dark mode", async () => {
    localStorage.setItem("theme", "dark");
    renderToggle();
    await act(async () => {});
    expect(
      screen.getByRole("button", { name: "Switch to light mode" })
    ).toBeInTheDocument();
  });

  it("clicking toggle writes dark to localStorage when in light mode", async () => {
    renderToggle();
    await userEvent.click(screen.getByRole("button"));
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("clicking toggle switches aria-label from dark-mode to light-mode", async () => {
    renderToggle();
    await userEvent.click(screen.getByRole("button"));
    expect(
      screen.getByRole("button", { name: "Switch to light mode" })
    ).toBeInTheDocument();
  });
});
```

### Step 2.2: Run tests to verify they fail

```bash
npx jest components/nav/__tests__/ThemeToggle.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module '../ThemeToggle'`

### Step 2.3: Create ThemeToggle.tsx

Create `components/nav/ThemeToggle.tsx`:

```tsx
"use client";
import { useTheme } from "@/components/providers/useTheme";

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13.5 9.5a6 6 0 0 1-8-8 6 6 0 1 0 8 8z"
        fill="currentColor"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      <line x1="8" y1="1" x2="8" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="12.5" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1" y1="8" x2="3.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12.5" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3.4" y1="3.4" x2="5.2" y2="5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10.8" y1="10.8" x2="12.6" y2="12.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3.4" y1="12.6" x2="5.2" y2="10.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10.8" y1="5.2" x2="12.6" y2="3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 flex items-center justify-center bg-[var(--color-surface-alt)] rounded-[8px] text-[var(--color-secondary)] transition-colors duration-200 hover:opacity-80"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
```

### Step 2.4: Run tests to verify they pass

```bash
npx jest components/nav/__tests__/ThemeToggle.test.tsx --no-coverage
```

Expected: PASS — all 5 tests green

### Step 2.5: Commit

```bash
git add components/nav/ThemeToggle.tsx components/nav/__tests__/ThemeToggle.test.tsx
git commit -m "feat(nav): add ThemeToggle client component with sun/moon icons"
```

---

## Task 3: Wire ThemeProvider into layout.tsx

**Compact** — single import + JSX wrapper; no logic risk.

**Files:**
- Modify: `app/layout.tsx`

### Step 3.1: Update layout.tsx

In `app/layout.tsx`, add the ThemeProvider import and wrap the body content:

```tsx
import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "@/styles/globals.css";
import Nav from "@/components/nav/Nav";
import ThemeProvider from "@/components/providers/ThemeProvider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Abhilash Venkatesh",
  description: "Lead Application Developer — portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${dmMono.variable} font-[var(--font-dm-sans)]`}>
        <ThemeProvider>
          <Nav />
          <main className="pt-[60px]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Step 3.2: Verify typecheck

```bash
npm run typecheck
```

Expected: no errors

### Step 3.3: Commit

```bash
git add app/layout.tsx
git commit -m "feat(layout): wrap body in ThemeProvider"
```

---

## Task 4: Add ThemeToggle to Nav and handle mobile links

**Compact** — JSX addition + class change; Nav stays Server Component.

**Files:**
- Modify: `components/nav/Nav.tsx`
- Modify: `components/nav/__tests__/Nav.test.tsx`

### Step 4.1: Update Nav.tsx

Replace the content of `components/nav/Nav.tsx` with:

```tsx
import Link from "next/link";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import { getContact } from "@/lib/content";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/chat", label: "Chat" },
  { href: "/contact", label: "Contact" },
] as const;

export default async function Nav() {
  const { email } = getContact();
  const mailtoHref = `mailto:${email}?subject=Hire%20me`;

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between h-15 bg-neutral border-b border-surface-alt"
      style={{ paddingInline: "clamp(20px, 5vw, 64px)" }}
    >
      <Link
        href="/"
        className="font-mono text-sm text-tertiary tracking-wider no-underline"
      >
        abhilash
      </Link>
      <nav className="hidden sm:flex items-center gap-1">
        {LINKS.map(({ href, label }) => (
          <NavLink key={href} href={href} label={label} />
        ))}
      </nav>
      <ThemeToggle />
      <a
        href={mailtoHref}
        className="text-sm font-medium text-tertiary rounded-sm px-4 py-1.75 transition-colors duration-200 hover:bg-accent-dim no-underline"
      >
        Hire me
      </a>
    </header>
  );
}
```

Key changes: nav links get `hidden sm:flex` (hidden below 640px), `ThemeToggle` inserted as third direct child.

### Step 4.2: Update Nav.test.tsx to wrap renders in ThemeProvider and add toggle test

Replace `components/nav/__tests__/Nav.test.tsx` with:

```tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../Nav";
import ThemeProvider from "@/components/providers/ThemeProvider";

const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({ usePathname: () => mockUsePathname() }));

jest.mock("next/link", () => {
  return function MockLink({
    href,
    children,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    prefetch?: boolean;
    children: import("react").ReactNode;
  }) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  };
});

jest.mock("@/lib/content", () => ({
  getContact: jest.fn(() => ({
    email: "test@example.com",
    linkedin: "https://linkedin.com/in/test",
    phone: "+1-000-000-0000",
    availability: { show: true, message: "Open" },
  })),
}));

async function renderNav() {
  render(
    <ThemeProvider>
      {await Nav()}
    </ThemeProvider>
  );
}

describe("Nav logo", () => {
  beforeEach(() => mockUsePathname.mockReturnValue("/"));

  it("renders abhilash wordmark as a link to /", async () => {
    await renderNav();
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("logo does not have nav-link-active styling when on home page", async () => {
    await renderNav();
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).not.toHaveClass("bg-[var(--color-surface-alt)]");
  });

  it("logo is present and links to / when on a non-home page", async () => {
    mockUsePathname.mockReturnValue("/projects");
    await renderNav();
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });
});

describe("Nav hire-me CTA", () => {
  beforeEach(() => mockUsePathname.mockReturnValue("/"));

  it("renders Hire me anchor", async () => {
    await renderNav();
    const cta = screen.getByRole("link", { name: "Hire me" });
    expect(cta).toBeInTheDocument();
  });

  it("Hire me anchor has correct mailto href with subject", async () => {
    await renderNav();
    const cta = screen.getByRole("link", { name: "Hire me" });
    expect(cta).toHaveAttribute(
      "href",
      "mailto:test@example.com?subject=Hire%20me"
    );
  });

  it("Hire me anchor is not inside the nav element", async () => {
    await renderNav();
    const nav = screen.getByRole("navigation");
    expect(nav).not.toHaveTextContent("Hire me");
  });
});

describe("Nav theme toggle", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders theme toggle button in the header", async () => {
    await renderNav();
    expect(
      screen.getByRole("button", { name: "Switch to dark mode" })
    ).toBeInTheDocument();
  });

  it("theme toggle is not inside the nav element", async () => {
    await renderNav();
    const nav = screen.getByRole("navigation");
    expect(nav).not.toContainElement(
      screen.getByRole("button", { name: "Switch to dark mode" })
    );
  });
});
```

### Step 4.3: Run all Nav tests

```bash
npx jest components/nav/__tests__/ --no-coverage
```

Expected: PASS — all Nav + ThemeToggle tests green

### Step 4.4: Run full test suite

```bash
npm test -- --no-coverage
```

Expected: PASS — all tests green

### Step 4.5: Typecheck and lint

```bash
npm run typecheck && npm run lint
```

Expected: no errors

### Step 4.6: Commit

```bash
git add components/nav/Nav.tsx components/nav/__tests__/Nav.test.tsx
git commit -m "feat(nav): add ThemeToggle as fourth header child; hide links on mobile"
```

---

## Task 5: Final verification

**Compact** — build + manual check.

### Step 5.1: Build

```bash
npm run build
```

Expected: ✓ Compiled successfully, no type errors

### Step 5.2: Dev server smoke test

```bash
npm run dev
```

Manual checks:
1. Toggle button visible in nav on every page
2. Click switches theme instantly (no reload)
3. Reload page → theme persists
4. Navigate to another page → theme persists
5. At viewport < 640px: nav links hidden, toggle visible
