import type { Metadata } from "next";
import { EvidenceReview } from "@/components/evidence-review/evidence-review";

export const metadata: Metadata = {
  title: "Evidence Review | AtmoGrid",
  description:
    "Inspect, trace and verify incoming weather evidence before it contributes to incident corroboration.",
};

export default function Page() {
  return <EvidenceReview />;
}
