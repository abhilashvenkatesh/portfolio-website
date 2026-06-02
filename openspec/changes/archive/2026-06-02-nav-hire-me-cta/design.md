## Context

`Nav.tsx` is currently a synchronous Server Component with no data dependencies. The architecture defines `lib/content.ts` as the typed build-time JSON loader and `content/contact.json` (DATA-5) as the source for email, linkedin, phone, and availability — neither file exists yet. This change creates both files and wires the nav to read the email from the content layer.

## Goals / Non-Goals

**Goals:**
- Add "Hire me" mailto CTA to the nav header as a `button-secondary` anchor
- Create `lib/content.ts` with a `getContact()` loader (prerequisite for all content-backed pages)
- Create `content/contact.json` with the DATA-5 schema fields
- Add `button-secondary-hover` token to `DESIGN.md` (done in grill session)

**Non-Goals:**
- Building the Contact page (separate story)
- Adding linkedin, phone, or availability fields to the contact page (out of scope for this change)
- Any runtime data fetching — build-time only

## Decisions

### D1: Nav as async Server Component
- **Choice**: Convert `Nav` to an `async` Server Component and `await getContact()` directly
- **Rationale**: The architecture prescribes build-time SSG reads via Server Components. Nav renders in `app/layout.tsx` which is SSG; no ISR or runtime overhead.
- **Alternatives considered**: Reading contact at the layout level and passing email as a prop — adds prop-drilling through layout for a single string; not worth the indirection.

### D2: content/contact.json schema
- **Choice**: Create with full DATA-5 schema: `{ email, linkedin, phone, availability: { show, message } }`
- **Rationale**: The architecture already specifies this shape. Creating a partial schema and expanding later risks validate-content failures on the fields that exist. Define the full shape now.
- **Alternatives considered**: Minimal `{ email }` only — deferred fields cause validate-content schema failures when those pages are built.

### D3: CTA as sibling to `<nav>`, not inside it
- **Choice**: Third flex child in `<header>` alongside the logo and `<nav>`
- **Rationale**: The CTA is an action (mailto), not a page-navigation link. Keeping `<nav>` semantically pure (exactly 6 page links) aligns with the existing spec and improves accessibility tree clarity.
- **Alternatives considered**: Inside `<nav>` with left margin — simpler markup but conflates navigation and action semantics.

## Risks / Trade-offs

[Risk] `lib/` and `content/` directories don't exist yet — directory creation is a prerequisite → Mitigation: create both as part of this change; CI `validate-content` will catch any missing fields immediately.

[Risk] `validate-content.ts` may fail if `contact.json` fields don't match its schema expectations → Mitigation: use the full DATA-5 schema from the architecture doc; run `npm run validate-content` as part of the implementation verification step.

[Trade-off] Making Nav async adds a tiny build-time cost → Accepted because: it follows the prescribed architecture pattern and is negligible at build time (single `fs.readFileSync`).

## Migration Plan

N/A — no deployment changes in this change. Pure SSG addition; no DB, no new routes, no breaking API changes. Rollback is a revert of the three new/modified files.

## Open Questions

None — all decisions resolved in grill session.
