import { Copy, Fingerprint, TriangleAlert } from "lucide-react";
import { DuplicateRelationship, MediaIntegrityStatus } from "@/types/domain";
import { statusLabel } from "@/lib/format";

const integrityHelp: Record<MediaIntegrityStatus, string> = {
  UNIQUE: "No matching underlying media was found in this demo dataset.",
  DUPLICATE: "Repeated content. It does not independently increase corroboration.",
  NEAR_DUPLICATE: "Visually modified content derived from an existing asset.",
  DERIVED: "Uses or embeds media that originated elsewhere.",
  RECYCLED: "Older media reused as evidence for a new event.",
  POTENTIALLY_MISLEADING: "The media and current claim are temporally inconsistent.",
  NEEDS_REVIEW: "More provenance or corroboration is needed before inclusion.",
};

export function MediaIntegrityBadge({ status }: { status: MediaIntegrityStatus }) {
  const Icon = status === "POTENTIALLY_MISLEADING" ? TriangleAlert : status === "UNIQUE" ? Fingerprint : Copy;
  return <span className={`integrity-badge integrity-${status.toLowerCase()}`} title={integrityHelp[status]}><Icon size={10} />{statusLabel(status)}</span>;
}

export function DuplicateStatusBadge({ status }: { status: DuplicateRelationship }) {
  return <span className={`duplicate-status duplicate-${status.toLowerCase()}`} title="Media lineage relationship to the original asset.">{statusLabel(status)}</span>;
}

export function InfoTerm({ label, help }: { label: string; help: string }) {
  return <span className="info-term" title={help}>{label}<i>i</i></span>;
}
