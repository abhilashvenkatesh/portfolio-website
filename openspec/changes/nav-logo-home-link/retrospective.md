# Retrospective: nav-logo-home-link

> Written: 2026-06-02 (after verify passed)
> Commit range: `43263b4..e15e644`
> Worktree: merged to main

---

## 0. Evidence

- **Commit range**: `43263b4..e15e644` (3 NAV-2 commits)
- **Diff size**: +8360 / -2739 lines across 14 files (10,981 lines are lockfile; implementation delta is +474 / -8 across 5 files)
- **Tasks done**: 9/9
- **Active hours**: ~3h (two context windows, one context compaction mid-session)
- **Subagent dispatches**: ~9 (3 implementers, 3 spec reviewers, 2 code-quality reviewers, 1 final reviewer)
- **New external dependencies**: `jest@29.7.0`, `jest-environment-jsdom@29.7.0`, `ts-jest@29.4.11`, `@testing-library/react@^16`, `@testing-library/jest-dom@^6`, `@testing-library/user-event@^14`, `ts-node@^10.9.2`, `@types/jest@^29`, `jest-util@^29` (all MIT)
- **Bugs encountered post-merge**: 1 — `jest-util` not hoisted in main `node_modules`, causing `ts-jest` to fail on `npm test` after merge; fixed in `0ffaa55`
- **OpenSpec validate state at archive**: 2/2 ✓ (change + spec)
- **Test coverage signal**: 3 tests, 1 suite, 3/3 pass (`npm test`)

Commit chain:

```
43263b4 chore: update claude settings permissions  ← branch base
99018ea feat(nav): add abhilash wordmark as home link (NAV-2)
0ffaa55 fix(test): hoist jest-util to fix ts-jest module resolution on main
e15e644 chore(openspec): mark tasks complete, add verify.md for nav-logo-home-link
```

---

## 1. Wins

- TDD RED-GREEN enforced: 3 tests written and confirmed failing before any implementation, then confirmed passing after `Nav.tsx` edit.
- Two-stage review caught 5 issues before merge: `ts-jest@30` incompatibility, `moduleResolution: "bundler"` vs `"node16"` mismatch, hardcoded `usePathname` mock, too-narrow `testMatch` glob, too-narrow `next/link` mock type. All fixed within the same cycle.
- Subagent isolation prevented context pollution: each task got a clean implementer with exactly the context it needed.
- Design prototype was consulted (`documentation/design/shared.js:473`) and confirmed wordmark should be text-only, not SVG — saved a wrong-direction implementation.

## 2. Misses

- 🔴 Scope surprise: "abhilash" wordmark was entirely absent from `Nav.tsx` (not in NAV-1 output). Plan described wrapping an existing element; actual task was adding the element from scratch. Discovered at grill time, not during proposal/design — added a cycle of clarification.
- 🟡 `jest-util` hoisting failure post-merge: worktree `node_modules` had it hoisted; fresh `npm install` on main did not. All 3 tests passed in worktree; `npm test` failed immediately after merge until `jest-util@^29` was added as an explicit devDep. The finishing-a-development-branch merge verification caught this, but it required an unplanned fix commit.
- 🟡 `tasks.md` checkboxes never updated during implementation cycle. The plan.md (worktree artifact) had checkboxes updated; the coarser `tasks.md` (openspec artifact) was retroactively marked after archive prompt surfaced the gap.
- 📌 Context compaction mid-session caused summary drift: the compacted summary incorrectly stated `@types/jest` was not installed and `tsconfig.json` had test exclusions. Neither was true in the final committed state. Caused a wasted subagent dispatch (`chore(test): install @types/jest`) that was blocked before it ran.

## 3. Plan deviations

| Plan task | What changed | Why |
|-----------|--------------|-----|
| Task 1 (test framework) | Added as unplanned prerequisite | No Jest setup existed; plan.md was written reactively after discovering the gap |
| Task 1.1 (wrap existing text) | Became "add element from scratch" | "abhilash" was absent from Nav.tsx entirely — not just missing a link |
| task 1.2 classes | `text-[var(--color-tertiary)]` → `text-tertiary` | Tailwind v4 canonical shorthand preferred over raw CSS var syntax |
| post-merge | `fix(test): hoist jest-util` commit added | `jest-util` not hoisted in main; worktree node_modules hid the issue |

## 4. Skill / workflow compliance

| Skill                                            | Used |
|--------------------------------------------------|------|
| superpowers:writing-plans                        | ✓    |
| superpowers:using-git-worktrees                  | ✓    |
| superpowers:subagent-driven-development          | ✓    |
| (transitive) superpowers:test-driven-development | ✓    |
| (transitive) superpowers:requesting-code-review  | ✓    |
| superpowers:finishing-a-development-branch       | ✓    |

### Deliberately Skipped Skills

> All rows ✓ — no skills skipped this cycle.

## 5. Surprises

- "abhilash" wordmark was entirely absent from `Nav.tsx` — assumed it existed from NAV-1 and just needed wrapping.
- No test framework existed at all; Jest had to be installed from scratch as part of this story.
- `ts-jest@29` requires an explicit `moduleResolution: "node16"` + `module: "CommonJS"` override in its `tsconfig` option because Next.js sets `"moduleResolution": "bundler"` globally, which `ts-jest` can't handle.
- `jest-util` is a transitive dep of `jest` but npm does not guarantee it hoists to the top level. When worktree and main repo share a lockfile the behavior can differ between fresh installs, causing `ts-jest` to fail silently after merge.
- Context compaction created a divergent summary of the implementation state (wrongly describing tsconfig exclusions and missing @types/jest that were in fact present and absent respectively).

## 6. Promote candidates → long-term learning

- [ ] 🟡 **Update tasks.md checkboxes at each task completion, not just plan.md** → **Promote to memory** (type: feedback)
  > **Why**: tasks.md (the openspec artifact) was never updated during the implementation cycle; only plan.md checkboxes were touched. The gap surfaced only at archive time, requiring retroactive update.
  > **How to apply**: After each subagent marks a task done in plan.md, also check whether the corresponding coarser task in tasks.md should be ticked. If using subagent-driven-development, add this to the "mark task complete" step.

- [ ] 🟡 **After installing test infra in a worktree, verify npm test passes on main before declaring done** → **Promote to memory** (type: feedback)
  > **Why**: `jest-util` hoisting differs between worktree `node_modules` (lockfile-consistent) and a fresh `npm install` on main after merge. Tests passed in the worktree; `npm test` failed on main within the same session.
  > **How to apply**: finishing-a-development-branch Option 1 (merge locally) correctly catches this — but only if `npm install` is run on main before `npm test`. Always run `npm install && npm test` in the merge target, not just `npm test`.

- [ ] 📌 **ts-jest with Next.js tsconfig requires explicit moduleResolution override** → **Promote to project CLAUDE.md**
  > **Why**: Next.js sets `"moduleResolution": "bundler"` which is incompatible with ts-jest. Override must be in `jest.config.ts` tsconfig option: `{ moduleResolution: "node16", module: "CommonJS" }`.
  > **How to apply**: Any future story that adds or modifies Jest config in this repo should include this override. If ts-jest silently fails to transform `.tsx` files, check this first.
