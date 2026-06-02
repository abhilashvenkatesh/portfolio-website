## MODIFIED Requirements

### Requirement: Nav header contains hire-me CTA as a third flex child

The nav header SHALL render four flex children in order: logo wordmark (left), nav links (centre), theme toggle button, hire-me CTA anchor (far right). The hire-me CTA and theme toggle SHALL be siblings of `<nav>`, not children.

#### Scenario: Header four-child layout

- **WHEN** any page renders
- **THEN** the `<header>` SHALL contain exactly four direct children: the logo link, the `<nav>` element, the theme toggle button, and the hire-me CTA anchor
- **THEN** the theme toggle button SHALL appear between the nav links and the hire-me CTA
- **THEN** the hire-me CTA SHALL appear at the far right
