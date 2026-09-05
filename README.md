# AtmoGrid

**National Weather Evidence & Ground Intelligence Platform**

AtmoGrid converts fragmented, noisy, and potentially misleading weather signals into explainable, evidence-backed incidents so IMD operators can focus on what actually deserves their attention.

---

## SIH 2026

| Field | Value |
|---|---|
| Problem Statement | **SIH26069** — National Weather Big Data Analytics Platform |
| Organization | Ministry of Earth Sciences |
| Department | India Meteorological Department |
| Theme | Disaster Management |

---

## The Problem

During severe weather, information arrives simultaneously from citizens, social media, news sites, weather hashtags, observation networks, and official sources. The problem is that this information is:

- **Fragmented** — spread across dozens of disconnected sources
- **Duplicated** — the same video or photo spreads across hundreds of reposts
- **Noisy** — most signals are irrelevant or low-quality
- **Potentially misleading** — recycled historical media gets posted with current-event claims
- **Difficult to trust quickly** — 50 posts about flooding do not mean 50 independent confirmations

An IMD operator should not have to manually review hundreds of social posts and raw signals to decide whether a real flood event is happening.

---

## Our Solution

AtmoGrid is not a social-media weather dashboard. It is an **evidence intelligence layer** that:

1. Ingests signals from multiple source families
2. Deduplicates and traces media lineage
3. Separates independent evidence from reposts and derivative content
4. Clusters independent observations into real-world incidents
5. Corroborates incidents with physical weather data and official context
6. Detects and excludes recycled or misleading media
7. Extracts ground impact (not just the weather event)
8. Surfaces incidents with explainable reasoning to a human operator

---

## Core Thesis

```
REPORTS ≠ EVENTS
VOLUME ≠ EVIDENCE
```

**Example (Flagship Jaipur Scenario):**

```
42 raw reports
      ↓  deduplication + media lineage
11 unique evidence items
      ↓  source independence analysis
 7 independent evidence groups
      ↓  event clustering + corroboration
 1 real-world incident  →  HIGHLY CORROBORATED  →  P1 REVIEW
```

14 duplicate reports were suppressed. 1 recycled historical image was excluded. The incident remained corroborated by the remaining independent evidence.

---

## Core Principles

1. **Reports are not events.** An observation is a signal, not confirmation.
2. **Independence matters more than volume.** 20 reposts of the same flood video should not count as 20 confirmations.
3. **Deduplication and source independence are different.** Duplicate detection asks "is this content the same?" Source independence asks "does this evidence originate from the same underlying source?"
4. **Evidence should be explainable.** Not "AI confidence: 96%" — instead: which independent groups agree, what physical context supports it, what was excluded and why.
5. **One misleading item does not make an event false.** A recycled photo is excluded; the underlying incident remains corroborated by other evidence.
6. **Missing evidence is not contradiction.** Radar unavailable ≠ event false.
7. **Location provenance matters.** GPS CONFIRMED is different from TEXT INFERRED.
8. **Weather and ground impact are separate.** "Urban Flooding" (weather) vs "Road Waterlogging, Vehicles Stranded, Traffic Disruption" (impact).
9. **Verification and operational priority are separate.** A highly corroborated incident may not require urgent action; a low-confidence but severe-impact one may.
10. **Human authority is final.** AtmoGrid classifies, correlates, flags, and explains. A human operator performs final official verification.

---

## How AtmoGrid Works — Evidence Pipeline

