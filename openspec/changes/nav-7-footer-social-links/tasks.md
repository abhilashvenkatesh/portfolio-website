## 1. Content & Types

- [ ] 1.1 Add `github` field to `content/contact.json` with Abhilash's GitHub profile URL
- [ ] 1.2 Update `ContactInfo` interface in `lib/types.ts` to include `github: string`

## 2. Footer Component

- [ ] 2.1 Create `components/layout/Footer.tsx` as a server component
- [ ] 2.2 Read contact data via `lib/content.ts` loader (no hardcoded URLs)
- [ ] 2.3 Render copyright line "© 2025 Abhilash" on the left
- [ ] 2.4 Render GitHub, LinkedIn, Email icon links using `lucide-react` icons (`Github`, `Linkedin`, `Mail`)
- [ ] 2.5 Apply DESIGN.md footer spec: `border-top`, `24px` block padding, flex row, DM Mono font for links
- [ ] 2.6 Apply hover colour using `text-[var(--color-tertiary)]` transition on each icon link
- [ ] 2.7 Set `target="_blank" rel="noopener noreferrer"` on GitHub and LinkedIn links; use `href="mailto:..."` for Email

## 3. Layout Integration

- [ ] 3.1 Import `Footer` in `app/layout.tsx` and render it below `{children}`

## 4. Validation

- [ ] 4.1 Run `npm run typecheck` — no type errors
- [ ] 4.2 Run `npm run lint` — no lint errors
- [ ] 4.3 Run `openspec validate nav-7-footer-social-links --type change --strict` — passes
- [ ] 4.4 Verify footer renders on home, blog, projects, and contact pages in dev server
- [ ] 4.5 Verify hover colour change on all three icons
- [ ] 4.6 Verify GitHub and LinkedIn links open in new tab; Email link opens mail client
