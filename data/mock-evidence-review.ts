import { jaipurEvidence } from "@/data/mock-evidence";
import {
  HistoricalMediaMatch,
  ReviewEvidenceRecord,
  TextSimilarityAssessment,
  VerificationCheck,
} from "@/types/domain";

const reviewDetails: Record<string, Omit<ReviewEvidenceRecord, keyof (typeof jaipurEvidence)[number]>> = {
  "EV-001": { sourceLabel: "Citizen Report", claim: "Tonk Road pe bahut paani bhar gaya, traffic ruk gaya hai.", normalizedText: "Heavy waterlogging on Tonk Road; traffic has stopped.", capturedAt: "17:03:42", ingestedAt: "17:04:18", incidentId: "JPR-FLD-001", incidentTitle: "Urban Flooding", integrityStatus: "UNIQUE", reviewState: "SUPPORTS", originalReference: "AVAILABLE", contributesToCorroboration: true, contributionReason: "Independent eyewitness description within the event window." },
  "EV-002": { sourceLabel: "Citizen Report", claim: "Vehicles stuck near Tonk Road due to waterlogging.", capturedAt: "17:10:31", ingestedAt: "17:11:05", incidentId: "JPR-FLD-001", incidentTitle: "Urban Flooding", integrityStatus: "UNIQUE", reviewState: "SUPPORTS", originalReference: "AVAILABLE", contributesToCorroboration: true, contributionReason: "GPS-confirmed unique image from a separate citizen source.", lineageNode: "IMG-JPR-002" },
  "EV-003": { sourceLabel: "Social / #IMD", claim: "Flood water rising near Tonk Road, Jaipur.", capturedAt: "17:12:28", ingestedAt: "17:13:02", incidentId: "JPR-FLD-001", incidentTitle: "Urban Flooding", integrityStatus: "UNIQUE", reviewState: "SUPPORTS", duplicateGroup: "DG-JPR-VIDEO-01", lineageNode: "VID-ORIGINAL", originalReference: "AVAILABLE", contributesToCorroboration: true, contributionReason: "Earliest known upload of one unique flood video; contributes once." },
  "EV-004": { sourceLabel: "Social / #IMD repost", claim: "Jaipur flood update — share widely.", normalizedText: "Repost of the Tonk Road flood video.", capturedAt: "17:14:02", ingestedAt: "17:14:16", incidentId: "JPR-FLD-001", incidentTitle: "Urban Flooding", integrityStatus: "DUPLICATE", reviewState: "DUPLICATE", duplicateGroup: "DG-JPR-VIDEO-01", lineageNode: "VID-REPOST-A", originalReference: "AVAILABLE", contributesToCorroboration: false, contributionReason: "Exact media copy derives from EV-003 and does not add independence." },
  "EV-005": { sourceLabel: "Jaipur Local News", claim: "Waterlogging disrupts traffic on Tonk Road; vehicles reported stranded.", capturedAt: "17:18:44", ingestedAt: "17:19:10", incidentId: "JPR-FLD-001", incidentTitle: "Urban Flooding", integrityStatus: "DERIVED", reviewState: "SUPPORTS", duplicateGroup: "DG-JPR-VIDEO-01", lineageNode: "VID-NEWS", originalReference: "AVAILABLE", contributesToCorroboration: true, contributionReason: "Independent reporting and text source, although embedded media derives from EV-003." },
  "EV-006": { sourceLabel: "Weather Observation", claim: "Heavy rainfall observed near Jaipur during the incident window.", capturedAt: "17:22:00", ingestedAt: "17:22:15", incidentId: "JPR-FLD-001", incidentTitle: "Urban Flooding", integrityStatus: "UNIQUE", reviewState: "SUPPORTS", originalReference: "AVAILABLE", contributesToCorroboration: true, contributionReason: "Independent physical evidence is consistent with flooding conditions." },
  "EV-007": { sourceLabel: "Social / #Flood", claim: "Jaipur flooding right now 😱 #IMD #Flood", capturedAt: "17:26:40", ingestedAt: "17:27:03", incidentId: "JPR-FLD-001", incidentTitle: "Urban Flooding", integrityStatus: "POTENTIALLY_MISLEADING", reviewState: "POTENTIALLY_MISLEADING", duplicateGroup: "DG-HIST-2024-08", lineageNode: "HIST-IMG-017", originalReference: "AVAILABLE", contributesToCorroboration: false, contributionReason: "Near-identical media first appeared in August 2024 and is temporally inconsistent with this claim." },
  "EV-008": { sourceLabel: "Official Context", claim: "Heavy rainfall / thunderstorm conditions expected in Jaipur district.", capturedAt: "17:28:00", ingestedAt: "17:28:21", incidentId: "JPR-FLD-001", incidentTitle: "Urban Flooding", integrityStatus: "UNIQUE", reviewState: "CONSISTENT", originalReference: "AVAILABLE", contributesToCorroboration: false, contributionReason: "Context is compatible, but does not independently prove ground impact." },
};