```
SOURCE CONNECTORS
(Citizen · Social/#IMD · News/RSS · Public Datasets ·
 Weather Observations · Official Context · Radar · Satellite)
      │
      ▼  [PROTOTYPE: demo/replay adapters]
INGESTION
      │
      ▼  [PROTOTYPE: typed fixture records]
RAW EVIDENCE / OBSERVATIONS
      │
      ▼  [PROTOTYPE: simulated classification labels]
NORMALIZATION + WEATHER RELEVANCE
      │
      ▼  [PROTOTYPE: fixture fields per evidence item]
LANGUAGE + CLAIM EXTRACTION
GEO-TIME RESOLUTION
LOCATION PROVENANCE
      │
      ▼  [PROTOTYPE: deterministic fixture-based analysis]
TEXT / MEDIA DEDUPLICATION
      │
      ▼  [PROTOTYPE: explicit lineage fixture graph]
SOURCE INDEPENDENCE + MEDIA LINEAGE
      │
      ▼  [PROTOTYPE: fixture-based clusters]
EVENT CLUSTERING / EVENT FUSION
      │
      ▼  [PROTOTYPE: fixture evidence records per incident]
EVENT-LEVEL EVIDENCE RETRIEVAL
PHYSICAL + OFFICIAL CORROBORATION
      │
      ▼  [PROTOTYPE: dimensional reasoning UI]
EVIDENCE ASSESSMENT + CORROBORATION RATING
      │
      ▼  [PROTOTYPE: fixture impact records]
IMPACT INTELLIGENCE
      │
      ▼  [PROTOTYPE: fixture priority + badge display]
OPERATIONAL PRIORITY
      │
      ▼  [PROTOTYPE: interactive incident investigation UI]
OPERATIONS CONSOLE
      │
      ▼  [PROTOTYPE: VERIFY / DISPUTE / INCONCLUSIVE / ESCALATE with local session state]
HUMAN REVIEW + OPERATOR DECISION
      │
      ▼  [PROTOTYPE: local session audit trail]
AUDIT TRAIL
```

**Legend:**
- `[PROTOTYPE: ...]` — how this stage is currently implemented in this build
- Stages without a prototype note reflect the architectural intent for production

---

## Flagship Jaipur Scenario

**Incident:** Urban Flooding — Tonk Road, Jaipur, Rajasthan
**ID:** JPR-FLD-001
**Scenario window:** 17:04 – 17:35 IST, 5 September 2026 (simulated)

### Final Evidence State

| Metric | Value |
|---|---|
| Raw reports | 42 |
| Unique evidence items | 11 |
| Independent evidence groups | 7 |
| Source families | 5 |
| Duplicate reports suppressed | 14 |
| Recycled / misleading items excluded | 1 |
| Verification | HIGHLY CORROBORATED |
| Priority | P1 — Review Now |

### Ground Impact

- Road Waterlogging (HIGH · first seen 17:08)
- Vehicles Stranded (HIGH · first seen 17:18)
- Traffic Disruption (MEDIUM · first seen 17:24)

### Source Families

| Family | Independent contributions |
|---|---|
| Citizen Reports | 3 |
| Social / #IMD | 2 (18 raw posts, 16 collapsed) |
| News / Web | 1 |
| Weather Observation | 1 |
| Official Context | 0 (contextual only) |

### Replay Milestones (12 events)

| ID | Time | Event |
|---|---|---|
| RP-01 | 17:04 | First untrusted citizen observation |
| RP-02 | 17:11 | GPS-confirmed second observation; event formed |
| RP-03 | 17:14 | Repost surge: 14 duplicates collapsed ← **Key demo moment** |
| RP-04 | 17:17 | Media lineage resolved |
| RP-05 | 17:19 | News corroboration; source diversity increased |
| RP-06 | 17:22 | Physical + official context aligned |
| RP-07 | 17:27 | Historical media excluded (Aug 2024 image) ← **Key demo moment** |
| RP-08 | 17:28 | Independent evidence batch added |
| RP-09 | 17:31 | Ground impacts escalate; priority rises to P1 |
| RP-10 | 17:34 | Highly corroborated |
| RP-11 | 17:35 | Operator review required |

---

## Application Modules

All modules are fully implemented in this prototype. All data is simulated via typed TypeScript fixture files. No live external connections exist.

### Command Center
**Route:** `/` or `/command-center`
**Purpose:** National operational overview — the first screen an IMD operator sees.

**What evaluators see:**
- 6 summary metrics: Raw Signals (428), Weather Relevant (263), Unique Evidence (119), Active Incidents (14), P1 Review (2), Duplicates Suppressed (144)
- Evidence transformation banner: 42 raw → 11 unique → 7 independent → 1 Jaipur incident
- Live triage queue: 5 featured incidents, prioritized by operational state
- Geographic situation: MapLibre map with incident markers across India
- Signal feed, pipeline health bar, verification snapshot with distribution chart
- Incident filters: time window, event type, location, verification status

