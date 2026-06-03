# Retrospective: home-1-hero-headline-tagline

> Written: 2026-06-03 (after verify passed with warnings)
> Commit range: no commits — implementation in working tree (commit gate skipped by user)

---

## 0. Evidence

- **Commit range**: uncommitted (user skipped commit gate)
- **Diff size**: +36 / -9 lines across 3 modified files; 4 new files/dirs
- **Tasks done**: 15/15 (1.4 skipped — `validate-content` script absent)
- **Active hours**: ~0.5
- **New external dependencies**: none
- **Bugs post-merge**: none
- **OpenSpec validate at archive**: pass (6/6 valid)

Modified files:
```
 M app/page.tsx        (+7/-8)
 M lib/content.ts      (+9/-1)
 M lib/types.ts        (+10/0)
```

New files:
```
 + content/home.json
 + components/ui/AccentTag.tsx
 + components/home/HeroSection.tsx
 + openspec/changes/home-1-hero-headline-tagline/ (all artifacts)
```

---

## 1. Wins

- `subheading: { base, accent }` object type cleanly represented the two-tone rendering requirement without string splitting or hardcoded slices in the component
- `AccentTag.tsx` creation unblocked by the design token spec in `DESIGN.md` — tokens were precise enough to derive Tailwind classes directly
- All quality gates (typecheck, lint, openspec validate, build) passed on first run

---

## 2. Misses

- 🟡 [painful] Commit gate skipped — implementation not on any branch or committed. Increases risk of lost work and blocks archive git-discipline check.
- 📌 [nit] `validate-content` referenced in CLAUDE.md and tasks.md does not exist — task 1.4 was a no-op. Script needs to be created as part of a future story.

---

## 3. Plan deviations

| Task | What changed | Why |
|---|---|---|
| 1.1 HomeContent interface | `subheading` typed as `{ base: string; accent: string }` not `string` | Two-tone render requires two parts; single string can't represent accent split cleanly |
| 1.4 validate-content | Skipped | `npm run validate-content` script does not exist in package.json |
| 2.1 HeroSection | Also created `components/ui/AccentTag.tsx` | AccentTag not yet present; required by HeroSection |

---

## 4. Skill / workflow compliance

| Skill | Used |
|---|---|
| `grill-with-docs` (proposal) | ✗ |
| `gherkin-authoring` (specs) | ✗ |
| `c4-architecture` (design, if arch) | N/A |
| `vercel-react-best-practices` (design/apply, if React/Next.js) | ✗ |
| `subagent-driven-development` (apply) | ✗ |
| `test-driven-development` (apply) | ✗ |
| `systematic-debugging` (apply, if bugs/failures) | N/A |
| `requesting-code-review` (apply) | ✗ |
| `openspec-verify-change` (verify) | ✗ |
| `verification-before-completion` (verify) | ✗ |
| `finishing-a-development-branch` (finish) | ✗ |
| `openspec-linearized` (proposal, apply, archive) | ✓ |

### Deliberately Skipped Skills

- **`grill-with-docs`**: User-driven fast-path (/opsx:propose generated artifacts in one shot without a separate grill session). Prevent recurrence: invoke before writing proposal.md on complex stories.
- **`gherkin-authoring`**: Specs written inline using spec instruction template. Prevent recurrence: invoke before creating spec files when requirement boundaries are ambiguous.
- **`vercel-react-best-practices`**: `HeroSection.tsx` is a static Server Component with no hydration, routing, or data-fetching complexity. Low risk. Prevent recurrence: invoke when adding client components or dynamic data loading.
- **`subagent-driven-development`**, **`test-driven-development`**: No independent parallel tasks; no testable business logic in a pure static display component. Appropriate to skip here.
- **`requesting-code-review`**: User did not request review. Prevent recurrence: prompt after apply completes on non-trivial implementation.
- **`openspec-verify-change`**, **`verification-before-completion`**: Verify artifacts written manually. Prevent recurrence: invoke skills for full structured verification on stories with side effects or API changes.
- **`finishing-a-development-branch`**: Implementation uncommitted; branch not yet created. Deferred to post-archive commit/PR flow.

---

## 5. Surprises

- `components/ui/` did not exist — `AccentTag.tsx` had to be created before `HeroSection.tsx` could import it. Architecture doc listed it but it wasn't implemented yet.
- `validate-content` referenced in CLAUDE.md as "CI runs this" doesn't exist in package.json. Future HOME stories will hit this same gap.

---

## 6. Promote candidates → long-term learning

- [x] 🟡 **`validate-content` script missing — don't include in tasks until created** → **Promote to** memory
  > **Why**: Task 1.4 was a no-op; CLAUDE.md says it's a CI step but the script and package.json entry don't exist yet.
  > **How to apply**: Skip `validate-content` tasks in future HOME/* stories until the script is created. Flag when creating a story that references it.

- [ ] 📌 **`AccentTag.tsx` now exists at `components/ui/AccentTag.tsx`** → **Promote to** memory
  > **Why**: Future HOME stories and any page using badge-style accent labels can reuse it without recreating.
  > **How to apply**: Import from `@/components/ui/AccentTag` when needing accent-dim background + primary text label badge.
