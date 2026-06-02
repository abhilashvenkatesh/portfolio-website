## Context

No nav component exists yet. The root layout renders pages without any persistent chrome. DESIGN.md already specifies the `nav`, `nav-link`, and `nav-link-active` design tokens — implementation must use them exactly. Design-lint CI enforces these tokens.

## Goals / Non-Goals

**Goals:**
- Fixed top nav bar visible and accessible on every page
- Active page link visually distinguished using `nav-link-active` token (surface-alt bg, primary text)
- Dark mode support via existing `[data-theme="dark"]` overrides on the same tokens
- Zero layout shift — nav height is a known constant (`60px`)

**Non-Goals:**
- Mobile hamburger / drawer menu (separate story)
- Logotype / wordmark in nav (separate story)
- Search or user account controls

## Decisions

**Single server component + one client island for active state**

`Nav.tsx` can be a React Server Component for the link list. Active-page detection requires knowing the current pathname, which means `usePathname()` — a client hook. Two options:

| Option | Trade-off |
|---|---|
| Whole nav is a Client Component | Simple, but opts out of RSC for the whole nav |
| Nav shell is SC, `NavLink` is a small Client Component | Correct RSC boundary, minimal JS surface |

→ Chose option B: `Nav.tsx` (Server) renders the bar and maps links to `<NavLink>` (Client). `NavLink` calls `usePathname()` and applies `nav-link-active` class when matched.

**CSS: Tailwind utility classes mapped to design tokens**

No bespoke CSS. Use `bg-[var(--color-neutral)]`, `h-[60px]`, `px-[clamp(20px,5vw,64px)]` and the token-backed classes defined in `globals.css`. Active state: `bg-surface-alt text-primary`, default: `text-secondary`.

**`position: fixed` + body padding-top**

Nav is `fixed top-0 inset-x-0 z-50`. Root layout adds `pt-[60px]` to the page wrapper so content is not obscured. This is simpler than `sticky` with scroll-container fiddling and matches the 60px height token.

## Risks / Trade-offs

- **Scroll-linked animations**: `FadeIn` components that trigger near the top of the page may fire immediately because 60px of content is shifted down. → Acceptable; threshold is viewport-relative, not document-relative.
- **`/chat` page**: Full-screen WebLLM shell. 60px padding-top must not break the layout. → Verify during implementation.

## Migration Plan

No migration needed — greenfield component. Ship behind the same Vercel deploy; no feature flag required.

## Open Questions

_(none — tokens, routes, and RSC boundary are all resolved)_
