# Hire-me CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
> Apply must maintain `openspec/changes/nav-hire-me-cta/implementation-evidence.md` as tasks complete.

**Goal:** Add a "Hire me" mailto anchor to the persistent nav header, reading email from `content/contact.json` at build time.

**Architecture:** `lib/content.ts` provides typed `fs.readFileSync` loaders; `Nav.tsx` becomes an async Server Component that calls `getContact()` and renders a `button-secondary` anchor as a third flex child in `<header>`. No runtime data fetching — SSG only.

**Tech Stack:** Next.js 15 App Router (async Server Components), TypeScript, Tailwind CSS v4, Jest + React Testing Library.

---

## File Map

| Action | Path |
|--------|------|
| Create | `content/contact.json` |
| Create | `lib/types.ts` |
| Create | `lib/content.ts` |
| Modify | `components/nav/Nav.tsx` |
| Modify | `components/nav/__tests__/Nav.test.tsx` |

---

## Task 1: Content & Data Layer (tasks 1.1–1.3)

**Requirements:** hire-me-cta spec — "Email sourced from content file" scenario.
**Design decisions:** D2 (full DATA-5 schema), D1 (build-time loader).
**Risk:** Medium — introduces `lib/` and `content/` directories; Nav test will break without the mock in Task 2.

**Files:**
- Create: `content/contact.json`
- Create: `lib/types.ts`
- Create: `lib/content.ts`

- [ ] **Step 1: Create `content/contact.json`**

```json
{
  "email": "abhilashfeb30@gmail.com",
  "linkedin": "https://linkedin.com/in/abhilash-venkatesh",
  "phone": "+1-000-000-0000",
  "availability": {
    "show": true,
    "message": "Open to new opportunities"
  }
}
```

- [ ] **Step 2: Create `lib/types.ts`**

```typescript
export interface Contact {
  email: string;
  linkedin: string;
  phone: string;
  availability: {
    show: boolean;
    message: string;
  };
}
```

- [ ] **Step 3: Create `lib/content.ts`**

```typescript
import fs from "fs";
import path from "path";
import type { Contact } from "./types";

export function getContact(): Contact {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "content/contact.json"),
    "utf-8"
  );
  return JSON.parse(raw) as Contact;
}
```

- [ ] **Step 4: Run typecheck to confirm no errors**

```bash
npm run typecheck
```

Expected: no errors. If `fs` module errors appear, confirm `tsconfig.json` has `"lib": ["dom", "dom.iterable", "esnext"]` and Node types are available.

- [ ] **Step 5: Commit**

```bash
git add content/contact.json lib/types.ts lib/content.ts
git commit -m "feat(content): add contact.json and lib/content.ts with getContact loader"
```

---

## Task 2: Nav Component — async + hire-me CTA (tasks 3.1–3.3)

**Requirements:** hire-me-cta spec — all scenarios. persistent-nav spec — "Header three-child layout" scenario.
**Design decisions:** D1 (async Server Component), D3 (CTA as sibling to `<nav>`).
**Risk:** High — Nav.tsx becomes async; existing Nav.test.tsx will break unless mocked. Touch 3 files. Micro-steps.

**Files:**
- Modify: `components/nav/Nav.tsx`
- Modify: `components/nav/__tests__/Nav.test.tsx`

### RED — write failing tests first

- [ ] **Step 1: Add hire-me CTA tests to `Nav.test.tsx`**

Add these tests inside `Nav.test.tsx`. They reference `jest.mock("@/lib/content", ...)` — this mock must be at the top of the file (before the existing mocks).

Full updated `Nav.test.tsx`:

```typescript
import React from "react";
import { render, screen } from "@testing-library/react";
import Nav from "../Nav";

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

describe("Nav logo", () => {
  beforeEach(() => mockUsePathname.mockReturnValue("/"));

  it("renders abhilash wordmark as a link to /", async () => {
    render(await Nav());
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });

  it("logo does not have nav-link-active styling when on home page", async () => {
    render(await Nav());
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).not.toHaveClass("bg-[var(--color-surface-alt)]");
  });

  it("logo is present and links to / when on a non-home page", async () => {
    mockUsePathname.mockReturnValue("/projects");
    render(await Nav());
    const logo = screen.getByRole("link", { name: "abhilash" });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("href", "/");
  });
});

describe("Nav hire-me CTA", () => {
  beforeEach(() => mockUsePathname.mockReturnValue("/"));

  it("renders Hire me anchor", async () => {
    render(await Nav());
    const cta = screen.getByRole("link", { name: "Hire me" });
    expect(cta).toBeInTheDocument();
  });

  it("Hire me anchor has correct mailto href with subject", async () => {
    render(await Nav());
    const cta = screen.getByRole("link", { name: "Hire me" });
    expect(cta).toHaveAttribute(
      "href",
      "mailto:test@example.com?subject=Hire%20me"
    );
  });

  it("Hire me anchor is not inside the nav element", async () => {
    render(await Nav());
    const nav = screen.getByRole("navigation");
    expect(nav).not.toHaveTextContent("Hire me");
  });
});
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npm test -- --testPathPattern="Nav.test"
```

Expected: failures on the three new `hire-me CTA` tests — `Hire me` link not found.

### GREEN — implement Nav changes

- [ ] **Step 3: Update `components/nav/Nav.tsx`**

```typescript
import Link from "next/link";
import NavLink from "./NavLink";
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
  const { email } = await Promise.resolve(getContact());
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
      <nav className="flex items-center gap-1">
        {LINKS.map(({ href, label }) => (
          <NavLink key={href} href={href} label={label} />
        ))}
      </nav>
      <a
        href={mailtoHref}
        className="text-sm font-medium text-tertiary rounded-sm px-4 py-[7px] transition-colors duration-200 hover:bg-[var(--color-accent-dim)] no-underline"
      >
        Hire me
      </a>
    </header>
  );
}
```

Note: `getContact()` is synchronous (`fs.readFileSync`) so `await Promise.resolve(...)` is a safe pattern that keeps the async signature without overhead. Alternatively use `getContact()` directly — both work since Next.js Server Components accept sync functions in async context.

- [ ] **Step 4: Run tests — confirm all pass**

```bash
npm test -- --testPathPattern="Nav.test"
```

Expected: all 6 tests pass (3 logo + 3 hire-me CTA).

- [ ] **Step 5: Commit**

```bash
git add components/nav/Nav.tsx components/nav/__tests__/Nav.test.tsx
git commit -m "feat(nav): add hire-me CTA anchor with mailto and button-secondary hover"
```

---

## Task 3: Design System Verification (task 2.1)

**Requirements:** `button-secondary-hover` added in grill session. Confirm token and run linter.

**Files:**
- Read: `documentation/DESIGN.md` (verify token present — no edit needed)

- [ ] **Step 1: Confirm `button-secondary-hover` in `DESIGN.md`**

```bash
grep "button-secondary-hover" documentation/DESIGN.md
```

Expected output:
```
  button-secondary-hover:
    backgroundColor: "{colors.accent-dim}"
    textColor: "{colors.tertiary}"
```

- [ ] **Step 2: Run design-lint**

```bash
npm run design-lint
```

Expected: 0 errors (warnings on contrast are pre-existing and non-blocking).

---

## Task 4: Full CI Gate (task 4.2–4.5)

**Requirements:** All CI checks pass before implementation is complete.

- [ ] **Step 1: Typecheck**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 3: Build**

```bash
npm run build
```

Expected: build succeeds. The nav now calls `getContact()` at build time — `content/contact.json` must exist (created in Task 1).
