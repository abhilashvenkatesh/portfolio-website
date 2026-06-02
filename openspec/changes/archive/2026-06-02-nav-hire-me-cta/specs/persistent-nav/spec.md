## ADDED Requirements

### Requirement: Nav header contains hire-me CTA as a third flex child
The nav header SHALL render three flex children in order: logo wordmark (left), nav links (centre/right), hire-me CTA anchor (far right). The hire-me CTA SHALL be a sibling of `<nav>`, not a child.

#### Scenario: Header three-child layout
- **WHEN** any page renders
- **THEN** the `<header>` SHALL contain exactly three direct children: the logo link, the `<nav>` element, and the hire-me CTA anchor
- **THEN** the hire-me CTA SHALL appear to the right of the nav links
