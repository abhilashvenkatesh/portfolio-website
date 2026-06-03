## Context

`Nav.tsx` is a Server Component that wraps `NavScrollWrapper` (a `"use client"` component managing scroll state). Nav links are already hidden below the `sm` (640 px) breakpoint via `hidden sm:flex`, but no replacement UI exists — mobile visitors have no nav access. ThemeToggle and hire-me CTA are currently always-visible in the header on all viewports.

## Goals / Non-Goals

**Goals**
- Mobile header shows logo + hamburger only (< 640 px)
- Hamburger opens a full-width dropdown panel below the nav bar containing all six nav links, hire-me CTA, and theme toggle
- Desktop layout (≥ 640 px) unchanged

**Non-Goals**
- Side-drawer or full-screen overlay patterns
- Animated page transitions or route-aware animations beyond the existing FadeIn pattern
- Persisting menu open state across navigations

## Decisions

### State ownership: extend `NavScrollWrapper`, add `mobileMenuContent` prop

`NavScrollWrapper` is already `"use client"` and owns `scrolled` state. Adding `menuOpen` state here is the minimal change — no new context provider or client boundary is needed. A `mobileMenuContent: React.ReactNode` prop lets `Nav.tsx` (Server Component) compose the mobile panel content and pass it down, keeping `Nav.tsx` as the composition root.

Alternative considered: a separate `MobileNavWrapper` client component — adds a client boundary and component layer with no benefit at this scale.

### Duplicate ThemeToggle and hire-me in DOM, hidden per breakpoint with Tailwind

Desktop header: ThemeToggle + hire-me visible via `hidden sm:flex` (or `hidden sm:block`).
Mobile menu panel: ThemeToggle + hire-me visible via `flex sm:hidden` (or `block sm:hidden`).

Two DOM instances exist simultaneously. ThemeToggle reads/writes `localStorage` + `data-theme` attribute, so both instances share the same effective state. Toggling either works correctly.

Alternative considered: conditional rendering via JS — requires `useWindowSize` hook and causes hydration mismatch or layout shift. CSS-only approach avoids both.

### Hamburger button is always rendered; visibility via Tailwind

The hamburger `<button>` renders in the header at all times but is `block sm:hidden`. No JS needed to show/hide — keeps the component simple and avoids hydration issues.

### Menu panel positioned inside the `<header>` as a second row

`NavScrollWrapper` switches from `flex items-center justify-between` on the `<header>` to `flex-col`. The top row (`flex items-center justify-between`) is the existing nav bar. The mobile panel slides in as a second row, inheriting the header's `fixed top-0 inset-x-0 z-50` positioning so it stays below the nav bar without additional CSS.

Panel uses `overflow-hidden` + `max-height` transition (`max-h-0` → `max-h-screen`) for CSS-smooth open/close without JS measurement.

### Close triggers: nav link tap, backdrop tap, route change

- Nav link: event delegation on the panel `<div>` — `onClick` checks `e.target.closest('a')` and closes the menu if the click was on an anchor. No per-item `onClick` needed; `NavLink` renders `<a>` via `next/link`, so delegation works without prop-threading.
- Outside click: a transparent full-viewport backdrop `<div>` rendered behind the panel when open; clicking it closes the menu. `z-index` layering: backdrop at `z-40`, header at `z-50`.
- Route change (back/forward): `useEffect` watching `usePathname()` resets `menuOpen` to false — prevents ghost menu persisting across SPA navigation.

## Risks / Trade-offs

- [Two ThemeToggle instances] → Both reflect live `data-theme` state via the existing SSR-safe pattern; clicking either updates the global state. No functional risk.
- [max-height transition on unknown content] → Panel height is bounded and content is static; `max-h-screen` as upper bound is safe. If content grows significantly, revisit with explicit height.
- [NavScrollWrapper structural change] → Changing from flat `{children}` to flex-col with a row wrapper may affect existing desktop layout. Snapshot tests and visual regression must cover both breakpoints.

## Migration Plan

1. No data migration required — purely UI change.
2. Deploy as normal Vercel preview. Test on real device widths (360 px, 390 px, 414 px) before promoting.
3. Rollback: revert `NavScrollWrapper.tsx` and `Nav.tsx` to previous commit.

## Open Questions

None — all decisions resolved during proposal grilling session.
