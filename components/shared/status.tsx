import {
  OperationalPriority,
  SourceFamily,
  VerificationStatus,
} from "@/types/domain";
import { statusLabel } from "@/lib/format";
import { CheckCheck, Radio } from "lucide-react";
export function PriorityBadge({ priority }: { priority: OperationalPriority }) {
  return (
    <span className={`badge priority ${priority.toLowerCase()}`}>
      {priority}
      {priority === "P1" && " · Review now"}
    </span>
  );
}
export function VerificationBadge({ status }: { status: VerificationStatus }) {
  return (
    <span className={`badge verification ${status.toLowerCase()}`}>
      <CheckCheck size={12} />
      {statusLabel(status)}
    </span>
  );
}
export function SourceBadge({ source }: { source: SourceFamily }) {
  return (
    <span className="source-badge">
      <Radio size={12} />
      {source}
    </span>
  );
}
export function EmptyState({ reset }: { reset: () => void }) {
  return (
    <div className="empty-state">
      <Radio size={28} />
      <h3>No matching incidents</h3>
      <p>Try a different time, event, location or verification filter.</p>
      <button className="text-button" onClick={reset}>
        Reset filters
      </button>
    </div>
  );
}
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <span className="demo-tag">
        SIMULATED DATA
      </span>
    </div>
  );
}
