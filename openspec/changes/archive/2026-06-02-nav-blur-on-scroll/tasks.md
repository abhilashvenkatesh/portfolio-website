## 1. Scroll-aware client wrapper

- [x] 1.1 Create `components/nav/NavScrollWrapper.tsx` — a `"use client"` component that attaches a `scroll` listener on mount, tracks `scrolled` boolean (true when `scrollY > 0`), and applies conditional Tailwind classes for backdrop-blur, semi-transparent background, and visible border-bottom
- [x] 1.2 In `components/nav/Nav.tsx`, wrap the `<header>` element with `NavScrollWrapper` so static server data (email from `getContact()`) remains in the Server Component

## 2. Styles

- [x] 2.1 Use Tailwind v4 utility classes on `NavScrollWrapper`: `backdrop-blur-md` + `bg-neutral/80` when scrolled, transparent when at top; `border-b border-surface-alt` visible when scrolled, `border-transparent` at top
- [x] 2.2 Verify classes use existing design-system tokens (`bg-neutral`, `border-surface-alt`) — no hardcoded hex

## 3. Tests

- [x] 3.1 Write a unit test for `NavScrollWrapper`: mock `window.scrollY` / `scroll` event, assert correct CSS class applied when scrolled and removed when back at top
- [x] 3.2 Run `npm run typecheck` and `npm run lint` — fix any issues

## 4. Verification

- [ ] 4.1 Run dev server (`npm run dev`), manually scroll on each page — confirm blur activates on scroll and disappears at top
- [ ] 4.2 Toggle dark/light theme while scrolled — confirm blur and border render correctly in both themes
- [x] 4.3 Run `npm run build` to confirm no SSR/SSG regressions
