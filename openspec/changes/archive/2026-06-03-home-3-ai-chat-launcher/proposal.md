---
linear_story_id: "POR-99"
linear_story_identifier: "POR-99"
linear_story_title: "HOME-3 — AI chat launcher on home page"
linear_story_url: "https://linear.app/abhilash-projects/issue/POR-99/home-3-ai-chat-launcher-on-home-page"
linear_story_state: "Backlog"
linear_team: "Portfolio"
linear_project: "Portfolio Website"
---

## Why

Visitors landing on the home page currently have no way to interact with the AI chat feature without navigating away first. Adding a chat input directly in the hero converts the page from a static introduction into an interactive entry point that immediately showcases the site's differentiating AI capability.

## What Changes

- Add a `ChatLauncher` component to the hero section with a chat icon, text input, and arrow submit button
- Submitting a question (Enter or send button click) navigates to `/chat?q=<encoded>` so the chat page picks it up and auto-sends
- Send button dims to 85% opacity on hover

## Capabilities

### New Capabilities

- `chat-launcher`: Home-page chat entry point — input field with placeholder, keyboard and click submission, navigation to `/chat?q=<encoded>`

### Modified Capabilities

- `hero-headline`: HeroSection receives the ChatLauncher below the StatsBar; layout and existing headline/bio content unchanged

## Impact

- New component: `components/home/ChatLauncher.tsx` (client component — uses `useState`, `useRouter`)
- Modified: `components/home/HeroSection.tsx` — import and render `<ChatLauncher />` below `<StatsBar />`
- No new content data or JSON changes needed; placeholder text is hardcoded per requirement
- Depends on: Next.js `useRouter` from `next/navigation`
- Chat page (`/chat`) does not need to be built for this story — the query-param handoff contract is already defined in architecture
