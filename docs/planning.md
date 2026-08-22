# V3 Portfolio End-to-End Plan

This plan turns the V3 foundation into a complete personal portfolio. The site must use first-person active voice, pull factual content from the provided source files, and preserve the visual system defined in `docs/site-system.md`.

## Source of Truth

- `docs/site-system.md`: design system, visual direction, page structure, interaction rules.
- **`docs/content-intake.json`**: SINGLE SOURCE OF TRUTH for all portfolio facts, projects, thinking posts, experience, travel, and life systems.
- `docs/content-intake-template.json`: template for adding new content in the same structured format.
- `docs/resume.json`: read-only structured backup for legacy compatibility (synced from content-intake.json).
- `public/resume.pdf`: downloadable resume asset and reference for recruiter-facing detail (served via `/resume.pdf` route).

Do not invent personal facts, metrics, companies, roles, links, publications, travel details, or project claims outside these files. Use obvious placeholders only where the source explicitly says `TBD`.

## Global Content Rules

- Write in first person and active voice.
- Use language like “I build,” “I evaluate,” “I’m learning,” and “I’m exploring.”
- Avoid third-person phrasing like “Tanmay builds,” “he worked on,” or “this person is.”
- Keep the tone calm, direct, and technically credible.
- Use concise landing-page copy and deeper technical writing on project and thinking pages.
- Lead with systems, thinking, and proof of work instead of a resume-first pitch.
- Keep unfinished or weak ideas out of public-facing pages unless they are framed as polished snapshots.

## Motion Rules

Use motion to make the interface feel alive, not loud.

- Add page entrance animation for major sections.
- Add scroll reveal animation for section headings, project cards, thinking cards, timeline items, and travel map panels.
- Add restrained hover motion for cards, buttons, nav links, tags, and map regions.
- Add subtle active nav indicators.
- Add soft expandable interactions for experience cards and thinking/project previews.
- Respect `prefers-reduced-motion` and disable non-essential movement.
- Avoid bouncing effects, cursor gimmicks, heavy parallax, loud scroll effects, and animated background blobs.

Recommended implementation:

- Use CSS transitions for simple hover states.
- Use `framer-motion` or a small IntersectionObserver wrapper for scroll reveals.
- Keep reveal distances short: 8-16px.
- Keep durations restrained: 160-320ms for hover, 400-650ms for scroll reveals.
- Use easing that feels product-like: `cubic-bezier(0.22, 1, 0.36, 1)`.

## Current Foundation

Already implemented:

- Next.js App Router structure in `new/v3/app`.
- Dark-first theme tokens and light mode toggle.
- Shared shell components: `Navbar`, `Footer`, `ThemeToggle`, `SiteContainer`, `PageHeader`, `SectionHeading`.
- Minimal homepage placeholder with links to Projects, Thinking, Experience, Travel & Life, and Contact.

Next work should build on this foundation instead of replacing it.

## Folder Structure Target

```txt
app/
  page.tsx
  projects/
    page.tsx
    [slug]/
      page.tsx
  thinking/
    page.tsx
    [slug]/
      page.tsx
  experience/
    page.tsx
  travel-life/
    page.tsx
  contact/
    page.tsx
components/
  shared/
  sections/
  cards/
  motion/
content/
  projects.ts
  thinking.ts
  travel.ts
  now.ts
lib/
  site-config.ts
  resume.ts
  content.ts
docs/
  site-system.md
  readme_portfolio.md
  resume.json
  resume.pdf
  planning.md
public/
  resume.pdf
```

## Phase 1: Data and Content Layer

Goal: create a typed content system from the existing docs.

Tasks:

- Resume PDF is served from `public/resume.pdf` via `/resume.pdf` route.
- Create `lib/resume.ts` to import structured resume data from `content-intake.json`.
- Create shared TypeScript types for projects, thinking posts, experience items, skills, and travel entries.
- Create `content/projects.ts` from `content-intake.json`.
- Create `content/thinking.ts` from the thinkingPosts section in `content-intake.json`.
- Create `content/now.ts` from the lifeSystems section in `content-intake.json`.
- Create `content/travel.ts` from travelAndLife section in `content-intake.json` with only known categories and `TBD` placeholders.
- Normalize external links:
  - GitHub: `https://github.com/Tanmayb05`
  - LinkedIn: `https://linkedin.com/in/tanmay-bhuskute`
  - Email: `mailto:tanmay.v.bhuskute@gmail.com`

