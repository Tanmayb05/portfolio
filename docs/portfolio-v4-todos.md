# Portfolio V4 Prompt Context And Todo Backlog

Use this document as a context file when prompting an agent to continue the
Portfolio v4 work. It converts loose ideas into implementation-ready prompts,
with likely files, product intent, constraints, and acceptance checks.

## How To Use This File

Paste the relevant section into a prompt along with the current task. Ask the
agent to inspect the listed files before editing and to preserve the existing
Next.js, TypeScript, content-driven architecture.

Good prompt pattern:

```txt
Use docs/portfolio-v4-todos.md as context. Implement the highest-priority
Homepage items only. Inspect the listed files first, keep the existing
neo-brutalist design system, update source data where possible, and verify with
npm run typecheck.
```

## Project Context

- App: Next.js 14 portfolio site using the App Router.
- Main routes:
  - `/`: homepage command center.
  - `/experience`: work experience, skills, and education.
  - `/projects`: featured systems and project library.
  - `/thinking`: password-gated notes layer.
  - `/travel-life`: map-first travel and personal systems.
  - `/contact`: contact, role targets, resume access.
- Source data:
  - Resume and professional content: `data/source/*.json`.
  - Projects: `data/source/2-projects.json`, adapted through `content/projects.ts`.
  - Travel: `content/travel.ts`, `public/usa_travel_places.json`.
  - Life systems: `data/source/life-systems.json`.
  - Contact and links: `data/source/5-contact.json`, `data/source/global-links.json`.
- UI system:
  - Shared primitives: `components/ui/*`.
  - Cards: `components/cards/*`.
  - Sections: `components/sections/*`.
  - Route layout and tokens: `app/globals.css`, `tailwind.config.ts`.

## Source Of Truth Documents

- Product and visual direction: `docs/portfolio-v4-plan.md`.
- Implementation sequencing: `docs/portfolio-v4-phases.md`.
- Migration decisions: `docs/portfolio-v4-migration-matrix.md`.
- Metric trust and ownership: `docs/portfolio-v4-content-metric-audit.md`.
- Visual asset status: `docs/portfolio-v4-visual-asset-inventory.md`.
- Final QA expectations: `docs/portfolio-v4-final-qa.md`.

## Global Implementation Rules

- Preserve the v4 direction: neo-brutalist, paper mode, hard borders, hard
  shadows, vivid accents, scan-first sections, proof before biography.
- Do not invent credentials, metrics, jobs, project outcomes, trip facts, or
  links. Add placeholders only when clearly marked as missing.
- Prefer structured source data over hardcoded route content.
- Keep components generic. Avoid branching on specific project, company, or
  state names inside reusable components unless the data model requires it.
- Every added visual asset needs useful alt text and must degrade cleanly if the
  file is missing.
- Responsive behavior matters. Check mobile and desktop before considering a
  visual task done.
- Password-gated content must not rely on client-side secrets. The existing
  thinking gate uses `app/api/marauders-unlock/route.ts` and the
  `MARAUDERS_PASSWORD` environment variable.

## Current Product Intent

The portfolio should quickly communicate:

- Tanmay is open to New Grad and Internship roles.
- Target roles: Software Engineer, Backend, Distributed Systems, AI Systems,
  DevOps, Data Engineering, and AI/ML where the resume supports it.
- First impression: proof, shipped systems, system design thinking, and
  recruiter-ready clarity.
- Visual flavor: neo-brutalist technical dashboard, with highlighted phrases,
  stickers, logos, icons, emoji-style glyphs, and small animated details that
  communicate meaning.

## Priority Legend

- `P0`: Fix correctness, security, broken links, or misleading content.
- `P1`: High-impact portfolio polish that changes first impressions.
- `P2`: Useful feature or content improvement.
- `P3`: Nice-to-have visual detail or future content expansion.

## Homepage Backlog

Likely files:

