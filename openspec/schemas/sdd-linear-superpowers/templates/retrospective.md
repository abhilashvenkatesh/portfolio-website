# Retrospective: <change-name>

> Written: <YYYY-MM-DD> (after verify passed)
> Commit range: `<base-sha>..<head-sha>`
> Worktree: <path or "merged to main">

<!--
For clean small changes, use this one-line form and delete the sections below:

Skipped: clean small change, no workflow learnings. Evidence in verify.md.

Use the full retrospective only when verify warnings/fixes, deferred tasks,
skipped skills, plan deviations, surprises, new dependencies, migrations,
security/performance/data concerns, or user request trigger it.
-->

---

## 0. Evidence

> Quantitative front-matter — downstream bullets reference this section
> instead of inlining `[evidence: ...]` per line.

- **Commit range**: `<base-sha>..<head-sha>` (<n> commits)
- **Diff size**: <+X / -Y lines across N files>
- **Tasks done**: <x>/<y>
- **Active hours**: <estimate>
- **Subagent dispatches**: <count or "n/a">
- **New external dependencies**: <list with license + version, or "none">
- **Bugs encountered post-merge**: <count, one-line each, or "none">
- **OpenSpec validate state at archive**: <pass / fail / not-run>
- **Test coverage signal**: <e.g. vitest count, or "n/a">

Commit chain:

```
<base-sha> <one-line summary>
...
<head-sha> <archive commit one-line>
```

---

## 1. Wins

- [evidence: <commit/file/test>] <description>

## 2. Misses

- 🔴 [blocking | evidence: ...] <description>
- 🟡 [painful  | evidence: ...] <description>
- 📌 [nit      | evidence: ...] <description>

## 3. Plan deviations

| Plan task | What changed | Why |
|-----------|--------------|-----|
| 1.2       | ...          | ... |

## 4. Skill / workflow compliance

| Skill                                            | Used |
|--------------------------------------------------|------|
| superpowers:writing-plans                        |      |
| superpowers:subagent-driven-development          |      |
| (transitive) superpowers:test-driven-development |      |
| (transitive) superpowers:requesting-code-review  |      |
| superpowers:finishing-a-development-branch       |      |

> Default expectation: all ✓. Each skill is in the flow for a reason;
> skipping is an exception. Any ✗ must have a `### Deliberately Skipped Skills`
> entry answering: what was skipped, why this cycle (cite concrete trigger),
> and how to prevent recurrence.

### Deliberately Skipped Skills

> Leave empty if all rows above are ✓.

- **`<skill name>`**
  - **What was skipped**: <specific skill or sub-step>
  - **Why this cycle**: <concrete trigger — commit hash / log line / observed behavior; not "not needed" or "too small">
  - **How to prevent recurrence**: <schema graph fix / skill description tightening / CLAUDE.md trigger / scope-judgment rule / one-off (state boundary reason)>

## 5. Surprises

- <assumption that turned out wrong>

## 6. Promote candidates → long-term learning

Each candidate uses `- [ ]` checklist. Unchecked items carry into next cycle's retro.

- [ ] 🔴 **<short rule>** → **Promote to memory** (type: feedback)
  > **Why**: <past incident or strong preference that motivated this rule>
  > **How to apply**: <which file / cycle phase / decision moment this kicks in>

- [ ] 🟡 **<another candidate>** → **Promote to project CLAUDE.md**
  > **Why**: ...
  > **How to apply**: ...

- [ ] 📌 **<third candidate>** → **One-off** (record only, do not promote)
  > **Why**: <why it doesn't generalize>
