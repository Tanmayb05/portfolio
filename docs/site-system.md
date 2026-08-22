Below is a strong first version of your `site-system.md`. This becomes the **source of truth** for your portfolio design, content structure, and AI prompts. It follows the system-first approach from your workflow doc .

````md
# Portfolio Site System

## 1. Core Identity

This portfolio is not a traditional resume website.

It is a polished, evolving system that shows:

- how I think
- what I build
- how I approach technical systems
- how my work, projects, notes, and personal exploration connect

Primary impression:

> This person builds real things, thinks clearly, and has creative taste.

The site should feel like:

> A calm, premium interface over a constantly evolving technical mind.

---

## 2. Portfolio Priorities

Priority order:

1. Thinking / notes / blogs
2. Visual and creative impression
3. Technical depth
4. Job-search credibility

The portfolio should not feel like it is begging for a job.

It should feel like:

> A strong technical person who documents, builds, reflects, and improves.

---

## 3. Primary User Journey

The homepage follows this flow:

```txt
Identity → Proof → Explore for Depth
````

### Homepage goal

Give enough context to understand who I am and what I build, but push deeper details into dedicated pages.

Homepage depth level:

> Medium-depth

The homepage should not become a full resume, blog archive, or project documentation page.

---

## 4. Visual Direction

Overall visual feel:

```txt
Apple-like
Dark-mode first
Polished
Text-first
Cool-toned gradients
Teal accent
Minimal but not boring
Technical but not robotic
Creative but controlled
```

The visual system should feel calm and premium by default.

Creative moments should appear mainly in:

* Travel page
* Thinking page
* interactive diagrams
* map interactions
* project architecture previews

---

## 5. Theme Strategy

The site supports:

```txt
Dark mode first + light mode toggle
```

Dark mode is the canonical experience.

Light mode should exist, but it should not drive the original design decisions.

---

## 6. Color System

### Dark Theme

```txt
Background 1: #070B10
Background 2: #0B1118
Background 3: #0C1416
Surface/Card: #111820
Surface Elevated: #151E27
Border: #24303A
Border Soft: rgba(255,255,255,0.08)

Text Primary: #F5F7FA
Text Secondary: #C3CDD7
Text Muted: #9AA7B2

Accent Teal: #2DD4BF
Accent Teal Soft: rgba(45, 212, 191, 0.12)
Accent Teal Border: rgba(45, 212, 191, 0.28)
```

### Light Theme

```txt
Background 1: #F7FAFC
Background 2: #EEF5F7
Background 3: #EAF3F3
Surface/Card: #FFFFFF
Surface Elevated: #F8FBFC
Border: #D8E3E7
Border Soft: rgba(15, 23, 42, 0.08)

Text Primary: #071018
Text Secondary: #334155
Text Muted: #64748B

Accent Teal: #0F766E
Accent Teal Soft: rgba(15, 118, 110, 0.10)
Accent Teal Border: rgba(15, 118, 110, 0.24)
```

### Accent Usage Rules

Use teal only for:

* links
* active states
* small highlights
* selected tags
* map highlights
* important metrics
* subtle CTA emphasis

Do not use teal everywhere.

The site should stay mostly neutral.

---

## 7. Background System

The background should not be a flat solid color.

Use section-level gradient shifts within the same cool color family.

### Rule

Each section can shift slightly in tone, but the whole site must feel like one continuous environment.

### Section Background Pattern

```txt
Hero:
cool black → deep slate

Featured Projects:
deep slate → teal-tinted slate

Thinking:
charcoal → blue-slate

Experience:
deep graphite → cool slate

Travel:
slate → subtle teal glow

