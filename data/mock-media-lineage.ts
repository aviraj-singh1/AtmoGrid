import { MediaLineageGroup } from "@/types/domain";

export const jaipurVideoLineage: MediaLineageGroup = {
  id: "ML-JPR-VIDEO-01",
  originalNodeId: "VID-ORIGINAL",
  rawAppearances: 18,
  underlyingAssets: 1,
  dependentCopies: 17,
  independenceContribution: 1,
  nodes: [
    { id: "VID-ORIGINAL", label: "Original video", type: "ORIGINAL", source: "Social / #IMD", timestamp: "17:13", relationship: "Earliest known upload", independenceContribution: 1, eventContribution: "INCLUDED", x: 50, y: 13 },
    { id: "VID-REPOST-A", label: "Repost A", type: "EXACT_COPY", source: "Social repost", timestamp: "17:14", relationship: "Exact copy", independenceContribution: 0, eventContribution: "DERIVED ONLY", x: 18, y: 46 },
    { id: "VID-REPOST-B", label: "Text overlay", type: "TEXT_OVERLAY", source: "Social / #HeavyRain", timestamp: "17:14", relationship: "Near duplicate", independenceContribution: 0, eventContribution: "DERIVED ONLY", x: 42, y: 46 },
    { id: "VID-NEWS", label: "News embed", type: "NEWS_EMBED", source: "Jaipur Local News", timestamp: "17:17", relationship: "Derived media; independent text", independenceContribution: 0, eventContribution: "DERIVED ONLY", x: 78, y: 46 },
    { id: "VID-SCREEN", label: "Screenshot", type: "SCREENSHOT", source: "Social repost", timestamp: "17:15", relationship: "Frame extracted from repost", independenceContribution: 0, eventContribution: "EXCLUDED", x: 18, y: 78 },
    { id: "VID-CROP", label: "Social crop", type: "CROP", source: "Social / Jaipur", timestamp: "17:18", relationship: "Crop of screenshot", independenceContribution: 0, eventContribution: "EXCLUDED", x: 42, y: 78 },
  ],
  edges: [
    { id: "L1", from: "VID-ORIGINAL", to: "VID-REPOST-A" },
    { id: "L2", from: "VID-ORIGINAL", to: "VID-REPOST-B" },
    { id: "L3", from: "VID-ORIGINAL", to: "VID-NEWS" },
    { id: "L4", from: "VID-REPOST-A", to: "VID-SCREEN" },
    { id: "L5", from: "VID-REPOST-B", to: "VID-CROP" },
  ],
};
