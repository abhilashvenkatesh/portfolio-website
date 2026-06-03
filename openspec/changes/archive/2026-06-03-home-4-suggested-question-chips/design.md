## Context

The home-page hero already has a `ChatLauncher` component (input + send button). Visitors land and see the input but often don't know what to ask — the suggestion chips solve this by offering four concrete prompts. Chips use the same `/chat?q=` navigation pattern already implemented in `ChatLauncher`.

DESIGN.md defines two pill variants: a hero variant (DM Mono 12px, smaller) and a chat-page variant (DM Sans 13px). This change implements the hero variant.

## Goals / Non-Goals

**Goals:**
- Render four suggestion chips below the chat launcher input on the home-page hero
- Each chip navigates to `/chat?q=<encoded>` on click — identical mechanic to launcher submit
- Chip text sourced from `content/` — no hardcoded strings in the component (DATA-6)
- Accent-colour highlight on hover per DESIGN.md

**Non-Goals:**
- Chat-page suggestion chips (CHAT-3) — separate story, separate component
- Chip close/dismiss behaviour — chips are always visible
- Animated entrance — out of scope for this story (XC-1 handles fade-ins globally)

## Decisions

### 1. New `SuggestionChips` component vs extending `ChatLauncher`

**Decision:** New `components/home/SuggestionChips.tsx` component, rendered by `HeroSection` immediately below `ChatLauncher`.

**Rationale:** `ChatLauncher` is already a focused, testable unit. Embedding chip rendering inside it mixes concerns. A separate component keeps each file testable in isolation and matches the pattern used for `StatsBar` and `ChatLauncher`.

**Alternative considered:** Render chips inside `ChatLauncher` as a sub-section — rejected because it bloats the component and requires passing chip data through the launcher props.

### 2. Data source: `content/suggestion-chips.json`

**Decision:** Two arrays in one file — `home` (4 items) and `chat` (6 items). `SuggestionChips` reads the `home` array at build time via a new loader in `lib/content.ts`.

**Rationale:** DATA-6 requires home chips be configurable. Sharing a file with the future chat chips (DATA-7) avoids duplicated JSON files. Arrays are independently addressable, so future CHAT-3 story just reads the `chat` array.

**Alternative considered:** Separate `content/home-chips.json` and `content/chat-chips.json` — rejected as premature splitting; one file with named keys is simpler and DATA-6/DATA-7 share the same domain.

### 3. Pill styling — Tailwind classes

**Decision:** Use `rounded-full border border-[var(--color-border)] bg-[var(--color-bg2)] text-[var(--color-muted)] font-mono text-xs` base, with `hover:border-[var(--color-accent-border)] hover:bg-[var(--color-accent-dim)] hover:text-[var(--color-accent)]` hover state. Matches DESIGN.md hero pill spec (DM Mono 12px, `100px` radius = `rounded-full`, `1px border`, bg2 fill, accent-dim + accent-border + accent text on hover).

**Rationale:** Follows the established token pattern used in ChatLauncher and AccentTag. Tokens verified against `styles/globals.css`.

### 4. Server Component vs Client Component

**Decision:** `SuggestionChips` is a **Client Component** (`'use client'`).

**Rationale:** Each chip needs an `onClick` handler to call `router.push(...)`. Next.js requires Client Components for event handlers. The chip data is still loaded at build time by the parent Server Component (`HeroSection`) and passed as props — no `fs` calls in the client component. This matches the `ChatLauncher` pattern exactly.

## Risks / Trade-offs

- [Risk: Content file structure change breaks DATA-7 consumer] → Mitigation: `content/suggestion-chips.json` is new, so no existing consumer. Define the schema clearly in the loader type.
- [Risk: Tailwind token names differ from design prototype vars] → Mitigation: Cross-check every token against `styles/globals.css` `@theme inline` block before finalising class names (lesson from HOME-3).

## Migration Plan

1. Add `content/suggestion-chips.json` with `home` and `chat` arrays
2. Add `SuggestionChipItem` type to `lib/types.ts`
3. Add `getSuggestionChips()` loader to `lib/content.ts`
4. Implement `components/home/SuggestionChips.tsx` (client)
5. Render `<SuggestionChips>` in `HeroSection.tsx` below `<ChatLauncher>`
6. Tests + typecheck + lint

No migrations, no rollback strategy needed — purely additive UI change. Removing the component from `HeroSection` is sufficient to revert.

## Open Questions

None — requirements are fully specified in REQUIREMENTS.md (HOME-4, DATA-6).
