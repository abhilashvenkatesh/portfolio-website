---
linear_story_id: POR-92
linear_story_url: https://linear.app/abhilash-projects/issue/POR-92/nav-3-hire-me-call-to-action-in-nav
---

## Why

Recruiters landing on the site have no fast path to reach out — they must navigate to the Contact page first. A "Hire me" anchor in the persistent nav gives them a one-click mailto shortcut from any page, eliminating the highest-value drop-off point.

## What Changes

- Nav header gains a "Hire me" anchor rendered as `button-secondary`, placed as a sibling to `<nav>` (not inside it — it is an action, not a page navigation link)
- Clicking opens the visitor's email client pre-addressed to `abhilashfeb30@gmail.com` with subject `Hire me`
- Hovering applies `button-secondary-hover` token (accent-dim fill, 0.2s transition)
- Email address is read from `content/contact.json` at build time — no hardcoded values in the component
- `DESIGN.md` gains `button-secondary-hover` component token

## Capabilities

### New Capabilities

- `hire-me-cta`: Mailto anchor in the persistent nav header, styled as `button-secondary`, reading email from `content/contact.json` at build time

### Modified Capabilities

- `persistent-nav`: Nav bar gains a third header flex child (the hire-me CTA) after the existing logo + nav-links layout. Satisfies NAV-3 acceptance criteria.

## Impact

- `components/nav/Nav.tsx` — add hire-me CTA anchor as sibling to `<nav>`; make component async to read `content/contact.json`
- `lib/content.ts` — create file; add `getContact()` loader (new `lib/` directory)
- `content/contact.json` — create file with `email` field (new `content/` directory)
- `documentation/DESIGN.md` — add `button-secondary-hover` component token (already done in grill session)
