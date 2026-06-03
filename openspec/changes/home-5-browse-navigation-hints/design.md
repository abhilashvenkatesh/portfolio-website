## Context

HeroSection renders the primary above-the-fold content. Below the suggestion chips is dead space — visitors who don't want to interact with the AI chat have no visible navigation cues. The browse hints provide a low-friction escape to the three main content pages.

Current state: `HeroSection.tsx` ends with `<SuggestionChips>` as the last element inside the hero content div. No "or browse" line exists.

## Goals / Non-Goals

**Goals:**
- Render `or browse · projects · experience · contact` below the suggestion chips
- Style each page link in `text-tertiary` (burnt-orange accent)
- Each link navigates to the correct page (`/projects`, `/experience`, `/contact`)

**Non-Goals:**
- Active/highlighted state based on current route (Nav already handles this)
- Animated or hover-state transitions beyond default link behaviour
- Responsive layout changes — single line, centre-aligned at all breakpoints

## Decisions

**Decision 1: Inline component vs. extracted component**
The hints are three static links with a label. Extracting to a separate component adds a file for ~10 lines of JSX. Inline in `HeroSection.tsx` is simpler. However, the pattern will be tested, so extracting to `BrowseHints.tsx` improves testability and keeps HeroSection clean.
→ **Extract to `components/home/BrowseHints.tsx`**

**Decision 2: Link component**
Next.js `<Link>` from `next/link` — client-side navigation, correct for all three targets. No `<a>` tags for internal routes.

**Decision 3: Separator token**
Design spec says "·" (middle dot, U+00B7) as separator. Render as a `<span>` between links with `mx-2` spacing, styled `text-muted` so only the link text carries accent colour.

**Decision 4: "or browse" label styling**
The label "or browse" is not a link. Style as `text-secondary` (muted), `text-sm`, matching the font weight of the hint line without drawing attention.

## Risks / Trade-offs

- [Minimal visual weight] The hint line is intentionally quiet — may be missed. Mitigation: accent colour on links provides sufficient contrast without competing with the CTA.

## Migration Plan

1. Create `components/home/BrowseHints.tsx`
2. Import and render it inside `HeroSection.tsx` below `<SuggestionChips>`
3. Add tests to `HeroSection.test.tsx`
4. Typecheck + lint pass

No rollback concern — purely additive render change with no data dependencies.

## Open Questions

None.
