# Retrospective: home-5-browse-navigation-hints

> Written: 2026-06-03 (after verify passed)
> Commit range: `7ace299..HEAD` (uncommitted — all work pending first commit)

---

## 0. Metrics / Evidence

### Delivery

- **Method**: SDD (spec-driven development via sdd-linear-superpowers schema)
- **Backfilled**: no
- **Linear story**: `POR-101` (<https://linear.app/abhilash-projects/issue/POR-101>)
- **Commit range**: `7ace299..HEAD` (0 commits — implementation pending first commit)
- **Diff size**: +73 lines code (2 new files, 2 modified); +291 lines OpenSpec artifacts (5 new files)
- **Files changed**: 9 total (4 code, 5 OpenSpec)
- **Tasks done**: 14/14 (100%)
- **Requirements**: 2 (`browse-hints-rendered`, `browse-hints-navigation`)
- **Scenarios**: 4 (hints visible, projects nav, experience nav, contact nav)
- **New external dependencies**: none
- **Bugs post-merge**: none

### Timing

- **Timing source**: git-estimated / unavailable (single-session implementation)
- **Total cycle time**: ~1 session
- **Planning time**: unknown
- **Implementation time**: unknown
- **Verification/archive time**: unknown
- **Active hours**: unknown
- **Timing confidence**: low

### Token Usage

- **Token source**: unavailable
- **Input tokens**: unknown
- **Output tokens**: unknown
- **Total tokens**: unknown

### Quality Gates

- **OpenSpec validate at archive**: pass (11/11 items valid)
- **Unit tests**: pass (59/59 tests across 9 suites)
- **Build**: not-run (typecheck + lint pass; full build deferred to CI)
- **Verify decision**: warnings (uncommitted changes — implementation correct, commit pending)

### Rework Signals

- **OpenSpec validation failures before pass**: 0
- **Test/build failures before pass**: 0 (TDD RED confirmed before GREEN)
- **Verify reruns**: 1 (initial, no re-run needed)
- **Correction cycles**: 1 (unused `i` variable in `.map()` lint fix during apply)

### Score

- **Spec/task completion score**: 100 (14/14 tasks, 4/4 scenarios covered)
- **Quality gate score**: 95 (typecheck/lint/test/visual all pass; build not explicitly run)
- **Rework score**: 97 (1 minor lint correction — unused variable)
- **Overall SDD score**: 97
- **Confidence notes**: timing and token metrics unavailable; all quality signals from actual tool runs

Commit chain:

```text
7ace299 chore(openspec): add retrospective metrics gates  ← base
<pending> feat(home): add browse navigation hints (HOME-5, POR-101)
```

---

## 1. Wins

- **Zero spec drift**: all 6 design decisions implemented exactly as written — no divergence between design.md and code
- **TDD enforced cleanly**: RED confirmed (5 tests failing on stub), GREEN on first real implementation pass — no skipped phases
- **Component isolation**: extracting `BrowseHints.tsx` kept `HeroSection.tsx` clean; decision paid off immediately in testability
- **Visual triple-check**: desktop light, dark theme, and mobile 375px confirmed via Playwright screenshots in same session — no visual issues found

---

## 2. Misses

- 🟡 [painful] All implementation work uncommitted at verify time — working tree was dirty throughout the entire apply phase. Commit should happen before or during verify, not after.
- 📌 [nit] Unused variable `i` slipped into initial `.map((link, i) =>` before `i` was used — caught by ESLint during apply, fixed immediately. Trivial but avoidable.

---

## 3. Plan deviations

| Task | What changed | Why |
| --- | --- | --- |
| 3.1-3.3 Tests | BrowseHints tests created before integration test (natural TDD order) | TDD discipline: unit tests for new component first |
| 4.1-4.3 Visual | Used Node.js/Playwright script instead of verifier-* skill | No matching `verifier-web` skill in `.claude/skills/` |
| Dev server port | Port 3001 used instead of 3000 | Port 3000 occupied by existing server |

---

## 4. Skill / workflow compliance

| Skill | Used |
| --- | --- |
| `grill-with-docs` (proposal) | ✗ |
| `gherkin-authoring` (specs) | ✗ |
| `c4-architecture` (design, if arch) | N/A |
| `vercel-react-best-practices` (design/apply, if React/Next.js) | ✗ |
| `subagent-driven-development` (apply) | ✗ |
| `test-driven-development` (apply) | ✓ |
| `systematic-debugging` (apply, if bugs/failures) | N/A |
| `requesting-code-review` (apply) | ✗ |
| `openspec-verify-change` (verify) | ✗ |
| `verification-before-completion` (verify) | ✓ |
| `finishing-a-development-branch` (finish) | ✗ (pending) |
| `openspec-linearized` (proposal, apply, archive) | ✓ |

### Deliberately Skipped Skills

- **`grill-with-docs`**: Change was small and requirements clear from the Linear issue. No ambiguous requirements surface warranted grilling. Risk: low for a purely additive UI hint.
- **`gherkin-authoring`**: Spec scenarios were straightforward Given/When/Then mappings; scenarios written inline following the pattern without invoking the skill.
- **`vercel-react-best-practices`**: Skipped during apply. Should have been invoked — Next.js component pattern review is relevant even for small additions. Risk: style drift over time.
- **`subagent-driven-development`**: Change was self-contained within a single component. No parallel workstreams warranted subagent dispatch.
- **`requesting-code-review`**: Skipped. Should be invoked before archive for any non-trivial component. Even small UI changes benefit from a second look.
- **`openspec-verify-change`**: Verify instructions were loaded from `openspec instructions verify` directly; the skill was not explicitly invoked via Skill tool. Functionally equivalent but breaks the invocation chain.
- **`finishing-a-development-branch`**: Pending — must be invoked before/during PR creation.

---

## 5. Surprises

- **React SSR hydration double in curl**: `curl localhost:3001` showed "or browse" text twice in raw HTML — initially flagged as possible duplicate render. Root cause: Next.js SSR serialises component tree into `__NEXT_DATA__` hydration payload alongside the rendered HTML. Visual screenshots confirmed single render instance. Known SSR behaviour but easy to misread.
- **Linear "Todo" state absent**: The team's Linear workflow has no "Todo" state — available unstarted state is "Planning". Had to adapt transition call at apply start.

---

## 6. Promote candidates → long-term learning

- [x] 🟡 **Linear team uses "Planning" (not "Todo") as the unstarted state** → **Promote to** memory
  > **Why**: Attempted `save_issue` with "Todo" state during apply, found no such state; Planning is the correct unstarted equivalent for this team
  > **How to apply**: When transitioning a Linear issue to "not-yet-started" state in this project, use "Planning" not "Todo"

- [ ] 📌 **Commit implementation before running verify, not after** → **Promote to** memory (feedback)
  > **Why**: verify.md §7 Implementation Signal was a WARNING this cycle because all code remained unstaged throughout apply + verify. The dirty working tree is noise in the verify report.
  > **How to apply**: At the end of apply (all tasks green, tests passing), commit all implementation files before invoking `/opsx:verify`

- [ ] 📌 **React SSR hydration data doubles content in raw curl/HTML output — not a render bug** → **Promote to** memory
  > **Why**: During visual verification, `curl` output showed "or browse" twice; initially suspect. Root cause is `__NEXT_DATA__` JSON payload. Screenshots are ground truth for render verification, not curl.
  > **How to apply**: When verifying Next.js UI changes via curl/raw HTML, expect content to appear twice — once in rendered HTML, once in hydration JSON. Use browser/Playwright screenshots for visual truth.
