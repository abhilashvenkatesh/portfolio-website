## 1. Data Layer

- [x] 1.1 Add `stats: Array<{ value: string; label: string }>` to `HomeContent` interface in `lib/types.ts`
- [x] 1.2 Add `stats` array to `content/home.json` with values: `[{ "value": "11+", "label": "years experience" }, { "value": "30+", "label": "microservices shipped" }, { "value": "3", "label": "countries worked in" }]`

## 2. Component

- [x] 2.1 Create `components/home/StatsBar.tsx` — accepts `stats: Array<{ value: string; label: string }>`, renders flex row (gap-[40px], flex-wrap, justify-center)
- [x] 2.2 Each stat item: value in `text-[28px] font-semibold tracking-[-0.02em] text-[var(--heading)]`, label in `text-[13px] font-mono text-[var(--muted)]`
- [x] 2.3 Import and render `<StatsBar stats={content.stats} />` in `components/home/HeroSection.tsx` below the bio `<p>`, with `mt-[72px]`

## 3. Tests

- [x] 3.1 Add unit test for `StatsBar` in `components/home/__tests__/StatsBar.test.tsx` — render with fixture data, assert all three stat values and labels appear in the DOM
- [x] 3.2 Update `HeroSection` test (if exists) to include stats fixture data and assert `StatsBar` output is present
- [x] 3.3 Run `npm test` and confirm all tests pass

## 4. DOM / Visual Verification

- [x] 4.1 Start `npm run dev` and verify stats bar renders below bio on home page at desktop (1280px+) — three stats visible in a row
- [x] 4.2 Verify wrap behaviour at mobile (375px) — stats stack or wrap without overflow
- [x] 4.3 Confirm stat number uses heading colour and stat label uses muted/mono styling matching prototype

## 5. Quality Gates

- [x] 5.1 Run `npm run typecheck` and confirm zero errors
- [x] 5.2 Run `npm run lint` and confirm zero errors
- [x] 5.3 Run `openspec validate home-2-stats-bar --type change --strict` and confirm the change is valid
