# Portfolio v4 Implementation Phases

Source plan: `docs/portfolio-v4-plan.md`

This document turns the v4 redesign plan into an implementation sequence. The
goal is to avoid jumping straight into styling and instead migrate the site as a
product system: content first, design system second, homepage third, then inner
pages, QA, cleanup, and polish.

## Reference Images

Use these as visual direction references, not pixel-perfect implementation
targets:

- `docs/portfolio-v4-sample-image-1.png`: nav v4 reference for sticker-style
  tabs, active state, numbered labels, hard shadows, paper texture direction,
  and technical-spec framing.
- `docs/portfolio-v4-sample-image-2.png`: homepage v4 reference for the full
  Portfolio OS composition, hero, recruiter shortcut, selected impact, system
  cards, notes, experience, life, and contact CTA.

Implementation should capture the system qualities from the images while still
using real portfolio content, accessible markup, responsive layouts, and the
existing route structure.

## Working Rules

- Preserve the content-driven architecture. Components should render structured
  data, not branch on specific project names.
- Do not carry two design systems. Each v3 component or utility must be kept,
  adapted, replaced, or removed deliberately.
- Build Paper Mode first. Add Night Poster only if it is intentionally designed.
- Every proof point gets one primary home.
- Every decorative element must communicate information, hierarchy, navigation,
  or interaction.
- Mobile layouts are separate compositions, not stacked desktop leftovers.
- Interactive components must support pointer, keyboard, touch, and reduced
  motion.

## Phase 1: V3 To V4 Migration Matrix

Implementation note: completed in `docs/portfolio-v4-migration-matrix.md`.

### Objective

Document what happens to each distinctive v3 feature before implementation.

### Primary Files

- `docs/portfolio-v4-plan.md`
- `app/globals.css`
- `components/shared/Navbar.tsx`
- `components/shared/SiteProgressBar.tsx`
- `components/motion/Reveal.tsx`
- `components/motion/StaggerGroup.tsx`
- `components/shared/ThemeToggle.tsx`
- `components/sections/TravelMap.tsx`
- `components/sections/USATravelMap.tsx`

### Tasks

- Inventory shared components and CSS utilities.
- Mark each item as `KEEP`, `ADAPT`, `REPLACE`, or `REMOVE`.
- Decide the fate of:
  - dual-name navigation
  - route progress bar
  - reveal/stagger motion
  - theme toggle
  - section gradients
  - travel map
  - motion glow/card utilities
- Record deliberate removals so they do not look accidental later.

### Acceptance Criteria

- Migration decisions are documented.
- No v3 behavior is silently lost.
- Cleanup candidates are identified before redesign work begins.

## Phase 2: Content And Metric Audit

Implementation note: completed in `docs/portfolio-v4-content-metric-audit.md`.

### Objective

Create trustworthy source data for homepage proof, recruiter mode, project
tiles, case studies, and analytics.

### Primary Files

- `content/projects.ts`
- `content/now.ts`
- `content/thinking.ts`
- `lib/content-types.ts`
- `lib/content.ts`
- `lib/resume.ts`
- `data/source/*`

### Tasks

- Audit all existing metrics:
  - `44` production upgrades
  - `50%` downtime reduction
  - `40+` environments, if sourced
  - `25.7x` speedup, if sourced
  - `40%` deployment effectiveness improvement
  - `17` MCP tools, if sourced
- Add or plan a single metric provenance model:

```ts
type Metric = {
  value: string;
  label: string;
  context?: string;
  source?: string;
};
```

- Decide the primary home for each proof point.
- Identify unsupported metrics and omit them until sourced.
- Audit project data for problem, built, scale, result, ownership, links, and
  assets.

### Acceptance Criteria

- Homepage, recruiter mode, resume links, experience, and project pages can use
  the same metric source.
- No headline metric appears without source/context.
- Repeated proof points have clear ownership.

## Phase 3: Layout, Spacing, And Typography System

### Objective

Create the underlying grid and type system before building visual sections.

### Primary Files

- `app/globals.css`
- `tailwind.config.ts`
- `components/shared/SiteContainer.tsx`
- `components/shared/PageHeader.tsx`
- `components/shared/SectionHeading.tsx`

### Tasks

- Define layout tokens:
  - `--page-max`
  - `--content-max`
  - `--reading-max`
  - section desktop/mobile spacing
  - desktop/tablet/mobile gutters
  - grid gaps
- Define typography tokens:
  - display XL
  - display
  - H1
  - H2
  - H3
  - body large
  - body
  - small
  - mono label
  - metric XL
