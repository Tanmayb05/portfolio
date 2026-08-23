# Portfolio v4 Visual Asset Inventory

Scope: implementation phase 7 from `docs/portfolio-v4-phases.md`.

## Current Asset Folders

| Path | Status | Notes |
| --- | --- | --- |
| `public/resume.pdf` | Available | Resume download. |
| `public/maps/us-states-10m.json` | Available | Travel map data. |
| `public/usa_travel_places.json` | Available | Travel/life data. |
| `public/low-poly-image.png` | Available | Generic legacy visual; do not use as a flagship project proof asset. |
| `public/low-poly-image-removebg.png` | Available | Generic legacy visual; do not use as a flagship project proof asset. |
| `assets/projects/*` | Missing | Add if real project screenshots or generated fallbacks are introduced. |

## Flagship Project Strategy

| Project | Primary visual strategy | Available now | Missing follow-up |
| --- | --- | --- | --- |
| PolicyPilot | Architecture visualization first, real Evidence Explorer / coverage search screenshot when available | Structured architecture data and planned visual labels from `2-projects.json` | Product screenshot, Evidence Explorer screenshot, cross-payer comparison screenshot, alt text per asset. |
| NYC Mobility Forecasting | Dataset/map visualization first | Structured architecture data and planned visual labels from `2-projects.json` | Map dashboard screenshot, zone forecast chart, model result chart, alt text per asset. |
| Spotify Personal Analytics Platform | Dashboard screenshot first | Structured architecture data and planned visual labels from `2-projects.json` | Dashboard overview, listening-history chart, genre breakdown visualization, alt text per asset. |

## Secondary Project Strategy

| Project | Primary visual strategy | Missing follow-up |
| --- | --- | --- |
| Spendora | Conversation flow or RAG architecture | Conversation UI screenshot, expense-insight dashboard screenshot. |
| News Headline Classification | Result chart or model architecture diagram | Confusion matrix, training curve, architecture diagram. |
| Media Recommendation System | Product UI or algorithm comparison chart | Recommendation UI, algorithm comparison chart, user-flow diagram. |
| SoundScape Android | Mobile screenshots | Player screen, search/browse screen, playlist view. |

## Rules For Future Assets

- Prefer real product screenshots over abstract visuals.
- Use architecture visualizations when product screenshots are unavailable or sensitive.
- Generated abstract system graphics are fallback only.
- Every image must include specific alt text describing the artifact and why it matters.
- Missing assets must degrade to semantic architecture markup, not empty image frames.
