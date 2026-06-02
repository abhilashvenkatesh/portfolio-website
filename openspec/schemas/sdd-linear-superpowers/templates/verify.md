# Verification Report

**Change**: `<change-name>`
**Verified at**: `YYYY-MM-DD HH:mm`
**Verifier**: `<who / which agent>`

---

## 1. Structural Validation (`openspec validate --all --json`)

- [ ] All items `"valid": true`

**Result**:

```text
<paste openspec validate --all output summary>
```

Failed items (if any):

| Item | Type | Issues |
|------|------|--------|
| —    | —    | —      |

---

## 2. Task Completion (`tasks.md`)

- [ ] All `- [ ]` changed to `- [x]`

**Incomplete tasks** (if any):

| Task | Reason | Blocks archive? |
|------|--------|-----------------|
| —    | —      | —               |

---

## 3. Delta Spec Sync State

For each capability dir under `openspec/changes/<name>/specs/`, compare
against `openspec/specs/<capability>/spec.md`:

| Capability | Sync state                          | Notes |
|------------|-------------------------------------|-------|
| —          | ✓ Synced / ✗ Needs sync / N/A       | —     |

---

## 4. Design / Specs Coherence Spot Check

Spot-check that `design.md` decisions align with requirements in `specs/`:

| Sample | design.md description | specs/ counterpart | Gap |
|--------|-----------------------|--------------------|-----|
| —      | —                     | —                  | —   |

**Drift warnings** (non-blocking): <!-- none, or list -->

---

## 5. Implementation Signal

- [ ] No unstaged files in worktree
- [ ] All relevant commits pushed

**Commit range** (if known): `<from-sha>..<to-sha>`

---

## 6. Deferred Dogfood vs Automated Test Equivalence

For any `[~]` deferred tasks in plan.md, identify equivalent automated test
coverage. No equivalent = real gap; record in retrospective Misses.

| Deferred task (plan §) | Equivalent automated test | Coverage assessment | Real gap? |
|------------------------|---------------------------|---------------------|-----------|
| —                      | —                         | —                   | —         |

> Leave section empty if plan.md has no `[~]` rows — empty = PASS.
> If `[~]` rows exist and this section is empty, Overall Decision = FAIL.

---

## Overall Decision

- [ ] ✅ PASS — proceed to finishing-a-development-branch and archive
- [ ] ⚠️ PASS WITH WARNINGS — proceed but note: `<description>`
- [ ] ❌ FAIL — return to failed artifact, fix, re-run verify

**Next step**: <!-- describe next action -->
