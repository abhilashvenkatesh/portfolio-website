## Why

Visitors landing on the home page need a quick, scannable summary of Abhilash's professional scale before they read further. Three headline statistics give immediate social proof without requiring the visitor to parse prose.

## What Changes

- Add a `StatsBar` component below the hero description on the home page.
- Add `stats` array field to `content/home.json` for the three stat items.
- Extend `HomeContent` interface in `lib/types.ts` with `stats`.
- Load stats via existing `getHomeContent()` in `lib/content.ts`.

## Capabilities

### New Capabilities

- `stats-bar`: Horizontal display of three headline statistics ("11+ years experience", "30+ microservices shipped", "3 countries worked in") rendered below the hero description on the home page.

### Modified Capabilities

- `hero-headline`: The hero section now includes a stats bar below the description paragraph. No change to existing headline, tagline, or role badge behaviour.

## Impact

- `content/home.json` — new `stats` field
- `lib/types.ts` — `HomeContent` interface extended
- `app/page.tsx` — `StatsBar` rendered inside hero section
- `components/home/StatsBar.tsx` — new component
