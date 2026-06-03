---
linear_story_id: "POR-136"
linear_story_url: "https://linear.app/abhilash-projects/issue/POR-136/contact-1-page-header"
sdd_experiment:
  method: "sdd"
  comparator: "none"
  started_at: "2026-06-03T17:00:00Z"
  accepted_at: null
  token_usage_source: "unavailable"
---

```yaml
phase_metrics:
  phase: proposal
  started_at: "2026-06-03T17:00:00Z"
  completed_at: "2026-06-03T17:10:00Z"
  elapsed_seconds: 600
  token_usage:
    source: unavailable
    input_tokens: null
    output_tokens: null
    total_tokens: null
  confidence: high
  notes: "Token usage unavailable in VSCode extension context."
```

## Why

The Contact page has no route or header; visitors navigating to `/contact` see nothing. CONTACT-1 establishes the page's identity by rendering the "Get in touch" / "Let's work together" header so visitors immediately know where they are.

## What Changes

- New `/contact` route with a `ContactPage` server component.
- New `ContactHeader` component rendering the page title and subtitle with grid-line background texture (consistent with inner-page header pattern from HOME-7).
- No content is hardcoded — label and subtitle sourced from `content/contact.json`.

## Capabilities

### New Capabilities

- `contact-page-header`: Contact page header section with "Get in touch" label, "Let's work together" subtitle, and the shared inner-page grid-line background texture.

### Modified Capabilities

<!-- None — no existing spec-level behaviour changes. -->

## Impact

- New file: `app/contact/page.tsx` (SSG route)
- New file: `components/contact/ContactHeader.tsx`
- New file: `content/contact.json` (header strings)
- New file: `lib/types.ts` additions (`ContactContent` interface)
- `lib/content.ts` — new `getContactContent()` loader
- No breaking changes; no existing routes or components modified.
