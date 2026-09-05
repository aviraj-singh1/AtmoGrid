import { ShieldCheck } from "lucide-react";
import {
  reviewSnapshot as review,
  verificationDistribution,
} from "@/data/mock-metrics";
export function VerificationSnapshot() {
  return (
    <section className="panel verification-panel">
      <div className="panel-heading">
        <h2>
          <ShieldCheck size={16} />
          Verification snapshot
        </h2>
        <span>DEMO</span>
      </div>
      <div className="review-totals">
        <div>
          <strong>{review.total}</strong>
          <span>Evidence under review</span>
        </div>
        <div className="review-breakdown">
          <span>
            <b>{review.unique}</b> Unique
          </span>
          <span>
            <b>{review.duplicates}</b> Duplicates
          </span>
          <span>
            <b>{review.misleading}</b> Potentially misleading
          </span>
        </div>
      </div>
      <div className="distribution-title">
        INCIDENT VERIFICATION <span>14 TOTAL</span>
      </div>
      <div
        className="distribution-bar"
        aria-label="Verification distribution across 14 simulated incidents"
      >
        {verificationDistribution.map((x) => (
          <span
            key={x.label}
            style={{ flex: x.count, background: x.color }}
            title={`${x.label}: ${x.count}`}
          />
        ))}
      </div>
      <div className="distribution-legend">
        {verificationDistribution.map((x) => (
          <span key={x.label}>
            <i style={{ background: x.color }} />
            {x.label}
            <b>{x.count}</b>
          </span>
        ))}
      </div>
      <div className="verification-note">
        <ShieldCheck size={13} />
        Final IMD verification is a human action.
      </div>
    </section>
  );
}
