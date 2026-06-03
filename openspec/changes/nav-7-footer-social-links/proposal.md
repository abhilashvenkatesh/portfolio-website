---
linear_story_id: "POR-96"
linear_story_url: "https://linear.app/abhilash-projects/issue/POR-96/nav-7-footer-social-links"
---

## Why

Every page currently has no footer, leaving visitors with no quick way to reach Abhilash's external profiles (GitHub, LinkedIn, email) or see site attribution. Adding a persistent footer satisfies NAV-7 and completes the basic navigation shell.

## What Changes

- New `Footer` component rendered on every page via `app/layout.tsx`
- GitHub, LinkedIn, and Email icon links with hover colour change
- Copyright line "© 2025 Abhilash" on the left

## Capabilities

### New Capabilities

- `footer-social-links`: Persistent site footer with social profile links (GitHub, LinkedIn, Email) and copyright attribution shown on every page

### Modified Capabilities

<!-- No existing spec-level behaviour changes -->

## Impact

- `app/layout.tsx` — add `<Footer />` below `{children}`
- New `components/Footer.tsx` server component
- `content/social.json` or inline constants for link hrefs (GitHub, LinkedIn, email)
- Design tokens from `styles/globals.css` for hover colours
