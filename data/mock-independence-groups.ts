import { IndependenceGroup } from "@/types/domain";

export const independenceGroups: IndependenceGroup[] = [
  { id: "IG-01", title: "Citizen eyewitness", sourceType: "Citizen text", independent: true, evidenceIds: ["EV-001"] },
  { id: "IG-02", title: "Citizen GPS image", sourceType: "Citizen media", independent: true, evidenceIds: ["EV-002"] },
  { id: "IG-03", title: "Original social flood video", sourceType: "Social media origin", independent: true, evidenceIds: ["EV-003", "EV-004", "EV-009"], dependentSummary: ["12 social reposts", "3 cropped versions", "2 embeds"] },
  { id: "IG-04", title: "Local news reporting", sourceType: "News / Web", independent: true, evidenceIds: ["EV-005"], nuance: "Independent reporting source while its embedded media derives from IG-03." },
  { id: "IG-05", title: "Weather observation", sourceType: "Physical evidence", independent: true, evidenceIds: ["EV-006"] },
  { id: "IG-06", title: "Citizen map-pin report", sourceType: "Citizen report", independent: true, evidenceIds: ["EV-010"] },
  { id: "IG-07", title: "Additional independent account", sourceType: "Citizen report", independent: true, evidenceIds: [] },
];