**Data:** Simulated. 14 total incidents described in metrics; 5 detailed fixture incidents in the queue. Static signal stream and pipeline stats.

---

### Incidents (Registry)
**Route:** `/incidents`
**Purpose:** Filterable list of all featured incidents with evidence summary.

**What evaluators see:**
- Summary bar: Active, P1, Highly Corroborated, Corroborating, Emerging counts
- Searchable, filterable table (event type, location, verification, priority, text search)
- Each row: incident ID, location, priority badge, verification badge, raw/unique/independent counts, key impacts, last update

**Data:** 5 fixture incidents. Filters affect these 5 only; summary counts describe the broader 14-incident simulated national context.

---

### Incident Investigation (Jaipur)
**Route:** `/incidents/JPR-FLD-001`
**Purpose:** Full investigation console for the flagship Urban Flooding incident. Demonstrates explainable verification.

**What evaluators see:**
- Header: incident title, ID, P1 badge, Highly Corroborated badge, location, summary
- Metric strip: 42 raw, 11 unique, 7 independent groups, 5 families, 14 duplicates suppressed, 1 misleading excluded
- Evidence compression flow: 42 → 11 → 7 → 1 with explanations
- 7 tabbed panels:
  1. **Overview** — supporting signals, caution flags, UNAVAILABLE ≠ CONTRADICTS rule
  2. **Verification** — 8 dimensional ratings (source independence, diversity, location quality, temporal consistency, media integrity, contradictory evidence, official context, physical consistency). Labeled "NO BLACK-BOX SCORE"
  3. **Evidence** — clickable evidence cards with relationship, integrity status, provenance, independence group; Included / Excluded filter; opens Evidence Detail Drawer
  4. **Media Lineage** — interactive SVG graph: 1 original video → 4 derived copies + 1 independent news embed; 18 appearances → 1 independence contribution
  5. **Impact** — weather vs ground impact separation; 3 impact cards with severity, first seen time, support count
  6. **Official Context** — physical + official evidence records labeled "Demo / historical context only"
  7. **Timeline** — 14 chronological entries, 17:04–17:31 IST; categorized (observation, system action, evidence, impact, status change, operator action)
- **Audit tab** — local session audit trail of operator actions
- **Operator actions:** VERIFY (opens 180-char confirmation modal → changes state to IMD_VERIFIED + toast + audit entry), DISPUTE, MARK INCONCLUSIVE, ESCALATE — all local session state only

**Other incident IDs** (`IDR-THN-002`, `BHO-RAN-003`, `DEL-FOG-004`, `MUM-WND-005`) route to a professional "Not included in this demonstration" placeholder, directing evaluators to the Jaipur scenario.

---

### Evidence Review
**Route:** `/evidence-review`
**Purpose:** Analyst workspace for inspecting, tracing, and verifying incoming evidence before it contributes to corroboration.

**What evaluators see:**
- 6 summary metrics: Evidence under review (24), Unique evidence (16), Duplicate/derived (5), Potentially misleading (3), Independent groups (11), Excluded from corroboration (6)
- Filter bar: status, source family, media type, incident, location quality, sort order
- Contribution view toggle: All / Included / Excluded
- Evidence queue list (left panel): 12 representative records across multiple incidents
- Selected evidence detail (center): claim text, source/provenance, location, time, duplication, independence, event relationship
- Visual media placeholder with label "VISUAL PLACEHOLDER · NO LIVE MEDIA"
- **Provenance inspector** (right panel): 8 categorical checks per evidence item — source provenance, original reference, location quality, temporal consistency, media integrity, duplicate match, independence, event relationship. Final contribution decision: INCLUDED or EXCLUDED
- **Duplicate family panel:** Jaipur flood video family — 18 appearances, 1 unique media, 18 ≠ 18 confirmations equation, expandable appearance list
- **Independence analysis panel:** 7 independence groups selectable; nuance notes on news-text vs embedded-media independence
- **Historical media alert:** EV-007 — image first appeared August 2024, temporally inconsistent, EXCLUDED FROM CORROBORATION. Incident remains corroborated.
- **Semantic duplicate example:** Three reports (English, Hindi, Hindi) — different text, HIGHLY SIMILAR meaning, SAME location and event window
- **Contribution comparison:** 42 raw → 14+17+1 collapsed → 11 → 7

