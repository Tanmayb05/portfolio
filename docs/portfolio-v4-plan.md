# Portfolio v4 Redesign Plan

## Goal

Redesign the portfolio from a calm, text-heavy technical site into a punchy,
scan-first portfolio with a neo-brutalist visual system. The homepage should
feel immediate, visual, and easy to understand. Long-form explanation should
appear only when a visitor intentionally opens a project, note, drawer, or
detail page.

## Product Direction

V4 should feel like a technical magazine/poster crossed with an operating-system
dashboard: bold type, hard edges, thick borders, strong color contrast, animated
proof points, architecture visuals, and compact interactive cards.

Primary visual references:

- `docs/portfolio-v4-sample-image-1.png`: top-nav component reference with
  sticker/alternate-direction tabs, active state, hard shadow, numbered tabs,
  and paper/ink technical-spec framing.
- `docs/portfolio-v4-sample-image-2.png`: full homepage reference for the
  Portfolio OS layout, hero, recruiter shortcut, selected impact, featured
  systems, notes, experience, life, and contact sections.

Use these as direction references, not pixel-perfect mocks. Preserve the
portfolio's real content, routes, accessibility, responsive behavior, and
content-driven architecture.

The experience should answer these questions quickly:

- Who is Tanmay?
- What systems does he build?
- What proof exists that he can ship?
- Which projects are worth clicking into?
- What is he learning or exploring right now?
- How can someone contact him?

## Core Design Principles

- **Scan first, read second:** every homepage section must be understandable in
  3-5 seconds.
- **Book mode only after click:** detailed writing belongs on case studies,
  thinking posts, expandable panels, and focused detail pages.
- **Neo-brutalist, not chaotic:** use thick borders, strong shadows, blocky
  layout, offset cards, and vivid colors, while preserving spacing and hierarchy.
- **Proof over description:** lead with metrics, shipped systems, constraints,
  and outcomes instead of broad self-description.
- **Motion with purpose:** animation should clarify hierarchy, make the site
  feel alive, and reward interaction without harming readability.
- **Responsive by design:** mobile must feel equally intentional, not like a
  compressed desktop poster.
- **Recruiter-aware:** the first two screens should prove role fit, current
  status, and technical credibility before asking anyone to read.
- **No decoration without information:** every sticker, block, arrow, ticker,
  diagram, badge, or animation should communicate information, establish
  hierarchy, provide navigation, or reinforce interaction.
- **Brutalist surface, Swiss grid:** the visual language can be loud, but the
  spacing, alignment, and responsive grid should be disciplined.

## Visual System

### Palette

Move away from the current mostly dark teal theme. Use a stronger multi-accent
system:

- Ink: `#050505`
- Paper: `#fff8e8`
- White: `#ffffff`
- Electric yellow: `#f7ff00`
- Signal coral: `#ff4d4d`
- Cobalt: `#2458ff`
- Acid green: `#38ff7a`
- Violet: `#a855f7`

### Shape Language

- 2-4px black borders on major cards and buttons.
- Hard offset shadows, usually `6px 6px 0 #050505`.
- Minimal border radius, usually `0px` to `8px`.
- Sticker-like labels for role, category, metrics, and status.
- Large block sections with contrasting backgrounds.
- No soft glassmorphism or subtle teal-only gradients on the homepage.

### Control Rules

Neo-brutalism should feel intentional, not random. Use constraints:

- Limit each section to one primary accent color.
- Standardize major borders around `3px` or `4px`.
- Standardize hard-shadow offsets:
  - small: `4px 4px 0 #050505`
  - medium: `7px 7px 0 #050505`
- Use only 2-3 core card variants.
- Keep the page background comparatively neutral so colored blocks carry the
  energy.
- Use consistent corner treatment, mostly square or slightly rounded, instead
  of mixing many radii.
- Avoid making every component uppercase or bold; quiet typography is needed to
  make the loud elements work.

Suggested token direction:

```css
--border-brutal: 3px solid #111;
--shadow-sm: 4px 4px 0 #111;
--shadow-md: 7px 7px 0 #111;

--yellow: #ffe66d;
--red: #ff6b6b;
--blue: #5b8cff;
--green: #62d98b;
--purple: #c59cff;
```

### Typography

