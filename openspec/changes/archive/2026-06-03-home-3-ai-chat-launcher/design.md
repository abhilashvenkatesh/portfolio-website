## Context

The home page (`app/page.tsx`) currently renders `HeroSection`, which is a pure Server Component containing `StatsBar`. The hero has no interactive elements. Adding a chat launcher introduces the first client-side interactive component to the home page.

The chat page (`app/chat/page.tsx`) already exists per the architecture and reads `searchParams.get('q')` to auto-send a pre-filled question. The launcher just needs to navigate there with the right URL param.

Design tokens for the chat input container are defined in `documentation/DESIGN.md` (`chat-input` component token): surface bg, `rounded-xl` (14px), padding `8px 8px 8px 18px`, border `1px var(--border)`, focus accent border. Submit button: `40×40px`, `10px` radius, accent fill, `opacity: 0.85` on hover.

## Goals / Non-Goals

**Goals:**
- Add `ChatLauncher` client component with chat input and arrow submit button
- Keyboard (Enter) and click submission navigate to `/chat?q=<encoded>`
- Send button dims to 85% opacity on hover
- Render `ChatLauncher` below `StatsBar` in `HeroSection`

**Non-Goals:**
- Suggestion chips (HOME-4, separate story)
- "Or browse" navigation hints (HOME-5, separate story)
- Chat page implementation (CHAT-* stories)
- Any server-side logic or content JSON changes

## Decisions

**Client component isolation**: `ChatLauncher` is `'use client'` and `HeroSection` stays a Server Component. The server component imports and renders the client component — this is the correct Next.js App Router pattern. Only `ChatLauncher` hydrates; the rest of the hero SSG output is not affected.

**Navigation via `useRouter`**: Use `next/navigation`'s `useRouter().push()` rather than a plain `<a>` tag or `window.location`. This keeps navigation within the Next.js client router (prefetch, no full reload) and is the established pattern in this codebase.

**No content JSON**: The placeholder text "Ask me anything about Abhilash…" is hardcoded per the requirement. No content data file change is needed. If placeholder copy ever needs to change, it will be added to `content/home.json` at that time.

**Max-width**: The launcher container uses `max-w-[620px] w-full mx-auto` to match the design prototype (index.html shows `maxWidth: "620px"`), staying within the hero's existing `max-w-[760px]` constraint.

**Tailwind v4 only**: All styling via Tailwind utility classes using the CSS custom property tokens from `styles/globals.css`. No inline styles.

## Risks / Trade-offs

`useRouter` requires a client boundary → [Risk: splits SSR output] → Mitigation: `ChatLauncher` is a leaf component. HeroSection stays a server component; only the launcher island hydrates.

Empty-submit guard must trim whitespace → [Risk: navigating to `/chat?q=` with blank query] → Mitigation: `if (!value.trim()) return` before push.

## Migration Plan

Pure additive change. No data migrations, no API changes, no breaking changes.

Deploy: normal Vercel production deployment. Rollback: revert commit and redeploy.

## Open Questions

None — requirements and design tokens are fully specified.
