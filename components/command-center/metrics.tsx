import { Activity, ArrowRight, Layers3 } from "lucide-react";
import { metrics, pipelineMetrics } from "@/data/mock-metrics";
export function MetricCard({ metric }: { metric: (typeof metrics)[number] }) {
  return (
    <div className={`metric-card ${metric.tone}`}>
      <span>{metric.label}</span>
      <strong>
        {metric.value}
        <svg viewBox="0 0 90 28" aria-hidden="true">
          <path d="M1 24 L10 21 L18 23 L28 14 L36 17 L45 10 L53 13 L62 5 L70 9 L80 3 L89 1" />
        </svg>
      </strong>
      <small>{metric.context}</small>
    </div>
  );
}
export function OperationalSummary() {
  return (
    <section
      className="metrics"
      aria-label="National simulated operational summary"
    >
      {metrics.map((x) => (
        <MetricCard key={x.label} metric={x} />
      ))}
    </section>
  );
}
export function EvidenceTransformation() {
  return (
    <section className="transformation">
      <div className="transformation-intro">
        <Layers3 size={19} />
        <div>
          <strong>Reports ≠ events.</strong>
          <small>Volume ≠ independent evidence.</small>
        </div>
      </div>
      <div className="transform-steps">
        {[
          { n: 42, label: "raw reports" },
          { n: 11, label: "unique evidence" },
          { n: 7, label: "independent groups" },
          { n: 1, label: "Jaipur incident" },
        ].map((x, i) => (
          <div key={x.label} className="transform-step">
            <b>{x.n}</b>
            <span>{x.label}</span>
            {i < 3 && <ArrowRight size={16} />}
          </div>
        ))}
      </div>
      <span className="transform-note">
        Duplicate content
        <br />
        does not inflate trust.
      </span>
    </section>
  );
}
export function PipelineHealth() {
  return (
    <section className="pipeline">
      <span className="pipeline-label">
        <Activity size={14} />
        Pipeline health <small>SIMULATED</small>
      </span>
      {pipelineMetrics.map((x) => (
        <span key={x.label}>
          {x.label}
          <b>{x.value}</b>
        </span>
      ))}
    </section>
  );
}
