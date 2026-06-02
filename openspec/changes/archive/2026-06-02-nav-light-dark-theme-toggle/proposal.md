---
linear_story_id: POR-93
linear_story_url: https://linear.app/abhilash-projects/issue/POR-93/nav-4-light-dark-theme-toggle
---

## Why

Visitors viewing the portfolio in low-light environments have no way to reduce glare; a theme toggle lets them pick the mode that suits their lighting condition. This is Phase 1 priority and NAV-4 in the requirements backlog.

## What Changes

- Nav gains a sun/moon icon button that triggers the existing `ThemeProvider.toggleTheme`
- Clicking the button instantly swaps `data-theme` on `<html>` between `light` and `dark`
- Preference is persisted in `localStorage` (already handled by the inline `<script>` in `app/layout.tsx`) — survives page navigations and reloads

No new theme infrastructure needed — `ThemeProvider`, `toggleTheme` context, and the `[data-theme="dark"]` CSS overrides in `styles/globals.css` already exist.

## Capabilities

### New Capabilities
- `nav-theme-toggle`: Sun/moon icon button rendered inside `Nav.tsx`; reads current theme from context to show correct icon, calls `toggleTheme` on click

### Modified Capabilities
- `persistent-nav`: Nav gains the theme toggle button slot alongside existing links and hire-me CTA

Grill: skipped — no domain ambiguity or hard-to-reverse decision

## Impact

- `components/Nav.tsx` — add toggle button; import icon components
- `ThemeProvider` / `useTheme` context — read-only consumer, no changes needed
- `styles/globals.css` — verify dark token coverage (existing; confirm no gaps)
- No content-layer or data-loader changes