Contact:
deep charcoal → black
```

### Allowed Background Effects

Use carefully:

* subtle linear gradients
* subtle radial glows
* very low-opacity grid texture
* soft section separators
* low-opacity border lines

### Avoid

* loud gradients
* animated blobs
* rainbow color shifts
* glassmorphism everywhere
* heavy noise textures
* section backgrounds that feel unrelated

The background should feel premium, not decorative.

---

## 8. Typography

### Font Direction

Primary font:

```css
font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
```

Mono font:

```css
font-family: "JetBrains Mono", "SF Mono", Consolas, monospace;
```

### Usage

Use primary font for:

* headings
* body text
* nav
* cards
* long-form writing

Use mono font only for:

* small labels
* metadata
* code
* version-like text
* dates
* technical tags

### Typography Personality

The text should feel:

* precise
* calm
* readable
* confident
* not overly playful
* not corporate

### Heading Rules

Headings should be large, clean, and direct.

Avoid overly clever headings that reduce clarity.

Good:

```txt
Featured Systems
How I Think
Currently Building
Engineering Notes
Travel Map
```

Avoid:

```txt
My Universe
Things from my brain
Cool stuff I made
```

---

## 9. Layout System

### General Layout

Use consistent max-width containers.

Recommended widths:

```txt
Main container: max-w-6xl
Reading container: max-w-3xl
Wide visual container: max-w-7xl
```

### Section Rhythm

Each page should follow:

```txt
Intro → Main content → supporting content → CTA
```

### Spacing

Use generous spacing.

The site should not feel cramped.

Recommended rhythm:

```txt
Page top padding: 6rem to 8rem
Section padding: 5rem to 7rem
Card gap: 1rem to 1.5rem
Paragraph max width: 65–75 characters
```

---

## 10. Interaction Style

Interactions should be:

```txt
Polished
Smooth
Precise
Restrained
Product-like
```

Use:

* subtle hover transitions
* soft card elevation
* expandable cards
* section reveal animations
* active nav indicators
* map hover/click states
* smooth popup cards

Avoid:

* cursor gimmicks
* bouncing animations
* loud scroll effects
* overanimated backgrounds
* excessive parallax
* playful motion that weakens technical credibility

---

## 11. Page Structure

## Home

Purpose:

```txt
Identity → Proof → Explore for Depth
```

Sections:

1. Hero
2. Featured Systems
3. How I Think
4. Experience Preview
5. Travel Preview
6. Currently / Living System
7. Soft CTA

### Home Hero

The hero should be text-heavy.

It should not use a large image.

It should include:

* short identity line
* what I build
* what I care about
* two CTAs:

  * View Projects
  * Explore Thinking

Tone:

```txt
calm, confident, clear
```

### Featured Systems

Show 2–3 strong projects.

Each featured card should include:

* project name
* one-line description
* architecture preview
* metric/result
* tech stack tags
* link to case study

### How I Think

This section bridges projects and writing.

It should include short thinking entries such as:

* How I design systems before writing code
* When ML is useful and when it is not
* How I evaluate technical projects
* What makes systems reliable

Each item links to a Thinking page post.

### Currently

This is the living system section.

It should show polished snapshots of ongoing work, not raw notes.

Examples:

* Currently building: GIFDroid execution trace pipeline
* Exploring: evidence-grounded policy agents
* Improving: system design depth
* Writing: engineering case studies

---

## Projects Page

Purpose:

> Prove that I build real systems.

Project page structure:

1. Page intro
2. Featured Systems
3. All Projects
4. Project categories / filters
5. CTA to Thinking or Contact

### Project Case Study Format

Default format:

```txt
Problem
Context
Architecture
Core technical decisions
Tradeoffs
Metrics / results
What I would improve next
```

Project pages should feel like engineering case studies.

They should prioritize:

* architecture diagrams
* technical decisions
* metrics
* implementation details
* tradeoffs

Avoid making project pages look like generic portfolio cards.

---

## Thinking Page

Purpose:

> Show how I reason, explore, and explain technical ideas.

This is not a normal chronological blog dump.

Organize by topic.

Suggested categories:

```txt
Systems Thinking
AI / ML Notes
Engineering Decisions
Project Reflections
Evaluation Notes
Personal Operating Systems
```

Writing voice:

```txt
Exploratory but structured
```

Each post should have:

* title
* short summary
* category
* date
* related project if applicable
* reading time
* tags

---

## Experience Page

Purpose:

> Show credibility without turning the whole site into a resume.

Structure:

1. Short intro
2. Resume download button
3. Timeline
4. Expandable role cards
5. Small skills section
6. Soft CTA

Experience format:

Each role should include:

* company
* role
* dates
* location
* short summary
* impact bullets
* tools/technologies
* optional expanded details

The timeline should feel polished and interactive.

Do not overload the page with every resume bullet.

The resume download gives recruiters the full version.

---

## Travel Page

Purpose:

> Add personality through an interactive, polished map-first experience.

Travel should feel like a creative visual moment, but still match the site.

Order:

1. USA
2. India
3. China

### Travel UI

Use choropleth-style maps for each country.

Each highlighted state/province should support:

Hover:

* state/province name
* short place label

Click:

* popup card
* locations visited
* short trip description
* time visited
* Google Maps link
* optional gallery area
* tags

### Travel Design Rules

Maps should match the site color system.

Use:

* muted base map
* teal highlight
* soft hover glow
* low-contrast borders
* rounded popup card
* same typography as site
* smooth transitions

Avoid:

* default map styling
* random Google Maps embed look
* bright unrelated colors
* cluttered popups

---

## Contact Page

Purpose:

> Make it easy to reach me.

Structure:

1. Short direct intro
2. Email
3. LinkedIn
4. GitHub
5. Resume download
6. Optional “open to” list

Keep this page minimal.

No long pitch.

---

## 12. Content Rules

### Overall Rule

The site is a living system, but public content should feel polished.

Content strategy:

```txt
Polished snapshots of evolving work
```

Allowed:

* ongoing projects
* weekly updates
* progress summaries
* refined notes
* thoughtful reflections

Avoid:

* raw messy drafts
* unfinished half-thoughts
* weak project ideas
* logs with no useful signal

---

## 13. Writing Voice

Different pages use different levels of depth.

### Landing Pages

Voice:

```txt
concise, clear, confident
```

### Thinking / Notes

Voice:

```txt
exploratory, reflective, but structured
```

### Project Case Studies

Voice:

```txt
technical, rigorous, decision-focused
```

### Experience

Voice:

```txt
credible, impact-focused, scannable
```

---

## 14. Visual Components

Core reusable components:

```txt
SiteContainer
Navbar
Footer
PageHeader
SectionHeading
CTASection
ProjectCard
FeaturedProjectCard
ExperienceTimeline
ExperienceCard
ThinkingCard
LogCard
TravelMap
TravelPopupCard
MetricBadge
TechStackBadge
ThemeToggle
```

### Card Rules

Cards should use:

* subtle border
* soft background contrast
* rounded corners
* controlled hover
* consistent spacing
* clear hierarchy

Cards should not all look different.

### Button Rules

Primary button:

* teal accent
* restrained
* not overly bright

Secondary button:

* border-based
* neutral
* subtle hover

Text link:

* teal hover
* small underline or arrow motion allowed

---

## 15. Diagram System

Architecture diagrams are a core part of the visual identity.

Use diagrams for:

* project cards
* project case studies
* system explanations
* technical thinking posts

Diagram style:

```txt
minimal
line-based
rounded blocks
cool neutral colors
teal highlights
clear arrows
low visual noise
```

Diagrams should feel native to the site.

Avoid importing diagrams that look visually unrelated.

---

## 16. Map System

Travel maps are the most expressive visual component.

Map rules:

```txt
Base states: muted slate
Visited states: teal-tinted highlight
Hover state: brighter teal edge/glow
Selected state: elevated teal + popup card
Borders: low contrast
Labels: minimal
```

Popup card should include:

```txt
State/Province
Places visited
Short description
Date/time visited
Google Maps link
Optional photos/gallery
Tags
```

---

## 17. Skills Section

Skills should be small and supportive.

Best placement:

```txt
Experience page
```

Do not make skills a major homepage section.

Skill groups:

```txt
Languages
Frontend
Backend
Cloud / DevOps
AI / ML
Data
Tools
```

Design:

* compact badges
* grouped categories
* no giant percentage bars
* no fake proficiency meters

---

## 18. Resume Download

Resume download should appear in:

* Experience page near top
* Contact page
* possibly navbar as subtle link

Avoid making the resume button too aggressive on the homepage.

The portfolio should lead with thinking and systems, not resume-first positioning.

---

## 19. Navigation

Recommended navbar:

```txt
Home
Projects
Thinking
Experience
Travel
Contact
Resume
```

Resume can be a small button or icon-style link.

If navbar feels crowded, use:

```txt
Projects
Thinking
Experience
Travel
Contact
```

and place Resume inside Experience and Contact.

---

## 20. What to Avoid

Avoid:

* generic hero image
* fake 3D illustrations
* random AI graphics
* inconsistent gradients
* different card styles per page
* overuse of teal
* too many animations
* resume-first homepage
* raw unfinished logs
* project pages without metrics
* project pages without architecture diagrams
* blog archive with no structure

---

## 21. Final Design DNA

```txt
Portfolio type:
Structured thinking system + technical proof

Primary flow:
Identity → proof → click for depth

Theme:
Dark-mode first + optional light mode

Visual feel:
Apple-like, calm premium, cool gradients, teal accent

Homepage:
Medium-depth

Projects:
Engineering case studies

Writing:
Concise on landing pages
Exploratory in notes
Rigorous in project pages

Experience:
Timeline-first with resume download

Travel:
Map-first hybrid with polished popup cards

Content:
Polished snapshots of evolving work

Interactions:
Smooth, precise, restrained

Visual optimization:
Calm premium base
Technical proof in projects
Creative moments in Travel and Thinking
```

```
```
