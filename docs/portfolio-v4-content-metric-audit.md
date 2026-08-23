# Portfolio v4 Content And Metric Audit

Scope: implementation phase 2 from `docs/portfolio-v4-phases.md`.

## Metric Model

Implemented in `lib/content-types.ts`:

```ts
type Metric = {
  value: string;
  label: string;
  context?: string;
  source?: string;
};
```

Shared proof metrics live in `content/metrics.ts`. Project-level metrics are mapped from `data/source/2-projects.json` into the same model.

## Headline Metric Ownership

| Metric | Status | Primary home | Source | Notes |
| --- | --- | --- | --- | --- |
| `44` production upgrades | Sourced | Selected Impact | `1-experience.json` | Delivered in 4 months at Siemens. |
| `50%` downtime reduction | Sourced | Selected Impact | `1-experience.json` | Blue-Green deployment framework. |
| `40+` production environments | Sourced | Selected Impact | `1-experience.json` | Kubernetes migration across production environments. |
| `25.7x` latency reduction | Sourced | Selected Impact | `1-experience.json` | Android bug reproduction research, 39.4s vs 1012.1s average per run. |
| `40%` deployment time reduction | Sourced | Experience | `1-experience.json` | Siemens automation replacing legacy Ruby scripts. Avoid duplicating as a top-level Selected Impact card unless the section needs a fifth metric. |
| `17` MCP tool APIs | Sourced | Project tile / PolicyPilot case study | `2-projects.json` | Keep with PolicyPilot and architecture detail. |

## Unsupported Or Deferred Claims

| Claim | Decision | Reason |
| --- | --- | --- |
| Spendora conversational accuracy | Omit for headline use | Source data is `TBD` in `2-projects.json`. |
| Spendora manual analysis time reduction | Omit for headline use | Source data is `TBD` in `2-projects.json`. |
| Generic `40% deployment effectiveness improvement` wording | Use more precise source wording | Current source supports deployment time reduction, not a broad effectiveness claim. |

## Project Data Audit

The v4 project contract now includes:

- `name`
- `shortDescription`
- `category`
- `accent`
- `problem`
- `built`
- `outcome`
- `metrics`
- `stack`
- `featured`
- `featuredOrder`
- `architecture`
- `visuals`
- `primaryVisual`
- optional `github` and `demo`

Current limitations:

- Links are still mostly `TBD`, so project tiles should degrade without GitHub/demo buttons.
- Real visual files are not yet present for flagship projects.
- `screenshotsOrVisuals` entries are treated as planned inventory items, not as available assets.
