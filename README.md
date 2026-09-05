# AtmoGrid — Phases 1–5

National Weather Evidence & Ground Intelligence Platform. SIH26069 prototype.

## Run locally

Node.js 20.9+ is required (developed with Node 24).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production presentation: `npm run build`, then `npm start` after stopping the development server. `npm run typecheck` checks TypeScript independently.

## Architecture and file inventory

- `app/`: App Router pages, shared layout, global visual system, loading/error/404 states and favicon.
- `components/layout/app-shell.tsx`: responsive sidebar, top bar, visual LIVE/REPLAY control and simulated notifications.
- `components/command-center/`: dashboard composition, summary metrics, report-to-incident transformation, filters, triage queue, lazy-loaded MapLibre map, signal feed, verification snapshot and pipeline health.
- `components/incidents/incident-card.tsx`: reusable Command Center incident card with investigation navigation and map selection.
- `components/incidents/incident-registry.tsx`: filterable Incident Registry using the canonical featured incident fixtures and national summary data.
- `components/incidents/incident-investigation.tsx`: flagship Jaipur investigation console, tabs, operator actions, modal, toast and session audit state.
- `components/incidents/investigation-panels.tsx`: evidence compression, trust reasoning, evidence records, timeline, impact, official context, source diversity and audit views.
- `components/evidence-review/`: Phase 3 analyst queue, categorical verification inspector, shared evidence drawer, duplicate-family and independence analysis, recycled-media warning and interactive lineage graph.
- `components/replay/`: Phase 4 Jaipur replay presentation, signal stream, evidence compression, incident evolution, operator review and the lightweight `useReplayEngine` state controller.
- `components/citizen-report/`: Phase 5 citizen observation form, local media/demo attachment, validation, staged processing and unverified submission result.
- `components/source-monitor/`: connector health console, hashtag watch, source-role flow and connector detail drawer.
- `components/admin/`: compact local administration tabs for sources, processing, taxonomy, system health and session audit.
- `components/incidents/incident-mini-map.tsx`: Jaipur-focused MapLibre evidence map with event, GPS, inferred and physical-observation markers.
- `components/incidents/evidence-badges.tsx`: reusable evidence-relationship and location-provenance badges.
- `components/shared/`: priority, verification and source badges, page heading, empty state and future-phase placeholder.
- `types/domain.ts`: reusable incident, evidence, review, lineage, duplicate, independence, geography, provenance, impact, relationship, verification, timeline, audit and pipeline contracts.
- `data/mock-incidents.ts`, `mock-signals.ts`, `mock-metrics.ts`, `mock-evidence-review.ts`, `mock-media-lineage.ts`, `mock-duplicate-groups.ts`, `mock-independence-groups.ts`: typed local fixtures, isolated from pages.
- `data/mock-jaipur-replay.ts`: 12 typed replay milestones whose final snapshot matches the canonical Jaipur incident and evidence totals.
- `data/mock-connectors.ts`, `mock-admin.ts`, `mock-citizen-submissions.ts`: typed Phase 5 connector, policy, taxonomy, audit and citizen-form fixtures.
- `lib/filter-incidents.ts`, `format.ts`: pure filtering and display helpers.
- `public/world.geojson`: bundled regional geographic context; `public/maplibre/`: local MapLibre workers.
- `scripts/copy-map-assets.mjs`: refreshes worker assets on install to keep their version aligned with MapLibre.
- `package.json`, `package-lock.json`, `tsconfig.json`, `postcss.config.mjs`: dependency and build foundation.

The page uses local React state; there is no database or API layer. MapLibre is dynamically imported only for the Command Center, and its worker is explicitly hosted locally for Turbopack compatibility. Plain CSS supplies the operational design system with Tailwind CSS v4 available for utilities. Lucide supplies all icons. No chart or animation dependency was needed.

## Routes

