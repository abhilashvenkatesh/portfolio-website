## Context

Home page currently has no content. HOME-1 adds the hero identity block: role badge, headline, subheading, and description. This is the first home page story; subsequent stories (HOME-2 through HOME-7) will add to the same `HeroSection.tsx` component and `content/home.json` data file.

## Goals / Non-Goals

**Goals:**
- Render the hero identity block (badge + headline + subheading + description) as a Server Component
- Source all copy from `content/home.json` via a typed build-time loader

**Non-Goals:**
- Stats bar (HOME-2), chat launcher (HOME-3/4/5), scroll indicator (HOME-6), background texture (HOME-7) — out of scope
- Any client-side interactivity; the identity block is fully static

## Decisions

### Decision: HeroSection.tsx hosts the identity block (not a dedicated HeroHeadline component)

The architecture already defines `components/home/HeroSection.tsx` as the full-viewport hero container. HOME-1 creates this file with only the identity block; later stories add to it. Extracting a `HeroHeadline` sub-component is premature — the identity block is not reused elsewhere.

**Alternative considered:** Create `HeroHeadline.tsx` as a dedicated component. Rejected — adds indirection with no reuse benefit at this stage.

### Decision: home.json contains only HOME-1 fields now

`home.json` will be extended by later stories (HOME-2 adds stats, HOME-3/4 adds suggestions). For HOME-1, only `roleBadge`, `headline`, `subheading`, and `bio` fields are added. Later stories extend the schema and loader together to avoid adding fields with no consuming component.

**Alternative considered:** Add all planned fields up front. Rejected — creates schema drift where JSON fields exist but no component reads them, making validate-content harder to reason about.

### Decision: Headline split uses the existing AccentTag component for the badge

The `AccentTag` UI component already exists in architecture (`components/ui/AccentTag.tsx`). Reusing it keeps badge styling consistent with any other accent labels on the site.

### Decision: Headline subheading split renders as inline spans within a single h1

The prototype splits the subheading across two lines with the accent word "scale to millions." highlighted. This is achieved with inline `<span>` elements inside a single `<h1>`, avoiding `<br />` usage and keeping the DOM semantic.

## Risks / Trade-offs

- [Risk] Future HOME stories modify the same `HeroSection.tsx` in the same area — merge conflicts possible. -> Mitigation: each HOME story works on a dedicated section/slot within the component; the identity block is at the top and unlikely to conflict with stats/chat additions below it.

## Migration Plan

New files only. No existing content or components are modified. Deploy proceeds normally via Vercel CI on merge to main.

## Open Questions

None — design is fully determined by architecture constraints and the prototype.
