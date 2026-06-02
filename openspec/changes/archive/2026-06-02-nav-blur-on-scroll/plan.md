# Nav Blur on Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a scroll-triggered frosted-glass blur + border to the Nav header.

**Architecture:** Extract a `NavScrollWrapper` client component that owns the `<header>` element and attaches a `scroll` listener; `Nav.tsx` stays a Server Component and passes its children into the wrapper. No new design tokens required — uses existing `bg-neutral`, `border-surface-alt`, and Tailwind v4 `backdrop-blur-md`.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, React Testing Library, Jest

**Evidence:** captured in verify.md

---

## File Map

| Action | Path |
|--------|------|
| Create | `components/nav/NavScrollWrapper.tsx` |
| Modify | `components/nav/Nav.tsx` |
| Create | `components/nav/__tests__/NavScrollWrapper.test.tsx` |

---

## Task 1: Create NavScrollWrapper (TDD)

**Context:** tasks.md 1.1–1.2 · Spec: "Nav applies frosted-glass blur effect when scrolled" · Scenarios: blur applied / blur removed

**Files:**
- Create: `components/nav/NavScrollWrapper.tsx`
- Create: `components/nav/__tests__/NavScrollWrapper.test.tsx`

- [x] **Step 1: Write failing tests**

```tsx
// components/nav/__tests__/NavScrollWrapper.test.tsx
import React from "react";
import { render, screen, act } from "@testing-library/react";
import NavScrollWrapper from "../NavScrollWrapper";

describe("NavScrollWrapper", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true, writable: true });
  });

  it("renders children inside a header", () => {
    render(<NavScrollWrapper><span>child</span></NavScrollWrapper>);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("child")).toBeInTheDocument();
  });

  it("does not apply blur classes when at top", () => {
    render(<NavScrollWrapper><span>x</span></NavScrollWrapper>);
    const header = screen.getByRole("banner");
    expect(header.className).not.toContain("backdrop-blur-md");
  });

  it("applies blur and border classes after scroll", () => {
    render(<NavScrollWrapper><span>x</span></NavScrollWrapper>);
    const header = screen.getByRole("banner");
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header.className).toContain("backdrop-blur-md");
    expect(header.className).toContain("border-surface-alt");
  });

  it("removes blur classes when scrolled back to top", () => {
    render(<NavScrollWrapper><span>x</span></NavScrollWrapper>);
    const header = screen.getByRole("banner");
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 100, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header.className).not.toContain("backdrop-blur-md");
  });
});
```

- [x] **Step 2: Run tests — verify they fail**

```bash
npx jest components/nav/__tests__/NavScrollWrapper.test.tsx
```

Expected: FAIL — `Cannot find module '../NavScrollWrapper'`

- [x] **Step 3: Implement NavScrollWrapper**

```tsx
// components/nav/NavScrollWrapper.tsx
"use client";
import { useEffect, useState } from "react";

export default function NavScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between h-15 transition-[background-color,backdrop-filter,border-color] duration-200 ${
        scrolled
          ? "bg-neutral/80 backdrop-blur-md border-b border-surface-alt"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ paddingInline: "clamp(20px, 5vw, 64px)" }}
    >
      {children}
    </header>
  );
}
```

- [x] **Step 4: Run tests — verify they pass**

```bash
npx jest components/nav/__tests__/NavScrollWrapper.test.tsx
```

Expected: PASS (4 tests)

- [x] **Step 5: Commit**

```bash
git add components/nav/NavScrollWrapper.tsx components/nav/__tests__/NavScrollWrapper.test.tsx
git commit -m "feat(nav): add NavScrollWrapper client component for scroll-triggered blur"
```

---

## Task 2: Wire NavScrollWrapper into Nav.tsx

**Context:** tasks.md 1.2 · Spec: "Nav applies frosted-glass blur…" · Scenarios: border visible when scrolled / border hidden at top

**Files:**
- Modify: `components/nav/Nav.tsx`

- [x] **Step 1: Update Nav.tsx to use NavScrollWrapper**

Replace the `<header>` element with `<NavScrollWrapper>`. Remove the `className` and `style` from the old `<header>` (those now live in NavScrollWrapper):

```tsx
// components/nav/Nav.tsx
import Link from "next/link";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import NavScrollWrapper from "./NavScrollWrapper";
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
    <NavScrollWrapper>
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
    </NavScrollWrapper>
  );
}
```

- [x] **Step 2: Run existing Nav tests**

```bash
npx jest components/nav/__tests__/Nav.test.tsx
```

Expected: PASS (no regressions)

- [x] **Step 3: Typecheck**

```bash
npm run typecheck
```

Expected: no errors

- [x] **Step 4: Commit**

```bash
git add components/nav/Nav.tsx
git commit -m "feat(nav): wire NavScrollWrapper into Nav — frosted-glass blur on scroll"
```

---

## Task 3: CI gate + verification

**Context:** tasks.md 3.2, 4.3

- [x] **Step 1: Run lint**

```bash
npm run lint
```

Expected: no errors

- [x] **Step 2: Run build**

```bash
npm run build
```

Expected: no errors, no SSR warnings about `window`

- [ ] **Step 3: Manual smoke test** — run dev server (`npm run dev`), open any page, scroll down and verify blur + border appear; scroll back to top and verify they disappear; toggle dark/light theme while scrolled and verify correct rendering in both themes
