import { MapPin, MinusCircle, ShieldCheck } from "lucide-react";
import { EvidenceRelationship, LocationProvenance } from "@/types/domain";
import { statusLabel } from "@/lib/format";

const relationshipHelp: Record<EvidenceRelationship, string> = {
  SUPPORTS: "Directly adds evidence for this incident.",
  CONTRADICTS: "Provides credible evidence against the incident claim.",
  CONSISTENT: "Compatible with the incident, without independently proving it.",
  UNKNOWN: "The relationship cannot yet be determined.",
  UNAVAILABLE:
    "No suitable observation is available; this is not contradiction.",
  EXCLUDED: "Removed from verification because it is duplicate or misleading.",
};

export function EvidenceRelationshipBadge({
  relationship,
}: {
  relationship: EvidenceRelationship;
}) {
  return (
    <span
      className={`relationship-badge relationship-${relationship.toLowerCase()}`}
      title={relationshipHelp[relationship]}
    >
      {relationship === "EXCLUDED" || relationship === "UNAVAILABLE" ? (
        <MinusCircle size={11} />
      ) : (
        <ShieldCheck size={11} />
      )}
      {statusLabel(relationship)}
    </span>
  );
}

export function LocationProvenanceBadge({
  provenance,
}: {
  provenance: LocationProvenance;
}) {
  return (
    <span
      className={`location-provenance provenance-${provenance.toLowerCase()}`}
      title={
        provenance.includes("INFERRED")
          ? "Derived from report text or visible landmarks; not GPS."
          : undefined
      }
    >
      <MapPin size={10} />
      {statusLabel(provenance)}
    </span>
  );
}