- Large, compact hero headline.
- Short section titles with direct language.
- Mono labels for system/status/proof metadata.
- Body copy reduced and moved into detail surfaces.
- Use a bold display treatment for major headlines.
- Use a highly readable sans-serif for body text.
- Use monospace only for technical metadata, commands, tags, and metrics.

The hero can let `TANMAY BHUSKUTE` occupy a large part of the first viewport,
with a short positioning line underneath:

> Software engineer building cloud infrastructure, AI systems, and reliable
> software.

### Typography Scale

Define a type scale before redesigning individual sections so each page does not
invent its own typography.

Suggested scale:

```css
--text-display-xl: clamp(4rem, 10vw, 9rem);
--text-display: clamp(3rem, 7vw, 6rem);
--text-h1: clamp(2.5rem, 5vw, 4.5rem);
--text-h2: clamp(2rem, 4vw, 3.5rem);
--text-h3: clamp(1.4rem, 2.4vw, 2rem);
--text-body-lg: clamp(1.05rem, 1.4vw, 1.25rem);
--text-body: 1rem;
--text-small: 0.875rem;
--text-mono-label: 0.75rem;
--text-metric-xl: clamp(3.5rem, 8vw, 7rem);
```

Typography rules:

- Define heading line heights per scale.
- Define maximum headline width.
- Keep body line length readable, especially on case studies.
- Limit font weights to a small set.
- Use uppercase for labels, nav treatments, and selected display moments only.

### Layout System

The layout system should be defined separately from the visual skin. Suggested
tokens:

```css
--page-max: 1440px;
--content-max: 1180px;
--reading-max: 760px;

--space-section-desktop: 120px;
--space-section-mobile: 72px;

--gutter-desktop: 48px;
--gutter-tablet: 32px;
--gutter-mobile: 18px;

--gap-grid: 24px;
```

Layout rules:

- Define page max width, content max width, and reading max width.
- Define section vertical spacing for desktop and mobile.
- Define grid columns and card gaps.
- Define breakpoint strategy before building visual sections.
- Define hero height constraints so the first viewport is bold without hiding
  the next section.

### Theme Decision

V4 should make a hard theme decision before implementation.

Recommendation:

- Primary theme: **Paper Mode**
- Paper: `#fff8e8`
- Ink: `#050505`
- Strong accents for section identity

Options:

- Option A: remove dark mode entirely.
- Option B: intentionally design a second **Night Poster** palette.

Do not rely on automatic inversion. A brutalist dark mode should be designed as
its own palette, not generated from v3 dark tokens.

### Page Accent System

Give major areas a recognizable identity while keeping the same brutalist
foundation:

- Blue: projects and systems
- Purple: AI and research
- Yellow: writing and thinking
- Green: currently/about/status
- Red: contact and CTA moments

### Brutalism Intensity

Not every route should carry the same visual volume.

- Level 3: homepage. Maximum visual energy.
- Level 2: index pages such as projects, experience, and thinking. Strong
  brutalist elements, calmer density.
- Level 1: reading pages such as case studies and essays. Brutalist headers,
  diagrams, and callouts, but conventional readable body content.

## Information Architecture

### Homepage

The homepage becomes a visual command center:

1. Screen 1: Hero + Currently + recruiter shortcut
2. Screen 2: Selected Impact
3. Screens 3-4: Featured Systems
4. Screen 5: Interactive `I BUILD` system
5. Screen 6: Experience + Research
6. Screen 7: Notes + Life
7. Screen 8: Big Contact CTA

Proof should appear before biography. Within roughly the first two screens, a
visitor should understand that Tanmay has shipped production infrastructure,
works across cloud/backend/AI, has measurable impact, and is now doing AI
systems research.

### Homepage Repetition Rules

Every major proof point gets one primary home. Other sections may reference it,
but should not visually repeat it as headline proof.

Suggested ownership:

- `44 upgrades`: Selected Impact
- `40+ environments`: Cloud system builder, only if source content supports it
- `25.7x`: Research or AI systems proof, only if source content supports it
- `AWS/Kubernetes`: architecture/system visualization
- `Siemens production ownership`: Experience
- `17 MCP tools`: PolicyPilot or architecture diagram, if source content
  supports it

### Detail Pages

Project, thinking, experience, and travel pages keep the deeper reading
experience. They should still inherit the v4 visual language, but can be calmer
and more structured because the visitor has chosen to read.

### Visitor Paths

V4 should progressively reveal depth for three audiences:

- Recruiter: who, years, skills, impact, resume, contact.
- Hiring manager: ownership, scale, trade-offs, production experience.
- Engineer/interviewer: architecture, implementation, failures, decisions, code.

Progression:

```text
Homepage
  -> recruiter scanning

Project tile
  -> hiring manager context

Case study
  -> engineering depth
```

### Recruiter Mode

Add a compact optional path for visitors short on time:

**SHORT ON TIME? -> 30 SEC VERSION**

This can open a drawer, modal, or compressed section:

```text
2+ YEARS SWE
|
SIEMENS
|
AWS / KUBERNETES / PYTHON
|
M.S. COMPUTER SCIENCE
|
AI SYSTEMS RESEARCH
|
RESUME / LINKEDIN / EMAIL
```

The goal is not to replace the homepage. The goal is to acknowledge real
portfolio review behavior and give recruiters a fast, useful path.

Recruiter mode should contain:

```text
TANMAY BHUSKUTE

SOFTWARE ENGINEER
Cloud Infrastructure / Backend / AI Systems

2+ YEARS
Siemens

PRODUCTION
44 upgrades
40+ environments, if sourced
50% downtime reduction

NOW
M.S. CS
AI systems research

STACK
Python / Java / AWS / Kubernetes / Terraform

[RESUME]
[LINKEDIN]
[EMAIL]
[VIEW 3 PROJECTS]
```

Behavior requirements:

- Use a keyboard-accessible `<dialog>` or equivalent accessible primitive.
- Trap focus while open.
- Escape closes.
- Resume is one click away.
- URL remains unchanged unless a deliberate `/quick` route is added.
- Deep links still work.
- No motion under reduced-motion preferences.
- Mobile layout is designed separately.

## Content Architecture

V4 should preserve the existing content-driven architecture. Visual components
should render structured content, not hardcode project-specific markup.

Project model direction:

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

Metric model direction:

```ts
type Metric = {
  value: string;
  label: string;
  context?: string;
  source?: string;
};
```

Architecture model direction:

```ts
type Architecture = {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
};
```

Rendering rule:

```tsx
// Good: component renders structured data.
<VisualProjectTile project={project} />

// Avoid: project-specific component branches.
if (project.slug === "policypilot") {
  // custom project markup
}
```

### Content Provenance

Create one source of truth for metrics used across homepage, experience,
project pages, resume links, and recruiter mode.

Examples:

- `44` production upgrades
- `50%` downtime reduction
- `40+` environments, if sourced
- `25.7x` speedup, if sourced
- `40%` deployment effectiveness improvement
- `17` MCP tools, if sourced

Each metric should include value, label, context, and source.

### Visual Asset Strategy

V4 should use actual work artifacts wherever possible.

Inventory asset folders such as:

```text
assets/projects/policypilot/
assets/projects/android-research/
assets/projects/nyc-mobility/
```

For each flagship project, determine whether there is:

- product screenshot
- architecture diagram
- terminal/code snapshot
- dataset visualization
- before/after
- demo GIF/video
- mobile screenshot
- result chart

Hero project image priority:

1. Real product screenshot
2. Architecture visualization
3. Generated abstract system graphic only as fallback

Avoid generic illustrations when a real artifact can communicate credibility.

## Phase 0: Baseline And Audit

### Objective

Capture the current state before making visual changes.

### Tasks

- Confirm current branch is `v4`.
- Run `npm run typecheck`.
- Run `npm run lint`.
- Start the local app and capture screenshots for:
  - `/`
  - `/projects`
  - `/projects/spendora`
  - `/thinking`
  - `/experience`
  - `/travel-life`
  - `/contact`
- Audit homepage text density section by section.
- Identify reusable components that need redesign:
  - `FeaturedProjectCard`
  - `ProjectCard`
  - `ThinkingCard`
  - `NowCard`
  - `MetricBadge`
  - `TechStackBadge`
  - `PageHeader`
  - `Navbar`

### Deliverables

- Baseline screenshots.
- Short audit notes with priority issues.
- Confirmed build/type/lint status before redesign.

## Phase 0.5: Migration Decisions

### Objective

Decide what happens to every distinctive v3 feature before implementation.

### Migration Matrix