**Data:** 12 representative review records (fixture). No live evidence pipeline.

---

### Scenario Replay
**Route:** `/replay`
**Purpose:** Animated reconstruction of how AtmoGrid processes the Jaipur flooding incident, step by step.

**What evaluators see:**
- Page header: JAIPUR SCENARIO REPLAY · disclaimer "No live production data"
- Scenario control bar: START REPLAY / RESET / STEP; speed controls (0.5×, 1×, 2×, 4×); scenario clock; progress bar
- **Incoming signal stream** (left): each milestone injects a labeled signal card showing source, claim, media type, location provenance, classification, contribution
- **Evidence compression panel** (center): live-updating counters — Raw Reports, Unique Evidence, Independent Groups, Incident; Duplicates/Derived → Independent Confirmations; pipeline stage indicator
- **Incident state panel** (right): event state, verification badge, priority badge, physical support, official context, ground impacts, detected impacts
- **Incident geography map:** Jaipur-focused MapLibre map showing evidence pin locations
- **System reasoning log:** per-milestone insight text
- **Operator review panel:** appears at RP-11 with VERIFY EVENT button
- 12 milestones (RP-00 to RP-11), each with typed snapshot

**Engine:** Client-side React state machine (`useReplayEngine`). Driven by deterministic typed milestone array. Resets on refresh. No server or streaming infrastructure.

---

### Citizen Report
**Route:** `/report` (also accessible via "Report observation" in topbar)
**Purpose:** Demonstrates how citizen observations enter the system — as unverified evidence items, not auto-verified events.

**What evaluators see:**
- Trust disclaimer: "Citizen report ≠ verified incident" with full explanation
- Form: description (required), event type, observation time, location (required — USE DEMO LOCATION button available)
- Impact multi-select, direct observation declaration, additional notes
- Media: file input + ATTACH DEMO PHOTO button (local session only)
- Staged processing animation (5 steps: normalization → geo resolution → dedup → independence check → event matching)
- Success screen: Observation ID, submitted time, event category, location, provenance, media, impact tags. Status: UNVERIFIED. Evidence pipeline flow diagram.

**Data:** Local session state. Nothing persists. No data leaves the browser.

---

### Source Monitor
**Route:** `/source-monitor`
**Purpose:** Connector health console demonstrating the modular source architecture.

**What evaluators see:**
- 7 summary metrics: Configured Sources, Healthy, Replay/Historical, Unavailable, Signals Ingested, Last 15 min, Connector Errors
- 8 connector cards: Citizen Gateway, Social/#IMD, News/RSS, Public Dataset, Physical Observation, IMD/Official Context, Radar/Precipitation, Satellite (disabled)
- Each connector: mode badge, health badge, last ingestion, signal count, error state
- Click to expand: evidence role, acquisition method, event categories, metadata captured, prototype note
- **Hashtag watch:** #IMD (124), #HeavyRain (73), #Flood (51), #Thunderstorm (39), #WeatherAlert (21)
- **Source role flow:** Discovery → Corroboration → Physical Evidence → Official Context
- Each connector's `prototypeNote` field honestly states its actual status (demo stream, no live API, historical sample, etc.)

**Data:** Fixture connector records. All metrics are clearly marked "demonstration data."

---

### Administration
**Route:** `/admin`
**Purpose:** Operational control panel for connector configuration, processing policies, taxonomy, system health, and audit.

