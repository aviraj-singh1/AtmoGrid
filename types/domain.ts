export type VerificationStatus =
  | "UNVERIFIED"
  | "EMERGING"
  | "CORROBORATING"
  | "HIGHLY_CORROBORATED"
  | "IMD_VERIFIED"
  | "DISPUTED"
  | "LIKELY_MISLEADING"
  | "INCONCLUSIVE"
  | "RESOLVED";
export type OperationalPriority = "P0" | "P1" | "P2" | "P3" | "P4";
export type WeatherEventType =
  | "Flooding"
  | "Rainfall"
  | "Thunderstorm"
  | "Fog"
  | "Strong Wind"
  | "Heatwave"
  | "Dust Storm";
export type ImpactType =
  | "Road waterlogging"
  | "Vehicles stranded"
  | "Traffic disruption"
  | "Strong winds"
  | "Tree fall reports"
  | "Reduced visibility"
  | "Local inundation"
  | "Coastal disruption";
export type SourceFamily =
  | "Citizen Report"
  | "Social / #IMD"
  | "News"
  | "Weather Observation"
  | "Social"
  | "Official Context"
  | "Public Dataset";
export interface GeoLocation {
  location: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  locationBasis: "Approximate locality" | "GPS" | "Inferred";
}
export interface Incident extends GeoLocation {
  id: string;
  eventType: WeatherEventType;
  title: string;
  priority: OperationalPriority;
  verificationStatus: VerificationStatus;
  firstObserved: string;
  lastUpdated: string;
  rawReportCount: number;
  uniqueEvidenceCount: number;
  independentGroupCount: number;
  sourceFamilyCount: number;
  impacts: ImpactType[];
  trend: "Rising rapidly" | "Rising" | "Stable";
  summary: string;
}
export interface EvidenceItem {
  id: string;
  observedAt: string;
  sourceFamily: SourceFamily;
  location: string;
  event: string;
  disposition:
    | "Unique Evidence"
    | "Duplicate Detected"
    | "Independent Source"
    | "Physical Evidence"
    | "Possible Recycled Media";
  incidentId: string;
}
export interface PipelineMetric {
  label: string;
  value: string;
}

export type ReplayEventKind =
  | "INITIAL_STATE"
  | "SIGNAL_INGESTED"
  | "EVENT_CREATED"
  | "DUPLICATE_DETECTED"
  | "INDEPENDENCE_GROUP_CREATED"
  | "NEWS_CORROBORATION"
  | "PHYSICAL_EVIDENCE_ATTACHED"
  | "RECYCLED_MEDIA_DETECTED"
  | "IMPACT_DETECTED"
  | "VERIFICATION_CHANGED"
  | "PRIORITY_CHANGED"
  | "REVIEW_REQUIRED";

export type ReplayPipelineStage =
  | "INGEST"
  | "RELEVANCE"
  | "GEO_TIME"
  | "DEDUP"
  | "INDEPENDENCE"
  | "EVENT_FUSION"
  | "CORROBORATION"
  | "IMPACT"
  | "PRIORITY";

export interface ReplaySnapshot {
  rawReports: number;
  uniqueEvidence: number;
  independentGroups: number;
  duplicatesSuppressed: number;
  sourceFamilies: number;
  misleadingExcluded: number;
  impacts: ImpactType[];
  eventState: "NOT_FORMED" | "POTENTIAL_EVENT" | "ACTIVE_EVENT";
  verification: VerificationStatus;
  priority: OperationalPriority;
  physicalSupport: "UNAVAILABLE" | "SUPPORTS";
  officialContext: "UNAVAILABLE" | "CONSISTENT";
  reviewRequired: boolean;
}

export interface ReplaySignal {
  source: string;
  claim: string;
  media: string;
  locationProvenance: LocationProvenance;
  classification: string;
  contribution: string;
  evidenceId?: string;
  batchCount?: number;
}

