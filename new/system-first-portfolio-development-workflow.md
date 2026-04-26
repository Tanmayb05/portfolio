Here’s the full workflow I’d use for a **portfolio built with Next.js + Tailwind + shadcn/ui + a written design system**.

The short principle is:

**System first, pages second.**
You are not asking AI to “make pages.”
You are asking AI to **build one product with reusable rules**.

Next.js App Router is the current official path for new projects, Tailwind v4 changed setup and browser support compared with older tutorials, and shadcn/ui is explicitly positioned as a customizable foundation you own rather than a locked UI kit. ([Next.js][1])

---

## 1. Choose the exact stack and lock it

Use:

* **Next.js App Router**
* **TypeScript**
* **Tailwind CSS v4**
* **shadcn/ui**
* **Vercel for deployment**

Why this exact combo:

* Next.js gives you layouts, routing, metadata, server/client boundaries, and a structure that fits multi-page portfolios well. ([Next.js][2])
* Tailwind v4 is the current generation and has a simpler import/setup model than older Tailwind tutorials, but it also has newer browser requirements, so start from current docs. ([Tailwind CSS][3])
* shadcn/ui lets you generate editable components into your own codebase, which is ideal when you want a consistent design system instead of random AI-made components. ([Shadcn UI][4])
* Vercel has first-class support for Next.js deployments. ([Vercel][5])

---

## 2. Define the website before writing code

Before you even scaffold the app, write a small **site spec**.

Make one markdown file called something like:

`docs/site-system.md`

Inside it, define:

### Brand / feel

* modern, minimal, technical
* dark mode first or light mode first
* calm vs bold
* playful vs serious
* premium vs simple

### Visual rules

* max content width
* spacing rhythm
* border radius
* shadow style
* section padding
* card style
* button style
* link hover style
* animation style
* icon style

### Typography rules

* heading scale
* body text size
* muted text style
* line lengths
* monospace usage or not

### Layout rules

* navbar height
* footer structure
* page intro pattern
* section heading pattern
* grid pattern for project cards
* content container widths

### Content rules

* how project cards look
* how experience entries look
* how blog summaries look
* how CTA sections look

This file becomes your **source of truth**.

### Why this matters

Without this, ChatGPT and Claude will keep inventing new styles page by page.
With this, every future prompt becomes constrained.

---

## 3. Create the project correctly

Start from the official Next.js setup. The current docs recommend `create-next-app` for bootstrapping a new application, including TypeScript and common defaults. ([Next.js][6])

Then install Tailwind using the current framework/PostCSS guidance rather than old v3-era setup steps. Tailwind v4 uses a newer configuration approach and the official docs point people to framework-specific installation guidance. ([Tailwind CSS][7])

Then add shadcn/ui using its current Next.js installation flow or scaffold flow. The docs now support creating or applying a preset in a Next.js project. ([Shadcn UI][4])

### My setup order

1. create Next.js app
2. confirm Tailwind works
3. add shadcn/ui
4. set aliases and folder structure
5. commit initial clean base

Do not start making pages before this base is stable.

---

## 4. Set up the folder structure for consistency

Use a structure like this:

```txt
app/
  layout.tsx
  page.tsx
  about/page.tsx
  projects/page.tsx
  experience/page.tsx
  blog/page.tsx
  contact/page.tsx

components/
  ui/                # shadcn-generated components
  shared/            # navbar, footer, container, theme toggle
  sections/          # hero, project grid, CTA, timeline
  cards/             # project card, blog card, experience card

lib/
  site-config.ts
  utils.ts

styles/
  globals.css

content/
  projects.ts
  experience.ts
  posts.ts
```

### Why this structure works

* `ui/` is primitive reusable stuff
* `shared/` is used almost everywhere
* `sections/` is layout-level composition
* `cards/` is repeatable content display
* `content/` avoids hardcoding everything inside page files

This makes AI output easier to control because you can tell it:

> Use existing shared components and content structures. Do not invent new layout patterns.

---

## 5. Build the design system into code first

Now translate `site-system.md` into actual implementation.

Create:

### `lib/site-config.ts`

Put:

* site title
* description
* nav links
* social links
* email
* GitHub/LinkedIn links
* CTA copy
* footer data

### `styles/globals.css`

Use this for:

* CSS variables
* theme tokens
* base body styles
* custom utility classes only when truly needed

### shadcn theme/base variables

shadcn/ui is meant to be customized and themed. Its newer tooling also supports applying presets/themes into existing projects. ([Shadcn UI][8])

### Define your tokens

Examples:

* background
* foreground
* muted
* border
* card
* primary
* accent
* radius

### Important rule

Do **not** sprinkle random custom hex colors across components.
Colors should come from your theme variables or a deliberate token set.

---

## 6. Create the shared foundation components first

Before making any full page, generate and finalize these:

* `SiteContainer`
* `Navbar`
* `Footer`
* `PageHeader`
* `SectionHeading`
* `CTASection`
* `ThemeToggle` if you want it
* `Reveal` or animation wrapper if you use motion
* `ProjectCard`
* `ExperienceCard`
* `BlogCard`

This is where the site’s consistency is actually created.

