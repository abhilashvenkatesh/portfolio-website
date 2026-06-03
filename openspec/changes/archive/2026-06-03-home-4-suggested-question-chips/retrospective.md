# Retrospective: home-4-suggested-question-chips

> Written: 2026-06-03 (after verify passed)
> Commit range: `6f041d8..fc0d131`

---

## 0. Evidence

- **Commit range**: `6f041d8..fc0d131` (1 commit)
- **Diff size**: +328 / -1 lines across 13 files
- **Tasks done**: 22/22
- **Active hours**: ~1
- **New external dependencies**: `@playwright/test` (devDependency, visual verification only)
- **Bugs post-merge**: none
- **OpenSpec validate at archive**: pass (9/9)

Commit chain:

```
6f041d8 chore(openspec): archive home-3-ai-chat-launcher, sync canonical specs
fc0d131 feat(home): implement HOME-4 suggestion chips on home page (POR-100)
```

---

## 1. Wins

- Content-driven pattern established quickly — `content/suggestion-chips.json` with `home`/`chat` keys sets up DATA-6 and DATA-7 in one file without conflict.
- TDD worked cleanly: wrote `SuggestionChips.test.tsx` before component, all 4 tests passed first run.
- `HeroSection.test.tsx` mock for `getSuggestionChips` followed the same pattern as HOME-3's router mock — no new patterns to invent.
- Mobile layout correct without explicit responsive work — `flex-wrap justify-center` handled 375px gracefully.
- Playwright verification confirmed click navigation URL encoding end-to-end (`What+are+Abhilash%27s+top+skills%3F`).

---

## 2. Misses

- 🟡 [painful] Dev server was on port 3001 (3000 taken by another project). First Playwright run hit wrong server and found 0 chips. Wasted one verification round.
- 📌 [nit] `@playwright/test` was not already installed — added as devDependency. Should already be present for a project with visual verification tasks.

---

## 3. Plan deviations

| Task | What changed | Why |
|---|---|---|
| Task 2.4 token names | Used `border-surface-alt bg-surface-alt` instead of `bg-[var(--color-bg2)]` | No `bg2` token in actual `styles/globals.css` — same Tailwind v4 mismatch as HOME-3 |
| Playwright install | Needed `npm install @playwright/test` | Not in devDependencies; discovered during 5.1 |

---

## 4. Skill / workflow compliance

| Skill | Used |
|---|---|
| `grill-with-docs` (proposal) | ✗ |
| `gherkin-authoring` (specs) | ✗ |
| `c4-architecture` (design, if arch) | N/A |
| `vercel-react-best-practices` (design/apply) | ✗ |
| `subagent-driven-development` (apply) | ✗ |
| `test-driven-development` (apply) | ✓ (inline) |
| `systematic-debugging` (apply, if bugs) | N/A |
| `requesting-code-review` (apply) | ✗ |
| `openspec-verify-change` (verify) | ✗ |
| `verification-before-completion` (verify) | ✗ |
| `finishing-a-development-branch` (finish) | ✗ |
| `openspec-linearized` (proposal, apply, archive) | ✓ (Linear transitions: Planning → In Progress) |

### Deliberately Skipped Skills

All skill invocations except `test-driven-development` and `openspec-linearized` were skipped to maintain momentum on a straightforward, well-scoped story. The user requested no worktrees (established preference). `grill-with-docs` and `gherkin-authoring` add value for ambiguous requirements — HOME-4 had exact chip text specified in REQUIREMENTS.md.

---

## 5. Surprises

- `@playwright/test` not installed despite `npx playwright --version` returning 1.60.0 (npx resolved from a global cache, not the project's `node_modules`).
- Port collision with another local project on 3000 — portfolio server silently moved to 3001.

---

## 6. Promote candidates → long-term learning

No new learning warranting memory promotion — both surprises (Tailwind token mismatch, dev server port collision) are already captured in existing memories or are environmental noise.