- `app/page.tsx`
- `components/ui/RecruiterMode.tsx`
- `components/ui/CurrentlyPanel.tsx`
- `components/home/SystemBuilder.tsx`
- `components/cards/VisualProjectTile.tsx`
- `data/source/homepage.json`
- `data/source/1-experience.json`
- `app/globals.css`

### P0: Review Thinking Gate Security

Intent:

- Confirm whether the Thinking Layer passphrase is exposed through browser
  devtools or client-side bundles.

Current implementation note:

- The visible form is client-side, but password validation happens through
  `app/api/marauders-unlock/route.ts`.
- The API route reads `process.env.MARAUDERS_PASSWORD`, with a fallback value.

Tasks:

- Remove or avoid a meaningful default passphrase in production.
- Ensure production deployment sets `MARAUDERS_PASSWORD`.
- Keep the cookie `httpOnly`, `sameSite: "lax"`, and path-scoped.
- Do not move the passphrase into client code, route props, inline HTML, or JSON.

Acceptance:

- No real secret is searchable in built client bundles.
- Unlock still works locally through the API route.
- Missing env var is handled intentionally, either by safe dev fallback or
  explicit server error.

### P1: Improve Recruiter Status Copy

Current rough copy:

```txt
Currently Open to New Grad / Internship roles
Actively applying for New Grad roles or Internships
Targeting Backend, Distributed Systems, and AI Systems roles
System Design mastery
DSA consistency
```

Preferred direction:

- Make this sharper, credible, and recruiter-friendly.
- Avoid overclaiming phrases like "System Design mastery" unless proven.
- Emphasize active preparation and role fit.

Suggested replacement:

```txt
Open to New Grad and Internship roles
Actively applying for Software Engineering, Backend, Distributed Systems, and AI Systems roles.
Current focus: system design practice, DSA consistency, and shipping portfolio-quality AI systems.
```

Acceptance:

- The first viewport clearly states availability and target roles.
- Copy sounds confident without sounding inflated.
- The same role language is consistent across homepage and contact page.

### P1: Rename Hero System Label

Current:

```txt
Portfolio OS / v4
```

Requested:

```txt
Postfolio OS
```

Open question:

- Confirm whether "Postfolio" is intentional branding or a typo for
  "Portfolio".

Acceptance:

- If intentional, rename visible label consistently.
- If not intentional, keep "Portfolio OS" and improve the label styling instead.

### P1: Add Highlighted Text In Headings

Intent:

- Make key heading words feel more neo-brutalist and scan-friendly.

Examples:

- Highlight "proof" in "Proof before biography."
- Highlight "systems" in "Things worth clicking."
- Highlight role-fit words in the hero or recruiter module.

Implementation notes:

- Prefer reusable markup patterns over one-off spans.
- Use existing v4 tokens and accent colors.
- Keep text accessible and readable without color alone.

Acceptance:

- At least the hero, Selected Impact, and Featured Systems headings have
  intentional highlighted phrases.
- Highlights do not wrap awkwardly on mobile.

### P2: Add Meaningful Logos, Icons, Emoji-Style Glyphs, And Animated Figures

Intent:

- Increase visual energy with neo-brutalist logos, icons, emoji-style glyphs,
  and figures.
- Avoid decorative clutter. Each visual should identify a technology, project,
  workplace, route, or action.

Candidates:

- Small role/tool icons in recruiter mode.
- Tech logos for AWS, Kubernetes, Python, TypeScript, React, Docker, or verified
  stack items.
- Project logos or generated mark badges for every project.
- Small animated system figure in the hero or `SystemBuilder`.

Constraints:

- Do not use copyrighted brand logos in a way that suggests endorsement.
- Prefer simple local assets, lucide icons, text marks, or generated fallback
  marks where appropriate.

Acceptance:

- Visuals improve scanability.
- Every visual has alt text or is marked decorative with `aria-hidden`.
- Motion respects reduced-motion settings.

## Experience Page Backlog

Likely files:

- `app/experience/page.tsx`
- `components/sections/ExperienceTimeline.tsx`
- `components/cards/ExperienceCard.tsx`
- `components/sections/SkillGroup.tsx`
- `data/source/1-experience.json`
- `data/source/1.2-education.json`
- `app/globals.css`

