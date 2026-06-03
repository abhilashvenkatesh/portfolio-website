```yaml
phase_metrics:
  phase: tasks
  started_at: null
  completed_at: null
  elapsed_seconds: null
  token_usage:
    source: unavailable
    input_tokens: null
    output_tokens: null
    total_tokens: null
  confidence: low
  notes: null

apply_metrics:
  phase: apply
  started_at: null
  completed_at: null
  elapsed_seconds: null
  token_usage:
    source: unavailable
    input_tokens: null
    output_tokens: null
    total_tokens: null
  confidence: low
  notes: null
```

## 1. <!-- Task Group Name -->

- [ ] 1.1 <!-- Task description -->
- [ ] 1.2 <!-- Task description -->

## 2. <!-- Task Group Name -->

- [ ] 2.1 <!-- Task description -->
- [ ] 2.2 <!-- Task description -->

## 3. Tests

- [ ] 3.1 Add or update unit tests for the changed behaviour
- [ ] 3.2 For React/UI changes, add DOM/render assertions for required user-visible content or state
- [ ] 3.3 Run `npm test` and confirm all tests pass

## 4. DOM / Visual Verification

- [ ] 4.1 For UI changes, run DOM/visual verification across relevant viewport states and capture evidence
- [ ] 4.2 Confirm no text overlap, clipping, layout shift, or missing visible state in the changed UI

## 5. Quality Gates

- [ ] 5.1 Run `npm run typecheck` and confirm zero errors
- [ ] 5.2 Run `npm run lint` and confirm zero errors
- [ ] 5.3 Run `openspec validate <change-name> --type change --strict` and confirm the change is valid
