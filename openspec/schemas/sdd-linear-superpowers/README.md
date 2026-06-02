# sdd-linear-superpowers

**Version 3** — Spec-driven development schema for Claude Code with Superpowers skills and Linear project management integration.

---

## What this schema does

Runs a structured feature-development lifecycle where:

- **Linear** owns the business "what" — goal, use cases, acceptance criteria, stakeholder status
- **The repo** owns the technical "how" — design decisions, tasks, implementation, canonical specs
- **Superpowers skills** enforce rigorous execution — TDD, code review, git worktrees, planning

Every change flows through eight artifacts in order, each gating the next. The apply phase uses subagent-driven development so TDD and code review activate transitively on every task.

---

## Requirements

| Requirement | Notes |
|-------------|-------|
| Claude Code | Subagent support required — `executing-plans` fallback not supported (loses TDD + code review) |
| Superpowers plugin | Must provide: `writing-plans`, `using-git-worktrees`, `subagent-driven-development`, `finishing-a-development-branch` |
| Linear MCP | Optional but recommended — all Linear hooks are best-effort; unavailability is non-blocking |

---

## Artifact pipeline

```
proposal → specs → design → tasks → plan → [apply] → verify → retrospective
```

Each artifact has a `requires:` list — OpenSpec enforces the order and will not generate an artifact until its dependencies exist.

### proposal

**Answers: Why?**

Before writing anything, runs Linear setup then a mandatory grill session:
1. Loads `openspec/linear.yaml` (or creates it by asking team → project → label filter, one question at a time — never auto-selects)
2. Lists Backlog issues from the configured project; user selects which issue this change addresses
3. Reads the issue for business context — no goals are invented beyond what the issue states
4. Reads `documentation/REQUIREMENTS.md` — verifies the change aligns with existing requirements, references story IDs (e.g. NAV-1, CHAT-3) in What Changes and Impact, and identifies which acceptance criteria the change satisfies
5. **Grill session** (via `grill-with-docs`) — challenges intent against the domain model, sharpens terminology, surfaces contradictions before any artifact is written. Proposal.md is not started until grill reaches shared understanding

Writes `proposal.md` with:
- Linear frontmatter (`linear_story_id`, `linear_story_url`)
- **Why** — drawn from the Linear issue
- **What Changes** — specific additions/modifications/removals
- **Capabilities** — the critical contract: lists which `specs/<name>/spec.md` files will be created or modified
- **Impact** — affected code, APIs, dependencies

After writing, syncs business-facing sections back to the Linear issue description, then transitions the issue to **Todo**.

### specs

**Answers: What must the system do?**

One spec file per capability listed in the proposal. Uses delta operations:

| Section | Purpose |
|---------|---------|
| `## ADDED Requirements` | New behavior |
| `## MODIFIED Requirements` | Changed behavior — must include full updated content |
| `## REMOVED Requirements` | Deprecated behavior — must include Reason + Migration |
| `## RENAMED Requirements` | Header rename only — use FROM:/TO: format |

Hard rules enforced by OpenSpec:
- Requirement text must contain `SHALL` or `MUST`
- Every requirement needs at least one `#### Scenario:` (exactly 4 hashtags — 3 fails silently)
- Each scenario uses WHEN/THEN format

### design

**Answers: How will it be implemented?**

Before writing, reads two project documents:

- `documentation/DESIGN.md` — design tokens, color palette, typography scale, component specs, border radius scale, do/don't rules. All decisions must conform.
- `documentation/ARCHITECTURE.md` — file/folder structure, data layer, theme system, routing strategy, chat architecture, CI pipeline, key dependencies. Decisions must align or explicitly supersede with rationale.

Written fresh from `proposal.md` — not generated from another artifact. Sections:

- **Context** — background, constraints, stakeholders
- **Goals / Non-Goals** — scope boundaries
- **Decisions** — key technical choices with rationale and rejected alternatives (D1, D2, …)
- **Risks / Trade-offs** — `[Risk] description → Mitigation`
- **Migration Plan** — deployment order, rollback strategy
- **Open Questions** — unresolved decisions

Only create if the change is cross-cutting, introduces new external dependencies, has security/performance complexity, or has architectural ambiguity that benefits from decisions before coding.

### tasks

**Answers: What work needs to happen, in what order?**

Grouped checkbox list (`- [ ] X.Y description`). The apply phase tracks progress by parsing this format — tasks not using `- [ ]` won't be tracked. Ordered by dependency.

### plan

**Answers: Exactly how does each task get executed?**

Invokes `superpowers:writing-plans`. Breaks each task from `tasks.md` into 2–5 minute micro-steps with exact file paths, code snippets, test commands, and commit points. Output goes to this change's `plan.md` — not to `docs/superpowers/plans/`.

---

## Apply phase

The apply phase executes the plan using isolated worktrees and subagents.

### Step 0 — Pre-flight

Confirms all required Superpowers skills are available. Surfaces missing CLI tools as warnings. Stops hard if skills are missing.

### Step 0b — Linear: transition to In Progress

Reads `linear_story_id` from `proposal.md` frontmatter. Transitions the bound issue to **In Progress**. Adds short comment. Best effort — skips silently if Linear MCP unavailable.

### Step 1 — Workspace

