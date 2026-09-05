import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { incidents } from "@/data/mock-incidents";
import { PhasePlaceholder } from "@/components/shared/phase-placeholder";
import { IncidentInvestigation } from "@/components/incidents/incident-investigation";
export function generateStaticParams() {
  return incidents.map((x) => ({ id: x.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const incident = incidents.find((item) => item.id === id);
  return incident
    ? { title: `${incident.title} · ${incident.id} | AtmoGrid` }
    : { title: "Incident not found | AtmoGrid" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const incident = incidents.find((x) => x.id === id);
  if (!incident) notFound();
  if (incident.id === "JPR-FLD-001") {
    return <IncidentInvestigation incident={incident} />;
  }
  return (
    <PhasePlaceholder
      title={incident.title}
      phase="Phase 2"
      reference={incident.id}
      description={`${incident.location} · Incident investigation and evidence review will be available in Phase 2.`}
    />
  );
}