Acceptance criteria:

- Content is typed.
- No page hardcodes large data arrays when a content module should own them.
- All factual claims map back to `content-intake.json`.

## Phase 2: Motion Foundation

Goal: create reusable motion primitives without overanimating the site.

Tasks:

- Add a `components/motion` folder.
- Create `Reveal.tsx` for scroll-triggered section/card reveals.
- Create `StaggerGroup.tsx` or a simple parent variant pattern for grids.
- Add motion-safe CSS utilities for hover lift, teal border glow, and active states.
- Ensure reduced-motion users see static content with no layout shift.

Acceptance criteria:

- All motion uses shared primitives or shared CSS utilities.
- Cards do not jump, resize, or overlap during animation.
- Motion remains subtle and consistent across pages.

## Phase 3: Homepage

Goal: replace the placeholder with the medium-depth homepage flow from `site-system.md`.

Sections:

1. Hero
2. Featured Systems
3. How I Think
4. Experience Preview
5. Travel & Life Preview
6. Currently / Living System
7. Soft CTA

Content direction:

- Hero uses first-person active voice:
  - “I build systems, automate workflows, and document how I think through technical problems.”
- Featured Systems highlights:
  - Spendora
  - News Headline Classification
  - Media Recommender
- Experience Preview highlights:
  - Siemens production upgrades
  - Blue-Green deployment downtime reduction
  - AWS/Terraform automation
- Currently section uses:
  - System Design
  - Leetcode
  - Behavioral interview preparation
  - structured job search system

Acceptance criteria:

- Homepage gives identity, proof, and deeper navigation.
- Homepage does not become a full resume or full blog archive.
- Every card has a clear next route.

## Phase 4: Projects

Goal: prove technical depth through engineering case studies.

Pages:

- `/projects`
- `/projects/spendora`
- `/projects/news-headline-classification`
- `/projects/media-recommender`
- `/projects/soundscape`

Components:

- `ProjectCard`
- `FeaturedProjectCard`
- `MetricBadge`
- `TechStackBadge`
- `ArchitecturePreview`

Case study structure:

- Problem
- Context
- Architecture
- Core technical decisions
- Tradeoffs
- Metrics / results
- What I would improve next

Known project facts:

- Spendora: LangChain, HuggingFace, Mistral, Gemma, RAG, tool-based reasoning.
- News Headline Classification: LSTM, 400K+ headlines, 93.28% accuracy, 25% pipeline efficiency improvement.
- Media Recommender: React, Flask, Python, Spotify API, content-based, collaborative, K-means, TF-IDF, IJRASET42927.
- SoundScape: Android SDK, Java, REST APIs, MediaPlayer, Room caching, 70% API call reduction.

Acceptance criteria:

- Project pages read like engineering case studies.
- Each case study uses available facts only.
- Architecture previews match the native diagram system.

## Phase 5: Thinking

Goal: show how I reason, evaluate, and learn.

Pages:

- `/thinking`
- optional detail routes for polished posts

Categories:

- Problem Breakdowns
- Technical Evaluation & Judging
- Career & Job Search
- What I’m Learning Now
- Mental Models
- Research Notes

Initial entries:

- Android Bug Reproduction Systems
- Distributed Logging Systems
- How Instagram Recommends Reels
- How Niantic Built AR World from User Images
- How I Evaluate Technical Projects
- How I Ask High-Signal Questions
- What I Look For When Judging Student Projects
- How I’m Running My Job Search Like a System

Acceptance criteria:

- Thinking is organized by topic, not a chronological dump.
- Unwritten posts are clearly marked as upcoming or draft placeholders.
- Copy stays first-person and active.

## Phase 6: Experience

Goal: show credibility without turning the site into a resume clone.

Page:

- `/experience`

Components:

- `ExperienceTimeline`
- `ExperienceCard`
- `SkillGroup`
- `ResumeDownload`

Content:

- Siemens Industry Software: Software Developer Engineer, Jul 2022-Jun 2024.
- Siemens Industry Software: Software Developer Intern, Mar 2022-Jun 2022.
- Government of Maharashtra Water Resource Department: Software Developer Intern, Sep 2021-Dec 2021.
- Education:
  - MS Computer Science, University of Cincinnati, Aug 2024-May 2026.
  - BE Computer Engineering, AISSMS College of Engineering, Aug 2018-Jul 2022.

