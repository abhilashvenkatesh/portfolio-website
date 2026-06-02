# Nav Logo Home Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the "abhilash" wordmark as a `<Link href="/">` in the top-left of the nav bar.

**Architecture:** Single component edit — `components/nav/Nav.tsx` gets a logo link element and its header layout changes to `justify-between`. No new files, no new tokens, no data layer changes.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, Jest + React Testing Library (to be installed)

---

## Task 1: Install test framework

No test runner exists. Install Jest + React Testing Library for Next.js.

**Files:**
- Modify: `package.json`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

- [ ] **Step 1: Install dependencies**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest
```

- [ ] **Step 2: Create `jest.config.ts`**

```ts
import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
  },
  testMatch: ["**/__tests__/**/*.test.tsx"],
};

export default config;
```

- [ ] **Step 3: Create `jest.setup.ts`**

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 4: Add test script to `package.json`**

In `package.json` scripts, add:
```json
"test": "jest"
```

- [ ] **Step 5: Verify setup compiles**

```bash
npm run typecheck
```

Expected: no errors.

---

## Task 2: Write failing tests for logo link

**Files:**
- Create: `components/nav/__tests__/Nav.test.tsx`

- [ ] **Step 1: Create test file**

```tsx
import { render, screen } from "@testing-library/react";
import Nav from "../Nav";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

jest.mock("next/link", () => {
  return function MockLink({
    href,
    children,
    className,
  }: {
    href: string;
    children: import("react").ReactNode;
    className?: string;
  }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

describe("Nav logo", () => {
  it("renders abhilash wordmark as a link to /", () => {
    render(<Nav />);
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("logo does not have nav-link-active styling when on home page", () => {
    render(<Nav />);
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).not.toHaveClass("bg-[var(--color-surface-alt)]");
  });
});
```

- [ ] **Step 2: Run tests — verify they FAIL**

```bash
npm test -- --testPathPattern="Nav.test"
```

Expected: FAIL — "Unable to find role=link with name 'abhilash'"

---

## Task 3: Implement logo link in Nav.tsx

**Files:**
- Modify: `components/nav/Nav.tsx`

- [ ] **Step 1: Update `Nav.tsx`**

Replace entire file content with:

```tsx
import Link from "next/link";
import NavLink from "./NavLink";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/chat", label: "Chat" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Nav() {
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
      <nav className="flex items-center gap-1">
        {LINKS.map(({ href, label }) => (
          <NavLink key={href} href={href} label={label} />
        ))}
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Run tests — verify they PASS**

```bash
npm test -- --testPathPattern="Nav.test"
```

Expected: PASS — 2 tests passing.

- [ ] **Step 3: Run CI gates**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: all pass, no errors.

- [ ] **Step 4: Commit**

```bash
git add components/nav/Nav.tsx components/nav/__tests__/Nav.test.tsx jest.config.ts jest.setup.ts package.json package-lock.json
git commit -m "feat(nav): add abhilash wordmark as home link (NAV-2)"
```