- Define usage rules for uppercase, body line length, headline width, and font
  weights.
- Update containers to respect the new layout system.

### Acceptance Criteria

- Layout primitives support homepage, index pages, and reading pages.
- Typography does not vary arbitrarily by section.
- Reading pages retain comfortable line length.

## Phase 4: Colors, Borders, Shadows, And Theme Decision

### Objective

Replace the v3 soft teal system with controlled neo-brutalist tokens.

### Primary Files

- `app/globals.css`
- `components/shared/ThemeToggle.tsx`
- `components/shared/Navbar.tsx`

### Tasks

- Add Paper Mode tokens:
  - ink
  - paper
  - white
  - yellow
  - red
  - blue
  - green
  - purple
- Add brutalist tokens:
  - `--border-brutal`
  - `--shadow-sm`
  - `--shadow-md`
  - focus ring
  - mobile shadow offsets
- Decide whether to remove dark mode or build Night Poster.
- Remove automatic dark inversion if it weakens the design.
- Replace gradient-led section backgrounds with solid section bands.

### Acceptance Criteria

- V4 has one coherent primary theme.
- Accent colors are mapped to page identities.
- Old teal/glow variables are either removed or clearly retained for a reason.

## Phase 5: Core Brutalist Primitives

### Objective

Build reusable UI primitives before rebuilding large sections.

### Primary Files

- `components/ui/*`
- `components/cards/*`
- `components/shared/*`
- `components/motion/*`

### Tasks

- Create or adapt:
  - `BrutalCard`
  - `BrutalButton`
  - `StickerBadge`
  - `MetricBlock`
  - `SectionBand`
  - `ProofMarquee`
  - `ArchitectureDiagram` or `SystemFlow`
  - `CurrentlyPanel`
  - `RecruiterMode`
- Define the full state model:
  - default
  - hover
  - focus-visible
  - pressed
  - selected
  - disabled
  - reduced-motion
  - touch
- Use physical interaction states:
  - default: large hard shadow
  - hover: smaller shadow and translated element
  - active: shadow nearly gone
  - focus: high-contrast ring

### Acceptance Criteria

- Homepage sections can be built from shared primitives.
- Keyboard focus is visible on all interactive primitives.
- Touch and reduced-motion states are defined.

## Phase 6: Content Models And Rendering Contracts

### Objective

Extend content types so visual components render data rather than custom
project-specific markup.

### Primary Files

- `lib/content-types.ts`
- `content/projects.ts`
- `lib/content.ts`
- `components/cards/VisualProjectTile.tsx`
- `components/ui/ArchitectureDiagram.tsx`

### Tasks

- Extend project data toward:

```ts
type Project = {
  slug: string;
  name: string;
  shortDescription: string;
  category: ProjectCategory;
  accent: Accent;
  problem: string;
  built: string;
  outcome?: string;
  metrics: Metric[];
  stack: string[];
  featured: boolean;
  featuredOrder?: number;
  architecture?: Architecture;
  github?: string;
  demo?: string;
  screenshots?: Asset[];
};
```

- Add architecture and asset types where needed.
- Keep mappers between existing source JSON and v4 display models.
- Avoid `if (project.slug === "...")` rendering branches in UI components.

### Acceptance Criteria

- Featured project tiles are driven by project data.
- Case studies can render common sections from content.
- Missing optional data degrades gracefully.

## Phase 7: Visual Asset Inventory

Implementation note: completed in `docs/portfolio-v4-visual-asset-inventory.md`.

### Objective

Use real work artifacts wherever possible instead of generic visuals.

### Primary Files

- `public/*`
- `assets/projects/*`, if introduced
- project content files

### Tasks

- Create an asset inventory for each flagship project:
  - product screenshot
  - architecture diagram
  - terminal/code snapshot
  - dataset visualization
  - before/after
  - demo GIF/video
  - mobile screenshot
  - result chart
- Decide the primary visual for each featured project.
- Prefer:
  1. real product screenshot
  2. architecture visualization
  3. generated abstract system graphic only as fallback
- Add alt text requirements for every image.

### Acceptance Criteria

- Each flagship project has a visual strategy.
- The homepage avoids generic illustrations when real artifacts exist.
- Missing assets are tracked as follow-up work.

## Phase 8: Navigation And Shared Shell

### Objective

Make the app shell feel v4 while preserving the useful personality of v3.

### Primary Files