**What evaluators see:**
- 5 tabs: Sources, Processing, Taxonomy, System, Audit
- **Sources:** 6 source toggles (one — Satellite — disabled); labeled "LOCAL DEMO TOGGLES"; changes do not propagate to canonical fixture data
- **Processing:** 10 policy toggles across Duplicate Detection, Event Formation, Verification groups. "Human verification required" is locked and cannot be disabled
- **Taxonomy:** Weather taxonomy (11 types) and impact taxonomy (10 types) — read-only display
- **System:** 6 health items (Ingestion NOMINAL, Processing NOMINAL, Storage LOCAL, Map NOMINAL, Replay NOMINAL, Evidence Queue DEMO)
- **Audit:** Session + pre-seeded audit log of operator actions; append-only local state

**Governance safeguards panel (always visible):** Human verification required · Original source preserved · Operator actions audited · Evidence exclusions explainable · Restricted sources policy-dependent · Missing evidence ≠ contradiction

**Data:** Fixture settings + session state. Toggles, profile selections, and audit entries are local only.

---

## Prototype vs Production

| Capability | This Prototype | Production Direction |
|---|---|---|
| Social / hashtag ingestion | Captured replay sample; no live platform API | Authorized platform APIs / policy-compliant adapters |
| Citizen reports | Local session only; no backend | Structured submission API with persistent storage |
| News / RSS | Representative demo records | Live RSS adapters + permitted web feeds |
| Physical weather observations | Simulated fixture records | Authorized observation network integration |
| Official IMD context | Historical/sample fixtures; no live IMD API | Official-source adapters under data-sharing terms |
| Radar / precipitation | Demo/historical context only | Operational radar product integration |
| Satellite | Configuration sample; disabled | Provider adapter under authorized access |
| Text deduplication | Categorical fixture labels | Normalized matching + semantic similarity models |
| Image deduplication | Categorical fixture labels | SHA hash + perceptual hash + visual embeddings |
| Video deduplication | Categorical fixture labels | Keyframe hashing + visual embeddings |
| Media lineage | Explicit fixture graph (6 nodes, 5 edges) | Automated lineage construction from ingestion traces |
| Historical media detection | Fixture: EV-007 matched August 2024 | Reverse-image search + temporal consistency check |
| Event clustering | Fixture-defined clusters | Geo-time + semantic clustering pipeline |
| Physical corroboration | Fixture evidence records | Real-time retrieval from observation/API providers |
| Verification assessment | Fixture-based dimensional display | Automated multi-dimensional scoring with explanations |
| Operator actions | Local session state; resets on refresh | Persistent, audited, multi-operator with role access |
| Storage | None (no database) | PostgreSQL + PostGIS + object storage |
| Stream processing | Client-side replay engine | Kafka / Redpanda + Python workers |
| Map data | Bundled GeoJSON + MapLibre | Live tile service + PostGIS spatial queries |
| Authentication | Demo operator avatar | Role-based operator authentication |
| Notifications | Simulated; no push | Real-time alert delivery |
| Multi-language NLP | Fixture: three-language semantic example | Production multilingual NLP pipeline |

---

## Architecture

### Current Prototype Architecture

```
Browser (Next.js App Router — React 19)
      │
      ├─ app/            Route pages + shared layout
      ├─ components/     All UI modules (no server components with data)
      ├─ data/           Typed TypeScript fixture files (no database calls)
      ├─ types/          Shared domain type contracts
      ├─ lib/            Pure filter + format helpers
      └─ public/         Bundled GeoJSON + MapLibre worker files

Local state only. No API routes. No database. No external network calls.
MapLibre is dynamically imported (WebGL). All data is loaded from typed fixtures.
```

### Proposed Production Architecture

```
Source Connectors (8+ modular adapters)
      │
      ▼
Redpanda / Kafka  (event streaming)
      │
      ▼
Python Processing Workers
  ├─ Normalization + relevance classification
  ├─ NLP: claim extraction, language detection, semantic similarity
  ├─ Geo-time resolution + location provenance
  ├─ Media deduplication (hash + pHash + embeddings)
  ├─ Source independence + media lineage graph
  ├─ Event clustering (geo-time + semantic)
  └─ Corroboration + priority engine
      │
      ▼
PostgreSQL + PostGIS  (incidents, evidence, lineage, audit)
MinIO / S3  (media storage)
      │
      ▼
FastAPI  (REST + WebSocket)
      │
      ▼
Next.js Operations Console  (this prototype's UI layer)
```

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.3.4 |
| UI | React | 19.2.8 |
| Language | TypeScript | 7.0.2 |
| CSS | Plain CSS + Tailwind CSS v4 utilities | 4.3.3 |
| Icons | Lucide React | 1.41.0 |
| Map | MapLibre GL JS | 6.7.0 |
| Runtime | Node.js | 20.9+ (developed with Node 24) |
| Build | Next.js Turbopack | — |

