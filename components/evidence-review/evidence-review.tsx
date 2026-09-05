"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight, CircleSlash2, Eye, FileImage, FileText, Filter, Image, MapPin, Radio, Search, ShieldQuestion, SlidersHorizontal, Video } from "lucide-react";
import { evidenceReviewMetrics, reviewEvidenceRecords, verificationChecksFor } from "@/data/mock-evidence-review";
import { ReviewEvidenceRecord } from "@/types/domain";
import { EvidenceRelationshipBadge, LocationProvenanceBadge } from "@/components/incidents/evidence-badges";
import { DuplicateFamilyCard, HistoricalMediaAlert, IndependenceAnalysis, SemanticDuplicateExample, ContributionComparison } from "./analysis-panels";
import { EvidenceDetailDrawer } from "./evidence-detail-drawer";
import { InfoTerm, MediaIntegrityBadge } from "./integrity-badges";

type Filters = { status: string; source: string; media: string; incident: string; location: string; sort: string };
const initialFilters: Filters = { status: "All", source: "All", media: "All", incident: "All", location: "All", sort: "Newest" };

export function EvidenceReview() {
  const [filters, setFilters] = useState(initialFilters);
  const [selectedId, setSelectedId] = useState("EV-010");
  const [drawerRecord, setDrawerRecord] = useState<ReviewEvidenceRecord | null>(null);
  const [contributionView, setContributionView] = useState<"All" | "Included" | "Excluded">("All");
  const visible = useMemo(() => {
    const filtered = reviewEvidenceRecords.filter((record) => {
      if (filters.status !== "All" && record.reviewState !== filters.status) return false;
      if (filters.source !== "All") {
        const family = record.sourceFamily;
        if (filters.source === "Citizen" && family !== "Citizen Reports") return false;
        if (filters.source === "Social" && family !== "Social / #IMD") return false;
        if (filters.source === "News" && family !== "News / Web") return false;
        if (filters.source === "Weather Observation" && family !== "Weather Observation") return false;
        if (filters.source === "Official Context" && family !== "Official Context") return false;
      }
      if (filters.media !== "All") {
        const media = record.mediaType.toLowerCase();
        if (filters.media === "No Media" ? !media.includes("no media") : !media.includes(filters.media.toLowerCase())) return false;
      }
      if (filters.incident !== "All" && record.incidentId !== filters.incident) return false;
      if (filters.location !== "All" && record.locationProvenance !== filters.location) return false;
      if (contributionView === "Included" && !record.contributesToCorroboration) return false;
      if (contributionView === "Excluded" && record.contributesToCorroboration) return false;
      return true;
    });
    return filtered.toSorted((a, b) => {
      if (filters.sort === "Oldest") return a.timestamp.localeCompare(b.timestamp);
      if (filters.sort === "Risk First") return Number(b.integrityStatus === "POTENTIALLY_MISLEADING") - Number(a.integrityStatus === "POTENTIALLY_MISLEADING") || b.timestamp.localeCompare(a.timestamp);
      if (filters.sort === "Duplicates First") return Number(Boolean(b.duplicateGroup)) - Number(Boolean(a.duplicateGroup)) || b.timestamp.localeCompare(a.timestamp);
      return b.timestamp.localeCompare(a.timestamp);
    });
  }, [filters, contributionView]);
  const selected = visible.find((record) => record.id === selectedId) || visible[0] || reviewEvidenceRecords[0];
  const checks = verificationChecksFor(selected);
  const update = (key: keyof Filters, value: string) => setFilters((current) => ({ ...current, [key]: value }));

  return <div className="evidence-review-page">
    <header className="evidence-review-header"><div><span>EVIDENCE OPERATIONS</span><h1>Evidence Review</h1><p>Inspect, trace and verify incoming weather evidence before it contributes to incident corroboration.</p></div><div className="review-principles"><span>REPORTS ≠ EVENTS</span><span>REPOSTS ≠ CONFIRMATIONS</span><span>VIRAL ≠ TRUSTED</span></div></header>
    <section className="evidence-review-metrics">{evidenceReviewMetrics.map((metric) => <div className={metric.tone} key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</section>
    <EvidenceFilterBar filters={filters} update={update} reset={() => { setFilters(initialFilters); setContributionView("All"); }} count={visible.length} />
    <section className="review-mode-bar"><span><Filter size={12} />Contribution view</span>{(["All", "Included", "Excluded"] as const).map((view) => <button key={view} className={contributionView === view ? "active" : ""} onClick={() => setContributionView(view)}>{view === "Included" ? <CheckCircle2 size={11} /> : view === "Excluded" ? <CircleSlash2 size={11} /> : null}{view}</button>)}<small>{visible.length} representative records</small></section>
    <div className="evidence-review-layout"><EvidenceReviewQueue records={visible} selectedId={selected.id} onSelect={setSelectedId} /><SelectedEvidenceInvestigation record={selected} onOpen={() => setDrawerRecord(selected)} /><VerificationInspector record={selected} checks={checks} onOpen={() => setDrawerRecord(selected)} /></div>
    <ContributionComparison />
    <div className="phase3-analysis-grid"><DuplicateFamilyCard /><HistoricalMediaAlert /></div>
    <IndependenceAnalysis />
    <SemanticDuplicateExample />
    <EvidenceDetailDrawer record={drawerRecord} onClose={() => setDrawerRecord(null)} />
  </div>;
}

function EvidenceFilterBar({ filters, update, reset, count }: { filters: Filters; update: (key: keyof Filters, value: string) => void; reset: () => void; count: number }) {
  const select = (label: string, key: keyof Filters, values: { label: string; value?: string }[]) => <label>{label}<select value={filters[key]} onChange={(event) => update(key, event.target.value)}>{values.map((item) => <option key={item.value || item.label} value={item.value || item.label}>{item.label}</option>)}</select></label>;
  return <section className="evidence-filter-bar"><SlidersHorizontal size={15} />{select("Status", "status", ["All", "Supports", "Consistent", "Excluded", "Potentially Misleading", "Duplicate", "Needs Review"].map((label) => ({ label, value: label === "All" ? "All" : label.toUpperCase().replaceAll(" ", "_") })))}{select("Source", "source", ["All", "Citizen", "Social", "News", "Weather Observation", "Official Context"].map((label) => ({ label })))}{select("Media", "media", ["All", "Text", "Image", "Video", "No Media"].map((label) => ({ label })))}{select("Incident", "incident", [{ label: "All", value: "All" }, { label: "JPR-FLD-001", value: "JPR-FLD-001" }, { label: "IDR-THN-002", value: "IDR-THN-002" }, { label: "BHO-RAN-003", value: "BHO-RAN-003" }])}{select("Location quality", "location", [{ label: "All", value: "All" }, { label: "GPS Confirmed", value: "GPS_CONFIRMED" }, { label: "Text Inferred", value: "TEXT_INFERRED" }, { label: "Unknown", value: "UNKNOWN" }])}{select("Sort", "sort", ["Newest", "Oldest", "Risk First", "Duplicates First"].map((label) => ({ label })))}<button onClick={reset}>Reset</button><span>{count} shown</span></section>;
}

function EvidenceReviewQueue({ records, selectedId, onSelect }: { records: ReviewEvidenceRecord[]; selectedId: string; onSelect: (id: string) => void }) {
  return <section className="panel review-queue"><div className="panel-heading"><h2><Radio size={15} />Review queue</h2><span>SELECT TO INVESTIGATE</span></div><div className="review-queue-list">{records.length ? records.map((record) => <EvidenceReviewItem key={record.id} record={record} selected={record.id === selectedId} onSelect={() => onSelect(record.id)} />) : <div className="review-empty"><Search size={22} /><strong>No matching evidence</strong><span>Reset or broaden the active filters.</span></div>}</div></section>;
}

function EvidenceReviewItem({ record, selected, onSelect }: { record: ReviewEvidenceRecord; selected: boolean; onSelect: () => void }) {
  const Icon = record.mediaType.toLowerCase().includes("video") ? Video : record.mediaType.toLowerCase().includes("image") ? Image : FileText;
  return <button className={`review-queue-item ${selected ? "selected" : ""}`} onClick={onSelect}><header><span className="queue-source-icon"><Icon size={14} /></span><div><strong>{record.sourceLabel}</strong><small>{record.id} · {record.timestamp} IST</small></div><ChevronRight size={13} /></header><blockquote>“{record.claim}”</blockquote><p><MapPin size={10} />{record.location}<span>{record.mediaType}</span></p><div><EvidenceRelationshipBadge relationship={record.relationship} /><MediaIntegrityBadge status={record.integrityStatus} /><LocationProvenanceBadge provenance={record.locationProvenance} /></div><footer><span>{record.independenceGroup}</span><span>{record.incidentId}</span></footer></button>;
}

function SelectedEvidenceInvestigation({ record, onOpen }: { record: ReviewEvidenceRecord; onOpen: () => void }) {
  return <section className="panel selected-investigation"><div className="investigation-title"><div><span>SELECTED EVIDENCE / {record.id}</span><h2>{record.title}</h2><p>{record.sourceLabel} · received {record.ingestedAt} IST</p></div><button onClick={onOpen}><Eye size={13} />Open full inspector</button></div><div className={`media-preview integrity-preview-${record.integrityStatus.toLowerCase()}`}><div className="media-frame"><FileImage size={30} /><span>{record.mediaType}</span><small>VISUAL PLACEHOLDER · NO LIVE MEDIA</small></div>{record.integrityStatus === "POTENTIALLY_MISLEADING" && <div className="preview-alert">Historical media match · August 2024</div>}<MediaIntegrityBadge status={record.integrityStatus} /></div><div className="claim-block"><label>CLAIM</label><blockquote>“{record.claim}”</blockquote>{record.normalizedText && <p><span>NORMALIZED</span>{record.normalizedText}</p>}</div><div className="investigation-facts"><div><span>SOURCE / PROVENANCE</span><strong>{record.sourceLabel}</strong><small>Original reference: {record.originalReference}</small></div><div><span>LOCATION</span><strong>{record.location}</strong><LocationProvenanceBadge provenance={record.locationProvenance} /></div><div><span>TIME</span><strong>{record.capturedAt} → {record.ingestedAt}</strong><small>Captured → ingested · IST</small></div><div><span>DUPLICATION</span><strong>{record.duplicateGroup || "No duplicate match"}</strong><MediaIntegrityBadge status={record.integrityStatus} /></div><div><span>INDEPENDENCE</span><strong>{record.independenceGroup}</strong><small>{record.contributesToCorroboration ? "Independent contribution" : "No new independent contribution"}</small></div><div><span>EVENT RELATIONSHIP</span><strong>{record.incidentId}</strong><EvidenceRelationshipBadge relationship={record.relationship} /></div></div><div className={`final-contribution ${record.contributesToCorroboration ? "included" : "excluded"}`}><span>FINAL CONTRIBUTION</span><strong>{record.contributesToCorroboration ? "YES · INCLUDED IN CORROBORATION" : "NO · EXCLUDED FROM CORROBORATION"}</strong><p>{record.contributionReason}</p></div></section>;
}

function VerificationInspector({ record, checks, onOpen }: { record: ReviewEvidenceRecord; checks: ReturnType<typeof verificationChecksFor>; onOpen: () => void }) {
  return <aside className="panel verification-inspector"><div className="panel-heading"><h2><ShieldQuestion size={15} />Provenance inspector</h2><span>CATEGORICAL REASONING</span></div><div className="verification-checks">{checks.map((check) => <div key={check.id} title={check.explanation}><span>{check.label}</span><strong className={`check-${check.tone}`}>{check.value}</strong><small>{check.explanation}</small></div>)}</div><div className={`inspector-verdict ${record.contributesToCorroboration ? "included" : "excluded"}`}><span>FINAL EVIDENCE CONTRIBUTION</span><strong>{record.contributesToCorroboration ? "INCLUDED" : "EXCLUDED"}</strong></div><button className="inspector-open" onClick={onOpen}>Inspect complete provenance<ArrowRight size={12} /></button><Link href={`/incidents/${record.incidentId}`} className="inspector-incident-link">Open {record.incidentId}<ArrowUpRight size={11} /></Link><p className="inspector-note"><InfoTerm label="No confidence percentage" help="AtmoGrid shows categorical evidence reasoning rather than false numerical precision." /></p></aside>;
}
