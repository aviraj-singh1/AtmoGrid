"use client";

import { useState } from "react";
import { GitBranch, Info, Network } from "lucide-react";
import { jaipurVideoLineage } from "@/data/mock-media-lineage";
import { MediaLineageNode } from "@/types/domain";
import { DuplicateStatusBadge, InfoTerm } from "./integrity-badges";

export function MediaLineageGraph() {
  const [selectedId, setSelectedId] = useState(jaipurVideoLineage.originalNodeId);
  const selected = jaipurVideoLineage.nodes.find((node) => node.id === selectedId)!;
  const nodeById = new Map(jaipurVideoLineage.nodes.map((node) => [node.id, node]));
  return (
    <section className="media-lineage-workspace">
      <div className="lineage-summary">
        <div><Network size={18} /><span><InfoTerm label="Media lineage" help="Tracks how the same photo or video propagates across different sources." /><small>ONE ASSET · MANY APPEARANCES</small></span></div>
        {[{ value: 18, label: "Raw appearances" }, { value: 1, label: "Underlying media asset" }, { value: 17, label: "Dependent copies" }, { value: 1, label: "Independence contribution" }].map((metric) => <div className="lineage-metric" key={metric.label}><b>{metric.value}</b><span>{metric.label}</span></div>)}
      </div>
      <div className="lineage-layout">
        <div className="lineage-canvas panel" aria-label="Interactive Jaipur flood video lineage">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {jaipurVideoLineage.edges.map((edge) => {
              const from = nodeById.get(edge.from)!; const to = nodeById.get(edge.to)!;
              return <path key={edge.id} d={`M ${from.x} ${from.y + 5} C ${from.x} ${(from.y + to.y) / 2}, ${to.x} ${(from.y + to.y) / 2}, ${to.x} ${to.y - 5}`} />;
            })}
          </svg>
          {jaipurVideoLineage.nodes.map((node) => <LineageNode key={node.id} node={node} selected={node.id === selectedId} onSelect={() => setSelectedId(node.id)} />)}
          <div className="lineage-canvas-label"><GitBranch size={13} />DG-JPR-VIDEO-01 · DEMO ANALYSIS</div>
        </div>
        <aside className="panel lineage-node-detail">
          <header><span>SELECTED NODE</span><DuplicateStatusBadge status={selected.type} /></header>
          <h2>{selected.label}</h2><code>{selected.id}</code>
          <dl><div><dt>Source</dt><dd>{selected.source}</dd></div><div><dt>Timestamp</dt><dd>{selected.timestamp} IST</dd></div><div><dt>Media relationship</dt><dd>{selected.relationship}</dd></div><div><dt>Independence contribution</dt><dd>{selected.independenceContribution}</dd></div><div><dt>Event contribution</dt><dd>{selected.eventContribution}</dd></div></dl>
          <div className="lineage-note"><Info size={13} />A dependent copy can carry reach without adding independent corroboration.</div>
        </aside>
      </div>
    </section>
  );
}

function LineageNode({ node, selected, onSelect }: { node: MediaLineageNode; selected: boolean; onSelect: () => void }) {
  return <button className={`lineage-node node-${node.type.toLowerCase()} ${selected ? "selected" : ""}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} onClick={onSelect} aria-pressed={selected}><i /><strong>{node.label}</strong><span>{node.timestamp} · {node.type.replaceAll("_", " ")}</span></button>;
}
