## 1. Implementation

- [x] 1.1 In `components/home/HeroSection.tsx`, add a grid layer `<div>` as the first child of the outer `<section>`: `position: absolute`, `inset: 0`, `z-index: 0`, `pointerEvents: none`, `backgroundImage` with two `linear-gradient` values using `var(--color-surface-alt)`, `backgroundSize: "60px 60px"`, and `maskImage` / `WebkitMaskImage` set to `radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 100%)`
- [x] 1.2 Add the radial glow `<div>` as the second child of the outer `<section>`: `position: absolute`, `top: "20%"`, `left: "50%"`, `transform: "translateX(-50%)"`, `width: "500px"`, `height: "400px"`, `background: "oklch(0.58 0.18 38 / 0.08)"`, `borderRadius: "50%"`, `filter: "blur(80px)"`, `zIndex: 0`, `pointerEvents: none`
- [x] 1.3 Confirm the existing content `<div>` retains `relative z-10` so it renders above both decorative layers

## 2. Tests

- [x] 2.1 In `components/home/__tests__/HeroSection.test.tsx`, add a test asserting the hero section container has `overflow-hidden` class (guards that the decorative layers stay clipped within the section)
- [x] 2.2 Add a test asserting the grid layer div is rendered inside the hero section (query by its distinct inline `backgroundSize` style or a `data-testid="hero-grid"` attribute)
- [x] 2.3 Add a test asserting the glow layer div is rendered inside the hero section (query by `data-testid="hero-glow"`)
- [x] 2.4 Run `npm test` and confirm all tests pass

## 3. DOM / Visual Verification

- [x] 3.1 Run `npm run dev`, open the home page in browser, and confirm the grid pattern is visible behind the hero text at desktop viewport (≥1024px)
- [x] 3.2 Confirm the grid fades out toward the bottom and edges — no hard grid boundary visible
- [x] 3.3 Confirm the orange radial glow is visible at low opacity behind the headline area
- [x] 3.4 Check mobile viewport (375px) — confirm grid and glow do not obscure text
- [x] 3.5 Toggle dark mode — confirm both layers remain subtle and do not overwhelm the dark background

## 4. Quality Gates

- [x] 4.1 Run `npm run typecheck` and confirm zero errors
- [x] 4.2 Run `npm run lint` and confirm zero errors
- [x] 4.3 Run `openspec validate home-7-hero-background-texture --type change --strict` and confirm the change is valid