| V3 feature | V4 decision | Notes |
| --- | --- | --- |
| Dual-name navigation | Adapt | Keep personality, redesign desktop/mobile interaction |
| Route progress bar | Prototype / evaluate | May clash visually with brutalist navbar |
| Reveal/StaggerGroup | Keep + modify | Add block and sticker variants |
| Current Signal | Evolve | Becomes `CurrentlyPanel` |
| Section gradients | Remove | Replace with solid section bands |
| Theme toggle | Decide explicitly | Remove or redesign as Night Poster |
| Travel map | Keep + restyle | Strong visual breather |
| `.motion-card` | Replace | Physical brutalist interaction |
| `.motion-border-glow` | Remove | Does not belong in v4 |
| Content-driven architecture | Must preserve | No hardcoded homepage data |

### Tasks

- Inventory every existing shared component.
- Classify each component as `KEEP`, `ADAPT`, `REPLACE`, or `REMOVE`.
- Inventory CSS utilities that become obsolete.
- Identify v3-specific behavior that must survive.
- Document deliberate feature removals.
- Ensure v4 does not leave unused v3 CSS/components behind.

### Deliverables

- Migration matrix committed into this plan or a linked audit document.
- Explicit keep/adapt/remove decisions for shared components and CSS utilities.
- List of v3 features that must be preserved during redesign.

## Phase 1: V4 Design Tokens

### Objective

Replace the current soft teal design foundation with a reusable neo-brutalist
theme that is expressive but controlled.

### Tasks

- Update `app/globals.css` variables for v4 colors, shadows, borders, and
  surfaces.
- Add explicit tokens for:
  - `--border-brutal`
  - `--shadow-sm`
  - `--shadow-md`
  - `--page-max`
  - `--content-max`
  - `--reading-max`
  - section spacing
  - desktop/tablet/mobile gutters
  - typography scale
  - section accent colors
  - focus-ring color
  - mobile shadow offsets
- Add utility classes for:
  - brutalist border
  - hard shadow
  - offset hover
  - sticker label
  - marquee track
  - high-contrast focus state
- Define 2-3 reusable card variants instead of one-off card styles.
- Define section accent rules so each section has one dominant accent.
- Decide whether v4 ships Paper Mode only or a deliberately designed Night
  Poster mode.
- Keep reduced-motion handling.
- Remove automatic dark-mode compatibility if it dilutes the v4 direction.

### Deliverables

- New global visual tokens.
- Reusable CSS utilities for brutalist surfaces.
- Written constraints for border, shadow, radius, section accent, and card
  variant usage.
- Written layout and typography token rules.
- Explicit Paper Mode vs Night Poster decision.
- No route-level layout regressions.

## Phase 2: Reusable UI Primitives

### Objective

Create small building blocks that make the redesign consistent and easy to
apply across the site.

### Tasks

- Create `BrutalCard` for bordered, shadowed, offset cards.
- Create `StickerBadge` for categories, metrics, and statuses.
- Create `BrutalButton` or update existing link styles into a shared pattern.
- Create `ProofMarquee` for high-impact metric strips.
- Create `VisualProjectTile` for homepage featured work.
- Create `MetricBlock` for oversized impact stats.
- Create `CurrentlyPanel` for recruiter-relevant current status.
- Create `ArchitectureDiagram` or `SystemFlow` for simple brutalist diagrams.
- Create `RecruiterMode` as a drawer, modal, or collapsible section.
- Create `SectionBand` or section utility classes for bold background changes.
- Define state models for each interactive primitive:
  - default
  - hover
  - focus-visible
  - pressed
  - selected
  - disabled
  - reduced-motion
  - touch
- Use the same physical interaction model across buttons/cards:
  - default: `7px` shadow
  - hover: `4px` shadow and `translate(3px, 3px)`
  - active: `0px` shadow and `translate(7px, 7px)`
  - focus: high-contrast outer ring
- Make diagrams progressively enhanced: meaningful semantic markup first,
  animation/positioning second.

### Deliverables

- Shared primitives in `components/`.
- Homepage-ready variants for cards, badges, buttons, and proof strips.
- First pass of architecture diagram primitives that can render text-based
  flows responsively.
- Complete state model for core interactive components.
- Components remain accessible with semantic HTML and visible focus states.

## Phase 3: Homepage Hero Redesign

### Objective

Make the first viewport instantly memorable and clear.

### Current Problem

The current hero reads like an intro paragraph. It is polished, but quiet. The
right-side card repeats proof in a conventional way and does not create a strong
visual first impression.

### Tasks

