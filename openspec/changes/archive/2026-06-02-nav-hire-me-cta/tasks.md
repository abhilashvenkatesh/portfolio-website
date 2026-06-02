# Tasks: nav-hire-me-cta

## 1. Content & Data Layer

- [x] 1.1 Create `content/` directory and `content/contact.json` with full DATA-5 schema: `{ email, linkedin, phone, availability: { show, message } }`
- [x] 1.2 Create `lib/` directory and `lib/types.ts` with `Contact` interface matching the DATA-5 schema
- [x] 1.3 Create `lib/content.ts` with `getContact()` loader using `fs.readFileSync` (build-time only, typed against `Contact`)

## 2. Design System

- [x] 2.1 Verify `button-secondary-hover` token is present in `documentation/DESIGN.md` (added in grill session — confirm and run `npm run design-lint`)

## 3. Nav Component

- [x] 3.1 Convert `components/nav/Nav.tsx` to an `async` Server Component
- [x] 3.2 Call `await getContact()` and construct `mailto:${email}?subject=Hire%20me` href
- [x] 3.3 Add "Hire me" `<a>` anchor as third flex child in `<header>`, after `<nav>`, with `button-secondary` token classes and `transition-colors duration-200` hover

## 4. Validation

- [ ] 4.1 Run `npm run validate-content` — confirm no missing fields in `contact.json` (script not yet in package.json — out of scope for this story)
- [x] 4.2 Run `npm run typecheck` — no TypeScript errors
- [x] 4.3 Run `npm run lint` — no ESLint errors
- [x] 4.4 Run `npm run design-lint` — 0 errors
- [x] 4.5 Run `npm run build` — build succeeds
