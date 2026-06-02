# Verification Report

**Change**: `<change-name>`
**Verified at**: `YYYY-MM-DD HH:mm`
**Verifier**: `<who / which agent>`

---

## 0. Schema Contract Compliance

- [ ] Evidence table below maps every completed task to commit/files/tests
- [ ] `plan.md` avoids large proposal/spec/design restatement
- [ ] Every micro-step-expanded task states a risk reason
- [ ] Batched reviews explain why batching was allowed, or N/A
- [ ] Any `[~]` deferred tasks have reason and non-blocking/blocking impact
- [ ] Design mitigations and task outcomes are reconciled

**Evidence map**:

| Task | Requirement / Scenario | Commit | Files | Tests | Review mode |
|------|------------------------|--------|-------|-------|-------------|
| —    | —                      | —      | —     | —     | per-task / batch / N/A |

**Contract warnings or failures**: <!-- none, or list -->

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

- [ ] No pending `- [ ]` tasks remain
- [ ] All `[~]` deferred tasks are listed below

**Deferred or incomplete tasks** (if any):

| Task | State | Reason | Blocks archive? |
|------|-------|--------|-----------------|
| —    | —     | —      | —               |

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

- [ ] No unstaged files in current checkout
- [ ] All relevant commits pushed

**Commit range** (if known): `<from-sha>..<to-sha>`

---

## 6. Deferred Checks vs Automated-Test Equivalence

For any `[~]` deferred tasks in tasks.md or plan.md, identify equivalent automated test
coverage. No equivalent = real gap; record in retrospective Misses.

| Deferred task (plan §) | Equivalent automated test | Coverage assessment | Real gap? |
|------------------------|---------------------------|---------------------|-----------|
| —                      | —                         | —                   | —         |

> Leave section empty if plan.md has no `[~]` rows — empty = PASS.
> If `[~]` rows exist and this section is empty, Overall Decision = FAIL.

---

## Overall Decision

- [ ] ✅ PASS — proceed to retrospective, then archive
- [ ] ⚠️ PASS WITH WARNINGS — proceed but note: `<description>`
- [ ] ❌ FAIL — return to failed artifact, fix, re-run verify

**Next step**: <!-- describe next action -->
