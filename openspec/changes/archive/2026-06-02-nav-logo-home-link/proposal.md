---
linear_story_id: POR-91
linear_story_url: https://linear.app/abhilash-projects/issue/POR-91/nav-2-logo-home-link
---

## Why

The nav bar (NAV-1) is live but the "abhilash" wordmark is missing — the logo slot is empty. NAV-2 adds the wordmark to the top-left and makes it a home link, completing standard site-navigation expectations.

## What Changes

- Add "abhilash" wordmark to `Nav.tsx` top-left as a `<Link href="/">` 
- Style with `font-mono`, `--color-tertiary`, `letter-spacing: 0.05em`, `text-sm`
- Nav header switches from left-only flex to `justify-between` (logo left, links right)

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `persistent-nav`: Add requirement — logo SHALL be present in top-left and SHALL navigate to `/` when clicked

## Impact

- `components/nav/Nav.tsx` — add logo link element, update layout to `justify-between`
- `openspec/specs/persistent-nav/spec.md` — new requirement added
