# V3 Portfolio End-to-End Plan

This plan turns the V3 foundation into a complete personal portfolio. The site must use first-person active voice, pull factual content from the provided source files, and preserve the visual system defined in `docs/site-system.md`.

## Source of Truth

- `docs/site-system.md`: design system, visual direction, page structure, interaction rules.
- `docs/readme_portfolio.md`: content strategy, thinking topics, proof-of-work structure, life/personality sections.
- `docs/resume.json`: structured resume data for education, work experience, skills, projects, research, and contact links.
- `docs/resume.pdf`: downloadable resume asset and reference for recruiter-facing detail.

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
- Minimal homepage placeholder with links to Projects, Thinking, Experience, Travel, and Contact.

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
  travel/
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
  panning.md
public/
  resume.pdf
```

## Phase 1: Data and Content Layer

Goal: create a typed content system from the existing docs.

Tasks:

- Copy or expose `docs/resume.pdf` through `public/resume.pdf` for download.
- Create `lib/resume.ts` to import or read structured resume data.
- Create shared TypeScript types for projects, thinking posts, experience items, skills, and travel entries.
- Create `content/projects.ts` from `resume.json` and `readme_portfolio.md`.
- Create `content/thinking.ts` from the Thinking section in `readme_portfolio.md`.
- Create `content/now.ts` from the Now and Learning sections in `readme_portfolio.md`.
- Create `content/travel.ts` with only known categories and `TBD` placeholders where the source says `TBD`.
- Normalize external links:
  - GitHub: `https://github.com/Tanmayb05`
  - LinkedIn: `https://linkedin.com/in/tanmay-bhuskute`
  - Email: `mailto:tanmay.v.bhuskute@gmail.com`

Acceptance criteria:

- Content is typed.
- No page hardcodes large data arrays when a content module should own them.
- All factual claims map back to `readme_portfolio.md` or `resume.json`.

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
5. Travel Preview
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

## Phase 7: Travel and Life

Goal: add personality through a polished map-first experience while staying visually aligned.

Page:

- `/travel`

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

- Travel page uses the same typography, gradients, teal highlights, and card rules.
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
8. Build Travel page.
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