### P1: Add Work Experience Logos And Info Popovers

Intent:

- Each workplace card should have a visual identifier and a small info popover
  explaining the organization when useful.

Tasks:

- Add logo or mark fields to work experience source data.
- Add optional `organizationDescription` or similar field.
- Render info popovers with keyboard-accessible disclosure behavior.

Acceptance:

- Cards remain readable when logos are missing.
- Info popovers work with pointer and keyboard.
- Organization explanations are concise and factual.

### P1: Emphasize Strong Impact Metrics

Intent:

- Bold or visually highlight the most important metrics in work achievements,
  such as downtime reduction, production upgrades, coverage improvements, and
  deployment improvements.

Implementation notes:

- Prefer structured metric fields if available.
- Avoid brittle string matching unless there is no better source model.
- Preserve source-backed metric wording.

Acceptance:

- Metrics are easy to scan inside each role card.
- Non-metric achievement text remains readable.

### P2: Normalize Compact Technical Map Cards

Issue:

- "Languages" and the other skill group cards should have consistent sizing and
  visual weight.

Acceptance:

- All four skill cards align cleanly on desktop.
- Mobile stacking has stable spacing and no layout shift.

### P2: Improve Academic Foundation

Requested education additions:

- Current:
  - Master of Science in Computer Science, University of Cincinnati.
  - Bachelor of Engineering in Computer Engineering, AISSMS College of
    Engineering, Pune.
- Add:
  - Ashok Vidyalaya, August 2016 to February 2018, Junior College / 10+2,
    Physics, Chemistry, Maths, Geography, IT.
  - Vidya Bhavan, June 2006 to February 2016, School, Grade 1-10.

Tasks:

- Add school records to `data/source/1.2-education.json` if they should be part
  of the source of truth.
- Mark University of Cincinnati as current.
- Add optional logos or institution marks.
- Add small info popovers for educational institutions.
- Connect education cards with arrows from earliest to latest.

Acceptance:

- Education order is chronological or intentionally reverse-chronological.
- Current education is visibly highlighted.
- Arrows do not cause overlap on mobile.

## Projects Page Backlog

Likely files:

- `app/projects/page.tsx`
- `components/cards/VisualProjectTile.tsx`
- `components/cards/ProjectCard.tsx`
- `components/cards/CaseStudySection.tsx`
- `content/projects.ts`
- `data/source/2-projects.json`
- `data/source/global-links.json`
- `lib/content-types.ts`

### P1: Rename "Case Studies" To "Projects" Where Appropriate

Intent:

- User-facing label should feel simpler and more direct.

Current examples:

- "Case study library"
- "Open a case study..."

Acceptance:

- Index page language uses "projects" unless the page is truly a long-form case
  study.
- Metadata and CTA copy stay consistent.

### P1: Strengthen Project Short Descriptions

Requested example:

```txt
Spendora - AI assistant for Splitwise
```

Tasks:

- Add or improve concise app descriptions for each project.
- Keep title, short title, and short description separate.
- Do not invent project capabilities beyond source data.

Acceptance:

- Every project card can be understood in one quick scan.
- Descriptions are short enough for card layouts on mobile.

### P1: Add Logo Or Mark For Every Project

Intent:

- Each featured and library card should have a memorable visual mark.

Implementation notes:

- Add fields like `logo`, `logoAlt`, or `mark` to project data/types.
- Use generated or typographic marks only when real screenshots/logos are not
  available.
- Follow `docs/portfolio-v4-visual-asset-inventory.md`.

Acceptance:

- No project card appears visually empty.
- Missing real assets degrade to branded initials or architecture marks.

### P2: Add Expandable "Problem" And "Built" Details

Intent:

- Cards should stay compact, but allow visitors to reveal problem and build
  details.

Tasks:

- Add "show more" popouts for `problem` and `built` on featured cards.
- Ensure the controls are accessible buttons, not hover-only interactions.
- Keep expanded content from breaking grid alignment.

