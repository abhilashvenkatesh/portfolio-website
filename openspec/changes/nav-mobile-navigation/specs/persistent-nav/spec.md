## MODIFIED Requirements

### Requirement: Nav header layout is responsive to viewport width

The nav header layout SHALL adapt to viewport width. On viewports at or above the `sm` breakpoint (640 px), the header SHALL render four visible flex children in order: logo wordmark (left), nav links (centre), theme toggle button, hire-me CTA anchor (far right). The hire-me CTA and theme toggle SHALL be siblings of `<nav>`, not children. On viewports below 640 px, the header SHALL render two visible children: logo wordmark (left) and hamburger button (right); the nav links, theme toggle, and hire-me CTA SHALL be visually hidden from the header row and accessible only via the mobile menu panel.

#### Scenario: Header four-child layout on desktop

- **WHEN** any page renders on a viewport 640 px wide or wider
- **THEN** the `<header>` SHALL display the logo link, the `<nav>` element, the theme toggle button, and the hire-me CTA anchor — all visible
- **THEN** the theme toggle button SHALL appear between the nav links and the hire-me CTA
- **THEN** the hire-me CTA SHALL appear at the far right

#### Scenario: Header two-child layout on mobile

- **WHEN** any page renders on a viewport narrower than 640 px
- **THEN** the `<header>` SHALL display only two visible items: the logo wordmark on the left and the hamburger button on the right
- **THEN** the nav links, theme toggle, and hire-me CTA SHALL NOT be visible in the header row

#### Scenario: Nav links hidden from header on mobile

- **WHEN** the visitor is on a viewport narrower than 640 px
- **THEN** the six page-navigation links SHALL NOT be visible in the nav header row
- **THEN** those same links SHALL be accessible via the mobile menu

#### Scenario: Theme toggle hidden from header on mobile

- **WHEN** the visitor is on a viewport narrower than 640 px
- **THEN** the theme toggle button SHALL NOT be visible in the nav header row
- **THEN** the theme toggle SHALL be accessible via the mobile menu

#### Scenario: Hire-me CTA hidden from header on mobile

- **WHEN** the visitor is on a viewport narrower than 640 px
- **THEN** the hire-me CTA SHALL NOT be visible in the nav header row
- **THEN** the hire-me CTA SHALL be accessible via the mobile menu
