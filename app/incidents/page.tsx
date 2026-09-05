import type { Metadata } from "next";
import { IncidentRegistry } from "@/components/incidents/incident-registry";

export const metadata: Metadata = {
  title: "Incidents | AtmoGrid",
  description:
    "Monitor reconstructed weather incidents and inspect the evidence behind their verification state.",
};

export default function Page() {
  return <IncidentRegistry />;
}
