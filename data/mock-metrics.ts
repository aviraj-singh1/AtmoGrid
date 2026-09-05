import { PipelineMetric } from "@/types/domain";
export const metrics = [
  {
    label: "Raw Signals",
    value: 428,
    context: "+27 in last 15 min",
    tone: "blue",
  },
  {
    label: "Weather Relevant",
    value: 263,
    context: "61.4% of raw signals",
    tone: "blue",
  },
  {
    label: "Unique Evidence",
    value: 119,
    context: "After deduplication",
    tone: "cyan",
  },
  {
    label: "Active Incidents",
    value: 14,
    context: "5 featured in this demo",
    tone: "cyan",
  },
  {
    label: "P1 Review",
    value: 2,
    context: "Requires officer attention",
    tone: "red",
  },
  {
    label: "Duplicates Suppressed",
    value: 144,
    context: "Excluded from evidence",
    tone: "green",
  },
];
export const pipelineMetrics: PipelineMetric[] = [
  { label: "Incoming", value: "21/sec" },
  { label: "Processing", value: "20/sec" },
  { label: "Queue", value: "8" },
  { label: "Avg latency", value: "241ms" },
  { label: "Duplicate suppression", value: "61%" },
  { label: "Active clusters", value: "14" },
];
export const verificationDistribution = [
  { label: "Emerging", count: 3, color: "#7f91b0" },
  { label: "Corroborating", count: 5, color: "#57b9d5" },
  { label: "Highly Corroborated", count: 4, color: "#61cbb0" },
  { label: "Disputed", count: 1, color: "#e89a70" },
  { label: "Inconclusive", count: 1, color: "#8f7eb9" },
];
export const reviewSnapshot = {
  total: 24,
  unique: 16,
  duplicates: 5,
  misleading: 3,
};
