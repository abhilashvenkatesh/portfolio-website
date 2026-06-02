# sdd-linear-superpowers

**Version 5** — Lean-full spec-driven development with Superpowers skills and Linear integration.

## Requirements

| Requirement        | Notes                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| Claude Code        | Subagent support required — `executing-plans` fallback not supported                                      |
| Superpowers plugin | `writing-plans`, `using-git-worktrees`, `subagent-driven-development`, `finishing-a-development-branch`   |
| Linear MCP         | Optional — all hooks best-effort; unavailability is non-blocking                                          |

## Pipeline

```text
proposal → specs → design → tasks → plan → [apply] → verify → retrospective
```

## Default Cuts

The full workflow is still available, but expensive steps are conditional:

| Area | Default |
| ---- | ------- |
| Grill | Only for ambiguity, contradictions, capability boundaries, hard decisions, or user request |
| Design | `Design: N/A` for straightforward changes; full design only when risk/ambiguity warrants it |
| Plan | Task-level steps by default; micro-steps only with risk reason |
| Evidence | Embedded in `verify.md` for small changes; separate `implementation-evidence.md` for long/multi-task/subagent-heavy work |
| Review | Batched only for consecutive mechanical tasks; per-task for risky/behavioral work |
| Retrospective | One-line skip for clean small changes; full retro only when triggered |
| Linear specs | Summary comment by default; full Project Document mirror only with `sync_full_specs: true` |

Full behavior, overrides, task states, archive gates, and Linear ownership boundary: `schema.yaml`.
