# Capability: hero-headline

## ADDED Requirements

### Requirement: chat-launcher-in-hero

The home-page hero section SHALL include the chat launcher component positioned below the stats bar.

#### Scenario: Chat launcher renders in hero

GIVEN a visitor navigates to the home page
WHEN the hero section renders
THEN the `ChatLauncher` component SHALL appear below the `StatsBar` component
AND the hero section layout (badge, headline, subheading, description, stats bar) SHALL remain unchanged
