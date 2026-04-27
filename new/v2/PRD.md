# Portfolio Website — Product Requirements Document

**Owner**: Tanmay Bhuskute  
**Date**: 2026-04-18  
**Stack**: Next.js 14+ · Tailwind CSS · GSAP · Lenis · Framer Motion

---

## 1. Vision

A premium, cinematic personal website that functions as a living proof-of-work. Visitors should feel like they are entering the world of someone who builds serious things — not scanning a résumé. The aesthetic is Lando Norris-inspired: neon lime on near-black, oversized type, smooth scroll, bold imagery.

**Primary audiences (in order)**:
1. Tanmay himself — a journal and thinking space
2. Technical community — peers, collaborators
3. Recruiters — Backend / Distributed Systems / AI Systems roles (Summer / Fall 2026)

---

## 2. Design System

### 2.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--accent` | `#C6FF00` | CTA, highlights, hover states, section markers |
| `--bg-dark` | `#0A0A0A` | Primary background |
| `--bg-surface` | `#121212` | Cards, panels |
| `--bg-elevated` | `#1E1E1E` | Hover surfaces |
| `--text-primary` | `#FFFFFF` | Headlines |
| `--text-secondary` | `#A0A0A0` | Body, meta |
| `--text-muted` | `#555555` | Labels, timestamps |

### 2.2 Typography

| Role | Font | Size (desktop) |
|---|---|---|
| Hero display | Satoshi / Neue Montreal (bold) | 96–120px |
| Section header | Satoshi (semibold) | 56–72px |
| Subheader | Satoshi (medium) | 28–36px |
| Body | Inter / Manrope | 16–18px |
| Meta / label | Inter (mono caps) | 12–13px |
| Signature accent | Script / handwritten (e.g., Caveat) | contextual |

### 2.3 Motion Principles

- Smooth scroll via **Lenis** (inertia-based)
- Scroll-triggered reveals via **GSAP ScrollTrigger** (fade + translate-y)
- Text split animations (characters stagger in per word)
- Parallax layers: hero imagery moves at 0.6× scroll speed
- Magnetic cursor effect near CTAs
- `prefers-reduced-motion` disables all animations gracefully

---

## 3. Site Architecture

```
/                   → Home (Hero + snapshot of each section)
/about              → Full about + philosophy
/work               → Project deep dives
/thinking           → Blogs + System Design + Research Notes
/experiments        → Experiments log
/life               → Travel map + Journal + Systems
/now                → Current focus (updated regularly)
/resume             → Interactive résumé
/contact            → Contact
```

---

## 4. Pages & Sections

---

### 4.1 Home (`/`)

#### Hero Section
- Full-viewport dark background
- Oversized headline: **"TANMAY BHUSKUTE"** in display font
- Subline: `Backend · Distributed Systems · AI Systems`
- Animated signature reveal on load (SVG path draw)
- CTA button: `"Explore Work"` with magnetic hover effect
- Custom loading screen (2–3s): animated lime-green progress bar + initials `TB`
- Parallax background texture (subtle noise or grain)

#### About Snapshot
- 2-column split: left = large pull quote, right = short bio paragraph
- Pull quote: *"I build systems that scale, ship, and survive."*
- Signature underneath the quote
- `→ Read more` link to `/about`

#### Work Snapshot — Horizontal Scroll Gallery
- Pinned horizontal scroll section (GSAP ScrollTrigger)
- 4 project cards visible at a time, scrolls to reveal all
- Each card: project name, 1-line description, year tag, tech stack pills
- Hover state: lime-green overlay + "View →" label
- Projects shown (from readme):
  1. Spendora — Conversational AI expense insights
  2. News Headline Classifier — 93.28% accuracy LSTM
  3. Media Recommendation System — Published research
  4. SoundScape — Android music streaming, 70% API call reduction

