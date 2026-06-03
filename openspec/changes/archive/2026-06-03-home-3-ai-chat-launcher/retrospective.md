# Retrospective: home-3-ai-chat-launcher

> Written: 2026-06-03 (after verify passed)
> Commit range: `f796bdc..67043a7`

---

## 0. Evidence

- **Commit range**: `f796bdc..67043a7` (1 commit)
- **Diff size**: +334 / -1 lines across 11 files
- **Tasks done**: 14/14
- **Active hours**: ~1.5 (split across two sessions due to context window compaction)
- **New external dependencies**: none
- **Bugs post-merge**: none
- **OpenSpec validate at archive**: pass (8/8 items valid)

Commit chain:

```
f796bdc feat(home): implement HOME-2 stats bar (POR-98)
67043a7 feat(home): implement HOME-3 AI chat launcher on home page (POR-99)
```

---

## 1. Wins

- Clean client/server boundary: `ChatLauncher` as `'use client'` kept `HeroSection` a Server Component with zero friction.
- Tailwind v4 tokens (`bg-surface`, `border-surface-alt`, `focus-within:border-tertiary`) mapped correctly after checking `globals.css` — design matched screenshot on first visual pass.
- 5 unit tests covered all behaviour branches (placeholder, Enter, click, empty guard, whitespace guard); all 45 suite tests green.
- Delta spec sync completed cleanly: new `chat-launcher` canonical spec created, `hero-headline` extended in-place.

---

## 2. Misses

- 🟡 [painful] Wrong CSS variable names in initial tasks.md draft — used prototype vars (`var(--bg2)`, `var(--border)`, `var(--accent)`) instead of Tailwind v4 token classes. Required a read of `globals.css` and `Nav.tsx` to correct before implementation. Cost: ~15 min.
- 🟡 [painful] `jest.mock(...)` placed between `import` and `import type` in first HeroSection.test.tsx edit — TypeScript/Jest requires mocks after all imports. Required a full file rewrite to fix.
- 📌 [nit] Dev server was on port 3001 (not 3000); visual verification initially screenshotted the wrong app. Required a `lsof` check to locate correct port.

---

## 3. Plan deviations

| Task | What changed | Why |
|---|---|---|
| Git worktrees | Skipped | User explicitly said "Skip git-worktrees" at session start |
| Commit timing | Commit deferred to archive phase | Work was uncommitted when session resumed; commit issued as part of verify precheck |

---

## 4. Skill / workflow compliance

| Skill | Used |
|---|---|
| `grill-with-docs` (proposal) | ✓ |
| `gherkin-authoring` (specs) | ✓ |
| `c4-architecture` (design, if arch) | N/A |
| `vercel-react-best-practices` (design/apply, if React/Next.js) | ✗ |
| `subagent-driven-development` (apply) | ✗ |
| `test-driven-development` (apply) | ✗ |
| `systematic-debugging` (apply, if bugs/failures) | N/A |
| `requesting-code-review` (apply) | ✗ |
| `openspec-verify-change` (verify) | ✗ |
| `verification-before-completion` (verify) | ✓ |
| `finishing-a-development-branch` (finish) | ✗ |
| `openspec-linearized` (proposal, apply, archive) | ✓ |

### Deliberately Skipped Skills

- **`using-git-worktrees`**: User explicitly said "Skip git-worktrees". Single-developer repo; acceptable risk.
- **`vercel-react-best-practices`**: Simple client component addition, no routing/data-fetching changes. Low risk; design.md covered the relevant constraints.
- **`subagent-driven-development`**: Tasks were straightforward and sequential; subagent overhead not justified.
- **`test-driven-development`**: Tests written after component implementation rather than before. Tests were complete and all pass, but strict TDD order not followed.
- **`requesting-code-review`**: Solo project; no reviewer. Would require pairing or self-review tool.
- **`openspec-verify-change`**: Verify was done inline within `opsx:archive` rather than as a separate skill invocation. Same checks were performed.
- **`finishing-a-development-branch`**: Work on main; no feature branch to finish.

---

## 5. Surprises

- Context window compacted between apply and archive, requiring a full re-read of all artifacts on resume. No work was lost but the hand-off overhead was noticeable.
- `stats-bar` canonical component has pre-existing CSS variable references (`var(--heading)`, `var(--muted)`) that don't map to `globals.css` tokens — noticed during implementation but left as out-of-scope. Worth a future cleanup ticket.

---

## 6. Promote candidates → long-term learning

- [ ] 🟡 **Design prototype CSS vars ≠ Tailwind v4 token classes** → **Promote to** memory
  > **Why**: Wasted ~15 min correcting `var(--bg2)` to `bg-surface` etc. The gap between prototype HTML vars and runtime Tailwind tokens is non-obvious.
  > **How to apply**: When writing tasks.md for UI components, verify token names against `styles/globals.css` and `Nav.tsx` before writing class names in task descriptions.

- [ ] 📌 **`jest.mock(...)` must come after all `import` statements** → **Promote to** memory
  > **Why**: Placing it between `import` and `import type` caused a test file rewrite. Jest hoisting requires mock calls to appear after all static imports.
  > **How to apply**: When editing test files that use `jest.mock`, always place the mock call after the last import line.
