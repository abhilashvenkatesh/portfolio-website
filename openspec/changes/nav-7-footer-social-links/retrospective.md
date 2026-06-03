# Retrospective: nav-7-footer-social-links

> Written: 2026-06-03 (after verify passed)
> Commit range: `7b3cfa7..db84541`

---

## 0. Evidence

- **Commit range**: `7b3cfa7..db84541` (2 commits for this change)
- **Diff size**: +187 / -20 lines across 11 files
- **Tasks done**: 16/16
- **Active hours**: ~0.5
- **New external dependencies**: `lucide-react` (1 package)
- **Bugs post-merge**: none
- **OpenSpec validate at archive**: pass

Commit chain:

```
7b3cfa7 chore(openspec): add proposal for nav-7-footer-social-links (POR-96)
db84541 feat(nav): add footer with social links (POR-96)
```

---

## 1. Wins

- Clean SSG server component — no client state required; builds at compile time
- Content-driven: `getContact()` already existed; zero new loader code needed
- `openspec validate --all` passed on first run after spec text fix (SHALL/MUST requirement)
- Footer confirmed rendering on all 4 page routes via dev server curl checks
- Tailwind v4 canonical class warnings caught and fixed before commit (IDE diagnostics)

---

## 2. Misses

- 🟡 [painful] `design.md` incorrectly stated `lucide-react` exports `Github` and `Linkedin` icons — these brand icons don't exist in lucide-react. Required switching to inline SVGs mid-implementation, adding unexpected complexity.
- 🟡 [painful] Spec requirements were missing SHALL/MUST — `openspec validate` failed on first run. Required editing all three requirement descriptions post-implementation.
- 📌 [nit] `lucide-react` was not in `package.json` at all (design.md said "already a dependency") — required install.

---

## 3. Plan deviations

| Task | What changed | Why |
|---|---|---|
| 2.4 lucide-react icons (`Github`, `Linkedin`) | Replaced with inline SVGs | `lucide-react` does not export brand icons |
| 2.1 Create Footer.tsx | Extra iteration | Inline SVG approach required rewrite after first typecheck failure |
| 4.3 openspec validate | Spec text fixes needed | Requirements lacked SHALL/MUST keyword — caught by validator |

---

## 4. Skill / workflow compliance

| Skill | Used |
|---|---|
| `grill-with-docs` (proposal) | ✗ |
| `gherkin-authoring` (specs) | ✗ |
| `c4-diagrams` (design, if arch) | N/A |
| `superpowers:subagent-driven-development` (apply) | ✗ |
| `superpowers:test-driven-development` (apply) | ✗ |
| `superpowers:requesting-code-review` (apply) | ✗ |
| `openspec-verify-change` (verify) | ✓ |
| `openspec-linearized` (proposal, apply, archive) | ✓ |

### Deliberately Skipped Skills

**`grill-with-docs`** — Proposal was derived directly from a Linear issue via `/opsx:propose`. No doc-grilling phase was run. Prevention: invoke `grill-with-docs` after fetching Linear issue, before writing proposal.md.

**`gherkin-authoring`** — Scenarios were written inline during `/opsx:propose`. Prevention: invoke skill explicitly when writing `#### Scenario:` blocks.

**`superpowers:subagent-driven-development`** — Tasks were sequential and fast; no parallelism needed. Footer implementation is inherently serial (content → types → component → layout). Acceptable skip for single-component changes.

**`superpowers:test-driven-development`** — No tests written. The component is a pure server component with no conditional logic beyond data reads. No unit test surface; visual verification via dev server was the practical alternative. Prevention: still invoke skill to confirm no-test decision is explicit rather than accidental.

**`superpowers:requesting-code-review`** — Skipped. For a simple additive server component this is low risk, but the skill should still be invoked per schema. Prevention: add to post-implementation checklist.

---

## 5. Surprises

- `lucide-react` brand icons (`Github`, `Linkedin`) do not exist — the library focuses on generic icons, not brand logos. Design docs must not assume icon availability without checking the library.
- Tailwind v4 `var(--token)` syntax differs from v3 — `text-[var(--color-muted)]` should be `text-(--color-muted)` / `hover:text-tertiary`. IDE caught these; existing components in the repo use v4 syntax consistently.
- `openspec validate` requires SHALL/MUST in requirement body text — easy to miss when writing natural-language descriptions.

---

## 6. Promote candidates → long-term learning

- [x] 🔴 **lucide-react has no brand icons — verify icon availability before including in design.md** → **Promote to** memory
  > **Why**: design.md for this change stated `Github`, `Linkedin` from lucide-react as "already a dependency." Both assumptions were wrong — caused a mid-implementation rewrite.
  > **How to apply**: Before writing icon choices into design.md or tasks, run `node -e "require('lucide-react')" && grep <IconName>` or check lucide.dev to confirm the icon exists in the installed version.

- [x] 🟡 **OpenSpec specs require SHALL or MUST in requirement body text** → **Promote to** memory
  > **Why**: `openspec validate --strict` rejected all three requirements until SHALL/MUST was added. This is a validator rule, not optional style.
  > **How to apply**: Every `### Requirement:` description paragraph must contain SHALL or MUST. Add this as a writing check when authoring specs.
