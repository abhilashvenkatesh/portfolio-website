---
linear_story_id: "POR-101"
linear_story_url: "https://linear.app/abhilash-projects/issue/POR-101/home-5-or-browse-navigation-hints"
sdd_experiment:
  method: "sdd"
  comparator: "none"
  started_at: "2026-06-03T00:00:00Z"
  accepted_at: null
  token_usage_source: "api"
---

## Why

Visitors who prefer scanning over chat have no clear path to navigate sections from the hero. Adding "or browse" links below the suggestion chips gives non-chat-oriented users an immediate escape hatch to key pages.

## What Changes

- Add a "or browse" navigation hint line below the suggestion chips on the home page hero
- Links: "projects", "experience", "contact" — each navigating to its respective page
- Links styled in accent colour; separator dots between them

## Capabilities

### New Capabilities

- `browse-navigation-hints`: A static line of accent-coloured navigation links ("or browse · projects · experience · contact") rendered below the suggestion chips in the hero section

### Modified Capabilities

- `suggestion-chips`: Layout change only — the browse hints row is appended beneath the chips container; no behaviour change to chips themselves

## Impact

- `components/home/HeroSection.tsx` — add browse hints below suggestion chips
- `components/home/__tests__/HeroSection.test.tsx` — add tests for new links
- No new content files; links are hardcoded nav targets (static pages)
- No API or data-layer changes