export interface ReplayEvent {
  id: string;
  scenarioTime: string;
  offsetSeconds: number;
  kind: ReplayEventKind;
  title: string;
  description: string;
  incidentId: string;
  pipelineStage: ReplayPipelineStage;
  severity: "INFO" | "SUPPORTING" | "CAUTION" | "CRITICAL";
  highlightTarget?: string;
  insight?: string;
  signal?: ReplaySignal;
  snapshot: ReplaySnapshot;
}

export type EvidenceRelationship =
  | "SUPPORTS"
  | "CONTRADICTS"
  | "CONSISTENT"
  | "UNKNOWN"
  | "UNAVAILABLE"
  | "EXCLUDED";

export type LocationProvenance =
  | "GPS_CONFIRMED"
  | "PLATFORM_GEOTAG"
  | "CITIZEN_MAP_PIN"
  | "TEXT_INFERRED"
  | "LANDMARK_INFERRED"
  | "UNKNOWN";

export type EvidenceSourceFamily =
  | "Citizen Reports"
  | "Social / #IMD"
  | "News / Web"
  | "Weather Observation"
  | "Official Context";

export interface IncidentEvidenceItem {
  id: string;
  title: string;
  sourceFamily: EvidenceSourceFamily;
  timestamp: string;
  eventType: string;
  location: string;
  locationProvenance: LocationProvenance;
  mediaType: string;
  relationship: EvidenceRelationship;
  independenceGroup: string;
  duplicateStatus: "UNIQUE" | "DUPLICATE" | "NOT_APPLICABLE";
  flag?: string;
  latitude?: number;
  longitude?: number;
}

export interface EvidenceGroup {
  id: string;
  label: string;
  memberCount: number;
  sourceFamily: EvidenceSourceFamily;
  independent: boolean;
}

export type TimelineCategory =
  | "OBSERVATION"
  | "SYSTEM_ACTION"
  | "EVIDENCE"
  | "IMPACT"
  | "STATUS_CHANGE"
  | "OPERATOR_ACTION";

export interface IncidentTimelineItem {
  id: string;
  time: string;
  title: string;
  detail: string;
  category: TimelineCategory;
}

export interface PhysicalEvidence {
  id: string;
  title: string;
  relationship: EvidenceRelationship;
  measurement: string;
  distance?: string;
  timeDifference?: string;
  label: "DEMO CONTEXT" | "HISTORICAL SAMPLE" | "SIMULATED EVIDENCE";
}

export interface OfficialContextItem extends PhysicalEvidence {
  provider: string;
}

export interface ImpactRecord {
  id: string;
  type: ImpactType;
  severity: "HIGH" | "MEDIUM" | "LOW";
  firstSeen: string;
  supportingEvidenceCount: number;
  verificationStatus: "CORROBORATED" | "EMERGING";
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  detail?: string;
  temporary?: boolean;
}

export interface VerificationDimension {
  id: string;
  label: string;
  rating: "STRONG" | "GOOD" | "SUPPORTING" | "CONSISTENT" | "LOW";
  detail: string;
}

export type MediaIntegrityStatus =
  | "UNIQUE"
  | "DUPLICATE"
  | "NEAR_DUPLICATE"
  | "DERIVED"
  | "RECYCLED"
  | "POTENTIALLY_MISLEADING"
  | "NEEDS_REVIEW";

export type DuplicateRelationship =
  | "ORIGINAL"
  | "EXACT_COPY"
  | "TEXT_OVERLAY"
  | "SCREENSHOT"
  | "CROP"
  | "NEWS_EMBED"
  | "NO_MATCH";

export type EvidenceReviewState =
  | "SUPPORTS"
  | "CONSISTENT"
  | "EXCLUDED"
  | "POTENTIALLY_MISLEADING"
  | "DUPLICATE"
  | "NEEDS_REVIEW";

export interface ReviewEvidenceRecord extends IncidentEvidenceItem {
  sourceLabel: string;
  claim: string;
  normalizedText?: string;
  capturedAt: string;
  ingestedAt: string;
  incidentId: string;
  incidentTitle: string;
  integrityStatus: MediaIntegrityStatus;
  reviewState: EvidenceReviewState;
  duplicateGroup?: string;
  lineageNode?: string;
  originalReference: "AVAILABLE" | "UNAVAILABLE";
  contributesToCorroboration: boolean;
  contributionReason: string;
}

