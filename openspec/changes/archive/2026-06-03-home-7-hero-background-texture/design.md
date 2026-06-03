## Context

`HeroSection` is an SSG Server Component. It already has `relative overflow-hidden` on the outer `<section>` and a `relative z-10` content wrapper — the structural slot for decorative background layers exists. The design prototype (`documentation/design/index.html` lines 99–107) specifies the exact visual treatment using inline styles.

The project uses Tailwind CSS v4 with tokens defined in `styles/globals.css`. There is no `--border` token (the prototype used `var(--border)`); `--color-surface-alt` serves the equivalent soft-divider role.

## Goals / Non-Goals

**Goals**
- Grid layer: 1px `--color-surface-alt` lines at 60×60px, masked with `radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 100%)` so it fades toward edges and bottom
- Glow layer: 500×400px blurred ellipse (`filter: blur(80px)`) in accent colour at 8% opacity, centred at `top: 20%`
- Both layers: `z-index: 0`, `pointer-events: none`, `position: absolute`, `inset: 0` (glow uses explicit top/left/transform)

**Non-Goals**
- XC-3 (grid on inner-page headers) — out of scope for this change
- Dark-mode-specific tuning beyond what CSS custom properties provide automatically
- Animation or interactivity

## Decisions

### 1. Inline styles for background layers

Both decorative divs use inline `style` props rather than Tailwind classes.

- `backgroundImage` with two `linear-gradient` values and `maskImage` / `WebkitMaskImage` cannot be expressed cleanly as Tailwind arbitrary classes without duplication
- These are one-off decorative elements; no reuse expected
- Matches the pattern already used in the design prototype

Alternative considered: extract to a `HeroBackgroundTexture` client component. Rejected — no interactivity required, adds indirection for a two-div change.

### 2. Token mapping — grid line colour

Prototype uses `var(--border)`; codebase has no such token. Use `var(--color-surface-alt)` — it is the lightest surface shade and works as a subtle hairline border in both themes.

Alternative: `var(--color-secondary)` at low opacity. Rejected — secondary is text colour; using it for decorative lines breaks semantic intent.

### 3. Token mapping — glow colour

Prototype uses `oklch(0.58 0.18 38 / 0.08)`. This maps to the accent (tertiary) hue at 8% opacity.

Use an inline `rgba`/`oklch` literal rather than `var(--color-tertiary)` because CSS custom properties cannot be used inside `oklch()` alpha channels without `color-mix()`. The 8% opacity literal is intentionally hardcoded — it is a design constant, not a theme token.

### 4. No new component or file

Both layers are two `<div>` elements inserted directly inside `HeroSection`. No helper component, no CSS file additions.

## Risks / Trade-offs

- [WebKit mask-image] Safari requires `-webkit-mask-image` alongside `maskImage` — add both in the `style` prop
- [Grid colour in dark mode] `--color-surface-alt` in dark mode is `#2e2b28`, which is slightly darker than the dark surface. Grid lines will remain faint but visible. Acceptable — matches design intent.
- [Glow colour in dark mode] The `oklch(0.58 0.18 38 / 0.08)` orange glow is appropriate for both themes at this opacity level. No theme branch needed.

## Migration Plan

Single file change: `components/home/HeroSection.tsx`. No migration steps — SSG rebuild picks up the change on next deploy.

Rollback: revert the two `<div>` additions.

## Open Questions

None.
