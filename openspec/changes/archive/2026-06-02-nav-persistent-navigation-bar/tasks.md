## 1. NavLink Client Component

- [x] 1.1 Create `components/nav/NavLink.tsx` as a Client Component using `usePathname()` to detect active route
- [x] 1.2 Apply `nav-link-active` token classes when `pathname === href`, `nav-link` classes otherwise
- [x] 1.3 Use Next.js `<Link>` for client-side navigation (no full reload)

## 2. Nav Server Component

- [x] 2.1 Create `components/nav/Nav.tsx` as a Server Component
- [x] 2.2 Define the ordered link list: Projects (`/projects`), About (`/about`), Experience (`/experience`), Blog (`/blog`), Chat (`/chat`), Contact (`/contact`)
- [x] 2.3 Render fixed bar using design tokens: `bg-[var(--color-neutral)]` / dark override, `h-[60px]`, `px-[clamp(20px,5vw,64px)]`, `fixed top-0 inset-x-0 z-50`
- [x] 2.4 Map link list to `<NavLink>` instances

## 3. Root Layout Integration

- [x] 3.1 Import and render `<Nav />` in `app/layout.tsx` above the page content wrapper
- [x] 3.2 Add `pt-[60px]` to the page content wrapper so content is not obscured by the fixed bar

## 4. Design Lint & Verification

- [x] 4.1 Run `npm run design-lint` — confirm no violations (no hardcoded hex, no forbidden weights, radius within scale)
- [x] 4.2 Run `npm run typecheck` — confirm no TS errors
- [x] 4.3 Run `npm run lint` — confirm no ESLint errors
- [x] 4.4 Visually verify nav is fixed while scrolling in both light and dark mode
- [x] 4.5 Verify active link styling updates correctly when navigating between pages
- [x] 4.6 Verify `/chat` page layout is not broken by the 60px offset
