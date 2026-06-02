## ADDED Requirements

### Requirement: Logo wordmark navigates to home page
The nav bar SHALL display the "abhilash" text wordmark in the top-left, styled as a link. Clicking it SHALL navigate to the home page (`/`) using client-side navigation.

#### Scenario: Logo present on every page
- **WHEN** any page renders
- **THEN** the nav bar SHALL display "abhilash" in the top-left, visually distinct from nav links (monospace font, tertiary/accent colour)

#### Scenario: Logo navigates home
- **WHEN** the user clicks the "abhilash" wordmark
- **THEN** the browser SHALL navigate to `/` without a full page reload (Next.js client navigation)

#### Scenario: Logo has no active-link state
- **WHEN** the user is on the home page (`/`)
- **THEN** the "abhilash" wordmark SHALL NOT receive `nav-link-active` styling (active state applies only to the six page-section links)
