## 1. Data Layer

- [x] 1.1 Add `HomeContent` interface to `lib/types.ts` with fields: `roleBadge: string`, `headline: string`, `subheading: string`, `bio: string`
- [x] 1.2 Create `content/home.json` with HOME-1 hero copy: `roleBadge`, `headline`, `subheading`, `bio`
- [x] 1.3 Add `getHomeContent(): HomeContent` loader to `lib/content.ts` using `fs.readFileSync`
- [x] 1.4 Run `npm run validate-content` — confirm no schema errors (script not yet created; skipped)

## 2. Hero Component

- [x] 2.1 Create `components/home/HeroSection.tsx` as a Server Component accepting `HomeContent` props
- [x] 2.2 Render the role badge using `AccentTag` with `roleBadge` prop
- [x] 2.3 Render the headline `<h1>` with `headline` text at hero-display size (`clamp(48px, 7vw, 88px)`, weight 600)
- [x] 2.4 Render the subheading as inline `<span>` elements within the `<h1>`: muted weight-300 text + accent-coloured "scale to millions."
- [x] 2.5 Render the description `<p>` with `bio` prop at body-lg style (19px, weight 300, muted, max-w 520px, centred)

## 3. Page Integration

- [x] 3.1 Update `app/page.tsx` to call `getHomeContent()` and pass result to `<HeroSection />`
- [x] 3.2 Confirm `app/page.tsx` remains a Server Component (no `'use client'` directive)

## 4. Quality Gates

- [x] 4.1 Run `npm run typecheck` — zero errors
- [x] 4.2 Run `npm run lint` — zero lint errors
- [x] 4.3 Run `openspec validate home-1-hero-headline-tagline --type change --strict` — all specs pass
- [x] 4.4 Run `npm run build` — build succeeds with no type or compile errors
