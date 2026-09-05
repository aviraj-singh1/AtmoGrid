import { ImpactRecord, VerificationDimension } from "@/types/domain";

export const investigationMetrics = [
  { value: 42, label: "Raw reports", tone: "neutral" },
  { value: 11, label: "Unique evidence", tone: "cyan" },
  { value: 7, label: "Independent groups", tone: "cyan" },
  { value: 5, label: "Source families", tone: "neutral" },
  { value: 14, label: "Duplicates suppressed", tone: "green" },
  { value: 1, label: "Misleading / recycled", tone: "amber" },
];

export const verificationDimensions: VerificationDimension[] = [
  {
    id: "VD-01",
    label: "Source independence",
    rating: "STRONG",
    detail: "7 independent groups",
  },
  {
    id: "VD-02",
    label: "Source diversity",
    rating: "STRONG",
    detail: "5 source families",
  },
  {
    id: "VD-03",
    label: "Location quality",
    rating: "GOOD",
    detail: "GPS + locality agreement",
  },
  {
    id: "VD-04",
    label: "Temporal consistency",
    rating: "STRONG",
    detail: "Reports concentrated within 27 minutes",
  },
  {
    id: "VD-05",
    label: "Media integrity",
    rating: "GOOD",
    detail: "3 unique assets, 1 recycled excluded",
  },
  {
    id: "VD-06",
    label: "Physical consistency",
    rating: "SUPPORTING",
    detail: "Nearby rainfall aligns",
  },
  {
    id: "VD-07",
    label: "Official context",
    rating: "CONSISTENT",
    detail: "Warning / nowcast supports conditions",
  },
  {
    id: "VD-08",
    label: "Contradictory evidence",
    rating: "LOW",
    detail: "No strong contradiction detected",
  },
];

export const supportingSignals = [
  "7 independent evidence groups",
  "3 unique media items",
  "5 source families represented",
  "Multiple citizen observations agree",
  "Independent news corroboration exists",
  "Nearby rainfall observation is consistent",
  "Radar / precipitation context is consistent",
  "Official context is compatible",
];

export const cautionFlags = [
  "14 duplicate / reposted reports excluded",
  "1 recycled media item excluded",
  "2 observations use inferred location",
  "Satellite evidence unavailable",
];

export const impactRecords: ImpactRecord[] = [
  {
    id: "IMP-01",
    type: "Road waterlogging",
    severity: "HIGH",
    firstSeen: "17:08",
    supportingEvidenceCount: 5,
    verificationStatus: "CORROBORATED",
  },
  {
    id: "IMP-02",
    type: "Vehicles stranded",
    severity: "HIGH",
    firstSeen: "17:18",
    supportingEvidenceCount: 3,
    verificationStatus: "CORROBORATED",
  },
  {
    id: "IMP-03",
    type: "Traffic disruption",
    severity: "MEDIUM",
    firstSeen: "17:24",
    supportingEvidenceCount: 2,
    verificationStatus: "EMERGING",
  },
];
