## MODIFIED Requirements

### Requirement: hero-content-json-source

All hero identity copy (role badge, headline, subheading, description, and stats) SHALL be loaded from `content/home.json` at build time via a typed loader in `lib/content.ts`. No content SHALL be hardcoded in any component.

#### Scenario: Content loads without runtime file access

GIVEN the site is built with `next build`
WHEN `app/page.tsx` renders as a Server Component
THEN `lib/content.ts` SHALL read `content/home.json` using `fs.readFileSync` at build time
AND the resulting typed object SHALL be passed as props to the hero component
AND no `fs` call SHALL occur at request time