- `components/shared/Navbar.tsx`
- `components/shared/SiteProgressBar.tsx`
- `components/shared/Footer.tsx`
- `components/shared/PageHeader.tsx`
- `components/shared/ThemeToggle.tsx`
- `lib/site-config.ts`
- `docs/portfolio-v4-sample-image-1.png`

### Tasks

- Redesign desktop nav as brutalist dual-name tabs.
- Use `docs/portfolio-v4-sample-image-1.png` as the primary visual reference
  for nav tab shape, active state, numbering, shadow, and density.
- Define mobile nav explicitly:
  - no required hover tooltip
  - both playful and canonical names visible or clearly paired
  - large touch targets
- Prototype route progress as a brutalist top rail.
- Evaluate keep/remove for progress bar after visual QA.
- Update page headers to support route accent colors and intensity levels.

### Acceptance Criteria

- Nav works with pointer, keyboard, and touch.
- Mobile nav does not depend on hover.
- Route accents are visible but controlled.

## Phase 9: Hero, Currently, And Recruiter Mode

### Objective

Make the first viewport instantly clear, recruiter-aware, and memorable.

### Primary Files

- `app/page.tsx`
- `components/home/*`, if introduced
- `components/ui/CurrentlyPanel.tsx`
- `components/ui/RecruiterMode.tsx`
- `docs/portfolio-v4-sample-image-2.png`

### Tasks

- Replace the current paragraph-led hero with:
  - large `TANMAY BHUSKUTE` headline
  - one short positioning sentence
  - primary CTAs
  - currently/status panel
  - recruiter shortcut
  - sticker-style proof labels
- Use `docs/portfolio-v4-sample-image-2.png` as the primary visual reference
  for hero hierarchy, recruiter shortcut structure, and first-screen density.
- Build recruiter mode as an accessible dialog or equivalent:
  - focus trap
  - Escape closes
  - resume one click away
  - mobile layout designed separately
  - reduced-motion fallback
- Ensure hero hints at the next section instead of filling the whole scroll.

### Acceptance Criteria

- First viewport explains who Tanmay is and what he builds.
- Recruiter mode is usable by keyboard and touch.
- No long-form reading is required in the hero.

## Phase 10: Selected Impact

### Objective

Make proof impossible to miss without repeating it everywhere.

### Primary Files

- `app/page.tsx`
- `components/ui/MetricBlock.tsx`
- metric/content source files
- `docs/portfolio-v4-sample-image-2.png`

### Tasks

- Build 4-6 oversized metric blocks.
- Use the selected-impact block layout from
  `docs/portfolio-v4-sample-image-2.png` as the visual reference.
- Use only sourced metrics.
- Keep each block to:
  - value
  - label
  - short context/source
- Assign each proof point one primary home.
- Avoid duplicating Selected Impact numbers as competing hero proof.

### Acceptance Criteria

- Selected Impact is scannable in under 5 seconds.
- Each metric traces back to a source.
- Unsupported metrics are omitted.

## Phase 11: Featured Systems

### Objective

Turn projects into scan-first visual decision points.

### Primary Files

- `app/page.tsx`
- `components/cards/VisualProjectTile.tsx`
- `components/cards/FeaturedProjectCard.tsx`
- `content/projects.ts`
- `docs/portfolio-v4-sample-image-2.png`

### Tasks

- Replace homepage `FeaturedProjectCard` with `VisualProjectTile`.
- Use the featured-systems row in `docs/portfolio-v4-sample-image-2.png` as
  the visual reference for project tile hierarchy and density.
- Each tile shows:
  - project name
  - category
  - problem
  - what was built
  - scale
  - result
  - key stack tags
  - clear click affordance
- Use one accent per tile.
- Add physical hover/active states.
- Support missing metric/image without broken layout.

### Acceptance Criteria

- Project value is clear without reading paragraphs.
- Tiles are distinct but use shared structure.
- Links preserve existing project routes.

## Phase 12: Interactive System Builder

### Objective

Build one signature interaction that communicates engineering identity quickly.

### Primary Files

- `components/home/SystemBuilder.tsx`
- `components/ui/SystemFlow.tsx`
- `app/page.tsx`

### Tasks

- Build `I BUILD` options:
  - Cloud
  - Backends
  - AI Systems
  - Dev Tools
  - Data Systems
- Make click/select the fundamental interaction.
- Desktop:
  - hover previews
  - click locks selection
- Keyboard:
  - focus plus Enter/Space selects
- Mobile:
  - tap selects
  - diagrams become vertical flows
