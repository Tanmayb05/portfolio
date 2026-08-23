# Portfolio v3 — Current State

Snapshot of the live site as of 2026-08-22 (root of repo, promoted from `new/v3`). See [site-system.md](./site-system.md) for original design spec, [planning.md](./planning.md) for content rules, [v4-plan.md](./v4-plan.md) for the proposed next redesign.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind, framer-motion, react-simple-maps + topojson (travel map). Content-driven: pages read from `content/*.ts`, sourced from `data/source/*.json` — no hardcoded copy in components.

## Routes

| Route | Nav label | Real name |
|---|---|---|
| `/` | — | Home — compressed preview of every section below |
| `/experience` | War Stories | Experience / resume timeline |
| `/projects`, `/projects/[slug]` | Things I Built | Projects list + detail |
| `/thinking`, `/thinking/[slug]` | Brain Dump | Notes / essays |
| `/travel-life` | Life, Offline | Travel map + life systems |
| `/contact` | Say Hi | Contact |

Homepage order: hero → featured projects → thinking preview → experience preview → travel preview → "now" snapshot → soft CTA.

## Tone

First-person, systems-first, dry confidence. Hero line: "I build systems, automate workflows, and document how I think." Nav items carry a wry alt-name alongside the literal one (e.g. Experience / War Stories), revealed on hover. Even the travel/life page frames hobbies as "systems" ("life systems," "optimization frameworks"). Travel & Life page is explicitly honest about being a placeholder — copy says data isn't real yet rather than faking completeness.

## Animation inventory

- `Reveal` (`components/motion/Reveal.tsx`) — IntersectionObserver-triggered fade + translateY(14px), cubic-bezier(0.22,1,0.36,1), ~520ms default. Honors `prefers-reduced-motion` (skips to visible, no observer).
- `StaggerGroup` — wraps children in `Reveal` with incremental delay (80-90ms steps) for cascading card-grid entrances.
- `SiteProgressBar` — fixed top bar, one segment per nav route; segments before current route are full, current segment fills with scroll %, later segments empty.
- `.motion-card` — hover lift, `translateY(-3px)`.
- `.motion-border-glow` — teal ring + shadow on hover/focus-visible.
- `.motion-link` — underline sweeps in via `scaleX(0 → 1)` on hover/active.
- Theme toggle — dark/light via `data-theme` attr, persisted to `localStorage`, applied by inline script in `<head>` to avoid flash-of-wrong-theme.
- Nav hover tooltip — real name surfaces under alt-name label.

Global reduced-motion media query zeroes out transition/animation durations and forces reveals visible.

## Unique elements

1. **Dual-naming nav** — literal + wry label shown together, not a rename.
2. **Route-segmented scroll-progress bar** — maps site structure to scroll position, not just page-local %.
3. **Self-aware WIP copy** on Travel & Life — states plainly that content is placeholder.
4. **"Current signal" hero card** — resume metrics (44 upgrades, 50% downtime cut) styled as live status feed, not a stats block.
5. **Per-section gradient tinting** (`section-gradient-hero/projects/thinking/experience/travel/contact`) — each homepage section shifts background hue slightly, giving scroll a sense of moving through zones.

## Design tokens

CSS custom properties, full dark/light pairs — background layers, surface/elevated surfaces, borders, text tiers, teal accent (`#2dd4bf` dark / `#0f766e` light). Mono font for eyebrows/labels, sans for body. Accessible focus rings via `.motion-focus`.

## History note

`new/v2` and `new/v3` were parallel redesign experiments; `new/v3` was merged and promoted to repo root (commit `d5783ea` "Move new/v3 to repo root for v3 branch"), making this the current live version. `docs/v4-plan.md` describes a proposed neo-brutalist follow-up that has not been implemented yet.
