import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Check,
  CircleDot,
  CloudRain,
  FileCheck2,
  Fingerprint,
  Gauge,
  Info,
  RadioTower,
  Route,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  cautionFlags,
  impactRecords,
  investigationMetrics,
  supportingSignals,
  verificationDimensions,
} from "@/data/mock-incident-details";
import { sourceBreakdown } from "@/data/mock-evidence";
import { reviewEvidenceRecords } from "@/data/mock-evidence-review";
import { jaipurTimeline } from "@/data/mock-timeline";
import { officialContext } from "@/data/mock-official-context";
import { AuditEntry } from "@/types/domain";
import {
  EvidenceRelationshipBadge,
  LocationProvenanceBadge,
} from "./evidence-badges";
import { EvidenceDetailDrawer } from "@/components/evidence-review/evidence-detail-drawer";
import { MediaIntegrityBadge } from "@/components/evidence-review/integrity-badges";
import { MediaLineageGraph } from "@/components/evidence-review/media-lineage-graph";

export function EvidenceMetrics() {
  return (
    <section
      className="investigation-metrics"
      aria-label="Incident evidence metrics"
    >
      {investigationMetrics.map((metric) => (
        <div
          className={`investigation-metric ${metric.tone}`}
          key={metric.label}
        >
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </section>
  );
}

export function EvidenceCompressionFlow() {
  const steps = [
    { value: 42, label: "Raw reports", note: "all incoming claims" },
    { value: 11, label: "Unique evidence", note: "reposts removed" },
    { value: 7, label: "Independent groups", note: "origins separated" },
    { value: 1, label: "Incident", note: "real-world event" },
  ];
  return (
    <section className="compression-flow">
      <div className="compression-title">
        <Fingerprint size={18} />
        <div>
          <strong>Evidence compression</strong>
          <span>Volume is reduced before trust is assessed.</span>
        </div>
      </div>
      <div className="compression-steps">
        {steps.map((step, index) => (
          <div className="compression-step" key={step.label}>
            <div>
              <b>{step.value}</b>
              <span>{step.label}</span>
              <small>{step.note}</small>
            </div>
            {index < steps.length - 1 && <ArrowRight size={17} />}
          </div>
        ))}
      </div>
      <div className="compression-result">
        <span>14 duplicate reports + 1 recycled item excluded</span>
        <strong>18 social posts ≠ 18 confirmations</strong>
      </div>
    </section>
  );
}

export function TrustPanel() {
  return (
    <section className="panel trust-panel">
      <div className="trust-heading">
        <div className="trust-icon">
          <ShieldCheck size={24} />
        </div>
        <div>
          <span>EXPLAINABLE VERIFICATION</span>
          <h2>Why this incident is corroborated</h2>
          <p>
            Independent evidence converges on one event while duplicate and
            misleading material is excluded.
          </p>
        </div>
        <span className="trust-state">
          <i />
          HIGHLY CORROBORATED
        </span>
      </div>
      <div className="trust-columns">
        <div>
          <h3>
            <Check size={14} />
            Supporting signals
          </h3>
          <ul>
            {supportingSignals.map((signal) => (
              <li key={signal}>
                <Check size={12} />
                {signal}
              </li>
            ))}
          </ul>
        </div>
        <div className="caution-column">
          <h3>
            <AlertTriangle size={14} />
            Quality / caution flags
          </h3>
          <ul>
            {cautionFlags.map((flag) => (
              <li key={flag}>
                <AlertTriangle size={12} />
                {flag}
              </li>
            ))}
          </ul>
          <div className="unavailable-rule">
            <span>UNAVAILABLE</span>
            <b>≠</b>
            <span>CONTRADICTS</span>
            <small>Missing observation is not negative evidence.</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VerificationReasoningPanel() {
  return (
    <section className="panel reasoning-panel">
      <div className="panel-heading">
        <h2>
          <Gauge size={16} />
          Verification reasoning
        </h2>
        <span>DIMENSIONAL · NO BLACK-BOX SCORE</span>
      </div>
      <div className="reasoning-grid">
        {verificationDimensions.map((dimension) => (
          <div className="reasoning-item" key={dimension.id}>
            <span>{dimension.label}</span>
            <b className={`rating-${dimension.rating.toLowerCase()}`}>
              {dimension.rating}
            </b>
            <small>{dimension.detail}</small>
          </div>
        ))}
      </div>
      <div className="reasoning-overall">
        <span>OVERALL VERIFICATION STATE</span>
        <strong>
          <ShieldCheck size={16} />
          HIGHLY CORROBORATED
        </strong>
        <small>Priority is evaluated separately from verification.</small>
      </div>
    </section>
  );
}

export function SourceFamilyBreakdown() {
  return (
    <section className="panel source-family-panel">
      <div className="panel-heading">
        <h2>
          <Users size={16} />
          Source diversity
        </h2>
        <span>5 FAMILIES</span>
      </div>
      <div className="source-family-list">
        {sourceBreakdown.map((item) => (
          <div key={item.family}>
            <span>
              <i />
              {item.family}
            </span>
            <strong>
              {item.independent}
              <small> independent</small>
            </strong>
            <p>{item.note}</p>
          </div>
        ))}
      </div>
      <div className="social-comparison">
        <div>
          <b>18</b>
          <span>Raw social posts</span>
        </div>
        <ArrowDown size={16} />
        <div>
          <b>2</b>
          <span>Independent contribution</span>
        </div>
      </div>
    </section>
  );
}

export function EvidenceWorkspace() {
  const [selectedEvidence, setSelectedEvidence] = useState("EV-001");
  const [view, setView] = useState<"All" | "Included" | "Excluded">("All");
  const [drawerId, setDrawerId] = useState<string | null>(null);
  const evidence = reviewEvidenceRecords.filter(
    (item) =>
      item.incidentId === "JPR-FLD-001" &&
      (view === "All" ||
        (view === "Included"
          ? item.contributesToCorroboration
          : !item.contributesToCorroboration)),
  );
  return (
    <section className="evidence-workspace">
      <div className="workspace-intro">
        <div>
          <span>11 UNIQUE ITEMS</span>
          <h2>Evidence records</h2>
        </div>
        <div className="incident-evidence-controls">
          {(["All", "Included", "Excluded"] as const).map((option) => (
            <button
              key={option}
              className={view === option ? "active" : ""}
              onClick={() => setView(option)}
            >
              {option}
            </button>
          ))}
          <span>{evidence.length} representative items</span>
          <Link href="/evidence-review">Open analyst workspace</Link>
        </div>
      </div>
      <div className="incident-evidence-summary">
        <span><b>42</b> Raw reports</span>
        <span><b>11</b> Unique evidence</span>
        <span><b>7</b> Independent groups</span>
        <span><b>14</b> Duplicates suppressed</span>
        <span><b>1</b> Recycled excluded</span>
      </div>
      <div className="evidence-card-grid">
        {evidence.map((item) => (
          <article
            className={`evidence-item-card ${item.relationship.toLowerCase()} ${selectedEvidence === item.id ? "selected" : ""}`}
            key={item.id}
            tabIndex={0}
            role="button"
            aria-pressed={selectedEvidence === item.id}
            onClick={() => setSelectedEvidence(item.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSelectedEvidence(item.id);
              }
            }}
          >
            <header>
              <div>
                <span>
                  {item.id} · {item.timestamp} IST
                </span>
                <h3>{item.title}</h3>
              </div>
              <EvidenceRelationshipBadge relationship={item.relationship} />
            </header>
            <p>
              {item.sourceFamily} · {item.mediaType}
            </p>
            <MediaIntegrityBadge status={item.integrityStatus} />
            <div className="evidence-card-meta">
              <LocationProvenanceBadge provenance={item.locationProvenance} />
              <span>
                <Route size={10} />
                {item.independenceGroup}
              </span>
              <span>{item.duplicateStatus.replaceAll("_", " ")}</span>
            </div>
            <footer>
              <span>{item.eventType}</span>
              <span>{item.location}</span>
            </footer>
            {item.flag && (
              <div className="misleading-flag">
                <AlertTriangle size={12} />
                {item.flag}
              </div>
            )}
            {selectedEvidence === item.id && (
              <div className="evidence-selection">
                <span>SELECTED · provenance and relationship in focus</span>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setDrawerId(item.id);
                  }}
                >
                  Open inspector
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
      <EvidenceDetailDrawer
        record={reviewEvidenceRecords.find((item) => item.id === drawerId) || null}
        onClose={() => setDrawerId(null)}
      />
    </section>
  );
}

export function IncidentTimeline() {
  return (
    <section className="panel timeline-panel">
      <div className="panel-heading">
        <h2>
          <RadioTower size={16} />
          Incident timeline
        </h2>
        <span>17:04—17:31 IST · 27 MINUTES</span>
      </div>
      <div className="timeline-list">
        {jaipurTimeline.map((item) => (
          <article
            className={`timeline-item category-${item.category.toLowerCase()}`}
            key={item.id}
          >
            <time>{item.time}</time>
            <i />
            <div>
              <span>{item.category.replace("_", " ")}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ImpactPanel() {
  return (
    <section className="impact-workspace">
      <div className="event-impact-separation">
        <div>
          <span>WEATHER EVENT</span>
          <strong>
            <CloudRain size={17} />
            Urban flooding
          </strong>
        </div>
        <ArrowRight size={20} />
        <div>
          <span>GROUND IMPACT</span>
          <strong>Waterlogging · Stranded vehicles · Traffic disruption</strong>
        </div>
      </div>
      <div className="impact-grid">
        {impactRecords.map((impact) => (
          <article className="panel impact-card" key={impact.id}>
            <header>
              <span>GROUND IMPACT</span>
              <b className={`severity-${impact.severity.toLowerCase()}`}>
                {impact.severity}
              </b>
            </header>
            <h2>{impact.type}</h2>
            <dl>
              <div>
                <dt>First seen</dt>
                <dd>{impact.firstSeen} IST</dd>
              </div>
              <div>
                <dt>Independent support</dt>
                <dd>{impact.supportingEvidenceCount} observations</dd>
              </div>
              <div>
                <dt>Verification</dt>
                <dd>{impact.verificationStatus}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export function OfficialContextPanel() {
  return (
    <section className="official-context-workspace">
      <div className="context-disclaimer">
        <Info size={15} />
        <div>
          <strong>Demo / historical context only</strong>
          <p>
            These records show evidence relationships and do not represent live
            IMD observations or forecasts.
          </p>
        </div>
      </div>
      <div className="context-grid">
        {officialContext.map((item) => (
          <article className="panel context-card" key={item.id}>
            <header>
              <span>{item.label}</span>
              <EvidenceRelationshipBadge relationship={item.relationship} />
            </header>
            <h2>{item.title}</h2>
            <p>{item.measurement}</p>
            <dl>
              <div>
                <dt>Source</dt>
                <dd>{item.provider}</dd>
              </div>
              {item.distance && (
                <div>
                  <dt>Distance</dt>
                  <dd>{item.distance}</dd>
                </div>
              )}
              {item.timeDifference && (
                <div>
                  <dt>Time difference</dt>
                  <dd>{item.timeDifference}</dd>
                </div>
              )}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AuditTimeline({ entries }: { entries: AuditEntry[] }) {
  return (
    <section className="panel audit-panel">
      <div className="panel-heading">
        <h2>
          <FileCheck2 size={16} />
          Decision audit trail
        </h2>
        <span>LOCAL DEMO · APPEND ONLY</span>
      </div>
      <div className="audit-table">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className={entry.temporary ? "temporary" : ""}
          >
            <time>{entry.timestamp}</time>
            <CircleDot size={13} />
            <div>
              <h3>
                {entry.action}
                {entry.temporary && <span>SESSION ENTRY</span>}
              </h3>
              {entry.detail && <p>{entry.detail}</p>}
              <small>{entry.actor}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MediaLineageWorkspace() {
  return <MediaLineageGraph />;
}