- Ensure essential content is visible without hover.

### Acceptance Criteria

- Interaction works across desktop, keyboard, and mobile.
- The selected state is obvious.
- System diagrams remain readable without JavaScript-only assumptions.

## Phase 13: Architecture Diagram System

### Objective

Use diagrams to communicate technical depth faster than paragraphs.

### Primary Files

- `components/ui/ArchitectureDiagram.tsx`
- `components/ui/SystemFlow.tsx`
- `content/projects.ts`
- `app/projects/[slug]/page.tsx`

### Tasks

- Create semantic diagram markup first.
- Add visual layout and animation as progressive enhancement.
- Support:
  - vertical flows
  - horizontal flows
  - branching flows
  - labels and metrics
- Make diagrams responsive and readable at 360px.
- Add reduced-motion behavior.

### Acceptance Criteria

- Diagrams still communicate if animation fails.
- Screen-reader and keyboard behavior are reasonable.
- Project case studies can reuse the diagram system.

## Phase 14: Case Study Template

### Objective

Make project detail pages useful before and during technical interviews.

### Primary Files

- `app/projects/[slug]/page.tsx`
- `components/cards/CaseStudySection.tsx`
- `components/cards/ArchitecturePreview.tsx`
- `content/projects.ts`
- `lib/content-types.ts`

### Tasks

- Restructure project detail pages around:
  - `01 - TL;DR`
  - `02 - Problem`
  - `03 - My Role`
  - `04 - Constraints`
  - `05 - Architecture`
  - `06 - Key Technical Decisions`
  - `07 - Implementation`
  - `08 - What Broke / What Didn't Work`
  - `09 - Results`
  - `10 - What I'd Change Now`
  - `11 - Stack`
  - `12 - Links`
- Add ownership context:
  - solo/team
  - exact ownership
  - what existed before
  - what Tanmay designed
  - what others owned
- Add `Ask Me About` or `Deep Dive` prompts.
- Preserve long-form readability.

### Acceptance Criteria

- Case studies read like engineering stories, not tech lists.
- Each flagship project includes ownership and trade-off context.
- Detail pages use Level 1 brutalism intensity.

## Phase 15: Experience And Research

### Objective

Make production experience and research credible without making the homepage
feel like a resume page.

### Primary Files

- `app/experience/page.tsx`
- `components/cards/ExperienceCard.tsx`
- `components/sections/ExperienceTimeline.tsx`
- `app/page.tsx`
- `content/now.ts`
- `lib/resume.ts`

### Tasks

- Homepage experience:
  - show 2-3 role snapshots
  - lead with strongest outcome
  - avoid bullet-heavy content
- Experience page:
  - keep depth, but improve visual hierarchy
  - use production ownership and metrics
- Research:
  - separate AI/research if it strengthens the story
  - use purple accent
  - lead with experiment, system, and result

### Acceptance Criteria

- Homepage communicates credibility quickly.
- Detailed experience remains available on click.
- Research does not duplicate project proof unnecessarily.

## Phase 16: Thinking And Life

### Objective

Keep personality and writing visible without dragging the homepage back into
book mode.

### Primary Files

- `app/thinking/page.tsx`
- `app/thinking/[slug]/page.tsx`
- `components/cards/ThinkingCard.tsx`
- `app/travel-life/page.tsx`
- `components/travel/*`
- `components/sections/TravelMap.tsx`

### Tasks

- Thinking:
  - show compact note cards
  - use `Notes From The Build` style microcopy
  - keep long reading on detail pages
- Life/travel:
  - make this a visual breather
  - restyle maps and travel cards
  - lazy-load heavy map pieces if needed
- Apply Level 2 intensity to index pages and Level 1 to reading pages.

### Acceptance Criteria

- Notes and life sections add personality without heavy copy.
- Travel remains one of the most visual parts of the site.
- Reading pages remain calm and usable.

## Phase 17: Contact And Conversion

### Objective

Turn the final CTA into a clear conversion surface.

### Primary Files

- `app/contact/page.tsx`
- `components/contact/PinnedContactSection.tsx`
- `components/cards/ContactLinkCard.tsx`
- `app/page.tsx`
- `lib/site-config.ts`

### Tasks

- Build the final CTA around:

```text
AVAILABLE FOR
Software Engineering
Cloud / Infrastructure
Backend Systems
AI Systems

[EMAIL ME] [LINKEDIN] [RESUME]
```

- Add accurate availability details:
  - Cincinnati, OH
  - open to relocation, if true
  - graduation date, if true
