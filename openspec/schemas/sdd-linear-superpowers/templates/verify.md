# Verification Report

**Change**: `<change-name>`
**Verified at**: `YYYY-MM-DD HH:mm`
**Verifier**: `<who / which agent>`

---

## 1. Structural Validation (`openspec validate --all --json`)

- [ ] All items return `"valid": true`

**Result**:

```text
<paste openspec validate --all output>
```

Failures (if any):

| Item | Type | Issues |
|---|---|---|
| — | — | — |

---

## 2. Task Completion (`tasks.md`)

- [ ] All `- [ ]` changed to `- [x]`

**Incomplete tasks** (if any):

| Task | Reason | Blocks archive? |
|---|---|---|
| — | — | — |

---

## 3. Delta Spec Sync State

For each directory under `openspec/changes/<name>/specs/`, compare against `openspec/specs/<capability>/spec.md`:

| Capability | Sync state | Notes |
|---|---|---|
| — | ✓ Synced / ✗ Needs sync / N/A | — |

---

## 4. Design / Specs Coherence

Spot-check that `design.md` decisions align with requirements in `specs/`:

| Item | design.md decision | specs requirement | Drift? |
|---|---|---|---|
| — | — | — | — |

**Drift warnings** (non-blocking): none

---

## 5. Implementation Signal

- [ ] No unstaged files (`git status --short` is clean)
- [ ] All relevant commits pushed

**Commit range**: `<from-sha>..<to-sha>`

---

## Overall Decision

- [ ] ✅ PASS — ready for retrospective and archive
- [ ] ⚠️ PASS WITH WARNINGS — can proceed, note: `<detail>`
- [ ] ❌ FAIL — return to failing artifact, fix, re-run verify

**Next step**: <describe next action>