const baseRecords = jaipurEvidence.map((evidence) => ({
  ...evidence,
  ...reviewDetails[evidence.id],
})) as ReviewEvidenceRecord[];

export const reviewEvidenceRecords: ReviewEvidenceRecord[] = [
  ...baseRecords,
  { id: "EV-009", title: "Cropped flood video", sourceFamily: "Social / #IMD", sourceLabel: "Social / #HeavyRain", timestamp: "17:14", capturedAt: "17:13:55", ingestedAt: "17:14:33", eventType: "Urban flooding", location: "Claimed: Tonk Road", locationProvenance: "TEXT_INFERRED", mediaType: "Video · crop + text overlay", relationship: "EXCLUDED", independenceGroup: "IND-03", duplicateStatus: "DUPLICATE", claim: "Tonk Road Jaipur mein pura paani bhar gaya", normalizedText: "Tonk Road in Jaipur is completely waterlogged.", incidentId: "JPR-FLD-001", incidentTitle: "Urban Flooding", integrityStatus: "NEAR_DUPLICATE", reviewState: "DUPLICATE", duplicateGroup: "DG-JPR-VIDEO-01", lineageNode: "VID-REPOST-B", originalReference: "AVAILABLE", contributesToCorroboration: false, contributionReason: "Perceptual and visual similarity link the crop to EV-003." },
  { id: "EV-010", title: "New citizen GPS photo", sourceFamily: "Citizen Reports", sourceLabel: "Citizen Report", timestamp: "17:28", capturedAt: "17:27:32", ingestedAt: "17:28:06", eventType: "Urban flooding", location: "Tonk Road, Jaipur", locationProvenance: "GPS_CONFIRMED", mediaType: "Image · unique media", relationship: "SUPPORTS", independenceGroup: "IND-07", duplicateStatus: "UNIQUE", claim: "New photo: cars moving slowly through deep water on Tonk Road.", incidentId: "JPR-FLD-001", incidentTitle: "Urban Flooding", integrityStatus: "UNIQUE", reviewState: "SUPPORTS", originalReference: "AVAILABLE", contributesToCorroboration: true, contributionReason: "New GPS-confirmed media from an independent citizen source.", latitude: 26.884, longitude: 75.812 },
  { id: "EV-011", title: "Wind damage claim", sourceFamily: "Citizen Reports", sourceLabel: "Citizen Report", timestamp: "17:29", capturedAt: "17:28:44", ingestedAt: "17:29:12", eventType: "Severe thunderstorm", location: "Indore, Madhya Pradesh", locationProvenance: "TEXT_INFERRED", mediaType: "No media", relationship: "UNKNOWN", independenceGroup: "IDR-PENDING", duplicateStatus: "NOT_APPLICABLE", claim: "Strong winds and a tree down near the market.", incidentId: "IDR-THN-002", incidentTitle: "Severe Thunderstorm", integrityStatus: "NEEDS_REVIEW", reviewState: "NEEDS_REVIEW", originalReference: "AVAILABLE", contributesToCorroboration: false, contributionReason: "Awaiting an independent source or location confirmation." },
  { id: "EV-012", title: "Rainfall context", sourceFamily: "Official Context", sourceLabel: "Official Context", timestamp: "17:26", capturedAt: "17:25:51", ingestedAt: "17:26:11", eventType: "Heavy rainfall", location: "Bhopal, Madhya Pradesh", locationProvenance: "TEXT_INFERRED", mediaType: "Text record", relationship: "CONSISTENT", independenceGroup: "BHO-CTX-01", duplicateStatus: "NOT_APPLICABLE", claim: "Heavy-rainfall conditions are compatible with reports from Bhopal.", incidentId: "BHO-RAN-003", incidentTitle: "Heavy Rainfall", integrityStatus: "UNIQUE", reviewState: "CONSISTENT", originalReference: "AVAILABLE", contributesToCorroboration: false, contributionReason: "Context is compatible but is not direct ground-impact evidence." },
];

