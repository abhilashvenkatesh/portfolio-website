## ADDED Requirements

### Requirement: Nav bar is always visible while scrolling
The nav bar SHALL be fixed to the top of the viewport at all times. Scrolling the page SHALL NOT cause the nav bar to leave the visible area.

#### Scenario: User scrolls down on a long page
- **WHEN** the user scrolls more than 100px down any page
- **THEN** the nav bar SHALL remain at the top of the viewport, fully visible

#### Scenario: Nav bar does not overlap page content
- **WHEN** the nav bar is rendered
- **THEN** the page content area SHALL begin below the nav bar (no content hidden behind it)

---

### Requirement: Nav links cover all primary sections
The nav bar SHALL contain exactly the following links in order: Projects, About, Experience, Blog, Chat, Contact. Each link SHALL navigate to its corresponding page route.

#### Scenario: All links present
- **WHEN** any page renders
- **THEN** the nav bar SHALL display all six links: Projects, About, Experience, Blog, Chat, Contact

#### Scenario: Links navigate correctly
- **WHEN** the user clicks a nav link
- **THEN** the browser SHALL navigate to the corresponding page without full reload (Next.js client navigation)

---

### Requirement: Active page link is visually distinguished
The nav link corresponding to the current page SHALL be visually distinct from inactive links using the `nav-link-active` design token (surface-alt background, primary text colour).

#### Scenario: Active state on current page
- **WHEN** the user is on the `/projects` page
- **THEN** the "Projects" nav link SHALL have the `nav-link-active` visual style applied
- **THEN** all other nav links SHALL have the default `nav-link` style

#### Scenario: Active state updates on navigation
- **WHEN** the user navigates from `/projects` to `/blog`
- **THEN** the "Blog" nav link SHALL have `nav-link-active` style
- **THEN** the "Projects" nav link SHALL revert to `nav-link` style

---

### Requirement: Nav respects the active theme
The nav bar SHALL render correctly in both light (default) and dark (`[data-theme="dark"]`) modes using the design system colour tokens. No hardcoded hex values SHALL appear in the component.

#### Scenario: Dark mode nav
- **WHEN** `data-theme="dark"` is set on the `<html>` element
- **THEN** the nav bar background, link text, and active link colours SHALL all use their dark-mode token overrides
