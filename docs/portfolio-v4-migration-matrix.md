# Portfolio v4 Migration Matrix

Scope: implementation phases 1-7 from `docs/portfolio-v4-phases.md`.

## Shared Components

| Item | Decision | Notes |
| --- | --- | --- |
| `Navbar` | ADAPT later | Keep current route structure for phases 1-7. Phase 8 will redesign the shell using `portfolio-v4-sample-image-1.png`. |
| Dual-name navigation | ADAPT later | Preserve labels and real names; redesign desktop/mobile interaction in phase 8. |
| `SiteProgressBar` | ADAPT later | Keep behavior for now. Prototype as a brutalist rail during phase 8 before deciding final fate. |
| `ThemeToggle` | REMOVE behavior | V4 ships Paper Mode only. Component now renders a non-interactive Paper status badge and clears old theme storage. |
| `Reveal` / `StaggerGroup` | KEEP + ADAPT | Keep intersection behavior and reduced-motion fallback. CSS now uses v4 physical motion tokens. |
| `SiteContainer` | ADAPT | Uses v4 max-width and gutter tokens. |
| `PageHeader` | ADAPT | Uses v4 typography, Paper Mode, and thick borders. |
| `SectionHeading` | ADAPT | Uses v4 type scale and mono label rules. |
| `FeaturedProjectCard` | KEEP temporarily | Updated for metric objects. Replaced by `VisualProjectTile` in phase 11. |
| `ProjectCard` | KEEP temporarily | Updated for metric objects. Index-page redesign comes later. |
| `MetricBadge` / `TechStackBadge` | ADAPT later | Existing pages still use them; new v4 work should prefer `StickerBadge` and `MetricBlock`. |
| `TravelMap` / `USATravelMap` | KEEP + RESTYLE later | Preserve map content and interaction. Restyle during inner-page/travel phases. |

## CSS Utilities

| Item | Decision | Notes |
| --- | --- | --- |
| `section-gradient-*` | REPLACE visually | Class names remain for migration safety, but now render solid Paper Mode section bands. |
| `.soft-grid` | ADAPT | Keeps technical grid texture, now lower-contrast ink-on-paper. |
| `.motion-card` | REPLACE behavior | Now uses hard shadows and physical hover/active states. |
| `.motion-border-glow` | REMOVE glow / KEEP alias | Glow behavior is gone. Class remains as an alias so current routes do not break before cleanup. |
| `.motion-focus` | ADAPT | Uses high-contrast v4 focus ring. |
| Teal variables | ADAPT as aliases | Existing component references still compile, but aliases now point to v4 accents. New code should use `--blue`, `--purple`, `--yellow`, `--green`, `--red`. |
| Automatic dark inversion | REMOVE | `data-theme="dark"` intentionally maps to Paper Mode until/unless Night Poster is designed. |

## Deliberate Removals

- V3 dark/light toggle behavior.
- Soft teal radial body background.
- Glow-card hover treatment.
- Automatic theme inversion.

## Preserved Behaviors

- Existing route structure and links.
- Content-driven project rendering.
- Current reveal/stagger reduced-motion fallback.
- Route progress behavior until phase 8 evaluation.
- Travel map data and interaction until its later restyle.
