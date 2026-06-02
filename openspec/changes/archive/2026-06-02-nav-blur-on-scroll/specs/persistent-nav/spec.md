## ADDED Requirements

### Requirement: Nav applies frosted-glass blur effect when scrolled
When the visitor has scrolled below the top of the page, the nav bar SHALL apply a frosted-glass visual effect via `backdrop-blur` and a semi-transparent background. When the visitor is at the top of the page (scroll position 0), the nav bar SHALL revert to its default transparent background with no blur.

#### Scenario: Blur applied after scrolling down
- **WHEN** the user scrolls more than 0px down any page
- **THEN** the nav bar SHALL apply a `backdrop-filter: blur(...)` and a semi-transparent background colour

#### Scenario: Blur removed when back at top
- **WHEN** the user scrolls back to the top of the page (scrollY === 0)
- **THEN** the nav bar SHALL remove the blur and semi-transparent background, restoring its default appearance

---

### Requirement: Nav border-bottom is visible when scrolled
When the frosted-glass effect is active, the nav bar SHALL display a visible border-bottom to separate it from page content below. When at the top of the page, the border-bottom SHALL be transparent or absent.

#### Scenario: Border visible when scrolled
- **WHEN** the user has scrolled below the top of the page
- **THEN** the nav bar SHALL show a visible border-bottom using the appropriate design-system border token

#### Scenario: Border hidden at top
- **WHEN** the user is at the top of the page (scrollY === 0)
- **THEN** the nav bar border-bottom SHALL be transparent or not rendered