#### Wins / Stats Bar
- Horizontal ticker or 3-column grid
- Key metrics from readme:
  - `50%` Deployment downtime reduced (Blue-Green)
  - `44` Production upgrades, zero downtime
  - `40%` Deployment effectiveness improvement
  - `200%` Code coverage increase
  - `30%` AWS provisioning time reduction
  - `95%` Infra misconfiguration catch rate

#### Tech Stack Grid
- Logo grid, grayscale → color on hover
- Grouped: *Production* / *Strong* / *Exploring*
- Production: AWS, Python, Ansible, GitLab CI/CD, Kubernetes, ArgoCD, Vault
- Strong: Java, Python, C/C++, SQL, React, Node.js, FastAPI, PyTorch, HuggingFace, LangChain, Docker
- Exploring: Go, Rust, Advanced LLM Systems

#### Thinking Snapshot
- 3 latest blog/thinking pieces as cards
- Tag: `Blog` / `System Design` / `Research`
- Hover: card lifts with lime-green left border

#### Now Section (teaser)
- Dark full-width banner: `"Currently: Targeting Backend / AI Systems roles · Summer / Fall 2026"`
- `→ See full /now` link

#### Footer
- Large tagline: `"LET'S BUILD SOMETHING."`
- Contact email: `the.whitfield.222@gmail.com`
- Social links: GitHub, LinkedIn, Twitter/X
- Partner/tool logos (tech stack icons)
- Copyright + `Built by Tanmay Bhuskute`

---

### 4.2 About (`/about`)

- Full-page hero with personal photo (optional) or abstract visual
- Personal statement — expanded version of readme philosophy
- **Non-Negotiables** section: 4 cards with icons
  - Ownership & accountability
  - Deep work over shallow effort
  - Simplicity over complexity
  - Trust is earned
- **Operating Principles**: animated list, stagger-in on scroll
- **Strengths**: pill grid
- **What I Care About**: MLOps, Distributed Systems — with brief explanation
- Handwritten signature sign-off

---

### 4.3 Work (`/work`)

#### Overview
- Grid of all projects with hover reveal (base image → alternate image, or base → lime overlay)
- Filter by tag: `ML · Backend · Android · Research · DevOps`

#### Project Cards
Each card:
- Title
- 1-sentence description
- Year
- Tech stack pills
- Hover: lime gradient overlay + `"Deep Dive →"`

#### Project Detail Pages (`/work/[slug]`)
Each project gets a dedicated page:

**Spendora**
- Conversational AI for expense insights
- LangChain + HuggingFace, RAG + tool-based reasoning
- Architecture diagram (optional)
- Key decisions + results

**News Headline Classifier**
- LSTM deep learning model
- Trained on 400K+ samples
- 93.28% accuracy — chart/visualization

**Media Recommendation System**
- Multi-algorithm: Content-based + Collaborative + K-means + TF-IDF
- Published research paper — link/embed
- Methodology breakdown

**SoundScape**
- End-to-end Android music streaming
- API integration + caching
- 70% reduction in API calls — before/after

**CEAS Expo — Technical Judge (2026)**
- Evaluated student teams
- Structured evaluation framework
- High-signal questioning methodology

---

### 4.4 Thinking (`/thinking`)

Three sub-sections, accessible via tab or nested nav:

#### Blogs
- Card grid with tag, title, date, read-time estimate
- Planned posts (from readme):
  - How I Evaluate Technical Projects
  - How I Ask High-Signal Questions
  - What I Look For When Judging Student Projects
  - How I'm Running My Job Search Like a System
  - What I Learned Applying to 100+ Roles
  - Why Most Applications Fail

#### System Design
- Problem breakdown posts:
  - Android Bug Reproduction Systems
  - Distributed Logging Systems
  - How Instagram Recommends Reels
  - How Niantic Built AR World from User Images
- Format per post: Problem → Approach → My Extension

#### Research Notes
- Focus areas: GIFDroid, LLM-based systems, Vision models, Screen recording analysis, Auto bug reproduction
- Format: Idea → Weakness → My Extension

