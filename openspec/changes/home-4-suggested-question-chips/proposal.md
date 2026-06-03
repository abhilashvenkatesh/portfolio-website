## Why

Visitors land on the home page and see a chat input but often don't know what to ask. Four suggestion chips below the input give immediate, concrete prompts — reducing friction and driving engagement with the AI chat feature.

## What Changes

- Add a row of four suggestion chips below the `ChatLauncher` input on the home-page hero
- Each chip is a clickable label that navigates to `/chat?q=<encoded question>` — same mechanic as the chat launcher
- Chips highlight with the accent colour on hover
- Chip text is data-driven (sourced from `content/`) — no hardcoded strings in components

## Capabilities

### New Capabilities

- `suggestion-chips`: A set of pre-defined question chips rendered below the chat launcher on the home-page hero. Clicking any chip navigates to the chat page with that question auto-sent.

### Modified Capabilities

- `chat-launcher`: The existing chat launcher component is extended to render suggestion chips below the input field. Spec gains a new requirement covering chip rendering and click behaviour.

## Impact

- New component: `components/home/SuggestionChips.tsx`
- New content file: `content/suggestion-chips.json` (home-page chip list; DATA-6)
- Modified: `components/home/ChatLauncher.tsx` or `components/home/HeroSection.tsx` (renders chips below launcher)
- Modified: `openspec/specs/chat-launcher/spec.md` (delta — new chip behaviour requirement)
- No API or routing changes; reuses existing `useRouter` push pattern
