"use client";

import Link from "next/link";
import { ArrowUpRight, Copy, FileSearch, X } from "lucide-react";
import { ReviewEvidenceRecord } from "@/types/domain";
import { EvidenceRelationshipBadge, LocationProvenanceBadge } from "@/components/incidents/evidence-badges";
import { MediaIntegrityBadge } from "./integrity-badges";

export function EvidenceDetailDrawer({ record, onClose }: { record: ReviewEvidenceRecord | null; onClose: () => void }) {
  if (!record) return null;
  return (
    <div className="evidence-drawer-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="evidence-drawer" role="dialog" aria-modal="true" aria-labelledby="evidence-drawer-title">
        <header><div><span>EVIDENCE INSPECTOR</span><h2 id="evidence-drawer-title">{record.id}</h2></div><button aria-label="Close evidence inspector" onClick={onClose}><X size={17} /></button></header>
        <div className="drawer-state-row"><EvidenceRelationshipBadge relationship={record.relationship} /><MediaIntegrityBadge status={record.integrityStatus} /></div>
        <section><label>Original claim</label><blockquote>{record.claim}</blockquote>{record.normalizedText && <><label>Normalized text</label><p>{record.normalizedText}</p></>}</section>
        <dl className="drawer-facts">
          <div><dt>Source</dt><dd>{record.sourceLabel}</dd></div>
          <div><dt>Captured / received</dt><dd>{record.capturedAt} / {record.ingestedAt} IST</dd></div>
          <div><dt>Event</dt><dd>{record.incidentTitle} · {record.incidentId}</dd></div>
          <div><dt>Location</dt><dd>{record.location}<LocationProvenanceBadge provenance={record.locationProvenance} /></dd></div>
          <div><dt>Media</dt><dd>{record.mediaType}</dd></div>
          <div><dt>Media lineage</dt><dd>{record.lineageNode || "No lineage family"}</dd></div>
          <div><dt>Duplicate group</dt><dd>{record.duplicateGroup || "No duplicate match"}</dd></div>
          <div><dt>Independence group</dt><dd>{record.independenceGroup}</dd></div>
        </dl>
        <section className={`contribution-decision ${record.contributesToCorroboration ? "included" : "excluded"}`}>
          <span>FINAL EVIDENCE CONTRIBUTION</span><strong>{record.contributesToCorroboration ? "INCLUDED" : "EXCLUDED FROM CORROBORATION"}</strong><p>{record.contributionReason}</p>
        </section>
        {record.duplicateGroup && <div className="drawer-analysis"><Copy size={14} /><div><b>Demo lineage reasoning</b><span>Integrity results are typed simulation data, not live hashing or model output.</span></div></div>}
        <footer><Link href={`/incidents/${record.incidentId}`}><FileSearch size={14} />Open incident<ArrowUpRight size={12} /></Link></footer>
      </aside>
    </div>
  );
}
