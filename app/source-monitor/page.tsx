import type { Metadata } from "next";
import { SourceMonitor } from "@/components/source-monitor/source-monitor";

export const metadata: Metadata = {
  title: "Source Monitor | AtmoGrid",
  description: "Monitor ingestion source health, provenance policy and evidence availability.",
};

export default function Page() {
  return <SourceMonitor />;
}
