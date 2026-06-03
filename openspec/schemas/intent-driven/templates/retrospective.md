# Retrospective: <change-name>

> Written: <YYYY-MM-DD> (after verify passed)
> Commit range: `<base-sha>..<head-sha>`

---

## 0. Evidence

- **Commit range**: `<base-sha>..<head-sha>` (<n> commits)
- **Diff size**: <+X / -Y lines across N files>
- **Tasks done**: <x>/<y>
- **Active hours**: <estimate>
- **New external dependencies**: <list or "none">
- **Bugs post-merge**: <count or "none">
- **OpenSpec validate at archive**: <pass / fail / not-run>

Commit chain:

```
<base-sha> <summary>
...
<head-sha> <archive commit>
```

---

## 1. Wins

- <what worked well, with evidence>

---

## 2. Misses

- 🔴 [blocking] <description>
- 🟡 [painful] <description>
- 📌 [nit] <description>

---

## 3. Plan deviations

| Task | What changed | Why |
|---|---|---|
| — | — | — |

---

## 4. Skill / workflow compliance

| Skill | Used |
|---|---|
| `grill-with-docs` (proposal) | ✓ / ✗ |
| `gherkin-authoring` (specs) | ✓ / ✗ |
| `c4-diagrams` (design, if arch) | ✓ / ✗ / N/A |
| `superpowers:subagent-driven-development` (apply) | ✓ / ✗ |
| `superpowers:test-driven-development` (apply) | ✓ / ✗ |
| `superpowers:requesting-code-review` (apply) | ✓ / ✗ |
| `openspec-verify-change` (verify) | ✓ / ✗ |

### Deliberately Skipped Skills

> For each ✗ above, answer: what was skipped, why this cycle (specific trigger), how to prevent recurrence.

---

## 5. Surprises

- <assumption that turned out wrong>

---

## 6. Promote candidates → long-term learning

- [ ] 🔴 **<short rule>** → **Promote to** memory / CLAUDE.md / schema / skill / one-off
  > **Why**: <past incident or strong preference>
  > **How to apply**: <when/where this kicks in>