- `/` and `/command-center`: complete Phase 1 Command Center.
- `/incidents`: complete Incident Registry with event, location, verification, priority and search filters.
- `/incidents/JPR-FLD-001`: complete Phase 2 incident investigation and explainable-verification console.
- The other four fixture incident IDs remain future-phase placeholders.
- `/evidence-review`: complete Phase 3 evidence integrity and provenance workspace.
- `/replay`: complete Phase 4 Jaipur incident-evolution replay with pause, resume, reset, step and speed controls.
- `/report`: complete Phase 5 citizen observation workflow with local-only submission state.
- `/source-monitor`: complete Phase 5 connector health and provenance console.
- `/admin`: complete Phase 5 local administration and governance console.
- Unknown routes and unknown incident IDs return a polished 404.

## Demo assumptions

- The clock is fixed at **5 September 2026, 17:33 IST**; the signal feed and pipeline are static simulations. LIVE/REPLAY changes presentation state only.
- Operator actions are deliberately local. VERIFY opens a confirmation dialog, accepts an optional 180-character note, changes the page state to IMD Verified, shows a toast and appends a session audit entry. Refreshing restores the initial state.
- DISPUTE and MARK INCONCLUSIVE update the local badge and audit trail; ESCALATE records a local audit entry. None of these actions issue or imply an official IMD warning.
- National summary and verification distribution describe **14 simulated incidents**; the queue/map contain **five featured fixtures**, clearly identified. Filtering affects these five only. The national metrics, Jaipur transformation example, signal stream and verification snapshot remain fixed context.
- Time filters use each incident's **last-updated timestamp**, not first observation. Custom dates are inclusive, in IST. The initial range is Today.
- Evidence states and priorities are separate. Operational priority colors are internal AtmoGrid categories, not official IMD warning colors. No automated IMD verification is performed.
- Geography is approximate locality context, not GPS. The fog fixture represents earlier reports still awaiting review, not a current forecast.
- The requested pipeline suppression figure (61%) is a standalone simulated pipeline value, not a calculated ratio of the summary totals or a benchmark.
- Decorative metric traces are illustrative, not historical time-series data.
- All geographic resources are bundled; no live weather, social, imagery or map-tile API is contacted. MapLibre needs WebGL; a locality selector appears if map initialization fails.
- Phase 3 duplicate detection, source independence, historical matching and media lineage are deterministic mock analyses for the prototype. They demonstrate the review workflow without claiming that hashing, reverse-image search, semantic similarity or media-processing models ran live.
- The Jaipur lineage graph models one original clip, four dependent appearances and one independent reporting source whose embedded media is still derived from the original asset. Contribution decisions are explicit fixture fields rather than inferred at runtime.
- No production replay service, auth, citizen reporting, backend, live model, live source ingestion or admin configuration is implemented.
- The Phase 4 replay engine is client-side React state driven by deterministic typed milestones. Its clock, signal arrival, model-like classifications and operator action are simulated and reset on refresh.
- Citizen submissions, media attachments, connector toggles, processing profiles and administrative audit entries are local session state. They are not persisted or propagated into canonical incident fixtures.
- Connector metrics, hashtag counts, health states and acquisition modes are clearly marked demonstration data. Policy-dependent and historical sources do not imply live platform or IMD access.

## Geographic attribution

The regional boundary extract is from [datasets/geo-countries](https://github.com/datasets/geo-countries), based on Natural Earth public-domain data. Boundaries are illustrative geographic context. MapLibre GL JS is BSD-3-Clause licensed; its license is included alongside the bundled worker files.

## Verification

Production build and TypeScript checks pass. Phase 5 browser checks cover citizen validation and submission, demo location, impact and media selection, connector details, hashtags, local admin toggles, processing settings, taxonomy, system health and session audit. The citizen form was inspected at 390px without horizontal overflow; operator pages were inspected at 1440×900. Phase 1–4 regression checks cover maps, filters, verification, evidence review and replay controls. Evidence captures are in the locally generated, git-ignored `test-results/` directory.
