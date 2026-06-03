## Why

The hero section currently renders against a flat background, making it feel incomplete compared to the design prototype. HOME-7 adds two decorative layers — a grid line pattern and a radial glow — to give the hero visual depth without competing with the text content.

## What Changes

- Add an absolute-positioned grid line overlay behind the hero content, masked with a radial gradient so it fades toward the edges
- Add an absolute-positioned radial glow (blurred ellipse in accent colour at low opacity) centred behind the hero headline area
- Both elements are `z-index: 0` / `pointer-events: none`; hero text remains at `z-index: 1`

## Capabilities

### New Capabilities

- `hero-background-texture`: Decorative grid pattern and radial glow rendered as absolute-positioned layers inside the hero section, behind all content

### Modified Capabilities

- `hero-headline`: `HeroSection` structural change — the existing `relative overflow-hidden` section gains two new sibling elements before the content `div`; no requirement-level behaviour changes to the headline itself

## Impact

- `components/home/HeroSection.tsx` — two new decorative `div` elements added inside the section
- `openspec/specs/hero-headline/spec.md` — minor delta noting the decorative layer siblings (no scenario changes)
- No content, API, or dependency changes required