- Replace the current hero with a bold layout:
  - large name-led headline, for example `TANMAY BHUSKUTE`
  - one short positioning sentence
  - 3 proof badges
  - 2 primary actions
  - currently/status panel
  - animated visual system blocks or system-builder preview
- Add motion:
  - staggered headline/block entrance
  - subtle block movement or hover response
  - no distracting continuous animation over body text
- Reduce hero paragraph to one short sentence.
- Make the hero fit above the fold while hinting at the next section.
- Add a `SHORT ON TIME? -> 30 SEC VERSION` trigger for recruiter mode.
- Use sticker-like elements attached to or overlapping the hero composition.

### Deliverables

- Rebuilt hero in `app/page.tsx`.
- Strong mobile and desktop first viewport.
- Clear CTAs to projects and contact/resume.
- Recruiter mode is discoverable without dominating the hero.

## Phase 4: Selected Impact And Currently

### Objective

Surface the strongest proof and current status before biography.

### Current Problem

The current homepage includes good proof points, but they are embedded inside
cards or descriptive copy. Recruiters and engineers should see the strongest
signals almost immediately.

### Tasks

- Add a dedicated `Currently` block near the hero:
  - building LLM-driven Android bug reproduction
  - M.S. CS @ University of Cincinnati
  - looking for SWE / Cloud / Infrastructure roles
  - Cincinnati, OH
- Treat `Currently` like a system-status panel, not an about paragraph.
- Add a `Selected Impact` section with 4-6 oversized metric blocks:
  - `44` production upgrades
  - `50% down` downtime
  - `40+` environments migrated, if supported by source content
  - `25.7x` LLM pipeline speedup, if supported by source content
  - `40%` deployment effectiveness improvement
- Keep each metric block to one number, one label, and optional source/context.
- Place this high on the homepage, before project cards.

### Deliverables

- Recruiter-relevant current status is visible in the first viewport or near it.
- Impact metrics become a major visual moment.
- Unsupported metrics are either sourced from content or omitted.

## Phase 5: Featured Systems And Case Studies

### Objective

Turn project cards into visual decision points and make project detail pages
feel like real case studies.

### Current Problem

The current featured cards are useful, but they all look similar and require
reading paragraphs to understand value.

### Tasks

- Replace homepage `FeaturedProjectCard` usage with `VisualProjectTile`.
- For each featured project show:
  - project name
  - category
  - problem
  - what was built
  - scale
  - result
  - 3-4 tech tags
  - clear click affordance
- Add distinct accent color per featured project.
- Add hover states:
  - offset shadow shift
  - reveal one extra detail
  - arrow movement
- Keep full case study depth on `/projects/[slug]`.
- Update case study pages to follow a clearer story:
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
- Add `My Role` detail:
  - solo/team
  - exact ownership
  - what existed before
  - what Tanmay personally designed
  - what others owned
- Add `What Didn't Work` details where possible:
  - tried X
  - encountered Y
  - switched to Z because...
- Add `Ask Me About` or `Deep Dive` prompts for major projects:
  - why a key architecture boundary exists
  - how a metric was measured
  - what trade-off mattered most
- Use brutalist architecture diagrams for systems-oriented projects.

### Deliverables

- Featured work section that can be scanned without reading paragraphs.
- Project tiles feel visually distinct.
- Links preserve current routing.
- Project detail pages support interviews and deeper technical evaluation.
- Each major project includes 2-4 interview hooks where useful.

## Phase 6: Interactive System Builder

### Objective

Add one signature interaction that communicates engineering identity quickly.

### Tasks

- Build an interactive `I BUILD` system-builder module:
  - Cloud
  - Backends
  - AI Systems
  - Dev Tools
  - Data Systems
- On hover/focus/click, update an adjacent architecture visualization and proof
  point.
- Make click/select the fundamental interaction:
  - desktop hover previews
  - desktop click locks selection
  - keyboard focus + Enter/Space selects
  - mobile tap selects
- Example cloud flow:

```text
AWS -> Terraform -> Kubernetes -> ArgoCD
              |
         40+ ENVIRONMENTS
```

- Example AI systems flow:

```text
VIDEO -> GEMINI -> AGENTS -> ANDROID
                     |
                  25.7x
```

- Ensure the interaction works by keyboard and touch.
- On mobile, convert the module into stacked selectable panels with vertical
  flows.

### Deliverables