### The rule

Every page should be built from these pieces first.

Bad workflow:

* AI writes a unique hero and unique cards for every page

Good workflow:

* AI reuses your components and only changes content/layout composition

---

## 7. Build one page template before all pages

Create a **page blueprint**.
For example:

### Standard page pattern

1. intro/header
2. main content sections
3. optional CTA
4. footer

### Example for About

1. intro
2. short bio
3. values / working style
4. timeline / background
5. CTA

### Example for Projects

1. intro
2. featured projects
3. all projects grid
4. optional process section
5. CTA

Once you define those templates, you tell AI to fill them in instead of reimagining page structure every time.

---

## 8. Use content objects, not hardcoded JSX everywhere

Put your content in structured arrays or files.

For example:

* `projects.ts`
* `experience.ts`
* `blog.ts`

Each project object might contain:

* title
* description
* tech stack
* links
* tags
* featured
* image
* metrics

Why this matters:

* easier updates
* easier sorting/filtering later
* pages stay clean
* AI can work on structure separately from content

---

## 9. The exact AI workflow to follow

This is the part you’ll actually use with ChatGPT and Claude.

### Step A — Architecture pass

Ask ChatGPT:

> I am building a portfolio in Next.js App Router + Tailwind v4 + shadcn/ui. Help me create the architecture, folder structure, shared components plan, content model, and design system files. Optimize for consistency across pages.

Output you want:

* folder tree
* component list
* content schema
* file responsibilities

### Step B — Design system pass

Ask ChatGPT or Claude:

> Write a site-system.md for a modern developer portfolio. Include tokens, spacing, section rhythm, card rules, button rules, typography, and page templates. Make it strict enough that future page generation stays consistent.

Output:

* written design system

### Step C — Foundation components pass

Prompt:

> Build the shared components for my portfolio. Reuse the design system. Do not invent page-specific styles. Create SiteContainer, Navbar, Footer, PageHeader, SectionHeading, ProjectCard, ExperienceCard, CTASection.

### Step D — First page pass

Prompt:

> Build the home page using only existing shared components and the design system. Keep spacing, typography, and card treatment consistent. Do not introduce new style primitives.

### Step E — Refactor pass

After a few files exist, use Claude well here:

> Review these files for visual drift and code duplication. Identify repeated layout patterns that should be extracted into shared components. Standardize spacing and class patterns without changing the visual direction.

Claude is often useful for this “make the whole codebase feel like one site” task.

### Step F — QA pass

Prompt:

> Audit the current project for consistency issues across pages: spacing, heading hierarchy, button variants, container widths, mobile layout, hover states, and theme usage. Produce a fix list.

---

## 10. The prompting rules that keep AI under control

Use these rules in almost every prompt:

### Rule 1

“Reuse existing shared components.”

### Rule 2

“Do not invent new spacing/color/button/card styles unless necessary.”

### Rule 3

“Follow the site-system.md rules.”

### Rule 4

“Keep this page visually consistent with existing pages.”

### Rule 5

“Prefer extracting a reusable component over duplicating JSX.”

These five rules eliminate a lot of AI chaos.

---

## 11. How to replicate websites the smart way

When you say “replicate some websites,” do this at the **pattern** level.

Extract:

* hero layout pattern
* card rhythm
* page pacing
* whitespace
* sticky nav idea
* typography hierarchy
* section transitions

Do not directly clone:

* exact copy
* brand marks
* illustrations
* exact component arrangements one-to-one
* proprietary interactions/assets

### Better prompt style

Instead of:

> Clone the Linear homepage

Say:

> Build a homepage inspired by Linear’s clean typography, compact navigation, dark polished aesthetic, and strong section rhythm, but adapted for a developer portfolio with my content and my design tokens.

That gets you the good part.

---

## 12. How to keep all pages consistent

This is the real challenge.

Use these consistency mechanisms:

### Shared layout

Use `app/layout.tsx` for:

* font loading
* theme provider
* navbar/footer shell
* metadata defaults

Next.js App Router is specifically built around layouts, which is one reason it is a good fit here. ([Next.js][9])

### Shared container

All pages should use the same container widths.

### Shared page intro

Page title + short description should follow one pattern.

### Shared section headings

Do not manually style section headings differently on every page.

### Shared cards

Project cards, blog cards, experience cards should each have a canonical version.

### Shared spacing scale

Pick your section padding once and stick to it.

---

## 13. What to build first, in order

This is the build order I recommend:

### Phase 1 — system

* setup app
* install tools
* theme tokens
* design system doc
* site config

### Phase 2 — shell

* layout
* navbar
* footer
* container
* theme handling

### Phase 3 — primitives

* headings
* buttons
* cards
* badges
* CTA
* timeline or list components

### Phase 4 — core pages

* home
* about
* projects
* experience
* contact

### Phase 5 — enhancements

* blog
* project detail pages
* filters
* dark/light polish
* subtle animations
* SEO metadata
* OG images

### Phase 6 — deployment

* deploy preview
* check responsive behavior
* fix real-device issues
* ship

---

## 14. How much shadcn/ui to use

Use shadcn/ui for:

