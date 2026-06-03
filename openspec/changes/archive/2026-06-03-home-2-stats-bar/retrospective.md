# Retrospective: home-2-stats-bar

> Written: 2026-06-03 (after verify passed)
> Base: `4b22f8e` (HEAD at implementation start — changes uncommitted)

---

## 0. Evidence

- **Commit range**: `4b22f8e..HEAD` (0 implementation commits — changes staged/uncommitted at retro time)
- **Diff size**: +75 / -2 lines across 7 files (4 modified, 3 new)
- **Tasks done**: 14/14
- **Active hours**: ~0.5h
- **New external dependencies**: none
- **Bugs post-merge**: none
- **OpenSpec validate at archive**: pass

Files changed:
```
lib/types.ts                                  +8  (HomeStat interface, HomeContent.stats field)
content/home.json                             +6  (stats array)
components/home/StatsBar.tsx                 +18  (new component)
components/home/HeroSection.tsx               +3  (import + render StatsBar)
components/home/__tests__/StatsBar.test.tsx  +22  (new tests)
components/home/__tests__/HeroSection.test.tsx +29 (new tests)
openspec/changes/home-2-stats-bar/            (all artifacts)
```

---

## 1. Wins

- Prototype was complete and matched spec exactly — no ambiguity in layout or token selection. Design → implementation was mechanical.
- TDD cycle ran cleanly: StatsBar test failed for correct reason (module not found), implementation made it green immediately, zero rework.
- `HomeStat` extracted as a named interface alongside `HomeContent` — cleaner than inlining `Array<{ value: string; label: string }>` everywhere.
- 39/39 tests passed post-implementation with no regressions.
- Playwright visual verification at both desktop (1280px) and mobile (375px) confirmed flex-wrap behaviour and token rendering.

---

## 2. Misses

- 📌 `HeroSection.test.tsx` written after wiring (not before) — missed the RED phase for the composition test. Primary TDD cycle (StatsBar unit test) ran correctly but integration test didn't fail first.

---

## 3. Plan deviations

| Task | What changed | Why |
|---|---|---|
| Implementation uncommitted at retro | Commit deferred | User skipped the commit gate explicitly and plans to commit after archive |

---

## 4. Skill / workflow compliance

| Skill | Used |
|---|---|
| `grill-with-docs` (proposal) | ✗ |
| `gherkin-authoring` (specs) | ✗ |
| `c4-architecture` (design) | N/A |
| `vercel-react-best-practices` (apply) | ✓ |
| `subagent-driven-development` (apply) | ✗ |
| `test-driven-development` (apply) | ✓ |
| `systematic-debugging` (apply) | N/A |
| `requesting-code-review` (apply) | ✗ |
| `openspec-verify-change` (verify) | ✓ (via opsx:verify) |
| `verification-before-completion` (verify) | ✓ |
| `finishing-a-development-branch` (finish) | pending |
| `openspec-linearized` (proposal, apply, archive) | ✓ |

### Deliberately Skipped Skills

**`grill-with-docs`**: Small, unambiguous data-display feature — no domain model tension or terminology conflict to stress-test. REQUIREMENTS.md and the prototype fully specified the feature. To prevent recurrence: add heuristic — skip grill-with-docs when feature has no new domain concepts and spec is purely additive.

**`gherkin-authoring`**: Spec was simple enough to write directly (three requirements, one scenario each). No ambiguous acceptance criteria. To prevent recurrence: reserve gherkin-authoring for features with branching user flows or complex preconditions.

**`subagent-driven-development`**: Tasks were sequential by design (data layer → component → test → wire). No independent parallel tasks. Correct to skip here.

**`requesting-code-review`**: User is doing a solo session and explicitly invoked verify+retro+archive in one pass. Review step folded into the opsx:verify pass.

---

## 5. Surprises

- No surprises. Prototype → spec → implementation translation was 1:1. The design tokens (`stat-number`, `stat-label`) were already defined in DESIGN.md which eliminated all guesswork on typography.

---

## 6. Promote candidates → long-term learning

No new learnings worth promoting to long-term memory — this change confirmed known patterns (data layer → Server Component → test) without surfacing anything unexpected.
