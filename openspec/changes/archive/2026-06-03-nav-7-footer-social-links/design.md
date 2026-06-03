## Context

No footer exists today. Every page terminates at the last content block. `documentation/ARCHITECTURE.md` already reserves `components/layout/Footer.tsx` and `app/layout.tsx` lists it as a planned slot. `content/contact.json` holds email and LinkedIn; GitHub is absent and needs adding. DESIGN.md specifies: footer is `minimal, border-top, 24px block padding, flex row with logo + links`, and footer links use **DM Mono** font.

## Goals / Non-Goals

**Goals**
- `Footer` server component rendered on every page (via root layout)
- GitHub, LinkedIn, Email icon links — colour change on hover
- Copyright line "© 2025 Abhilash" on the left
- Reads hrefs from `content/contact.json` (no hardcoded URLs in component)
- Matches DESIGN.md footer spec: `border-top`, `24px` block, flex row, DM Mono links

**Non-Goals**
- Multi-column footer with nav sections
- Mobile-specific footer layout changes beyond flex-wrap
- Analytics on link clicks

## Decisions

**1. Server component only**
No interactivity needed — `Footer.tsx` is a pure RSC. Reads `contact.json` at build time via `lib/content.ts` (consistent with architecture data-layer rule).

**2. Add `github` field to `content/contact.json`**
GitHub URL is not in content. Add it alongside `email` and `linkedin` rather than hardcoding in the component. Keeps all external profile URLs in one content file.

**3. Icon library: `lucide-react`**
Already a dependency (used in existing components). Use `Github`, `Linkedin`, `Mail` icons. No new dependency.

**4. Location: `components/layout/Footer.tsx`**
ARCHITECTURE.md already reserves this path. Consistent with `Nav.tsx` sibling pattern.

**5. Hover colour: `text-[var(--color-tertiary)]`**
DESIGN.md `contact-icon` uses `{colors.tertiary}` for icon hover states. Footer links follow the same token.

## Risks / Trade-offs

- [GitHub URL accuracy] Hardcoded in content file — wrong URL is a content fix, not a code fix. Mitigation: verify URL before merging.
- [Email link opens mail client] `mailto:` is standard but some users block it. Acceptable UX trade-off; no fallback needed.

## Migration Plan

1. Add `github` field to `content/contact.json`
2. Update `lib/types.ts` `ContactInfo` interface if typed
3. Create `components/layout/Footer.tsx`
4. Import and render `<Footer />` in `app/layout.tsx` below `{children}`
5. No rollback needed — purely additive, no existing code changed

## Open Questions

- None. GitHub URL: `https://github.com/abhilash-venkatesh` — confirm before merge.
