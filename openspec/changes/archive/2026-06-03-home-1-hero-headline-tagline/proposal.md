---
linear_story_id: POR-97
linear_story_identifier: POR-97
linear_story_title: "HOME-1 — Hero headline and tagline"
linear_story_url: https://linear.app/abhilash-projects/issue/POR-97/home-1-hero-headline-and-tagline
linear_story_state: Planning
linear_team: Portfolio
linear_project: Portfolio Website
---

## Why

The home page has no hero content — first-time visitors cannot immediately identify who Abhilash is or what he does. HOME-1 establishes the identity block that anchors every subsequent home page section.

## What Changes

- Add a role badge component above the hero headline ("Lead Application Developer · Melbourne")
- Add large headline "Hi, I'm Abhilash." and subheading "I architect systems that scale to millions."
- Add a short description paragraph with current role, experience summary, and location
- Wire all content from `content/home.json` (new file) — no hardcoded strings in components

## Capabilities

### New Capabilities

- `hero-headline`: Identity block rendered at the top of the home page, comprising a role badge, headline, subheading, and description paragraph sourced from content JSON.

### Modified Capabilities

<!-- None — no existing spec-level behaviour changes. -->

## Impact

- New file: `content/home.json` (hero copy)
- New component: `components/home/HeroHeadline.tsx`
- Updated: `app/page.tsx` to render the hero section
- Updated: `lib/content.ts` — loader for `home.json`
- Updated: `lib/types.ts` — `HomeContent` interface
