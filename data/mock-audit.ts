import { AuditEntry } from "@/types/domain";

export const initialAuditEntries: AuditEntry[] = [
  {
    id: "AU-01",
    timestamp: "17:04:18",
    action: "Observation ingested",
    actor: "System",
  },
  {
    id: "AU-02",
    timestamp: "17:14:42",
    action: "12 duplicate reports collapsed",
    actor: "Deduplication Engine",
  },
  {
    id: "AU-03",
    timestamp: "17:22:15",
    action: "Physical evidence attached",
    actor: "Evidence Orchestrator",
  },
  {
    id: "AU-04",
    timestamp: "17:27:03",
    action: "Recycled media excluded",
    actor: "Media Integrity",
  },
  {
    id: "AU-05",
    timestamp: "17:29:40",
    action: "Status changed",
    detail: "CORROBORATING → HIGHLY CORROBORATED",
    actor: "Verification Engine",
  },
  {
    id: "AU-06",
    timestamp: "17:31:10",
    action: "Priority changed",
    detail: "P2 → P1",
    actor: "Priority Engine",
  },
];
