## Context

Home page hero (`app/page.tsx` → `HeroSection`) currently renders role badge, headline, subheading, and bio. HOME-2 adds three headline statistics below the bio. The design prototype (`documentation/design/index.html`) defines the exact visual spec: flex row, 40px gap, each stat a stacked number + mono label, centred. Design tokens `stat-number` (28px/600/−0.02em) and `stat-label` (13px/DM Mono) are already codified in `documentation/DESIGN.md`.

## Goals / Non-Goals

**Goals:**
- Render three stats ("11+ years experience", "30+ microservices shipped", "3 countries worked in") below the hero bio.
- Drive stat content from `content/home.json` — no hardcoding in components.
- Match prototype layout and token usage exactly.

**Non-Goals:**
- Animation or hover effects on stats (not in prototype).
- Stats on any page other than home.
- Making stats configurable beyond what `home.json` provides.

## Decisions

**Data structure: `{ value: string; label: string }[]`**
Splitting number and label into separate fields (e.g., `value: "11+"`, `label: "years experience"`) lets each be styled independently using the `stat-number` and `stat-label` tokens. Storing as a single string would require client-side parsing to apply different styles.

**New `StatsBar` component at `components/home/StatsBar.tsx`**
Keeps `HeroSection` from growing. Mirrors the existing pattern: `HeroSection` is the section shell, sub-components handle discrete visual units (`AccentTag`, and now `StatsBar`).

**No dividers between stats**
Prototype uses gap-only separation. Adding borders would contradict the source-of-truth design.

**SSG / Server Component**
Stats are static content — no client interactivity needed. `StatsBar` is a pure Server Component, consistent with the build-time content architecture.

## Risks / Trade-offs

- [Content drift] Stats values will need manual updates in `home.json` as career milestones change. → Acceptable; JSON is human-editable by design.
- [Prototype order] Prototype places stats after the chat launcher (HOME-3, not yet built). Current implementation places stats directly after bio; a future HOME-3 task will insert the chat launcher between bio and stats. → No rework needed — `StatsBar` slot in `HeroSection` just moves down one sibling when HOME-3 lands.

## Migration Plan

1. Extend `HomeContent` in `lib/types.ts` — additive, no breaking change.
2. Add `stats` array to `content/home.json`.
3. Create `components/home/StatsBar.tsx`.
4. Import and render `<StatsBar stats={content.stats} />` in `HeroSection` below the bio `<p>`.
5. Verify `typecheck`, `lint`, `build` all pass.
6. Visual check: dev server confirms layout matches prototype.

Rollback: revert `home.json` and remove component + type field. No DB or API changes.

## Open Questions

None.