export interface VerificationCheck {
  id: string;
  label: string;
  value: string;
  tone: "positive" | "neutral" | "caution" | "negative";
  explanation: string;
}

export interface MediaLineageNode {
  id: string;
  label: string;
  type: DuplicateRelationship;
  source: string;
  timestamp: string;
  relationship: string;
  independenceContribution: number;
  eventContribution: "INCLUDED" | "DERIVED ONLY" | "EXCLUDED";
  x: number;
  y: number;
}

export interface MediaLineageEdge {
  id: string;
  from: string;
  to: string;
}

export interface MediaLineageGroup {
  id: string;
  originalNodeId: string;
  rawAppearances: number;
  underlyingAssets: number;
  dependentCopies: number;
  independenceContribution: number;
  nodes: MediaLineageNode[];
  edges: MediaLineageEdge[];
}

export interface DuplicateGroup {
  id: string;
  originalEvidenceId: string;
  firstObserved: string;
  source: string;
  rawAppearances: number;
  uniqueMedia: number;
  independenceContribution: number;
  duplicateCount: number;
  appearances: { id: string; timestamp: string; label: string; relation: DuplicateRelationship }[];
}

export interface IndependenceGroup {
  id: string;
  title: string;
  sourceType: string;
  independent: boolean;
  evidenceIds: string[];
  dependentSummary?: string[];
  nuance?: string;
}

export interface HistoricalMediaMatch {
  evidenceId: string;
  earliestKnownOccurrence: string;
  currentClaimDate: string;
  matchType: string;
  temporalConsistency: "PASS" | "FAILED";
  result: MediaIntegrityStatus;
  message: string;
}

export interface TextSimilarityAssessment {
  id: string;
  reports: { label: string; text: string }[];
  textSimilarity: "DIFFERENT" | "SIMILAR";
  meaningSimilarity: "HIGHLY_SIMILAR" | "LOW";
  locationConsistency: "SAME" | "DIFFERENT";
  temporalConsistency: "SAME_EVENT_WINDOW" | "DIFFERENT";
  result: string;
  explanation: string;
}

export type ConnectorHealth =
  | "HEALTHY"
  | "DEGRADED"
  | "REPLAY"
  | "HISTORICAL"
  | "UNAVAILABLE"
  | "DISABLED";

export type ConnectorEvidenceRole =
  | "DISCOVERY"
  | "CORROBORATION"
  | "PHYSICAL_EVIDENCE"
  | "OFFICIAL_CONTEXT";

export interface SourceConnector {
  id: string;
  name: string;
  sourceFamily: string;
  mode: string;
  health: ConnectorHealth;
  lastIngestion: string;
  signalCount: number;
  errorState: string;
  policy: string;
  retention: string;
  evidenceRole: ConnectorEvidenceRole;
  acquisitionMethod: string;
  eventCategories: string[];
  metadata: string[];
  prototypeNote: string;
  monitors?: string[];
}

export type CitizenSubmissionState =
  | "DRAFT"
  | "PROCESSING"
  | "SUBMITTED";

export interface CitizenObservation {
  id: string;
  description: string;
  eventType: string;
  location: string;
  latitude?: number;
  longitude?: number;
  locationProvenance: string;
  observedAt: string;
  mediaName?: string;
  mediaType?: string;
  impacts: string[];
  directObservation: boolean;
  additionalNotes?: string;
  verificationStatus: VerificationStatus;
}

export interface AdminAuditEntry {
  id: string;
  time: string;
  action: string;
  detail: string;
  actor: string;
  session?: boolean;
}

export interface AdminSourceSetting {
  id: string;
  name: string;
  sourceFamily: string;
  enabled: boolean;
}

export interface AdminProcessingPolicy {
  id: string;
  group: string;
  name: string;
  enabled: boolean;
  locked?: boolean;
}

export interface SystemHealthItem {
  id: string;
  name: string;
  status: "NOMINAL" | "DEMO" | "LOCAL";
  detail: string;
}
