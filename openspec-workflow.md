# OpenSpec Workflow: Custom Schema

This project uses a custom OpenSpec schema named `sdd-linear-superpowers`.

The schema is configured in `openspec/config.yaml` and defined at:

```text
openspec/schemas/sdd-linear-superpowers/schema.yaml
```

Its lifecycle is:

```text
proposal -> specs -> design -> tasks -> apply -> verify -> retrospective -> archive
```

The workflow is designed for product or platform changes with meaningful behavior, durable design decisions, Linear tracking, test-driven implementation, verification evidence, and archive-time promotion into canonical OpenSpec specs.

## 1. Source of Truth

OpenSpec canonical specs are the source of truth for behavior.

```text
openspec/specs/<capability>/spec.md
```

Linear is used for business workflow tracking and external project visibility, but Linear Project Documents are mirrors only. Archive-time sync can replace Linear document content with canonical OpenSpec spec content.

Ownership split:

- Linear issue/card: business goal, use cases, personas, scope, acceptance criteria.
- Repo OpenSpec artifacts: technical design, delta specs, tasks, implementation details, tests, verification, retrospective.
- Canonical OpenSpec specs: final long-lived behavioral contract.

Do not transition a bound Linear story to Done before OpenSpec archive succeeds.

## 2. Change Folder Layout

Active changes live under:

```text
openspec/changes/<change-name>/
```

Expected files:

```text
openspec/changes/<change-name>/
  proposal.md
  design.md
  tasks.md
  verify.md
  retrospective.md
  specs/
    <capability>/
      spec.md
```

Archived changes move to:

```text
openspec/changes/archive/YYYY-MM-DD-<change-name>/
```

Use kebab-case for change names and capability names, for example:

```text
nav-mobile-navigation
footer-social-links
persistent-nav
```

## 3. Phase 1: Proposal

Purpose: explain why the change is needed and define the capability contract.

Output:

```text
proposal.md
```

Required sections:

```markdown
## Why
## What Changes
## Capabilities
### New Capabilities
### Modified Capabilities
## Impact
```

Rules:

- Keep the proposal concise, usually 1-2 pages.
- Focus on why and what, not implementation details.
- List every new capability under `New Capabilities`.
- List modified capabilities only when existing spec-level behavior changes.
- Capability names must be kebab-case.
- Each listed capability needs a matching delta spec under `specs/<capability>/spec.md`.
- Mark breaking changes with `**BREAKING**`.

Schema prechecks:

- Confirm work starts from `main` using `openspec-git-discipline`.
- Stress-test the plan with `grill-with-docs`.
- Bind or sync the Linear story with `openspec-linearized` and move it to Todo.

Proposal frontmatter may include Linear binding:

```yaml
---
linear_story_id: "POR-96"
linear_story_url: "https://linear.app/..."
---
```

## 4. Phase 2: Specs

Purpose: define observable behavior, not implementation.

Output:

```text
specs/<capability>/spec.md
```

Delta spec headers must be exact:

```markdown
## ADDED Requirements
## MODIFIED Requirements
## REMOVED Requirements
## RENAMED Requirements
```

Requirement format:

```markdown
## ADDED Requirements

### Requirement: <name>

Feature: <short feature or rule description>

#### Scenario: <name>

GIVEN <precondition>
WHEN <action>
THEN <observable outcome>
```

Rules:

- Use one spec file per capability from the proposal.
- New capability path: `specs/<new-capability>/spec.md`.
- Modified capability path: `specs/<existing-capability>/spec.md`.
- Requirements must use `### Requirement: <name>`.
- Scenarios must use `#### Scenario: <name>`.
- Every requirement must have at least one scenario.
- Scenario steps should use `GIVEN`, `WHEN`, `THEN`, with `AND` or `BUT` as needed.
- `THEN` steps must describe observable outcomes.
- Avoid private implementation details unless they are part of the domain contract.
- Do not create `.feature` files; this schema uses Markdown OpenSpec specs.

For modified requirements:

1. Find the existing requirement in `openspec/specs/<capability>/spec.md`.
2. Copy the entire requirement block.
3. Paste it under `## MODIFIED Requirements`.
4. Edit it so it represents the complete desired behavior after the change.

Do not use partial modified requirements. Partial content can lose details during archive merging.

For removed requirements:

```markdown
## REMOVED Requirements

### <name>

**Reason**: <why this is being removed>

**Migration**: <how users/systems depending on it should adapt>
```

For renamed requirements:

```markdown
## RENAMED Requirements

- FROM: `old-requirement-name` TO: `new-requirement-name`
```

Schema prechecks:

- Confirm proposal artifacts are committed before continuing.
- Use `gherkin-authoring` before writing spec files.

## 5. Phase 3: Design