Invokes `superpowers:using-git-worktrees` to create an isolated git worktree for this change.

### Step 2 — Execute

Invokes `superpowers:subagent-driven-development`, which transitively enforces:
- `superpowers:test-driven-development` — RED-GREEN-REFACTOR on every task; implementation code written before a failing test is deleted
- `superpowers:requesting-code-review` — code-reviewer subagent after each task; final review before apply concludes

### Step 3 — Verify

Invokes `openspec-verify-change` (`/opsx:verify`) to produce `verify.md`. Six checks:

1. `openspec validate --all --json` — structural validity of all artifacts
2. Task completion — every `- [ ]` must be `- [x]`
3. Delta spec sync state — each capability delta compared against canonical spec
4. Design/specs coherence — spot-check that design decisions appear in requirements
5. Implementation signal — no unstaged files, commit range cited
6. Deferred dogfood equivalence — any `[~]` tasks in plan.md must map to automated test coverage; gaps recorded, not silently deferred

Re-run until Overall Decision is PASS or PASS WITH WARNINGS.

### Step 4 — Retrospective

Produces `retrospective.md` while context is hot — before the PR, not after. The retrospective lands in the same PR diff as the implementation.

Seven sections:
- **§0 Evidence** — quantitative front-matter (commit count, diff size, tasks ratio, subagent dispatches, new dependencies, test coverage signal)
- **§1 Wins** — what worked, with evidence citations to §0
- **§2 Misses** — 🔴 blocking / 🟡 painful / 📌 nit
- **§3 Plan deviations** — tasks whose scope changed mid-cycle
- **§4 Skill compliance** — every apply-phase skill marked ✓/✗; any ✗ requires `### Deliberately Skipped Skills` with what/why/how-to-prevent
- **§5 Surprises** — assumptions that turned out wrong
- **§6 Promote candidates** — `- [ ]` checklist of learnings to promote to memory / CLAUDE.md / schema / skill

Unchecked `- [ ]` items carry forward to the next cycle's retrospective for re-evaluation.

### Step 5 — Archive

Runs `openspec archive -y` (`/opsx:archive`):
- Syncs delta specs from `openspec/changes/<name>/specs/` into canonical `openspec/specs/<capability>/spec.md`
- Moves the change folder to `openspec/changes/archive/YYYY-MM-DD-<name>/`

### Step 5b — Linear: close story + mirror specs

Runs only after archive succeeds. Best effort.

1. Calls `list_documents` then `save_document` for each archived capability, creating or updating Linear Project Documents with title `OpenSpec: <capability-name>` and the full canonical spec content
2. Persists document IDs to `openspec/linear.yaml` under `spec_documents`
3. Transitions the bound Linear issue to **Done**
4. Adds short archive-complete comment

### Step 6 — PR

Invokes `superpowers:finishing-a-development-branch`. The branch diff must contain the complete archived cycle before the PR opens.

---

## Linear ownership boundary

| Lives in Linear | Lives in the repo |
|-----------------|-------------------|
| Business goal, use cases, personas | Technical design decisions |
| Acceptance criteria (stakeholder-facing) | specs/, design.md |
| Stakeholder status (Backlog → Todo → In Progress → Done) | tasks.md, plan.md |
| Short progress comments (≤2 sentences) | Implementation details |
| Archive-time spec mirrors (Project Documents) | Canonical specs under openspec/specs/ |

Rules:
- Keep technical design out of Linear issue descriptions and comments
- Keep business context out of design.md/tasks.md except where needed to make decisions traceable
- Do not transition to Done before archive succeeds
- Linear Project Documents are read-only mirrors of finalized specs — not a place for draft notes

---

## File layout

```
openspec/
  linear.yaml                          # Linear config (team, project, label, doc IDs)
  changes/
    <change-name>/
      proposal.md                      # Why + capabilities + Linear frontmatter
      specs/<capability>/spec.md       # Delta requirements
      design.md                        # Technical decisions
      tasks.md                         # Tracked checkbox list
      plan.md                          # Micro-step execution plan
      verify.md                        # Post-implementation verification report
      retrospective.md                 # Evidence-first cycle retrospective
    archive/
      YYYY-MM-DD-<change-name>/        # Completed changes
  specs/
    <capability>/
      spec.md                          # Canonical spec (updated at archive)
```

---

## openspec/linear.yaml structure

```yaml
team_id: <Linear team ID>
team_name: <Linear team name>
project_id: <Linear project ID>
project_name: <Linear project name>
label_filter: <label name or null>

spec_documents:          # populated at archive time
  capability-name: <Linear document ID>
```

Created automatically during first proposal if missing. Never inferred — team, project, and label are always explicitly chosen by the user.

---

## Guardrails

- **Linear unavailability is non-blocking** — all Linear hooks skip silently; local OpenSpec work continues
- **Linear is not the spec source of truth** — canonical specs live under `openspec/specs/`; Linear Project Documents are archive-time mirrors only
- **No Done before archive** — the bound story stays In Progress until `openspec archive` completes
- **No brainstorm artifact** — this schema goes directly to proposal; use a separate brainstorming session if needed before starting the change
- **No executing-plans fallback** — `superpowers:subagent-driven-development` is required; if unavailable, use the `spec-driven` built-in schema instead