Acceptance:

- Keyboard, pointer, and touch all work.
- Expanded content is source-backed.
- Cards do not overflow or overlap at mobile widths.

### P1: Add GitHub And Live Links

Intent:

- Every project should expose GitHub and practical/demo links where available.

Current source:

- `data/source/global-links.json` has many `TBD` entries.
- `data/source/2-projects.json` also contains link fields.

Tasks:

- Fill real GitHub/demo links where available.
- Render GitHub and live/demo actions with neo-brutalist icon buttons.
- Hide or label unavailable links cleanly. Do not render broken `TBD` links.

Acceptance:

- Published links open the correct destination.
- Missing links are not clickable.
- Icons have accessible names.

## Travel And Life Page Backlog

Likely files:

- `app/travel-life/page.tsx`
- `components/sections/TravelRegionSection.tsx`
- `components/sections/USATravelMap.tsx`
- `components/travel/StateDrawer.tsx`
- `components/travel/PlaceCard.tsx`
- `components/sections/TravelMap.tsx`
- `content/travel.ts`
- `public/usa_travel_places.json`
- `data/source/life-systems.json`
- `app/api/marauders-unlock/route.ts`

### P1: Improve USA Travel State Cards

Requested behavior:

- When a state is clicked, show a neo-brutalist state symbol or state mark.
- Add a one- to two-line description for each state card.
- Star favorite or important places.
- If dates are present in place descriptions, display them in ascending order.
- Place cards should support photos when available.
- "Open in Maps" should open the correct map link.
- Add a field for a Google Maps collection link for each trip.

Data requirements:

- State symbol or mark.
- State description.
- Favorite flag per place.
- Date extraction or explicit normalized date fields.
- Optional photo array per place.
- Trip-level Google Maps collection link.

Acceptance:

- Existing trips still render when new optional fields are absent.
- State drawer sorts dated places ascending without corrupting undated places.
- External map links are real URLs and open safely.

### P0: Recheck State And Trip Data Integrity

Known example to verify:

- Trips that mention Illinois, Michigan, and Wisconsin should only show places
  under the correct trip and state.

Tasks:

- Validate that each place belongs to the correct state, region, and trip.
- Flag ambiguous or missing coordinates/place metadata instead of guessing.

Acceptance:

- No place appears under the wrong state.
- Multi-state trips are represented intentionally.
- Any unverifiable location is marked for source cleanup.

### P2: Add India Travel Layer

Intent:

- Add India to the travel section, using the same map/card system where
  possible.

Tasks:

- Add India travel source data.
- Decide whether the UI is map-based, region-card-based, or city-card-based.
- Do not leave empty placeholder cards as final UI.

Acceptance:

- India appears only when there is real source content.
- Layout matches the USA travel layer quality bar.

### P2: Expand Life Systems

Requested sections:

- Music.
- Movies, including a short explanation of the love for movies.
- TV.
- Cooking.

Current source:

- `data/source/life-systems.json` contains productivity, routines, and learning
  experiments, but not music, movies, TV, or cooking.

Tasks:

- Extend the source data with sections for music, movies, TV, and cooking.
- Render them as rich but compact life-system panels.
- Keep tone personal without turning the page into a long essay.

Acceptance:

- Each section has real content, not filler.
- Page remains scan-first.

### P2: Gate Life Systems Like Thinking Layer

Intent:

- Protect personal "life systems" sections with the same password mechanism as
  the Thinking Layer.

Implementation notes:

- Reuse server-side unlock logic.
- Consider extracting a generic gated-content helper or route guard.
- Do not duplicate password logic in the client.

Acceptance:

- Locked users can still see public travel content if desired.
- Private sections unlock after successful passphrase entry.
- The secret is not exposed to client code.

## Contact Page Backlog

Likely files:

- `app/contact/page.tsx`
- `components/contact/PinnedContactSection.tsx`
- `components/cards/ContactLinkCard.tsx`
- `components/sections/ResumeDownload.tsx`
- `lib/resume.ts`
- `data/source/5-contact.json`
- `public/low-poly-image.png`
- `public/low-poly-image-removebg.png`

### P0: Fix LinkedIn Link

Intent:

- LinkedIn should redirect to Tanmay's actual LinkedIn profile.

Tasks:

- Verify `data/source/5-contact.json` and `lib/resume.ts` URL construction.
- Ensure the final rendered URL includes the correct protocol and path.

Acceptance:

- LinkedIn card opens the correct profile.
- No malformed `https://https://...` or missing protocol issue.

### P1: Add Low-Poly Image

Intent:

- Contact page should include the low-poly image of Tanmay.

Available assets:

- `public/low-poly-image.png`
- `public/low-poly-image-removebg.png`

Acceptance:

- Image appears in the first contact section.
- It is framed in the v4 neo-brutalist style.
- Mobile layout does not crowd the contact cards.

### P1: Email Click Should Copy Address

Intent:

- When the user clicks "Email me", copy the email address and provide visible
  feedback.

Implementation notes:

- Decide whether the primary action should copy only, mailto only, or copy plus
  mailto fallback.
- Use `navigator.clipboard` with graceful fallback.
- Provide `aria-live` feedback.

Acceptance:

- Click copies the email address.
- User sees confirmation.
- Keyboard activation works.

### P2: Resume Role Selector

Requested options:

- Software Engineer.
- DevOps Engineer.
- AI/ML Engineer.
- Data Engineer.

Intent:

- Resume action should ask which role resume the visitor wants.

Implementation options:

- If separate PDFs exist, link each option to the corresponding file.
- If only one PDF exists, present role intent but make it clear the same current
  resume is used.
- Longer term: generate or maintain role-specific resumes.

Acceptance:

- The UI does not imply unavailable files exist.
- Role selector is accessible and works on mobile.
- Analytics can track selected resume role if analytics is enabled.

## Cross-Page Enhancements

### P1: Consistent Neo-Brutalist Icon Buttons

Use for:

- GitHub.
- Live/demo links.
- Email/copy.
- LinkedIn.
- Resume download.
- Info popovers.
- Expand/collapse controls.

Acceptance:

- Buttons have accessible names.
- Icons are visually consistent.
- Touch targets are at least 44px where practical.

### P2: Shared Info Popover Primitive

Use for:

- Workplace descriptions.
- Educational institution descriptions.
- Project technical notes if needed.

Acceptance:

- Works with keyboard and pointer.
- Dismisses predictably.
- Does not trap focus unless implemented as a modal/popover requiring focus
  management.

### P2: Shared Expandable Detail Primitive

Use for:

- Project "Problem".
- Project "Built".
- Travel place notes.
- Optional life-system details.

Acceptance:

- Uses button semantics.
- Maintains layout stability.
- Respects reduced motion.

## Open Content Decisions

These should be answered before implementation if the task depends on them:

- Is "Postfolio OS" intentional branding, or should it remain "Portfolio OS"?
- Which GitHub and live/demo URLs are approved for each project?
- Are separate role-specific resume PDFs available?
- Which project logos should be real assets, generated marks, or typographic
  fallback marks?
- Which travel places are favorites?
- What are the India travel source entries?
- Which music, movie, TV, and cooking items should be public vs. gated?

## Suggested Implementation Order

1. Fix P0 correctness/security/link items.
2. Improve homepage recruiter copy and first-viewport scanability.
3. Add project descriptions, icons/marks, and real links.
4. Improve experience cards and education source data.
5. Expand travel/life data models and gated private sections.
6. Add visual polish after the data model is stable.

## Verification Checklist

Run the strongest available checks for the change scope:

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Manual desktop and mobile review for touched routes.
- For contact actions: verify copy, mailto/link behavior, and keyboard access.
- For gated content: verify locked, failed unlock, successful unlock, and cookie
  persistence.
- For travel: verify state click, drawer content, map links, sort order, and
  missing-data fallbacks.
