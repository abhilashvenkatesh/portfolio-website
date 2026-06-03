# intent-driven Schema

Intent-driven OpenSpec schema for product/platform changes with meaningful behaviour and long-lived design decisions.

## Workflow

```
proposal → specs → design → tasks
```

Each stage gates the next:

| Stage | Captures | Output |
|-------|----------|--------|
| **proposal** | WHY — problem, capabilities, impact | `proposal.md` |
| **specs** | WHAT — observable behaviour in Gherkin | `specs/<capability>/spec.md` |
| **design** | HOW — architecture, decisions, trade-offs | `design.md` |
| **tasks** | WORK — checkbox-trackable implementation steps | `tasks.md` |

## When to Use

Appropriate for:
- Product or platform changes with meaningful behaviour and long-lived design decisions
- Cross-module work
- Architecture choices future changes should honor

**Not** appropriate for:
- Small tactical fixes
- Docs-only changes
- Dependency bumps
- Behaviour-only work where a simpler schema suffices

## Activation

Set in `openspec/config.yaml`:

```yaml
schema: intent-driven
```

## Specs Format

Specs use OpenSpec Markdown delta headers for archive merging:

```markdown
## ADDED Requirements

### Requirement: <name>

GIVEN ...
WHEN ...
THEN ...
```

Requirements use `### Requirement:`, scenarios use `#### Scenario:` — both required for OpenSpec validation.

## Validation

```bash
openspec schema validate intent-driven
```
