---
linear_story_id: POR-94
linear_story_url: https://linear.app/abhilash-projects/issue/POR-94/nav-5-nav-blur-on-scroll
---

## Why

When a visitor scrolls down, the nav sits directly over page content with no visual separation. A frosted-glass blur effect makes the nav feel distinct and polished — a standard affordance on modern portfolio sites.

Grill: skipped — no domain ambiguity or hard-to-reverse decision

## What Changes

The persistent nav gains a scroll-aware visual state: once the visitor scrolls past 0px, `backdrop-blur` is applied to the nav background and the border-bottom becomes visible. When at the top of the page, the nav reverts to transparent (no blur, no border).

## Capabilities

### New Capabilities

_(none — this enhances an existing capability)_

### Modified Capabilities

- `persistent-nav`: Add scroll-triggered frosted-glass blur and visible border-bottom; no requirement changes to links, active state, or fixed positioning.

## Impact

- `components/Nav.tsx` — needs a `useEffect`/`scroll` listener or `IntersectionObserver` to toggle a CSS class; component becomes a Client Component if not already
- `styles/globals.css` / Tailwind — `backdrop-blur` and `bg-opacity` utility classes already available in Tailwind v4; no new tokens required
- SSR/SSG not affected — blur state is client-only scroll behavior