No charting library, animation library, or UI component library. No database, ORM, or API layer.

---

## Running Locally

**Requirements:** Node.js 20.9 or later.

```sh
# Install dependencies (also copies MapLibre worker files)
npm ci

# Start development server
npm run dev
```

Open **http://localhost:3000**.

For a production presentation build:

```sh
npm run build
npm start
```

TypeScript check (independent of build):

```sh
npm run typecheck
```

**Network note:** `dev` and `start` bind to `0.0.0.0`. MapLibre requires WebGL; a locality fallback appears if GPU/WebGL is unavailable. No external network calls are made at runtime — all resources are bundled.

---

## Available Routes

| Route | Module | Status |
|---|---|---|
| `/` | Command Center | Implemented |
| `/command-center` | Command Center (alias) | Implemented |
| `/incidents` | Incident Registry | Implemented |
| `/incidents/JPR-FLD-001` | Jaipur Incident Investigation | Implemented (flagship) |
| `/incidents/IDR-THN-002` | Severe Thunderstorm · Indore | Placeholder (demo scope) |
| `/incidents/BHO-RAN-003` | Heavy Rainfall · Bhopal | Placeholder (demo scope) |
| `/incidents/DEL-FOG-004` | Dense Fog · Delhi | Placeholder (demo scope) |
| `/incidents/MUM-WND-005` | Strong Wind · Mumbai | Placeholder (demo scope) |
| `/evidence-review` | Evidence Review | Implemented |
| `/replay` | Scenario Replay | Implemented |
| `/report` | Citizen Report | Implemented |
| `/source-monitor` | Source Monitor | Implemented |
| `/admin` | Administration | Implemented |
| Unknown routes | 404 | Implemented |

---

## Demo Data

The prototype uses typed TypeScript fixture files in `data/`. There is no database, no API layer, and no live external connection. All data is loaded at build time.

Replay data (`mock-jaipur-replay.ts`) contains 12 deterministic milestone snapshots. The final snapshot matches the canonical Jaipur incident values (42 raw / 11 unique / 7 groups / 5 families / 14 duplicates / 1 misleading / Highly Corroborated / P1). Replay state resets on browser refresh.

**Why replay data instead of live data:** Severe weather events cannot be guaranteed to occur during evaluation. Authorized API access to social platforms and restricted official sources is not available for a hackathon prototype. The replay approach demonstrates the intelligence workflow accurately without falsely implying live integrations.

---

## SIH26069 Requirement Mapping

