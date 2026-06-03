## 1. Content & Types

- [x] 1.1 Create `content/suggestion-chips.json` with `home` (4 items) and `chat` (6 items, placeholder) arrays
- [x] 1.2 Add `SuggestionChipItem` type (or equivalent) to `lib/types.ts`
- [x] 1.3 Add `getSuggestionChips()` loader to `lib/content.ts` that reads and parses `content/suggestion-chips.json`

## 2. SuggestionChips Component

- [x] 2.1 Create `components/home/SuggestionChips.tsx` as a Client Component (`'use client'`)
- [x] 2.2 Accept `chips: string[]` prop; map each to a `<button>` element
- [x] 2.3 On click, call `router.push('/chat?q=' + encodeURIComponent(chip))`
- [x] 2.4 Apply pill styles: `rounded-full border border-surface-alt bg-surface-alt text-secondary font-mono text-xs px-[14px] py-[6px]`
- [x] 2.5 Apply hover styles: `hover:bg-accent-dim hover:border-tertiary hover:text-tertiary`

## 3. HeroSection Integration

- [x] 3.1 In `components/home/HeroSection.tsx`, call `getSuggestionChips()` at build time and read the `home` array
- [x] 3.2 Render `<SuggestionChips chips={homeChips} />` below `<ChatLauncher />` with appropriate spacing (`mt-4` or similar)

## 4. Tests

- [x] 4.1 Create `__tests__/components/home/SuggestionChips.test.tsx`
- [x] 4.2 Test: four chips render with correct text
- [x] 4.3 Test: clicking a chip calls `router.push` with correct `/chat?q=` URL
- [x] 4.4 Update `HeroSection.test.tsx` to assert chips section renders (at least one chip label visible)
- [x] 4.5 Run `npm test` and confirm all tests pass

## 5. DOM / Visual Verification

- [x] 5.1 Run `npm run dev`, navigate to home page, confirm four chips visible below input
- [x] 5.2 Hover each chip — confirm accent border/bg/text transition (CSS classes verified; hover is CSS-only)
- [x] 5.3 Click a chip — confirm navigation to `/chat?q=<encoded question>` (verified: URL = /chat?q=What+are+Abhilash%27s+top+skills%3F)
- [x] 5.4 Confirm no clipping or layout shift on mobile viewport (375px) — chips stack correctly

## 6. Quality Gates

- [x] 6.1 Run `npm run typecheck` and confirm zero errors
- [x] 6.2 Run `npm run lint` and confirm zero errors
- [x] 6.3 Run `openspec validate --changes home-4-suggested-question-chips --strict` and confirm valid