- One memorable interaction on the homepage.
- Architecture diagrams communicate depth faster than paragraphs.
- The interaction is accessible and usable on mobile.
- The system builder does not depend on hover to reveal essential content.

## Phase 7: Skills And Architecture Visuals

### Objective

Surface technical range with diagrams and compact visual systems.

### Tasks

- Add a proof marquee or proof rail with metrics:
  - reduced upgrade downtime by 50%
  - delivered 44 production upgrades in 4 months
  - improved deployment effectiveness by 40%
  - AWS, DevOps, backend, AI, data systems
- Replace text-heavy skill descriptions with a visual system map:
  - Backend systems
  - AI systems
  - DevOps automation
  - Data systems
  - Product thinking
- Use compact cards with icons or bold initials.
- Add click/hover states that reveal one supporting detail.
- Add architecture diagrams for strongest systems work, such as:

```text
VIDEO
  |
VLM
  |
PLANNER -> EXECUTOR -> VERIFIER
                    |
                 ANDROID
```

```text
USER
 |
REACT
 |
NODE API
 |
MCP SERVER
 |
17 TOOLS -> GEMINI -> POLICY DATA
```

### Deliverables

- Proof section that communicates credibility in under 5 seconds.
- Skills section that feels visual and interactive, not like a resume paragraph.
- Reusable diagram style for homepage and case studies.

## Phase 8: Experience, Research, Thinking, And Life Sections

### Objective

Keep secondary homepage content lightweight while preserving pathways to depth.

### Tasks

- Experience:
  - show only 2-3 role snapshots
  - lead with company, role, date, and one strongest outcome
  - move bullet-heavy content to `/experience`
- Research:
  - separate AI/research work from general projects if it strengthens the story
  - use purple accent
  - lead with experiment, system, and result
- Thinking:
  - show 3 compact note cards
  - use tags and punchy titles
  - avoid section descriptions longer than one sentence
- Travel & Life:
  - make this the visual breather
  - use the existing map/travel data more prominently
  - use color contrast and playful card layout
- Current/Now:
  - keep only the strongest current signals
  - avoid repeating the same "living system" language

### Deliverables

- Homepage secondary sections reduced in text density.
- Clear routes into deeper reading.
- Travel/life section adds visual variety to the page.

## Phase 9: Shared Layout Refresh

### Objective

Make the rest of the site feel like v4 without making every page loud.

### Tasks

- Update `Navbar`:
  - stronger active states
  - brutalist border/shadow treatment
  - clearer mobile menu styling
  - explicit mobile dual-name strategy instead of desktop hover tooltips
- Update `PageHeader`:
  - bold title blocks
  - less descriptive copy by default
  - optional color variant per page
- Update cards used across index pages:
  - `ProjectCard`
  - `ThinkingCard`
  - `ExperienceCard`
  - `NowCard`
  - `ContactLinkCard`
- Keep article/detail pages readable with better hierarchy.
- Apply page accents:
  - projects: blue
  - AI/research: purple
  - thinking: yellow
  - currently/about: green
  - contact: red
- Prototype the route progress bar as a brutalist top rail, then evaluate
  whether to keep or remove it.

### Deliverables

- Consistent v4 shell across the site.
- Detail pages remain comfortable for long reading.
- Index pages become more visual and scannable.
- Mobile navigation preserves the personality of v3 without relying on hover.

## Phase 9.5: Conversion And Contact Strategy

### Objective

Make the final CTA behave like a conversion surface, not another decorative
portfolio section.

### Tasks

- Define the primary conversion action:
  - email
  - LinkedIn
  - resume
  - view projects
- Build the contact section around:

```text
AVAILABLE FOR
Software Engineering
Cloud / Infrastructure
Backend Systems
AI Systems

[EMAIL ME] [LINKEDIN] [RESUME]
```

- Add relevant decision-support details where appropriate:
  - Cincinnati, OH
  - open to relocation
  - graduating Dec 2026, if accurate
- Track conversion actions only if analytics are added.

### Deliverables

- Contact CTA has a clear hierarchy of actions.
- Recruiters can reach resume, email, and LinkedIn quickly.
- CTA copy matches current availability and role targets.

## Phase 10: Motion And Interaction Pass

### Objective

Add motion that makes the site feel current without turning it into a gimmick.

### Tasks

- Extend current reveal motion with variants:
  - block reveal
  - staggered sticker reveal
  - hover offset
  - marquee proof strip
  - tap/click expansion for detail
