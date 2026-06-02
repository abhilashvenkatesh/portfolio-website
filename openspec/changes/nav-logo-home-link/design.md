## Context

Nav bar (NAV-1) is live but has no logo — `Nav.tsx` renders only the six page links. The "abhilash" wordmark must be added to the top-left as a home link, matching the design prototype (`documentation/design/shared.js` line 473).

Current layout: single flex row, links left-aligned. Required layout: `justify-between`, wordmark left, links right.

## Goals / Non-Goals

**Goals:**
- Add "abhilash" wordmark as `<Link href="/">` to top-left of nav
- Apply correct design tokens: `font-mono`, `--color-tertiary`, `letter-spacing: 0.05em`
- Update nav layout to `justify-between`

**Non-Goals:**
- Logo SVG or image asset (design uses text wordmark only)
- New design token for the logo (reuses `--color-tertiary`)
- Mobile/hamburger nav changes (NAV-6 scope)

## Decisions

### D1: Use Next.js `<Link>` not `<a>` for logo
- **Choice**: `<Link href="/">` from `next/link`
- **Rationale**: Consistent with all other nav links (`NavLink` wraps `<Link>`). Client-side navigation, no full reload.
- **Alternatives considered**: Plain `<a href="/">` works but opts out of Next.js prefetching and breaks nav convention.

### D2: Style via Tailwind utility classes (no new token)
- **Choice**: `font-mono text-sm text-[var(--color-tertiary)] tracking-[0.05em]`
- **Rationale**: Design uses `--color-tertiary` (burnt-orange accent) — no new token needed. `font-mono` maps to Tailwind's built-in monospace stack. Consistent with DESIGN.md token usage.
- **Alternatives considered**: Introduce a `--color-logo` alias — unnecessary indirection for a single use.

## Risks / Trade-offs

[Trade-off] "abhilash" on `/` will have no active-link visual distinction (no `nav-link-active` state on logo) → Accepted because: logo links to home, not a section — active-state styling would be confusing when on home page.

## Migration Plan

N/A — no deployment changes in this change.

## Open Questions

_(none)_