* buttons
* cards
* inputs
* dialogs
* badges
* sheets/drawers
* tabs
* accordions
* forms

Use your own wrappers for:

* page headers
* project cards
* portfolio sections
* timeline blocks
* about-page modules

That balance is ideal:

* shadcn/ui gives you accessible primitives
* your own components create your unique portfolio system

shadcn/ui’s docs position it as a foundation you customize and own, which is exactly the right mindset here. ([Shadcn UI][8])

---

## 15. Tailwind-specific advice

Because Tailwind v4 changed enough that old snippets can mislead you, don’t copy random older configs from videos or blog posts. Use current framework docs and keep customization centralized. Tailwind’s official v4 materials emphasize the new import/configuration model, and the upgrade guide notes the newer browser support baseline. ([Tailwind CSS][3])

My advice:

* keep most styling inline with utility classes
* keep tokens in CSS variables
* avoid giant one-off class strings repeated everywhere
* extract repeated structures into components
* avoid overusing `@apply` unless it truly improves reuse

---

## 16. What Claude is especially useful for

Use Claude for:

* reviewing 4–8 files at once
* finding style drift
* improving naming consistency
* spotting duplication
* refactoring large JSX sections into components
* checking if the codebase still follows your design system

A good Claude prompt:

> Here are the current files. Identify inconsistencies in spacing, heading hierarchy, card treatment, naming, and reuse. Suggest refactors that make the system tighter.

---

## 17. What ChatGPT is especially useful for

Use ChatGPT for:

* initial architecture
* generating component scaffolds
* producing multiple layout options
* writing site system docs
* turning ideas into implementable code quickly
* turning vague design inspiration into concrete sections

A good ChatGPT prompt:

> Give me 3 homepage structures for a developer portfolio using my existing design system and shared components. Keep them realistic and maintainable in Next.js App Router.

---

## 18. The minimum pages your portfolio should probably have

For most dev portfolios:

* **Home**
* **About**
* **Projects**
* **Experience**
* **Contact**

Optional:

* Blog
* Writing
* Resume
* Project detail pages

Do not make too many pages at first.
It is better to have 5 pages that feel like one product than 12 pages with inconsistent quality.

---

## 19. Deployment workflow

When ready:

* push to GitHub
* connect repo to Vercel
* use preview deployments for each branch/iteration
* test mobile and desktop
* fix real rendering issues

Vercel supports Next.js directly and its docs emphasize zero-config support for Next.js features. Next.js can also be deployed in other ways, but Vercel is the smoothest default for this stack. ([Vercel][10])

---

## 20. The biggest mistakes to avoid

### Mistake 1

Generating every page independently

### Mistake 2

Starting from visuals before defining system rules

### Mistake 3

Mixing too many UI kits

### Mistake 4

Letting AI invent new variants constantly

### Mistake 5

Skipping refactor after generation

### Mistake 6

Copying old Tailwind/Next tutorials without checking version changes

That last one matters right now because Next.js App Router and Tailwind v4 both changed the “normal” setup compared with lots of older content online. ([Next.js][1])

---

## 21. My recommended end-to-end workflow in one line

**Define system → scaffold app → install tools → code theme/tokens → build shared components → build one canonical page pattern → generate pages inside that pattern → refactor for reuse → deploy → polish**

---

## 22. The exact deliverables you should create

Create these first:

* `docs/site-system.md`
* `lib/site-config.ts`
* `components/shared/*`
* `components/cards/*`
* `components/sections/*`
* `content/projects.ts`
* `content/experience.ts`

If you have these, the rest becomes much easier.

---

## 23. My strongest recommendation

Don’t start by saying:

> make me a portfolio website

Start by saying:

> help me create a portfolio design system and shared component architecture in Next.js App Router + Tailwind v4 + shadcn/ui so every page stays consistent

That one change will massively improve your result.

If you want, next I can give you the **exact folder structure + starter files + prompt pack** for this stack.

[1]: https://nextjs.org/docs/app/getting-started?utm_source=chatgpt.com "App Router: Getting Started"
[2]: https://nextjs.org/docs?utm_source=chatgpt.com "Next.js Docs"
[3]: https://tailwindcss.com/blog/tailwindcss-v4?utm_source=chatgpt.com "Tailwind CSS v4.0"
[4]: https://ui.shadcn.com/docs/installation/next?utm_source=chatgpt.com "Next.js - shadcn/ui"
[5]: https://vercel.com/docs/frameworks/full-stack/nextjs?utm_source=chatgpt.com "Next.js on Vercel"
[6]: https://nextjs.org/docs/app/getting-started/installation?utm_source=chatgpt.com "Getting Started: Installation"
[7]: https://tailwindcss.com/docs/installation/framework-guides?utm_source=chatgpt.com "Framework guides - Installation"
[8]: https://ui.shadcn.com/?utm_source=chatgpt.com "The Foundation for your Design System - shadcn/ui"
[9]: https://nextjs.org/docs/app?utm_source=chatgpt.com "Next.js Docs: App Router"
[10]: https://vercel.com/frameworks/nextjs?utm_source=chatgpt.com "Next.js on Vercel"
