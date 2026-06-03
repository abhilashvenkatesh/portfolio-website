# Retrospective: nav-mobile-navigation

> Written: 2026-06-03 (after verify passed)
> Commit range: `8c5e05d..289bd07`

---

## 0. Evidence

- **Commit range**: `8c5e05d..289bd07` (1 commit — all work squashed into feature commit)
- **Diff size**: +637 / -38 lines across 14 files
- **Tasks done**: 29/29
- **Active hours**: ~3 (two sessions, second resumed from compacted context)
- **New external dependencies**: none (Playwright installed and removed during verify)
- **Bugs post-merge**: none
- **OpenSpec validate at archive**: pass

Commit chain:

```
8c5e05d chore(skills): migrate all skills to Claude Code only  ← base
289bd07 feat(nav): add mobile hamburger menu with full-width dropdown panel (POR-95)  ← head
```

---

## 1. Wins

- **mobileMenuContent prop pattern** — keeping `Nav.tsx` as Server Component composition root with a `React.ReactNode` prop to `NavScrollWrapper` was clean. No context provider, no additional client boundary, no prop-threading through NavLink.
- **CSS-only visibility** — two DOM instances of ThemeToggle + hire-me hidden per breakpoint avoided JS `useWindowSize` entirely, eliminating hydration risk.
- **Event delegation close** — single `e.target.closest('a')` on the panel div replaced 6 per-link `onClick` callbacks. ThemeToggle is a `<button>`, not `<a>`, so it naturally didn't trigger close.
- **Code review caught real issues** — `usePathname` route-change reset and `aria-hidden` on SVG were both caught post-implementation by the subagent reviewer, not during design. The review was worth it.
- **TDD coverage** — 12 new tests written before implementation, all failing first. 29/29 passing at verify with zero regressions.

---

## 2. Misses

- 🟡 [painful] **Playwright devdep added and removed** — verification required visual confirmation, Playwright was installed temporarily then removed. No `verifier-web` skill exists for this project. Cost: extra npm install/uninstall cycle, debug entries in `.claude/settings.json` that needed cleanup.
- 🟡 [painful] **Context window compaction mid-session** — feature implementation spanned two sessions with compaction between them. The second session cold-started from summary, which was accurate but required re-reading all context files.
- 📌 [nit] **Ghost menu bug caught late** — `usePathname` effect was a design oversight, not in original tasks.md. Only surfaced during code review. Should have been in design.md from the start (SPA routing is a known gotcha for menu state).
- 📌 [nit] **Shell escaping with Playwright** — first Playwright verification attempt via `node -e` failed on CSS attribute selector quoting. Needed a temp `.mjs` file. Minor but avoidable friction.

---

## 3. Plan deviations

| Task | What changed | Why |
|---|---|---|
| 1.1 Create git worktree | Skipped — worked on main branch | User explicit decision: "Skip worktree do it on the main branch" |
| Playwright verification | Installed + removed mid-session | No verifier-web skill; needed visual evidence; reviewer flagged devdep addition |
| Route-change close (`usePathname`) | Added post-implementation | Not in original tasks.md; caught by code review as ghost menu bug |
| `aria-hidden="true"` on SVG | Added post-implementation | Not in original tasks.md; caught by code review |
| design.md event delegation docs | Updated post-implementation | Original design.md described per-item `onClick`; implementation used delegation; doc fixed to match reality |

---

## 4. Skill / workflow compliance

| Skill | Used |
|---|---|
| `grill-with-docs` (proposal) | ✓ |
| `gherkin-authoring` (specs) | ✓ |
| `c4-diagrams` (design, if arch) | N/A — UI-only change |
| `superpowers:subagent-driven-development` (apply) | ✗ |
| `superpowers:test-driven-development` (apply) | ✓ |
| `superpowers:requesting-code-review` (apply) | ✓ |
| `openspec-verify-change` (verify) | ✓ |
| `openspec-linearized` (proposal, apply, archive) | ✓ |

### Deliberately Skipped Skills

**`superpowers:subagent-driven-development`**
- **What skipped**: Subagent-per-task parallel implementation loop
- **Why this cycle**: Change was a single coherent component rewrite (NavScrollWrapper + Nav), not a set of independent tasks that benefit from parallelism. All tasks were sequential with tight interdependencies.
- **How to prevent recurrence**: For changes where tasks fan out across multiple independent files/modules, default to subagent-driven. Single-component rewrites are the exception.

---

## 5. Surprises

- **`max-h-0`/`max-h-screen` worked without explicit height measurement** — expected to need `max-h-[<explicit-px>]` to avoid janky animation. `max-h-screen` was smooth enough for static content. No JS measurement needed.
- **Two ThemeToggle instances share state transparently** — both read/write the same `localStorage` key and `data-theme` attribute. No React state sync needed; the DOM attribute is the source of truth. This pattern is cleaner than it looks on paper.
- **Hero text bled through the open panel** — first screenshot showed page content visible behind the open menu. Root cause: missing `bg-neutral` on the panel div. Trivial fix but unexpected that a transparent background was the default.
- **`usePathname` not in original design** — SPA route change not resetting menu state was an obvious gap in hindsight. Next time: add "menu state on navigation" as a standard checklist item for any client-side menu.

---

## 6. Promote candidates → long-term learning

- [ ] 🟡 **For any client-side menu/drawer: add `usePathname` reset as a default task** → **Promote to** schema / tasks template
  > **Why**: Ghost menu persisted on SPA back/forward navigation. Caught by code review, not design. Obvious in hindsight but missed during planning.
  > **How to apply**: Any change that adds `menuOpen`-style state should include a task: "Add `useEffect(() => { setMenuOpen(false); }, [pathname])` for route-change reset."

- [ ] 📌 **Verify visual UI changes with a `verifier-web` skill, not ad-hoc Playwright** → **Promote to** project memory / skill backlog
  > **Why**: No web verifier skill exists. Installed Playwright as devdep, ran one-off script, removed it — messy. A `verifier-web` skill wrapping `next dev` + Playwright screenshot would make this repeatable.
  > **How to apply**: When implementing nav/UI changes that need viewport-width verification, check for `verifier-web` skill first. If absent, note it as a skill-gap rather than improvising.

- [ ] 📌 **design.md should document close triggers (including route change) before tasks are written** → **Promote to** schema / design template
  > **Why**: Event delegation and `usePathname` reset were both retrofitted post-implementation. Close-trigger decisions belong in design.md under a "Close triggers" section, not discovered during code review.
  > **How to apply**: For any interactive overlay/menu, include a "Close triggers" section in design.md listing: link click, outside click, Esc key (if applicable), route change.
