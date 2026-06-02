## Why

Visitors currently have no persistent navigation — jumping between sections requires scrolling back to the top, breaking flow. Adding a fixed nav bar is the foundational UX requirement for the portfolio (Phase 1 milestone).

## What Changes

- New `Nav` component rendered in the root layout, visible on every page
- Nav is fixed to the top of the viewport and persists while scrolling
- Links: Projects, About, Experience, Blog, Chat, Contact
- Active page link is visually distinguished (accent colour / weight)

## Capabilities

### New Capabilities

- `persistent-nav`: Fixed top navigation bar with page links and active-page highlighting

### Modified Capabilities

_(none — first implementation, no existing nav spec)_

## Impact

- `app/layout.tsx` — import and render `Nav` inside the root layout shell
- New component: `components/Nav.tsx` (or `components/nav/Nav.tsx`)
- Tailwind / design tokens: uses existing `rounded-*`, accent colour tokens, `DM Mono` for logotype only; body nav links use the standard type scale
- No new dependencies required