---

### 4.5 Experiments (`/experiments`)

- Chronological log of experiments
- Entry format: title, status badge (`Active / Shipped / Abandoned`), brief description, learnings
- Current: Spendora → evolving from text to voice interaction
- Design: terminal / log aesthetic (monospace font, green text on dark)

---

### 4.6 Life (`/life`)

#### Travel Map
- Interactive map (Mapbox or Leaflet)
- Pins for visited locations with photos/notes
- Planned: Seattle, LA, San Diego

#### Moments / Highlights
- Masonry photo grid
- Lightbox on click

#### Systems for Life
- Cards for scheduling systems, productivity experiments, habit design, optimization frameworks

#### Journal
- Short-form entries, selective reflections
- Minimal design: large body text, date stamp, tag

#### Things I'm Trying
- Experimental log: new routines, learning experiments

#### Small Notes
- Micro-observations grid — Twitter-card style

---

### 4.7 Now (`/now`)

- Full page, updated manually
- Current focus blocks:
  - **Applying**: Summer / Fall 2026 Backend / Distributed Systems / AI Systems roles
  - **Learning**: System Design, DSA (Backtracking, Sliding Window → Graph → 1D DP)
  - **Building**: High-signal projects
- Activity log: daily applications, referral outreach, cold emails
- Last updated timestamp
- Design: clean, almost sparse — makes regular updates feel significant

---

### 4.8 Resume (`/resume`)

- Interactive résumé rendered in-browser (not a PDF viewer)
- Sections: Experience, Projects, Skills, Education
- Each experience entry: expandable bullet list
- Wins bar (same as home stats)
- Download PDF button (lime CTA)

---

### 4.9 Contact (`/contact`)

- Minimal: email link + social links
- Optional: short contact form (Name, Email, Message)
- Anti-spam: honeypot field
- No dashboards or gamification (per readme)

---

## 5. Navigation

- **Floating nav**: fixed top, transparent background, blurs on scroll (backdrop-filter)
- Logo: `TB` monogram in lime
- Links: About · Work · Thinking · Life · Now · Resume
- Hamburger on mobile: full-screen overlay with large nav links, background shifts on hover
- Social icons: GitHub, LinkedIn in header (desktop only)

---

## 6. Interactions & Animations

| Interaction | Implementation |
|---|---|
| Smooth scroll | Lenis |
| Scroll-triggered reveals | GSAP ScrollTrigger (fade + translateY) |
| Hero text | GSAP split-text stagger |
| Horizontal gallery | GSAP pin + scrub |
| Tech logo hover | CSS grayscale → color transition |
| Project card hover | CSS clip-path or opacity swap |
| Magnetic CTA | JS mouse proximity + transform |
| Page transitions | Framer Motion `AnimatePresence` |
| Loading screen | CSS/GSAP timeline |
| Parallax hero | GSAP + requestAnimationFrame |

---

## 7. Performance Requirements

- Lighthouse score ≥ 90 (Performance, Accessibility, Best Practices)
- Images: WebP/AVIF with Next.js `<Image>` (lazy loading, blur placeholder)
- Fonts: `next/font` with subset + preload
- Critical CSS inlined; non-critical deferred
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

---

## 8. Technical Stack

```
Framework:     Next.js 14+ (App Router)
Styling:       Tailwind CSS v3 + CSS custom properties
Animations:    GSAP (ScrollTrigger, SplitText) + Framer Motion
Scroll:        Lenis smooth scroll
Fonts:         next/font (Satoshi + Inter)
Icons:         Lucide React / custom SVGs
CMS:           MDX files (blogs/journal) — no external CMS needed to start
Maps:          Mapbox GL JS (Life page)
Hosting:       Vercel
Analytics:     Vercel Analytics (privacy-first)
```

---

## 9. File Structure

