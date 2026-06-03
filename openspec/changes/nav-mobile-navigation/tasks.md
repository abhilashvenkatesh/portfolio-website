## 1. Setup

- [x] 1.1 Create git worktree on branch `abhilash-venkatesh/por-95-nav-6-mobile-navigation`

## 2. Refactor `NavScrollWrapper`

- [x] 2.1 Add `mobileMenuContent: React.ReactNode` prop to `NavScrollWrapper`
- [x] 2.2 Add `menuOpen` state (`useState(false)`) alongside existing `scrolled` state
- [x] 2.3 Restructure `<header>` from flat `flex` to `flex-col`; move existing `justify-between` row into an explicit inner `<div>` with `h-15` and padding
- [x] 2.4 Render a hamburger `<button>` as the last child of the inner row; apply `block sm:hidden`; wire `onClick` to toggle `menuOpen`
- [x] 2.5 Render the mobile menu panel below the inner row: `<div>` with `sm:hidden`, `overflow-hidden`, and `max-h-0`/`max-h-screen` transition keyed on `menuOpen`
- [x] 2.6 Inside the panel, wrap `mobileMenuContent` with an `onClick` handler that calls `setMenuOpen(false)` only when the click target is an anchor (`e.target.closest('a')`)
- [x] 2.7 Render a backdrop `<div>` (fixed, full-viewport, `z-40`) when `menuOpen` is true; `onClick` closes the menu. Header stays at `z-50`
- [x] 2.8 Add `aria-expanded={menuOpen}` and `aria-controls="mobile-menu"` to the hamburger button; add `id="mobile-menu"` to the panel div

## 3. Update `Nav.tsx`

- [x] 3.1 Add `hidden sm:flex` / `hidden sm:block` to `<nav>`, `<ThemeToggle />`, and the hire-me `<a>` in the existing desktop header children (hide from header row on mobile)
- [x] 3.2 Compose `mobileMenuContent`: a fragment containing the six `<NavLink>` items (stacked), `<ThemeToggle />`, and the hire-me `<a>` — all with mobile-appropriate styling (full-width, larger tap targets)
- [x] 3.3 Pass `mobileMenuContent` to `<NavScrollWrapper>`

## 4. Styling

- [x] 4.1 Style the hamburger button using existing design tokens (tertiary colour, `h-8 w-8`, icon centered)
- [x] 4.2 Style the mobile menu panel: `bg-neutral` (or `bg-neutral/95`), border-bottom matching the scrolled nav border token, padding matches nav `paddingInline`
- [x] 4.3 Style mobile nav links as block items with `py-3` tap target and `nav-link`/`nav-link-active` tokens matching desktop
- [x] 4.4 Style mobile hire-me CTA to match desktop version
- [x] 4.5 Verify no visual regression on desktop — open browser at `640px+` and confirm layout unchanged

## 5. Tests

- [x] 5.1 Write unit test: hamburger button not present in DOM on desktop (mock `window.innerWidth >= 640` or check CSS class)
- [x] 5.2 Write unit test: mobile menu panel hidden by default (no `max-h-screen` class initially)
- [x] 5.3 Write unit test: clicking hamburger sets `menuOpen` to true — panel becomes visible
- [x] 5.4 Write unit test: clicking hamburger again sets `menuOpen` to false — panel hidden
- [x] 5.5 Write unit test: clicking a nav link inside the panel calls `setMenuOpen(false)`
- [x] 5.6 Write unit test: clicking the backdrop calls `setMenuOpen(false)`
- [x] 5.7 Run existing `Nav` tests; fix any regressions caused by structural change to `NavScrollWrapper`
- [x] 5.8 Run `npm run typecheck` — zero errors

## 6. Validation & Handoff

- [x] 6.1 Run `npm run lint` — zero errors
- [x] 6.2 Run `openspec validate nav-mobile-navigation --type change --strict` — passes
- [x] 6.3 Manual test on 390 px and 768 px viewports: all links reachable, menu opens/closes, theme toggle works inside menu
- [x] 6.4 Run `/opsx:verify` before archiving
