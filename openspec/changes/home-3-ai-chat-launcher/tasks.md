## 1. Component

- [x] 1.1 Create `components/home/ChatLauncher.tsx` as a `'use client'` component with controlled input state and `useRouter` from `next/navigation`
- [x] 1.2 Render chat bubble SVG icon (left), text input with placeholder "Ask me anything about Abhilash…", and arrow submit button (right) inside a `<form>` element
- [x] 1.3 Apply design tokens: `bg-surface border border-surface-alt rounded-[14px] px-[18px] py-2 pr-2` container; submit button `w-10 h-10 rounded-[10px] bg-tertiary`; focus state adds `focus-within:border-tertiary`
- [x] 1.4 On form submit (Enter key): trim input, skip navigation if empty, call `router.push('/chat?q=' + encodeURIComponent(value.trim()))`
- [x] 1.5 Add `hover:opacity-85` on submit button with `transition-opacity duration-150`

## 2. Integration

- [x] 2.1 Import `ChatLauncher` into `components/home/HeroSection.tsx` and render it below `<StatsBar />` within the existing `<div>` container
- [x] 2.2 Add `mt-10` spacing between `StatsBar` and `ChatLauncher` to match the vertical rhythm of the hero

## 3. Tests

- [x] 3.1 Create `components/home/__tests__/ChatLauncher.test.tsx` — assert input renders with correct placeholder text
- [x] 3.2 Test: typing text and pressing Enter calls `router.push` with correctly encoded URL (mock `useRouter`)
- [x] 3.3 Test: clicking the submit button also triggers navigation with the typed text
- [x] 3.4 Test: submitting with empty/whitespace input does not call `router.push`
- [x] 3.5 Update `components/home/__tests__/HeroSection.test.tsx` to assert `ChatLauncher` renders in the hero (check for placeholder text)

## 4. Quality Gates

- [x] 4.1 Run `npm run typecheck` — zero errors
- [x] 4.2 Run `npm test` — all tests pass
- [x] 4.3 Run `npm run lint` — zero warnings/errors
- [x] 4.4 Run `openspec validate home-3-ai-chat-launcher --type change --strict`
- [x] 4.5 Start dev server (`npm run dev`), open home page, verify: input renders below stats bar, placeholder visible, typing a question and pressing Enter navigates to `/chat?q=<encoded>`, send button dims on hover
