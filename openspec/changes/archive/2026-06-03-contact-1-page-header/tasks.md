```yaml
phase_metrics:
  phase: tasks
  started_at: "2026-06-03T17:30:00Z"
  completed_at: "2026-06-03T17:40:00Z"
  elapsed_seconds: 600
  token_usage:
    source: unavailable
    input_tokens: null
    output_tokens: null
    total_tokens: null
  confidence: high
  notes: "Token usage unavailable in VSCode extension context."

apply_metrics:
  phase: apply
  started_at: "2026-06-03T17:40:00Z"
  completed_at: "2026-06-03T18:30:00Z"
  elapsed_seconds: 3000
  token_usage:
    source: unavailable
    input_tokens: null
    output_tokens: null
    total_tokens: null
  confidence: high
  notes: "Token usage unavailable in VSCode extension context. All 14 tasks complete: data layer, PageHeader component, /contact route, TDD tests (11 suites / 64 tests pass), DOM visual verification (light/dark/mobile screenshots captured)."
```

## 1. Data Layer

- [x] 1.1 Add `header: { label: string; subtitle: string }` to the `Contact` interface in `lib/types.ts`
- [x] 1.2 Add `"header": { "label": "Get in touch", "subtitle": "Let's work together" }` to `content/contact.json`

## 2. Shared Component

- [x] 2.1 Create `components/ui/PageHeader.tsx` — accepts `label: string` and `subtitle: string` props; renders AccentTag above an h1; includes grid-line background texture using `--color-surface-alt` with top-anchored radial mask (`ellipse 70% 100% at 50% 0%`); grid is `position: absolute`, `zIndex: 0`, `pointerEvents: "none"`; content div is `position: relative`, `zIndex: 1`; section padding is `100px clamp(20px,5vw,64px) 60px`; h1 uses `clamp(32px, 5vw, 56px)`, weight 600, `-0.03em` tracking, `1.1` line-height, `--color-primary` text color

## 3. Route

- [x] 3.1 Create `app/contact/page.tsx` — SSG Server Component; calls `getContact()` from `lib/content.ts`; renders `<PageHeader label={contact.header.label} subtitle={contact.header.subtitle} />`; max content width 640px

## 4. Tests

- [x] 4.1 Create `components/ui/__tests__/PageHeader.test.tsx` — render test asserting AccentTag with label text and h1 with subtitle text are present in the DOM
- [x] 4.2 Create `app/contact/__tests__/page.test.tsx` (or `components/contact/__tests__/ContactPage.test.tsx`) — render test asserting the route renders "Get in touch" and "Let's work together" from mocked `getContact()` return value
- [x] 4.3 Run `npm test` and confirm all tests pass

## 5. DOM / Visual Verification

- [x] 5.1 Start dev server (`npm run dev`), navigate to `http://localhost:3000/contact`, and confirm header renders with AccentTag "Get in touch" and h1 "Let's work together"
- [x] 5.2 Confirm grid-line texture is visible behind the header and fades toward the bottom
- [x] 5.3 Toggle dark theme and confirm grid lines and text remain legible
- [x] 5.4 Check at mobile viewport (375px) — confirm no text overflow or layout shift

## 6. Quality Gates

- [x] 6.1 Run `npm run typecheck` and confirm zero errors
- [x] 6.2 Run `npm run lint` and confirm zero errors
- [x] 6.3 Run `openspec validate contact-1-page-header --type change --strict` and confirm the change is valid