export const evidenceReviewMetrics = [
  { label: "Evidence under review", value: 24, tone: "neutral" },
  { label: "Unique evidence", value: 16, tone: "cyan" },
  { label: "Duplicate / derived", value: 5, tone: "muted" },
  { label: "Potentially misleading", value: 3, tone: "amber" },
  { label: "Independent groups", value: 11, tone: "green" },
  { label: "Excluded from corroboration", value: 6, tone: "red" },
];

export function verificationChecksFor(record: ReviewEvidenceRecord): VerificationCheck[] {
  const included = record.contributesToCorroboration;
  return [
    { id: "source", label: "Source provenance", value: record.originalReference === "AVAILABLE" ? "STRONG" : "LIMITED", tone: record.originalReference === "AVAILABLE" ? "positive" : "caution", explanation: "Original source reference and ingestion trail." },
    { id: "reference", label: "Original reference", value: record.originalReference, tone: record.originalReference === "AVAILABLE" ? "positive" : "neutral", explanation: "Whether the earliest accessible source is retained." },
    { id: "location", label: "Location quality", value: record.locationProvenance.replaceAll("_", " "), tone: record.locationProvenance === "GPS_CONFIRMED" ? "positive" : record.locationProvenance === "UNKNOWN" ? "caution" : "neutral", explanation: "Location provenance is separate from the claim text." },
    { id: "time", label: "Temporal consistency", value: record.id === "EV-007" ? "FAILED" : "PASS", tone: record.id === "EV-007" ? "negative" : "positive", explanation: "Claim and media dates are compared against the event window." },
    { id: "integrity", label: "Media integrity", value: record.integrityStatus.replaceAll("_", " "), tone: ["UNIQUE"].includes(record.integrityStatus) ? "positive" : record.integrityStatus === "POTENTIALLY_MISLEADING" ? "negative" : "neutral", explanation: "Categorical demo analysis; no production model output." },
    { id: "duplicate", label: "Duplicate match", value: record.duplicateGroup ? record.duplicateGroup : "NONE", tone: record.duplicateGroup ? "neutral" : "positive", explanation: "Duplicates do not independently increase corroboration." },
    { id: "independence", label: "Independence", value: included ? "INDEPENDENT" : "DEPENDENT / EXCLUDED", tone: included ? "positive" : "neutral", explanation: "Independence considers underlying source and media lineage." },
    { id: "relationship", label: "Event relationship", value: record.relationship, tone: record.relationship === "SUPPORTS" ? "positive" : record.relationship === "EXCLUDED" ? "negative" : "neutral", explanation: "Evidence relationship remains separate from media integrity." },
  ];
}

export const historicalMediaMatch: HistoricalMediaMatch = {
  evidenceId: "EV-007",
  earliestKnownOccurrence: "August 2024",
  currentClaimDate: "05 September 2026 · 17:27 IST",
  matchType: "Near-identical historical media detected",
  temporalConsistency: "FAILED",
  result: "POTENTIALLY_MISLEADING",
  message: "The media item appears temporally inconsistent with the current claim. This evidence is excluded from independent corroboration.",
};

export const semanticDuplicateExample: TextSimilarityAssessment = {
  id: "TXT-JPR-01",
  reports: [
    { label: "Report A", text: "Heavy flooding at Tonk Road Jaipur" },
    { label: "Report B", text: "Tonk Road Jaipur mein pura paani bhar gaya" },
    { label: "Report C", text: "जलभराव के कारण टोंक रोड पर गाड़ियां फंसी" },
  ],
  textSimilarity: "DIFFERENT",
  meaningSimilarity: "HIGHLY_SIMILAR",
  locationConsistency: "SAME",
  temporalConsistency: "SAME_EVENT_WINDOW",
  result: "RELATED / POSSIBLE SAME INCIDENT",
  explanation: "Similar meaning does not automatically mean copied evidence. Independently authored reports may still add support after source checks.",
};
