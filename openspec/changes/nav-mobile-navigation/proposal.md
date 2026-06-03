---
linear_story_id: POR-95
linear_story_url: https://linear.app/abhilash-projects/issue/POR-95/nav-6-mobile-navigation
---

## Why

Mobile visitors can't access nav links — they're hidden below the `sm` breakpoint with no replacement. All navigation, the hire-me CTA, and the theme toggle need to be reachable on small screens.

## What Changes

- Add a hamburger toggle button to the nav header (visible only below `sm` breakpoint)
- Hide ThemeToggle and hire-me CTA from the header on mobile (they move into the mobile menu)
- Add a full-width dropdown panel below the header containing all six nav links, hire-me CTA, and theme toggle
- Mobile header collapses to: logo (left) + hamburger (right)

## Capabilities

### New Capabilities

- `mobile-nav-menu`: Full-width dropdown panel triggered by a hamburger button on small screens. Contains all six nav links, hire-me CTA, and theme toggle. Closes on link tap or outside tap.

### Modified Capabilities

- `persistent-nav`: Header layout changes on mobile — ThemeToggle and hire-me CTA hidden from header, hamburger button added. Desktop layout (≥640 px) unchanged.

## Impact

- `components/nav/Nav.tsx` — add hamburger button, mobile-only visibility toggles
- `components/nav/NavScrollWrapper.tsx` — may need mobile menu state if client-side
- New `components/nav/MobileMenu.tsx` (or inline) — dropdown panel, open/close state
- `openspec/specs/persistent-nav/spec.md` — delta to existing spec
