# Implementation Evidence: <change-name>

> Maintained during apply. Keep entries compact and factual.
> Use this separate file for multi-task, multi-commit, subagent-heavy,
> long-running, or review-batched changes. For small changes, put this
> evidence table directly in verify.md instead.

## Baseline

- **Worktree**: `<path>`
- **Setup command**: `<command or n/a>`
- **Baseline test command**: `<command>`
- **Baseline result**: `<pass/fail + summary>`

## Evidence Map

| Task | Requirement / Scenario | Commit | Files | Tests | Review mode |
|------|------------------------|--------|-------|-------|-------------|
| `<task id>` | `<requirement/scenario>` | `<sha>` | `<paths>` | `<commands + result>` | per-task / batch |

## Review Batches

Use only for consecutive mechanical tasks touching the same requirement/file area.

| Batch | Tasks | Commit range | Why batching was allowed | Spec review | Code review |
|-------|-------|--------------|--------------------------|-------------|-------------|
| —     | —     | —            | —                        | —           | —           |

## Gaps

List anything verify must inspect manually.

- <!-- none, or specific gap -->
