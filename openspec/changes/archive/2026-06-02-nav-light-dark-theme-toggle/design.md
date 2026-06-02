## Context

`ThemeProvider` and `toggleTheme` are specified in `ARCHITECTURE.md` but not yet implemented. Nav.tsx is currently a Server Component (async, reads contact JSON). The inline anti-flash script in `layout.tsx` already handles localStorage → `data-theme` on initial load.

## Goals / Non-Goals

**Goals:**
- Implement ThemeProvider client component exposing `theme` + `toggleTheme` via context
- Add sun/moon toggle button to Nav visible on all screen sizes
- Persist preference in `localStorage` on each toggle

**Non-Goals:**
- System preference (`prefers-color-scheme`) auto-detection
- Persistence beyond session (already handled by localStorage, which persists across sessions)
- Icon library addition

## Decisions

### D1: Keep Nav.tsx as Server Component; extract ThemeToggle as Client Component
- **Choice**: `components/nav/ThemeToggle.tsx` — `"use client"` component using `useTheme()` hook; imported into the server-rendered `Nav.tsx`
- **Rationale**: Nav reads contact JSON at build time; making the whole nav client-side forces that read to be an API call or prop-drill. Extracting only the interactive part is the standard Next.js App Router pattern.
- **Alternatives considered**: Convert Nav to Client Component — rejected; loses SSG data-read and adds unnecessary client JS.

### D2: ThemeProvider wraps body in layout.tsx
- **Choice**: `components/providers/ThemeProvider.tsx` is a `"use client"` component wrapping `{children}` in `layout.tsx`, providing `ThemeContext`.
- **Rationale**: Context must be available to all pages and the Nav toggle. Layout is the correct boundary.
- **Alternatives considered**: Co-locate context in Nav — rejected; limits reusability if any other component needs theme access.

### D3: Inline SVG for sun/moon icons
- **Choice**: Two small inline SVGs in `ThemeToggle.tsx`; no external icon library.
- **Rationale**: Only two icons needed; adding lucide-react or similar for two icons is unjustified bundle overhead.
- **Alternatives considered**: lucide-react — rejected; no existing icon library in project.

## Risks / Trade-offs

[Trade-off] Inline SVGs add a few lines of JSX → Accepted because: eliminates an external dependency for minimal payload.

## Migration Plan

N/A — no deployment changes in this change.

## Open Questions

None.