- Make interactions feel physical:
  - hover moves elements `2-4px`
  - shadow contracts on hover
  - active/click state nearly removes the shadow
  - cards and buttons feel pressed rather than faded
- Ensure all animations respect `prefers-reduced-motion`.
- Avoid scroll-jacking.
- Avoid animation that shifts text while reading.
- Prefer CSS transforms, opacity, and shadows where possible.
- Use Framer Motion mainly for orchestrated entrances, layout transitions, and
  meaningful interactions.

### Deliverables

- Cohesive motion system.
- Interactive homepage cards.
- Reduced-motion fallback.

## Phase 11: Content Compression And Microcopy Pass

### Objective

Rewrite homepage copy to be direct, short, and outcome-led.

### Tasks

- Cut homepage paragraphs into one-liners.
- Convert repeated descriptions into badges, stats, and labels.
- Keep each card to one main idea.
- Move deeper content into:
  - project case studies
  - thinking entries
  - expandable detail panels
  - experience page
- Replace generic labels with authored labels where appropriate:
  - `Projects` -> `Things I've Shipped`
  - `Skills` -> `Tools I Reach For`
  - `Research` -> `What I'm Experimenting With`
  - `Blog` -> `Notes From The Build`
  - `Contact Me` -> `Let's Build Something`
- Use playful labels sparingly so the site still feels professional.

### Deliverables

- Homepage copy reduced by at least 50%.
- No section feels like a book before interaction.
- CTAs clearly indicate where deeper reading lives.

## Phase 12: Mobile, Accessibility, Performance, And Polish

### Objective

Verify the redesign works technically, visually, and responsively.

### Tasks

- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `npm run build`.
- Test desktop widths:
  - 1440px
  - 1280px
  - 1024px
- Test mobile widths:
  - 430px
  - 390px
  - 360px
- Treat `<768px` as its own composition:
  - reduce hard-shadow distance
  - reduce border thickness if needed
  - disable complex tilt
  - convert architecture diagrams into vertical flows
  - make project cards full-width
  - keep at least one large visual moment per viewport
- Check:
  - text does not overflow cards/buttons
  - no incoherent overlap
  - hover states do not shift layout
  - focus states are visible
  - dark/light theme behavior is intentional
  - reduced motion works
- Accessibility checks:
  - WCAG-safe foreground/background pairs
  - visible `:focus-visible` states
  - keyboard-accessible hover reveals
  - no information conveyed only by color
  - correct heading hierarchy
  - large enough touch targets
  - semantic buttons and links
- Performance checks:
  - avoid animation-heavy hero implementation
  - prefer CSS effects over JavaScript where possible
  - lazy-load imagery below the fold
  - keep Framer Motion usage focused

### Automation And Budgets

- Add visual regression screenshots with Playwright for:
  - homepage desktop
  - homepage mobile
  - projects index
  - project detail
  - thinking
  - experience
  - travel
  - contact
  - recruiter dialog
- Capture screenshots at:
  - 1440px
  - 1024px
  - 390px
- Run accessibility automation:
  - Lighthouse
  - axe, if added
  - keyboard-only pass
  - screen-reader spot test
  - 200% browser zoom
  - forced-colors/high-contrast spot check where practical
- Set performance targets:
  - LCP `< 2.5s`
  - CLS `< 0.1`
  - INP `< 200ms`
  - Lighthouse Performance `> 90`
  - Lighthouse Accessibility `> 95`
  - Lighthouse Best Practices `> 95`
  - Lighthouse SEO `> 95`
- Implementation performance rules:
  - use `next/image`
  - size assets correctly
  - use `next/font`
  - avoid giant animated SVGs
  - dynamically import heavy interactive sections where useful
  - lazy-load travel map
  - lazy-load System Builder if below the fold
  - avoid globally importing Framer Motion everywhere
- Cross-browser QA:
  - Chrome
  - Safari
  - Firefox
  - iOS Safari
- Stress-test components with:
  - very long project names
  - six technology tags
  - missing metric
  - missing image
  - three-line description
  - external link plus GitHub
  - badges such as `C++`, `Google Cloud Platform`, and
    `Infrastructure Automation`

### Deliverables

- Passing typecheck/lint/build or documented exceptions.
- Screenshots for key routes.
- Final polish commit-ready diff.