Purpose: explain how the change will be implemented and why the chosen approach is appropriate.

Output:

```text
design.md
```

Required sections:

```markdown
## Context
## Goals / Non-Goals
## Decisions
## Risks / Trade-offs
## Close Triggers
## Migration Plan
## Open Questions
```

Rules:

- Focus on architecture and approach, not line-by-line implementation.
- Reference `documentation/DESIGN.md` for design tokens and component rules.
- Reference `documentation/ARCHITECTURE.md` for structure, data schemas, and rendering strategy.
- Include alternatives considered in the decisions section.
- Format risks as `[Risk] -> Mitigation`.
- Include `Close Triggers` only for interactive UI such as menus, drawers, and dialogs.

For interactive UI, close triggers should explicitly cover:

- Link click.
- Outside click or backdrop tap.
- Escape key.
- Route change, when applicable.

Schema prechecks:

- Use `c4-architecture` if system boundaries or architectural components are involved.
- Use `vercel-react-best-practices` for React, Next.js routing, rendering, hydration, data loading, or performance-sensitive work.

## 6. Phase 4: Tasks

Purpose: create a dependency-ordered implementation checklist.

Output:

```text
tasks.md
```

Required format:

```markdown
## 1. <Task Group Name>

- [ ] 1.1 <Task description>
- [ ] 1.2 <Task description>

## 2. <Task Group Name>

- [ ] 2.1 <Task description>
```

Rules:

- Group related tasks under numbered headings.
- Every task must use checkbox syntax: `- [ ]`.
- The apply phase tracks progress by parsing checkbox format.
- Tasks should be small enough to complete in one session.
- Order tasks by dependency.
- Each task should be objectively verifiable.
- Include a validation task when behavior specs change:

```text
openspec validate <change-name> --type change --strict
```

## 7. Phase 5: Apply

Purpose: implement the change, keep tasks updated, and produce reviewable code.

Inputs:

```text
proposal.md
specs/**/spec.md
design.md
tasks.md
```

Rules:

- Start only after proposal/specs/design/tasks are complete.
- Confirm the proposal change is committed to `main` before implementation starts.
- Read context files before editing.
- Work through `tasks.md` in order.
- Mark tasks complete as work lands:

```markdown
- [x] 1.1 Completed task
```

- Pause for real blockers or unclear product decisions.
- Use TDD before implementation code.
- Use systematic debugging for failing tests, bugs, or unexpected behavior.
- Request code review when implementation is complete.
- Move the bound Linear story to In Progress.

Recommended local verification for this repo:

```bash
npm run typecheck
npm run lint
npm test
openspec validate <change-name> --type change --strict
```

When apply completes, the schema requires:

1. Produce `verify.md`.
2. Re-run verification until there are no blocking issues.
3. Produce `retrospective.md` while context is still fresh.
4. Act on retrospective promote candidates before archive.
5. Decide merge, archive, PR, and cleanup path.
6. Confirm implementation is merged to `main` before archiving.

## 8. Phase 6: Verify

Purpose: produce a post-implementation verification report.

Output:

```text
verify.md
```

Verify is written after apply completes, not during planning.

Before writing `verify.md`, the schema expects implementation evidence:

```bash
git log --oneline $(git merge-base HEAD origin/main 2>/dev/null || git merge-base HEAD main 2>/dev/null)..HEAD | wc -l
grep -c '^\- \[x\]' openspec/changes/<change-name>/tasks.md
```

If either command returns `0`, apply has not produced reviewable changes yet.

Required verification checks:

1. Structural validation:

```bash
openspec validate --all --json
```

Confirm every item returns `"valid": true`.

2. Task completion:

Confirm every checkbox in `tasks.md` is `- [x]`.

3. Delta spec sync state:

Compare each `openspec/changes/<change-name>/specs/<capability>/spec.md` with the canonical spec under `openspec/specs/<capability>/spec.md`.

Before archive, new capabilities may be marked N/A because the canonical spec does not exist yet.

4. Design/specs coherence:

Spot-check that `design.md` decisions align with requirements in `specs/`.

5. Implementation signal:

Confirm no unstaged files remain and all relevant implementation commits exist.

Overall decision should be one of:

```markdown
- [ ] PASS - ready for retrospective and archive
- [ ] PASS WITH WARNINGS - can proceed, note: <detail>
- [ ] FAIL - return to failing artifact, fix, re-run verify
```

Schema prechecks:

- Use `openspec-verify-change`.
- Use `verification-before-completion` before claiming implementation is complete or ready to archive.

## 9. Phase 7: Retrospective

Purpose: capture evidence-first learning before the change is archived or PR work is finalized.

Output:

```text
retrospective.md
```

Write the retrospective after verify passes and before opening the PR.

Required evidence:

- Commit range.
- Diff size.
- Tasks done.
- Active hours estimate.
- New dependencies.
- Bugs or regressions.
- OpenSpec validation result.
- Commit chain.

Required analysis sections:

```markdown
## 0. Evidence
## 1. Wins
## 2. Misses
## 3. Plan deviations
## 4. Skill / workflow compliance
## 5. Surprises
## 6. Promote candidates -> long-term learning
```

Every claim should cite a commit hash, file path, command result, or measurable fact.

Before archive, check for unacted promote candidates:

```bash
grep -c '^\- \[ \]' openspec/changes/<change-name>/retrospective.md
```

If the count is greater than `0`, act on the promote candidates before archiving. Promote candidates can be persisted to memory, `CLAUDE.md`, schema, or a skill.

Trivial single-commit fixes may skip the full retrospective, but should still leave a one-line reason in `retrospective.md`.

## 10. Phase 8: Archive

Purpose: merge delta specs into canonical specs and move the change folder into archive.

Archive should happen only after:

- Implementation is complete.
- Tasks are all checked.
- Verification passes.
- Retrospective is complete or intentionally skipped with a reason.
- Promote candidates have been handled.
- Implementation is merged to `main`.

Archive effects:

- Delta specs under `openspec/changes/<change-name>/specs/` are merged into canonical specs under `openspec/specs/`.
- The active change folder moves to:

```text
openspec/changes/archive/YYYY-MM-DD-<change-name>/
```

- Linear Project Documents are synced from canonical OpenSpec specs if archive document sync is enabled.
- The bound Linear story can move to Done only after OpenSpec archive succeeds.

Archive-time Linear mirror rules from `openspec/config.yaml`:

- Linear Project Documents are disposable mirrors.
- Document titles use `OpenSpec: <capability-name>`.
- Full document bodies may be replaced with canonical OpenSpec spec content.
- Generic non-document Linear project resources are out of scope.

## 11. Schema Artifact Dependency Graph

The custom schema defines these artifact dependencies:

```text
proposal
  -> specs
  -> tasks
  -> apply
  -> verify
  -> retrospective
  -> archive

proposal
  -> design
  -> tasks
```

Practical reading:

- `proposal.md` comes first.
- `specs/**/spec.md` and `design.md` both depend on the proposal.
- `tasks.md` depends on specs and design.
- apply depends on tasks.
- verify depends on completed apply work.
- retrospective depends on passing verification.
- archive depends on a completed, verified, learned-from change.

## 12. Common Commands

Validate one active change:

```bash
openspec validate <change-name> --type change --strict
```

Validate everything:

```bash
openspec validate --all --json
```

Check completed tasks:

```bash
grep -c '^\- \[x\]' openspec/changes/<change-name>/tasks.md
```

Check pending retrospective promote candidates:

```bash
grep -c '^\- \[ \]' openspec/changes/<change-name>/retrospective.md
```

Check implementation commits since main:

```bash
git log --oneline $(git merge-base HEAD origin/main 2>/dev/null || git merge-base HEAD main 2>/dev/null)..HEAD
```

Run project checks:

```bash
npm run typecheck
npm run lint
npm test
```

## 13. Common Pitfalls

- Listing a capability in `proposal.md` but not creating its matching `specs/<capability>/spec.md`.
- Using partial content under `## MODIFIED Requirements`.
- Forgetting that `#### Scenario:` requires four hashes.
- Writing implementation details into specs instead of observable behavior.
- Creating `.feature` files instead of OpenSpec Markdown specs.
- Using task bullets that are not checkbox lines.
- Producing `verify.md` before implementation has completed.
- Archiving before all tasks are checked.
- Moving Linear to Done before OpenSpec archive succeeds.
- Leaving retrospective promote candidates unchecked before archive.
- Treating Linear Project Documents as the source of truth instead of mirrors.

## 14. Minimal Change Checklist

Use this checklist when running the custom schema:

```markdown
- [ ] Create `openspec/changes/<change-name>/proposal.md`
- [ ] Bind/sync Linear story
- [ ] Define New/Modified Capabilities
- [ ] Create `specs/<capability>/spec.md` for each capability
- [ ] Write Gherkin-style requirements and scenarios
- [ ] Create `design.md`
- [ ] Create checkbox-based `tasks.md`
- [ ] Validate the change
- [ ] Implement with TDD
- [ ] Mark tasks complete as work lands
- [ ] Run project checks
- [ ] Run OpenSpec validation
- [ ] Produce `verify.md`
- [ ] Produce `retrospective.md`
- [ ] Act on promote candidates
- [ ] Merge implementation to `main`
- [ ] Archive the change
- [ ] Sync canonical specs to Linear Project Documents
- [ ] Move Linear story to Done
```

