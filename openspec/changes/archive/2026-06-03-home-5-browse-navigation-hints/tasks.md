## 1. Component

- [x] 1.1 Create `components/home/BrowseHints.tsx` — renders "or browse" label and Next.js `<Link>` elements for projects, experience, and contact with middle-dot separators
- [x] 1.2 Style label as `text-secondary text-sm`, links as `text-tertiary text-sm`, separators as `text-muted mx-2`

## 2. Integration

- [x] 2.1 Import `BrowseHints` in `components/home/HeroSection.tsx`
- [x] 2.2 Render `<BrowseHints />` below `<SuggestionChips>` inside the hero content div

## 3. Tests

- [x] 3.1 Add unit tests for `BrowseHints.tsx` — assert "or browse" label renders and all three links are present
- [x] 3.2 Assert each link has correct `href`: `/projects`, `/experience`, `/contact`
- [x] 3.3 Add integration assertion to `HeroSection.test.tsx` confirming browse hints render below chips
- [x] 3.4 Run `npm test` and confirm all tests pass

## 4. DOM / Visual Verification

- [x] 4.1 Run dev server and visually confirm the browse hints appear below suggestion chips, centred, with accent-coloured links
- [x] 4.2 Confirm correct rendering in both light and dark themes
- [x] 4.3 Confirm no layout shift or clipping on mobile viewport (≤375px)

## 5. Quality Gates

- [x] 5.1 Run `npm run typecheck` and confirm zero errors
- [x] 5.2 Run `npm run lint` and confirm zero errors
- [x] 5.3 Run `openspec validate home-5-browse-navigation-hints --type change --strict` and confirm the change is valid
