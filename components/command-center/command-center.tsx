"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { incidents } from "@/data/mock-incidents";
import { filterIncidents } from "@/lib/filter-incidents";
import { PageHeader } from "@/components/shared/status";
import { FilterBar, initialFilters } from "./filter-bar";
import {
  EvidenceTransformation,
  OperationalSummary,
  PipelineHealth,
} from "./metrics";
import { TriageQueue } from "./triage-queue";
import { LiveSignalFeed } from "./live-signal-feed";
import { VerificationSnapshot } from "./verification-snapshot";
const IncidentMap = dynamic(() => import("./incident-map"), {
  ssr: false,
  loading: () => (
    <div className="panel map-skeleton">Loading geographic situation…</div>
  ),
});
export function CommandCenter() {
  const [filters, setFilters] = useState(initialFilters);
  const [selected, setSelected] = useState(incidents[0].id);
  const visible = filterIncidents(incidents, filters);
  const selectedId = visible.some((x) => x.id === selected)
    ? selected
    : visible[0]?.id || "";
  const reset = () => setFilters(initialFilters);
  return (
    <>
      <PageHeader
        eyebrow="NATIONAL WEATHER SITUATION"
        title="Command Center"
        description="Evidence that matters. Incidents that need attention."
      />
      <OperationalSummary />
      <EvidenceTransformation />
      <FilterBar
        filters={filters}
        onChange={setFilters}
        reset={reset}
        count={visible.length}
      />
      <div className="primary-grid">
        <TriageQueue
          incidents={visible}
          selected={selectedId}
          onSelect={setSelected}
          reset={reset}
        />
        <IncidentMap
          incidents={visible}
          selected={selectedId}
          onSelect={setSelected}
        />
      </div>
      <div className="secondary-grid">
        <LiveSignalFeed />
        <VerificationSnapshot />
      </div>
      <PipelineHealth />
    </>
  );
}