```
/app
  /page.tsx                  → Home
  /about/page.tsx
  /work/page.tsx
  /work/[slug]/page.tsx
  /thinking/page.tsx
  /thinking/[slug]/page.tsx
  /experiments/page.tsx
  /life/page.tsx
  /now/page.tsx
  /resume/page.tsx
  /contact/page.tsx
  layout.tsx                 → Root layout (Nav + Footer + Lenis provider)
/components
  /ui
    - Button.tsx
    - Card.tsx
    - Tag.tsx
  /sections
    - Hero.tsx
    - HorizontalGallery.tsx
    - StatsBar.tsx
    - TechGrid.tsx
    - ThinkingSnapshot.tsx
    - NowBanner.tsx
  - Nav.tsx
  - Footer.tsx
  - LoadingScreen.tsx
  - CustomCursor.tsx
/content
  /work/                     → MDX project files
  /thinking/                 → MDX blog/research files
  /experiments/              → MDX experiment entries
  /life/journal/             → MDX journal entries
/lib
  - animations.ts            → Shared GSAP helpers
  - lenis.ts                 → Lenis setup
  - mdx.ts                   → Content loader
/public
  /images
  /fonts
  /icons
/styles
  globals.css
  variables.css
```

---

## 10. Content Milestones

| Phase | Scope |
|---|---|
| **v1 — Core** | Home, About, Work (4 projects), Now, Resume, Contact |
| **v2 — Thinking** | Blogs (3 posts), System Design (2 breakdowns) |
| **v3 — Life** | Travel map, Journal (5 entries), Moments gallery |
| **v4 — Interactive** | Experiments log, Research Notes, "Talk to My Brain" chatbot |

---

## 11. Accessibility

- Keyboard navigable: all interactive elements focusable
- `prefers-reduced-motion`: disables all GSAP / Framer animations
- Heading hierarchy: h1 → h2 → h3, never skipped
- Alt text on all images
- ARIA labels on icon-only buttons
- Color contrast: lime (`#C6FF00`) on dark (`#0A0A0A`) passes AA at body size

---

## 12. Out of Scope (v1)

- Chatbot ("Talk to My Brain") — v4
- Gamification
- Dashboards
- External CMS (MDX files sufficient for now)
- Sound design

---

## 13. Success Criteria

- Passes Lighthouse ≥ 90 across all categories
- Loads hero < 2s on fast 3G
- All animations run at 60fps (Chrome DevTools verified)
- Mobile-responsive at 375px, 768px, 1280px, 1920px
- Content keeps `/now` page accurate — updated at least monthly
- Recruiters can find projects, wins, and contact in < 30 seconds

---

## 14. GSD Execution Plan (v1-first)

### 14.1 Principle

Ship the highest-signal recruiter path first:

`Home → Work (with deep dives) → Resume → Contact`

Everything else is secondary until this path is production-ready, mobile-ready, and fast.

### 14.2 v1 Scope Freeze (Must Ship)

- `/` Home
- `/about`
- `/work`
- `/work/[slug]` for 4 core projects
- `/now`
- `/resume`
- `/contact`
- Global nav + footer + responsive behavior
- Baseline motion system with `prefers-reduced-motion`

### 14.3 Deferred Until Post-v1

- `/thinking`
- `/experiments`
- `/life`
- Complex interactions beyond core hero/work (magnetic cursor, advanced parallax layers, custom loader polish passes)

### 14.4 Workstreams

| Workstream | Owner | Output |
|---|---|---|
| Foundation | Tanmay | Next.js app shell, routes, layout, design tokens, responsive scaffolding |
| Content | Tanmay | Project case studies, about text, now updates, resume entries |
| Motion | Tanmay | Reusable GSAP/Framer primitives + reduced-motion fallback |
| Quality | Tanmay | Lighthouse checks, accessibility pass, mobile QA, deployment checklist |

### 14.5 4-Week Plan (Dates)