Acceptance criteria:

- Timeline is scannable and expandable.
- Resume download is visible near the top.
- Skills stay compact and supportive.

## Phase 7: Travel & Life

Goal: add personality through a polished map-first experience while staying visually aligned.

Page:

- `/travel-life`

Structure:

- Intro in first person.
- Map sections in this order:
  - USA
  - India
  - China
- Highlight available placeholders:
  - Seattle Trip
  - LA Crazy Experience
  - San Diego Crazy Experience
- Include Google Maps links only when actual URLs exist.

Acceptance criteria:

- Travel & Life page uses the same typography, gradients, teal highlights, and card rules.
- Unknown locations remain placeholders until real data exists.
- Map hover/click states are polished and restrained.

## Phase 8: Contact

Goal: make reaching me simple.

Page:

- `/contact`

Content:

- Email: `tanmay.v.bhuskute@gmail.com`
- LinkedIn: `linkedin.com/in/tanmay-bhuskute`
- GitHub: `github.com/Tanmayb05`
- Resume download
- Open-to roles:
  - Backend Engineer
  - Software Engineer
  - DevOps Engineer
  - Data Engineer
  - ML Engineer / AI Engineer
  - Data Analyst / Data Scientist

Acceptance criteria:

- Contact page stays minimal.
- No long pitch.
- Links are easy to scan and click.

## Phase 9: Visual Polish

Goal: make the site feel premium and complete.

Tasks:

- Tune section gradients for each route.
- Add subtle section separators.
- Add consistent card borders, backgrounds, radii, and hover states.
- Add active navbar state.
- Add mobile navigation if desktop nav becomes crowded.
- Confirm light mode uses the same hierarchy and does not drive design decisions.
- Confirm text does not overflow buttons, cards, or mobile layouts.

Acceptance criteria:

- Site feels like one continuous environment.
- Teal remains an accent, not the dominant color.
- Desktop and mobile layouts are both polished.

## Phase 10: Quality Gates

Run after every major phase:

```bash
npm run lint
npm run typecheck
npm run build
```

Run before final delivery:

- Check desktop and mobile screenshots.
- Check hover and scroll animations.
- Check reduced motion behavior.
- Check dark and light themes.
- Check all internal links.
- Check resume download.
- Check external contact links.
- Check for third-person voice.
- Check for invented facts.

## Implementation Order

1. Build data/content modules.
2. Add motion primitives.
3. Replace homepage placeholder.
4. Build Projects index and case study pages.
5. Build Thinking index and selected detail pages.
6. Build Experience page.
7. Build Contact page.
8. Build Travel & Life page.
9. Add final visual polish.
10. Run full verification and fix issues.

## Definition of Done

- The site uses first-person active voice throughout.
- The site uses only verified source content or explicit placeholders.
- The design follows `site-system.md`.
- The site includes polished hover and scroll motion without becoming noisy.
- Dark mode feels canonical and light mode works cleanly.
- All primary pages exist and link correctly.
- Lint, typecheck, and build pass.

## Post-MVP Roadmap

These phases capture the remaining work after Phases 1-10. Research each phase before implementation so the next pass is intentional instead of just adding more UI.

## Phase 11: Content Completion System

Goal: replace placeholders and shallow summaries with polished, source-backed content.

Research questions:

- What content is missing from each page?
- Which facts can come from resume, project repos, papers, screenshots, or notes?
- Which items should stay private or unpublished?
- What is the minimum content needed for each page to feel complete?

Tasks:

- Use `docs/content-intake.json` as the structured content source.
- Fill project case study details using the JSON structure.
- Fill Thinking essays or mark them intentionally as upcoming.
- Add real Travel & Life details only where facts exist.
- Add locations to experience if the resume should show them.
- Add project repo/demo/paper links if they are available.
- Use `docs/content-intake-template.json` as reference for adding new content.

Acceptance criteria:

- No `TBD` remains on public pages unless intentionally shown as a placeholder.
- No invented dates, roles, locations, project links, or metrics.
- Every content-heavy page has first-person active voice.

## Phase 12: Project Case Study Deepening

Goal: turn each project page into a stronger engineering case study.

Research questions:

- What architecture did each project actually use?
- What technical decisions were difficult or meaningful?
- What tradeoffs did I make?
- What evidence proves the system worked?
- Which screenshots, diagrams, or code snippets should support each project?

Tasks:

- Create real architecture diagrams for Spendora, News Headline Classification, Media Recommender, and SoundScape.
- Add repo/demo/paper links where available.
- Add failure modes and constraints.
- Add implementation details without overwhelming the page.
- Add clearer “what I would improve next” sections.

Acceptance criteria:

- Each project page has real technical depth.
- Each project has at least one native diagram or architecture visual.
- Metrics are either sourced or omitted.

## Phase 13: Thinking Essay Publishing

Goal: convert structured snapshots into readable essays.

Research questions:

- Which thinking entries are worth publishing first?
- Which entries should remain as outlines?
- What structure makes each post easy to read?
- Should posts include related projects, tags, reading time, and dates?

Tasks:

- Choose the first 3-5 posts to publish fully.
- Add dates and reading-time estimates.
- Add a consistent article layout.
- Add related-project links where relevant.
- Keep exploratory writing structured and concrete.

Acceptance criteria:

- Published posts read like complete notes, not placeholders.
- Draft/planned notes are clearly labeled.
- Thinking remains organized by topic.

## Phase 14: Travel & Life Real Data

Goal: upgrade Travel & Life from placeholder map UI to real content.

Research questions:

- Which countries, states, cities, and places should appear?
- Which Google Maps links are correct?
- Which photos are worth publishing?
- Should the first map implementation use native SVG/CSS, GeoJSON, or `react-simple-maps`?
- How should India and China data be structured if only some regions are visited?

Tasks:

- Add real entries for USA, India, and China.
- Add dates/time visited where appropriate.
- Add Google Maps links only when verified.
- Add optional image/gallery fields.
- Decide whether to install a real map library after the data exists.

Acceptance criteria:

- Travel cards no longer depend on generic `TBD`.
- Map hover/click states correspond to real places.
- The page stays polished and uncluttered.

## Phase 15: Visual QA and Browser Testing

Goal: verify the design in actual rendered viewports.

Research questions:

- Which screenshot tool should be used: Playwright, Puppeteer, or manual browser review?
- Which viewport sizes matter most?
- Which pages need visual regression checks?
- How should reduced motion and light mode be tested?

Tasks:

- Add Playwright or another browser QA setup if needed.
- Capture desktop and mobile screenshots for all primary routes.
- Check dark mode and light mode.
- Check mobile menu behavior.
- Check hover, click, scroll reveal, and reduced-motion behavior.
- Fix text overflow, spacing, and layout issues.

Acceptance criteria:

- Desktop and mobile screenshots are reviewed.
- No obvious overlap, clipping, or unreadable text.
- Motion feels restrained and works with reduced-motion settings.

## Phase 16: SEO, Metadata, and Sharing

Goal: make the site more complete for search, sharing, and recruiters.

Research questions:

- What should the production domain be?
- What metadata should each route use?
- Should project and thinking pages have Open Graph images?
- What should the sitemap and robots configuration include?

Tasks:

- Set `siteConfig.url` after the real domain is known.
- Add route-specific metadata.
- Add Open Graph and Twitter metadata.
- Add sitemap and robots files.
- Add canonical URLs.

Acceptance criteria:

- Every primary page has useful metadata.
- Project and Thinking detail pages have meaningful titles/descriptions.
- No fake production URL is used.

## Phase 17: Content Editing and Voice Pass

Goal: make the whole site sound consistent and sharp.

Research questions:

- Does every page use first-person active voice?
- Are any sections too verbose, generic, or resume-like?
- Are there claims that need stronger evidence?
- Does the homepage still prioritize thinking and systems?

Tasks:

- Review all public copy.
- Remove third-person wording.
- Remove generic portfolio filler.
- Tighten long sentences.
- Make project pages more rigorous and Thinking pages more reflective.

Acceptance criteria:

- The site sounds like one person wrote it.
- Copy is clear, direct, and credible.
- No page feels like a generic resume website.

## Phase 18: Production Readiness

Goal: prepare the site for deployment.

Research questions:

- Where should the site deploy?
- What environment variables or domain settings are needed?
- Should analytics be added?
- How should form/contact behavior work if email links are not enough?

Tasks:

- Choose deployment target.
- Set the production URL.
- Run final build.
- Check all links after deployment.
- Add analytics only if useful.
- Document deploy commands.

Acceptance criteria:

- Production build passes.
- Production links work.
- Resume download works.
- Contact paths work.
- Deployment steps are documented.
