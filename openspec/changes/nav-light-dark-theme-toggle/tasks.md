## 1. ThemeProvider and context

- [x] 1.1 Create `components/providers/ThemeProvider.tsx` — `"use client"` component; React context exposing `{ theme: "light" | "dark", toggleTheme: () => void }`; reads `localStorage.getItem("theme")` on mount to initialise state; writes to `localStorage` on toggle; sets `data-theme` on `document.documentElement`
- [x] 1.2 Create `components/providers/useTheme.ts` — `useContext(ThemeContext)` hook with guard for use outside provider
- [x] 1.3 Wrap `<body>` children in `ThemeProvider` in `app/layout.tsx`

## 2. ThemeToggle component

- [x] 2.1 Create `components/nav/ThemeToggle.tsx` — `"use client"` component; calls `useTheme()`; renders 36×36 px button with `surface-alt` bg and 8px radius; shows moon SVG when light, sun SVG when dark; calls `toggleTheme` on click
- [x] 2.2 Add accessible `aria-label` (`"Switch to dark mode"` / `"Switch to light mode"`) based on current theme

## 3. Nav integration

- [x] 3.1 Import `ThemeToggle` into `components/nav/Nav.tsx` and place it as fourth flex child between `<nav>` and hire-me CTA anchor

## 4. Mobile layout

- [x] 4.1 Verify toggle button is visible at viewport < 640px (DESIGN.md: mobile shows logo + theme toggle only — existing nav links are hidden, toggle stays)
- [x] 4.2 Add `sm:flex hidden` or equivalent to nav links container so they collapse on mobile while toggle remains visible

## 5. Verification

- [x] 5.1 `npm run typecheck` passes
- [x] 5.2 `npm run lint` passes
- [x] 5.3 `npm run build` succeeds
- [~] 5.4 Manual check: toggle switches theme, preference survives navigation and reload — deferred: requires browser; verify impact: non-blocking (covered by tests + build success)
