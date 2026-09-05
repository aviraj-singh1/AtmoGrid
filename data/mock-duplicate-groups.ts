import { DuplicateGroup } from "@/types/domain";

export const jaipurDuplicateFamily: DuplicateGroup = {
  id: "DG-JPR-VIDEO-01",
  originalEvidenceId: "EV-003",
  firstObserved: "17:13",
  source: "Social / #IMD",
  rawAppearances: 18,
  uniqueMedia: 1,
  independenceContribution: 1,
  duplicateCount: 17,
  appearances: [
    { id: "EV-003", timestamp: "17:13", label: "Original flood video", relation: "ORIGINAL" },
    { id: "EV-004", timestamp: "17:14", label: "Social repost", relation: "EXACT_COPY" },
    { id: "EV-009", timestamp: "17:14", label: "Crop + text overlay", relation: "TEXT_OVERLAY" },
    { id: "DUP-03", timestamp: "17:15", label: "Screenshot repost", relation: "SCREENSHOT" },
    { id: "EV-005", timestamp: "17:17", label: "News embed", relation: "NEWS_EMBED" },
    { id: "DUP-05", timestamp: "17:18", label: "Social crop", relation: "CROP" },
  ],
};
