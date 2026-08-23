# Portfolio v4 Final QA

Scope: implementation phases 23-27 from `docs/portfolio-v4-phases.md`.

## Commands

- `npm run typecheck`: pass.
- `npm run lint`: pass, no ESLint warnings.
- `npm run build`: pass. Next reports the expected edge-runtime warning for
  dynamic `next/og` preview routes.

## Production Route Checks

Checked on `next start` at `http://127.0.0.1:3015`:

- `/`: 200
- `/projects`: 200
- `/projects/policypilot`: 200
- `/thinking`: 200
- `/experience`: 200
- `/travel-life`: 200
- `/contact`: 200
- `/robots.txt`: 200
- `/sitemap.xml`: 200
- `/manifest.webmanifest`: 200
- `/opengraph-image`: 200
- `/projects/policypilot/opengraph-image`: 200

## Lighthouse Production Scores

Reports are saved in `artifacts/qa/v4-final/lighthouse-prod/`.

| Route | Mobile Perf | Mobile A11y | Mobile BP | Mobile SEO | Desktop Perf | Desktop A11y | Desktop BP | Desktop SEO |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 99 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| `/projects` | 100 | 96 | 100 | 100 | 100 | 95 | 100 | 100 |
| `/projects/policypilot` | 100 | 96 | 100 | 100 | 100 | 95 | 100 | 100 |
| `/thinking` | 100 | 95 | 100 | 100 | 100 | 95 | 100 | 100 |
| `/experience` | 100 | 96 | 100 | 100 | 100 | 96 | 100 | 100 |
| `/travel-life` | 98 | 96 | 100 | 100 | 100 | 95 | 100 | 100 |
| `/contact` | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |

## Visual QA

Screenshots are saved in `artifacts/qa/v4-final/`.

- Captured desktop screenshots for the requested routes at 1440px.
- Captured mobile-emulation screenshots for the requested routes at 390px.
- Measured horizontal overflow at 390px and 1024px across the requested routes;
  no offenders remained after moving the full nav to the `xl` breakpoint.

## Cleanup

- Removed the obsolete `ThemeToggle` component.
- Removed unused v3 teal compatibility tokens.
- Removed the unused `motion-border-glow` alias.
- Retained the route progress bar and current motion utilities because they are
  actively used in the v4 shell.
