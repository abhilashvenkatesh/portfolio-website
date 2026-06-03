```yaml
phase_metrics:
  phase: design
  started_at: "2026-06-03T17:10:00Z"
  completed_at: "2026-06-03T17:20:00Z"
  elapsed_seconds: 600
  token_usage:
    source: unavailable
    input_tokens: null
    output_tokens: null
    total_tokens: null
  confidence: high
  notes: "Token usage unavailable in VSCode extension context."
```

## Context

No Contact page or route exists yet. The `content/contact.json` file exists but only carries contact-method data (email, LinkedIn, phone, availability). The design prototype (`documentation/design/contact.html`) uses a shared `PageHeader` component — the same pattern used by About, Experience, Blog, and Chat pages — with AccentTag as label above an h1 subtitle. HOME-7 established the inner-page grid-line texture convention; this change applies it to the Contact page header.

## Goals / Non-Goals

**Goals:**
- New `/contact` SSG route with a `ContactHeader` section.
- Shared `PageHeader` component in `components/ui/` usable by all inner pages.
- Label ("Get in touch") sourced from `content/contact.json`; subtitle ("Let's work together") sourced from `content/contact.json`.
- Grid-line background texture matching the inner-page pattern (top-anchored mask, `--color-surface-alt` lines).

**Non-Goals:**
- Contact method cards, availability banner, or any other CONTACT-2 through CONTACT-5 work.
- Routing wiring beyond the `/contact` route itself (Nav link is out of scope for this story).

## Project Facts Preflight

- Dependencies checked: `package.json` — no new dependencies needed; React, Next.js, Tailwind v4 already installed.
- Icon/export availability: `AccentTag` exists at `components/ui/AccentTag.tsx`. No additional icons needed.
- Design tokens/classes checked: `styles/globals.css` `@theme inline` confirms `--color-surface-alt` exists (light: `#ede8de`, dark: `#2e2b28`). No `--border` variable exists — prototype shorthand, use `--color-surface-alt` instead (consistent with HOME-7 `HeroSection.tsx:21`).
- Existing components/helpers checked: `components/ui/AccentTag.tsx` exists. No `PageHeader` component exists yet. `lib/content.ts` has `getContact()` loader reading `content/contact.json`. `lib/types.ts` has `Contact` interface without header fields. `app/` currently has only `layout.tsx` and `page.tsx` — no `contact/` directory.
- Scripts checked: `npm run typecheck`, `npm run lint`, `npm run build` all documented in CLAUDE.md.

## Decisions

**D1: Shared `PageHeader` component, not contact-specific.**
The design prototype uses `PageHeader` across About, Experience, Blog, Chat, and Contact. Creating a shared `components/ui/PageHeader.tsx` avoids future duplication when those pages are built. A contact-specific `ContactHeader.tsx` was considered but rejected — it would immediately be duplicated for every other inner page.

**D2: Header strings added to `content/contact.json`, `Contact` type extended.**
The existing `content/contact.json` file carries all contact-page data. Adding `header: { label: string; subtitle: string }` to it is consistent with the project's data-layer pattern (all content in `content/` JSON, typed via `lib/types.ts`, loaded in `lib/content.ts`). A separate `content/contact-header.json` was considered but rejected — it would fragment the contact page's data into multiple files.

**D3: Grid uses `var(--color-surface-alt)`, top-anchored mask.**
The design prototype references `var(--border)` which does not exist in `styles/globals.css`. `--color-surface-alt` is the closest equivalent — it's already used for the hero grid in `HeroSection.tsx:21`. The mask for inner pages is top-anchored: `radial-gradient(ellipse 70% 100% at 50% 0%, black 30%, transparent 100%)` — distinct from the hero's centered ellipse.

**D4: AccentTag for label, h1 for subtitle.**
The design prototype renders `title` ("Get in touch") in AccentTag and `subtitle` ("Let's work together") in h1. This is counterintuitive but intentional per the prototype — the AccentTag acts as a page-role badge and the h1 is the primary heading.

## Risks / Trade-offs

- [Prototype `var(--border)` mismatch] → Use `--color-surface-alt` verified to exist in globals.css.
- [content/contact.json schema extension] → `getContact()` reads the file as `Contact` type; adding `header` requires updating the type. If `header` is missing from the JSON, TypeScript will fail at build time — which is the desired safety.
- [No contact route link in Nav] → Nav wiring is out of scope; `/contact` is reachable by direct URL only until a future story adds the Nav link.

## Migration Plan

1. Add `header` fields to `content/contact.json`.
2. Extend `Contact` interface in `lib/types.ts` with `header: { label: string; subtitle: string }`.
3. Create `components/ui/PageHeader.tsx`.
4. Create `app/contact/page.tsx` as SSG Server Component.
5. Write tests for `ContactPage` and `PageHeader`.
6. Run `npm run typecheck && npm run lint && npm run build`.

Rollback: revert the four new/modified files; no database or infra changes.

## Open Questions

None.