- Prioritize actions:
  1. email
  2. LinkedIn
  3. resume
  4. project exploration

### Acceptance Criteria

- Recruiters can act in one click.
- CTA copy matches actual availability.
- Contact page and homepage CTA feel connected.

## Phase 18: Content Compression And Microcopy

### Objective

Cut homepage copy and make labels feel authored.

### Primary Files

- `app/page.tsx`
- `lib/site-config.ts`
- content files
- card components

### Tasks

- Cut homepage paragraphs into one-liners.
- Convert repeated descriptions into badges, stats, and labels.
- Use labels selectively:
  - `Things I've Shipped`
  - `Tools I Reach For`
  - `What I'm Experimenting With`
  - `Notes From The Build`
  - `Let's Build Something`
- Keep deeper text inside clicked/detail states.
- Check that microcopy does not obscure canonical meaning.

### Acceptance Criteria

- Homepage copy is reduced by at least 50%.
- Each section has one main idea.
- Detail pages carry the long-form depth.

## Phase 19: Inner Page Migration

### Objective

Bring all routes into v4 without making every page visually loud.

### Primary Files

- `app/projects/page.tsx`
- `app/projects/[slug]/page.tsx`
- `app/thinking/page.tsx`
- `app/thinking/[slug]/page.tsx`
- `app/experience/page.tsx`
- `app/travel-life/page.tsx`
- `app/contact/page.tsx`
- shared page/card components

### Tasks

- Apply brutalism intensity levels:
  - Level 3: homepage
  - Level 2: index pages
  - Level 1: reading pages
- Apply page accent system.
- Update cards and headers route by route.
- Remove stale v3 gradients/glow classes as pages migrate.
- Check mobile for every route before moving on.

### Acceptance Criteria

- Every route feels like the same v4 system.
- Reading pages are still readable.
- Old v3 visual language is not visible accidentally.

## Phase 20: Metadata And Social Preview

### Objective

Make v4 discoverable and shareable.

### Primary Files

- `app/layout.tsx`
- route-level metadata exports
- `app/sitemap.ts`, if used
- `app/robots.ts`, if used
- public favicon/OG assets

### Tasks

- Add unique title and description per route.
- Add canonical URLs.
- Add OpenGraph and Twitter/X metadata.
- Add project-specific OG images.
- Refresh favicon to match v4.
- Verify sitemap and robots.
- Add JSON-LD where useful.

### Acceptance Criteria

- Core routes have route-specific metadata.
- Project links produce project-specific previews.
- Lighthouse SEO target is reachable.

## Phase 21: Analytics And Event Map

### Objective

Track useful conversion and interest events only if analytics is implemented.

### Primary Files

- analytics utility, if introduced
- CTA components
- project links
- recruiter mode

### Tasks

- Define event names:
  - `resume_download`
  - `linkedin_click`
  - `email_click`
  - `recruiter_mode_open`
  - `project_open`
  - `case_study_depth`
  - `github_click`
  - `demo_click`
- Do not track random hover events.
- Keep implementation removable and privacy-conscious.

### Acceptance Criteria

- Event map exists before instrumentation.
- Primary CTAs are trackable if analytics ships.
- No invasive tracking is added.

## Phase 22: App States

### Objective

Make edge states match v4 and stay useful.

### Primary Files

- `app/not-found.tsx`
- `app/error.tsx`
- `app/loading.tsx`
- nested route state files if needed

### Tasks

- Build 404 around:

```text
404

SYSTEM NOT FOUND.

<- RETURN TO BASE
```

- Add accessible error and loading states.
- Keep actions obvious.
- Avoid over-animating loading states.

### Acceptance Criteria

- 404, loading, and error states feel designed.
- Users can recover easily.
- Reduced motion is respected.

## Phase 23: Accessibility QA

### Objective

Verify v4 is usable despite high-contrast, high-energy visuals.

### Primary Tools

- Lighthouse
- axe, if added
- keyboard-only testing
- browser zoom
- forced-colors/high-contrast spot checks

### Tasks

- Verify foreground/background contrast for every accent.
- Check keyboard access for:
  - nav
  - recruiter mode
  - system builder
  - project tiles
  - contact CTAs
- Test 200% browser zoom.
- Confirm no information is color-only.
- Confirm focus states are visible and consistent.
- Check dialog focus trap and Escape behavior.

### Acceptance Criteria