#### Week 1: Foundation + IA (Apr 18, 2026 - Apr 24, 2026)
- Initialize app structure exactly from section 9
- Implement global styles: color tokens, typography scale, spacing rhythm
- Build root layout: nav, footer, base containers, mobile menu shell
- Create all v1 routes with placeholder content blocks
- Set up MDX content loading for `/work/[slug]`
- Add analytics + metadata defaults (title template, OG image placeholders)

**Exit criteria**:
- All v1 pages render in desktop + mobile without layout breakage
- Navigation complete and keyboard-operable

#### Week 2: Content + Core UI (Apr 25, 2026 - May 1, 2026)
- Build Home sections: hero, about snapshot, work snapshot, stats bar, tech grid, now teaser
- Build `/work` listing page with filtering and visual hierarchy
- Write and integrate 4 project deep-dive pages
- Build `/resume` interactive sections and download CTA
- Build `/contact` minimal page + anti-spam honeypot form

**Exit criteria**:
- Recruiter can discover top wins, top projects, and contact in under 30 seconds
- All copy final for v1

#### Week 3: Motion + Polish (May 2, 2026 - May 8, 2026)
- Add Lenis smooth scrolling and route-safe setup
- Add GSAP scroll reveals + home gallery pinning
- Add Framer Motion page transitions
- Implement reduced-motion safe mode for all interactions
- Tune typography, spacing, hover states, contrast, and image treatment

**Exit criteria**:
- Motion feels intentional and stable at 60fps on modern laptop/mobile
- Reduced-motion mode verified manually

#### Week 4: Perf + QA + Launch (May 9, 2026 - May 15, 2026)
- Lighthouse and Core Web Vitals optimization pass
- Image optimization and font loading audit
- Accessibility audit (keyboard, semantic headings, alt text, ARIA)
- Device testing: 375px, 768px, 1280px, 1920px
- Production deployment + final smoke tests

**Exit criteria**:
- Lighthouse >= 90 across Performance, Accessibility, Best Practices
- No blocker bugs in recruiter path pages
- Public production URL live

### 14.6 Day-0 to Day-3 GSD Checklist (Start Immediately)

#### Day 0 (Apr 18, 2026)
- Finalize v1 scope freeze and defer list
- Create project board with columns: `Backlog`, `Today`, `In Progress`, `Review`, `Done`
- Define 10 high-impact tasks only (no long backlog dumping)

#### Day 1 (Apr 19, 2026)
- Scaffold routes and root layout
- Add design tokens and typography utilities
- Implement nav/footer desktop + mobile shells

#### Day 2 (Apr 20, 2026)
- Ship Home hero + about snapshot + stats bar
- Add `/work` listing skeleton + sample project cards

#### Day 3 (Apr 21, 2026)
- Publish first two project deep-dive pages
- Build `/contact` and `/now` minimally but production-usable

### 14.7 Definition of Done (Per Feature)

- UX works on desktop and mobile
- Keyboard navigation passes
- No console errors/warnings in normal flow
- `prefers-reduced-motion` respected
- Content is final quality (not lorem ipsum)
- Basic analytics event(s) where relevant

### 14.8 Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Over-investing in animation early | Delays shipping recruiter-critical pages | No advanced animation before static content is complete |
| Content not ready | Blocks high-signal pages | Write case-study templates first, fill one project/day |
| Mobile polish postponed | Rework and bugs near launch | Mobile-first checks at end of each feature PR |
| Scope creep into v2/v3 | Missed launch date | Any non-v1 item must be explicitly moved to post-launch list |

### 14.9 Weekly Review Cadence

Every Saturday:
- Review shipped pages vs v1 scope
- Measure Lighthouse and mobile quality deltas
- Kill or defer one low-impact task
- Set next week’s top 5 tasks only

### 14.10 Post-v1 Sequencing

1. v2 Thinking (3 posts + 2 system design breakdowns)
2. v3 Life (map + journal + moments)
3. v4 Experiments + research notes + chatbot

---

*This PRD is a living document. Update content sections as new projects, blog posts, or experiments are added.*
