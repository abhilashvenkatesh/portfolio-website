<!--
Delta spec template for a change.

Use the sections you need (ADDED / MODIFIED / REMOVED / RENAMED).
File location: openspec/changes/<change-name>/specs/<capability>/spec.md
(`<capability>` matches openspec/specs/<capability>/ directory name)

Format rules (OpenSpec validates these):
- Requirement text MUST contain `SHALL` or `MUST`
- Every Requirement MUST have at least one `#### Scenario:`
- Scenarios MUST use level-4 (`####`) — level-3 or bullets fail silently
-->

## ADDED Requirements

<!-- New behavior. List requirements this change adds to the capability. -->

### Requirement: <!-- requirement name -->
<!-- requirement text — must contain SHALL or MUST -->

#### Scenario: <!-- scenario name -->
- **WHEN** <!-- condition -->
- **THEN** <!-- expected outcome -->

---

## MODIFIED Requirements

<!--
Modifying an existing Requirement. MUST use the exact header from
openspec/specs/<capability>/spec.md (trim, case-sensitive match),
otherwise archive delta-apply will fail to locate the target.

MUST paste the FULL updated content (not a diff) — OpenSpec archive
applies MODIFIED via full-text replacement.
-->

### Requirement: <!-- exact header from existing spec -->
<!-- Full updated requirement text — must contain SHALL or MUST -->

#### Scenario: <!-- scenario name (may add or modify) -->
- **WHEN** <!-- condition -->
- **THEN** <!-- expected outcome -->

---

## REMOVED Requirements

<!--
Deleting an existing Requirement. MUST include Reason and Migration
so reviewers understand why it was removed and how dependents should adapt.
-->

### Requirement: <!-- exact header to delete, matching existing spec -->

**Reason**: <!-- why this is being removed -->

**Migration**: <!-- how existing callers/dependents should adapt -->

---

## RENAMED Requirements

<!--
Renaming a Requirement header only. Use FROM/TO format.
If name AND content change: list the rename here AND add a MODIFIED
entry using the NEW header with the full updated content.

Archive apply order: RENAMED → REMOVED → MODIFIED → ADDED
-->

- FROM: `### Requirement: <Old Name>`
- TO: `### Requirement: <New Name>`
