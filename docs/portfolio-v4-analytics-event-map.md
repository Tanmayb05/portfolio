# Portfolio v4 Analytics Event Map

Scope: implementation phase 21 from `docs/portfolio-v4-phases.md`.

The site uses privacy-conscious event hooks only. No analytics vendor is bundled
by default. Clicks dispatch a local `portfolio:event` browser event and call
`window.plausible` or `window.gtag` only if the host page provides them.

| Event | Trigger | Payload |
| --- | --- | --- |
| `resume_download` | Resume links and buttons | `surface` |
| `linkedin_click` | LinkedIn links and buttons | `surface` |
| `email_click` | Email links and buttons | `surface` |
| `recruiter_mode_open` | Recruiter shortcut dialog open | `surface` |
| `project_open` | Project cards and case-study links | `slug`, `surface` |
| `case_study_depth` | Case-study deep-dive CTA | `slug`, `surface` |
| `github_click` | Project GitHub link, when present | `slug`, `surface` |
| `demo_click` | Project demo link, when present | `slug`, `surface` |

Do not add hover, scroll-noise, keystroke, or session-replay tracking.