| Requirement | AtmoGrid Approach | Prototype Status |
|---|---|---|
| Multiple internet sources | 8 modular source connector types | Simulated via fixture adapters |
| Social media / weather hashtags | Social/#IMD connector; hashtag watch (#IMD, #HeavyRain, #Flood, #Thunderstorm) | Captured replay sample; no live API |
| Public datasets | Public Dataset/API connector | Historical sample fixture |
| Website / RSS sources | News/RSS connector | Representative demo records |
| APIs / structured sources | Weather Observation + Official Context connectors | Simulated fixture records |
| Citizen reports | Full citizen observation form with validation, media, GPS | Local session only |
| Date / time capture | Per-evidence capturedAt / ingestedAt timestamps | Fixture fields |
| City / state metadata | Per-incident city + state; per-evidence location | Fixture fields |
| GPS / location provenance | GPS_CONFIRMED, TEXT_INFERRED, LANDMARK_INFERRED, etc. | Fixture-defined per evidence item |
| Image / video handling | Media type captured; lineage graph for video propagation | Categorical fixture; visual placeholder |
| Event categorization | Weather taxonomy (11 types) + impact taxonomy (10 types) | Fixture-defined |
| Centralized product model | Single incident model with evidence, lineage, impact, verification, audit | Implemented in `types/domain.ts` |
| Scalable big-data design | Proposed Kafka + Python workers + PostgreSQL architecture | Prototype only; described in README |
| Real-time processing concept | Replay engine demonstrates pipeline stages (INGEST → PRIORITY) | Client-side simulation |
| Fake / misleading detection | Historical media alert (EV-007, Aug 2024 image); POTENTIALLY_MISLEADING status | Categorical fixture analysis |
| Source verification | Provenance inspector with 8 categorical checks per evidence item | Implemented |
| Duplicate removal | Deduplication; 14 duplicates suppressed in Jaipur scenario | Fixture-based |
| Dashboard | Command Center with metrics, map, triage queue, filter bar | Implemented |
| Admin panel | Administration module with 5 tabs, governance safeguards | Implemented |
| Date / time filters | Time filter (Last 15 min / Last hour / Today / Custom range) in Command Center | Implemented |
| Event type filters | Event filter in Command Center and Incident Registry | Implemented |
| Location filters | State + city filter in Command Center and Incident Registry | Implemented |
| Verification filters | Verification status filter in Command Center and Incident Registry | Implemented |
| Real-time visualization | MapLibre map with incident markers; pipeline health; signal feed | Simulated / static |

---

## Prototype Limitations

The following limitations are intentional for a hackathon prototype. They do not reflect architectural weaknesses; they reflect scope and access constraints.

- **No live social media integration.** No platform API is called. Social content is a captured replay sample.
- **No live IMD radar or satellite pipeline.** Radar and satellite connectors show demo/historical context only. No operational provider integration exists.
- **No production stream processing.** There is no Kafka, Redpanda, or equivalent. The replay engine is client-side React state.
- **No database.** There is no PostgreSQL, SQLite, or any persistent storage. All state is in-memory and resets on refresh.
- **No production ML models.** Deduplication, semantic similarity, image hashing, and media lineage are categorical fixture labels, not model outputs.
- **No authentication.** The "OP" avatar is decorative. There is no login, session management, or role-based access.
- **No server API.** There are no Next.js API routes. All data is loaded from local TypeScript fixture files.
- **Operator actions are session-local.** VERIFY, DISPUTE, ESCALATE update in-page state only. They do not persist, broadcast, or constitute official IMD actions.
- **The clock is fixed** at 17:33:00 IST, 5 September 2026. The signal feed is static.
- **5 of 14 incidents have full fixture data.** The registry mentions 14 simulated incidents in summary metrics; only 5 are detailed fixtures. Non-Jaipur incident investigation routes show a demo-scope placeholder.
- **No personal data.** The citizen report form collects no name, phone, or email.
- **MapLibre requires WebGL.** A fallback locality display appears on incompatible hardware.
- **Geographic boundaries are approximate.** The bundled GeoJSON is for visual context, not operational precision.

---

## Production Evolution

1. Replace fixture adapters with authorized live connector implementations.
2. Deploy Python processing workers consuming a Kafka/Redpanda stream.
3. Add production deduplication using SHA hash, perceptual hash, and vector embeddings.
4. Add geo-time clustering and semantic event fusion pipeline.
5. Connect PostgreSQL + PostGIS for persistent incident, evidence, and audit storage.
6. Add role-based operator authentication and multi-user audit trail.
7. Implement real-time WebSocket updates to the Next.js console.
8. Integrate authorized official-source adapters under data-sharing agreements.

---

## Geographic Attribution

The regional boundary extract is from [datasets/geo-countries](https://github.com/datasets/geo-countries), based on Natural Earth public-domain data. Boundaries are illustrative geographic context. MapLibre GL JS is BSD-3-Clause licensed; its license is included alongside the bundled worker files.

---

## Verification

Production build and TypeScript checks pass:

```sh
npm run typecheck  # 0 errors
npm run build      # 16 routes compiled cleanly
```

No deployment URL is configured. This is a local prototype only.