## Phase 13: Metadata And Discoverability

### Objective

Make v4 share well and communicate clearly in search results, link previews,
and project-specific previews.

### Tasks

- Add unique `<title>` and description per route.
- Add canonical URLs.
- Add OpenGraph metadata.
- Add Twitter/X preview cards.
- Add project-specific OG images.
- Refresh favicon to match v4.
- Verify `sitemap.xml`.
- Verify `robots.txt`.
- Add JSON-LD where useful.
- Ensure project pages generate specific link previews instead of a generic
  portfolio preview.

### Deliverables

- Search and social previews match the v4 identity.
- Project links produce project-specific cards.
- Metadata coverage is verified for core routes.

## Phase 14: Analytics And Conversion Tracking

### Objective

Track only useful portfolio events that explain recruiter and project interest.

### Events

- `resume_download`
- `linkedin_click`
- `email_click`
- `recruiter_mode_open`
- `project_open`
- `case_study_depth`
- `github_click`
- `demo_click`

### Rules

- Do not track random hover events.
- Do not add invasive analytics.
- Keep analytics easy to remove.
- Use analytics to answer:
  - do recruiters use 30-sec mode?
  - which projects get inspected?
  - do visitors reach case-study depth?
  - which CTA converts?

### Deliverables

- Minimal analytics event map.
- Conversion events attached to primary CTAs if analytics is implemented.

## Phase 15: App States

### Objective

Make edge states feel designed and functional.

### Tasks

- Add or redesign `not-found.tsx`.
- Add or redesign `error.tsx`.
- Add or redesign `loading.tsx`.
- Use the v4 brutalist style without sacrificing clarity.
- Suggested 404 direction:

```text
404

SYSTEM NOT FOUND.

<- RETURN TO BASE
```

### Deliverables

- 404, error, and loading states match v4.
- Edge states are accessible and easy to navigate.

## Phase 16: Dead-Code And V3 Cleanup

### Objective

Remove leftover v3 design-system pieces so the repo does not carry two visual
systems.

### Tasks

- Delete dead v3 components.
- Delete obsolete motion classes.
- Remove old teal variables if no longer used.
- Remove unused gradients.
- Remove duplicated card variants.
- Remove abandoned theme code if dark mode is dropped.
- Run dependency audit.
- Run unused export check if tooling exists.

### Deliverables

- No unused v3 styling remains in the primary app surface.
- V4 components and tokens are the clear source of truth.
- Any intentionally retained v3 behavior is documented.

## Suggested Build Sequence

1. V3 -> V4 migration matrix.
2. Content and metric audit.
3. Layout, spacing, and typography system.
4. Colors, borders, shadows, and tokens.
5. Core brutalist primitives.
6. Interaction-state system.
7. Hero + Currently + Recruiter Mode.
8. Selected Impact.
9. Featured Systems.
10. System Builder.
11. Architecture diagram system.
12. Case-study template.
13. Experience + Research.
14. Thinking + Life.
15. Navigation + shared shell.
16. Inner-page migration.
17. Content compression.
18. SEO + social previews.
19. Analytics / conversion tracking.
20. 404 / loading / errors.
21. Accessibility.
22. Performance.
23. Visual regression + browser QA.
24. Dead-code / v3 cleanup.
25. Final polish.

## Success Criteria

- Homepage feels visually exciting within the first viewport.
- Visitor can understand the portfolio without reading long paragraphs.
- The first two screens communicate current status, role fit, and proof.
- V3's strongest distinctive behaviors are intentionally preserved, adapted, or
  removed.
- Homepage proof points are not repeated as competing headline moments.
- Projects feel clickable and distinct.
- Project detail pages read like case studies, not technology lists.
- Each flagship case study clarifies ownership, constraints, results, and what
  did not work.
- Architecture diagrams explain systems faster than paragraphs.
- One signature interaction is memorable and useful.
- The system builder works through click/tap/keyboard, not hover alone.
- Detailed writing still exists, but only after the visitor chooses depth.
- The site no longer feels like one muted theme repeated section after section.
- Neo-brutalism feels controlled and professional, not random.
- Mobile experience feels designed, not squeezed.
- Accessibility and performance constraints survive the visual redesign.
- SEO/social previews, contact conversion paths, and app edge states are
  intentionally handled.
- Dead v3 design-system code is cleaned up or documented as intentionally kept.
- Typecheck, lint, and build pass.
