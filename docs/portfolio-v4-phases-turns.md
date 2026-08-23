# Portfolio v4 Five-Turn Implementation Prompts

Use each prompt in a new chat window. Each prompt repeats the required context
so the next Codex session can start from the repo and docs without relying on
previous conversation history.

## Turn 1 Prompt

```text
You are working in /Users/tanmaybhuskute/Documents/portfolio on branch v4.

Read these first:
- docs/portfolio-v4-plan.md
- docs/portfolio-v4-phases.md
- docs/portfolio-v4-sample-image-1.png
- docs/portfolio-v4-sample-image-2.png

Goal: implement portfolio v4 as a neo-brutalist, scan-first, content-driven redesign. Preserve content-driven architecture. Use the sample images as visual references, not pixel-perfect mocks. Do not revert unrelated user changes.

Complete only Portfolio v4 implementation phases 1-7 from docs/portfolio-v4-phases.md:

1. V3 To V4 Migration Matrix
2. Content And Metric Audit
3. Layout, Spacing, And Typography System
4. Colors, Borders, Shadows, And Theme Decision
5. Core Brutalist Primitives
6. Content Models And Rendering Contracts
7. Visual Asset Inventory

Do not redesign the homepage yet. Update docs if implementation decisions differ from the plan. Run typecheck/lint if relevant. Summarize phase-by-phase completion, changed files, test results, and remaining risks.
```

## Turn 2 Prompt

```text
You are working in /Users/tanmaybhuskute/Documents/portfolio on branch v4.

Read these first:
- docs/portfolio-v4-plan.md
- docs/portfolio-v4-phases.md
- docs/portfolio-v4-sample-image-1.png
- docs/portfolio-v4-sample-image-2.png

Goal: implement portfolio v4 as a neo-brutalist, scan-first, content-driven redesign. Preserve content-driven architecture. Use the sample images as visual references, not pixel-perfect mocks. Do not revert unrelated user changes.

Complete only Portfolio v4 implementation phases 8-10 from docs/portfolio-v4-phases.md:

8. Navigation And Shared Shell
9. Hero, Currently, And Recruiter Mode
10. Selected Impact

Use sample image 1 for nav direction and sample image 2 for hero/recruiter/impact direction. Recruiter Mode must be keyboard accessible, work on mobile, and not depend on hover. Run typecheck/lint and verify desktop/mobile. Summarize phase-by-phase completion, changed files, test results, and remaining risks.
```

## Turn 3 Prompt

```text
You are working in /Users/tanmaybhuskute/Documents/portfolio on branch v4.

Read these first:
- docs/portfolio-v4-plan.md
- docs/portfolio-v4-phases.md
- docs/portfolio-v4-sample-image-1.png
- docs/portfolio-v4-sample-image-2.png

Goal: implement portfolio v4 as a neo-brutalist, scan-first, content-driven redesign. Preserve content-driven architecture. Use the sample images as visual references, not pixel-perfect mocks. Do not revert unrelated user changes.

Complete only Portfolio v4 implementation phases 11-13 from docs/portfolio-v4-phases.md:

11. Featured Systems
12. Interactive System Builder
13. Architecture Diagram System

Use sourced metrics only. Every proof point should have one primary home. System Builder must work by click/tap/keyboard, with hover only as preview. Use sample image 2 as the main visual reference. Run typecheck/lint and check mobile layout. Summarize phase-by-phase completion, changed files, test results, and remaining risks.
```

## Turn 4 Prompt

```text
You are working in /Users/tanmaybhuskute/Documents/portfolio on branch v4.

Read these first:
- docs/portfolio-v4-plan.md
- docs/portfolio-v4-phases.md
- docs/portfolio-v4-sample-image-1.png
- docs/portfolio-v4-sample-image-2.png

Goal: implement portfolio v4 as a neo-brutalist, scan-first, content-driven redesign. Preserve content-driven architecture. Use the sample images as visual references, not pixel-perfect mocks. Do not revert unrelated user changes.

Complete only Portfolio v4 implementation phases 14-19 from docs/portfolio-v4-phases.md:

14. Case Study Template
15. Experience And Research
16. Thinking And Life
17. Contact And Conversion
18. Content Compression And Microcopy
19. Inner Page Migration

Apply brutalism intensity levels: homepage level 3, index pages level 2, reading pages level 1. Project detail pages should use the case-study structure from the plan. Preserve deeper reading behind clicks. Run typecheck/lint. Summarize phase-by-phase completion, changed files, test results, and remaining risks.
```

## Turn 5 Prompt

```text
You are working in /Users/tanmaybhuskute/Documents/portfolio on branch v4.

Read these first:
- docs/portfolio-v4-plan.md
- docs/portfolio-v4-phases.md
- docs/portfolio-v4-sample-image-1.png
- docs/portfolio-v4-sample-image-2.png

Goal: implement portfolio v4 as a neo-brutalist, scan-first, content-driven redesign. Preserve content-driven architecture. Use the sample images as visual references, not pixel-perfect mocks. Do not revert unrelated user changes.

Complete only Portfolio v4 implementation phases 20-27 from docs/portfolio-v4-phases.md:

20. Metadata And Social Preview
21. Analytics And Event Map
22. App States
23. Accessibility QA
24. Performance QA
25. Visual Regression And Cross-Browser QA
26. Dead-Code And V3 Cleanup
27. Final Build, Review, And Polish

Run npm run typecheck, npm run lint, and npm run build. Check desktop/mobile routes: /, /projects, one project detail page, /thinking, /experience, /travel-life, /contact. Remove obsolete v3 styles/components only if unused. Do not revert unrelated user changes. Summarize phase-by-phase completion, remaining risks, and test results.
```