- Lighthouse Accessibility is above 95 or documented.
- Keyboard-only navigation reaches all primary actions.
- Accent color combinations are safe.

## Phase 24: Performance QA

### Objective

Keep v4 fast even with more visual content.

### Primary Targets

- LCP `< 2.5s`
- CLS `< 0.1`
- INP `< 200ms`
- Lighthouse Performance `> 90`
- Best Practices `> 95`
- SEO `> 95`

### Tasks

- Use `next/image` for images.
- Use `next/font` for fonts.
- Size images properly.
- Lazy-load below-fold imagery.
- Dynamically import heavy interactive sections where useful.
- Lazy-load travel map if it is not above the fold.
- Avoid globally importing Framer Motion everywhere.
- Avoid giant animated SVGs.

### Acceptance Criteria

- Performance budgets are met or exceptions are documented.
- No heavy visual feature blocks first paint unnecessarily.
- Travel map and system builder do not dominate initial load.

## Phase 25: Visual Regression And Cross-Browser QA

### Objective

Catch layout breakage from brutalist shadows, stickers, transforms, and long
content.

### Primary Routes

- `/`
- `/projects`
- `/projects/spendora`
- `/thinking`
- `/experience`
- `/travel-life`
- `/contact`
- recruiter dialog state

### Tasks

- Capture screenshots at:
  - 1440px
  - 1024px
  - 390px
- Test in:
  - Chrome
  - Safari
  - Firefox
  - iOS Safari where practical
- Stress-test components with:
  - very long project names
  - six technology tags
  - missing metric
  - missing image
  - three-line descriptions
  - `C++`
  - `Google Cloud Platform`
  - `Infrastructure Automation`
- Check for:
  - text overflow
  - shadow clipping
  - sticker overlap
  - layout shift
  - sticky nav issues
  - mobile viewport unit issues

### Acceptance Criteria

- Screenshots show no incoherent overlaps.
- Mobile layouts are intentionally composed.
- Core routes work in target browsers.

## Phase 26: Dead-Code And V3 Cleanup

### Objective

Remove the old design system once v4 is fully migrated.

### Primary Files

- `app/globals.css`
- shared components
- card components
- motion components
- dependencies

### Tasks

- Remove dead v3 components.
- Remove obsolete motion classes.
- Remove old teal variables if unused.
- Remove unused gradients.
- Remove duplicated card variants.
- Remove abandoned theme code if dark mode is dropped.
- Run dependency audit.
- Run unused export check if tooling exists.

### Acceptance Criteria

- V4 components and tokens are the clear source of truth.
- No unused v3 styling remains in primary app surfaces.
- Intentional retained behavior is documented.

## Phase 27: Final Build, Review, And Polish

### Objective

Finish v4 in a commit-ready state.

### Commands

```bash
npm run typecheck
npm run lint
npm run build
```

### Tasks

- Run final build checks.
- Review changed files for accidental churn.
- Check route screenshots one last time.
- Confirm no unrelated user changes were reverted.
- Confirm docs match implementation decisions.
- Prepare final summary of:
  - what changed
  - what was removed
  - what was deferred
  - test/QA results

### Acceptance Criteria

- Typecheck passes.
- Lint passes or exceptions are documented.
- Build passes.
- Visual QA is complete.
- Deferred work is tracked clearly.

## Implementation Order Summary

1. Migration matrix.
2. Content and metric audit.
3. Layout and typography system.
4. Visual tokens and theme decision.
5. Core primitives.
6. Content model contracts.
7. Asset inventory.
8. Navigation and shell.
9. Hero, Currently, Recruiter Mode.
10. Selected Impact.
11. Featured Systems.
12. System Builder.
13. Architecture diagrams.
14. Case studies.
15. Experience and research.
16. Thinking and life.
17. Contact conversion.
18. Content compression.
19. Inner page migration.
20. Metadata and social previews.
21. Analytics event map.
22. App states.
23. Accessibility QA.
24. Performance QA.
25. Visual regression and browser QA.
26. Dead-code cleanup.
27. Final build and polish.

## Release Gate

V4 is ready when:

- The homepage is scan-first and visually memorable.
- The first two screens communicate current status, role fit, and proof.
- Recruiter mode, project tiles, and contact CTAs support fast conversion.
- Case studies support engineering interview depth.
- Mobile is intentionally designed.
- Accessibility, performance, metadata, and edge states are handled.
- Old v3 visual-system code is removed or intentionally retained.
- `npm run typecheck`, `npm run lint`, and `npm run build` pass or have
  documented exceptions.
