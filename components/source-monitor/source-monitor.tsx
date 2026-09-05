"use client";

import Link from "next/link";
import { Activity, ArrowDown, ArrowRight, Database, ExternalLink, FileText, Globe2, RadioTower, Satellite, ShieldCheck, Users, X } from "lucide-react";
import { useState } from "react";
import { hashtagWatch, sourceConnectors } from "@/data/mock-connectors";
import { SourceConnector } from "@/types/domain";

const healthClass = (health: SourceConnector["health"]) => health.toLowerCase();

function ConnectorDrawer({ connector, onClose }: { connector: SourceConnector | null; onClose: () => void }) {
  if (!connector) return null;
  return (
    <div className="connector-drawer-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className="connector-drawer" role="dialog" aria-modal="true" aria-labelledby="connector-title">
        <header><div><span>CONNECTOR DETAIL</span><h2 id="connector-title">{connector.name}</h2><code>{connector.id}</code></div><button aria-label="Close connector detail" onClick={onClose}><X size={16} /></button></header>
        <div className="connector-drawer-status"><span className={`connector-health ${healthClass(connector.health)}`}><i />{connector.health}</span><b>{connector.mode}</b></div>
        <dl>
          <div><dt>Source family</dt><dd>{connector.sourceFamily}</dd></div>
          <div><dt>Acquisition method</dt><dd>{connector.acquisitionMethod}</dd></div>
          <div><dt>Last successful ingestion</dt><dd>{connector.lastIngestion}</dd></div>
          <div><dt>Evidence role</dt><dd>{connector.evidenceRole.replaceAll("_", " ")}</dd></div>
          <div><dt>Policy / access</dt><dd>{connector.policy}</dd></div>
          <div><dt>Cache / retention</dt><dd>{connector.retention}</dd></div>
        </dl>
        <section><span>EVENT CATEGORIES</span><div>{connector.eventCategories.map((item) => <b key={item}>{item}</b>)}</div></section>
        <section><span>METADATA AVAILABLE</span><div>{connector.metadata.map((item) => <b key={item}>{item}</b>)}</div></section>
        {connector.monitors && <section><span>ACTIVE WATCH TERMS</span><div>{connector.monitors.map((item) => <b key={item}>{item}</b>)}</div></section>}
        <div className="connector-prototype-note"><ShieldCheck size={15} /><p>{connector.prototypeNote}</p></div>
        <footer><Link href="/evidence-review">VIEW EVIDENCE <ExternalLink size={11} /></Link></footer>
      </aside>
    </div>
  );
}

export function SourceMonitor() {
  const [selected, setSelected] = useState<SourceConnector | null>(null);
  const healthy = sourceConnectors.filter((item) => item.health === "HEALTHY").length;
  const replayHistorical = sourceConnectors.filter((item) => ["REPLAY", "HISTORICAL"].includes(item.health)).length;
  const unavailable = sourceConnectors.filter((item) => ["UNAVAILABLE", "DISABLED"].includes(item.health)).length;
  const signals = sourceConnectors.reduce((sum, item) => sum + item.signalCount, 0);

  return (
    <div className="source-monitor-page">
      <header className="page-heading"><div><div className="eyebrow">SOURCE OPERATIONS</div><h1>Source Monitor</h1><p>Monitor ingestion sources, connector health, provenance policies and evidence availability.</p></div><span className="demo-tag">SIMULATED OPERATIONAL METRICS</span></header>
      <section className="source-summary" aria-label="Source monitor summary">
        {[{ label: "Configured Sources", value: sourceConnectors.length, tone: "cyan" }, { label: "Healthy", value: healthy, tone: "green" }, { label: "Replay / Historical", value: replayHistorical, tone: "amber" }, { label: "Unavailable", value: unavailable, tone: "muted" }, { label: "Signals Ingested", value: signals, note: "demo records" }, { label: "Last 15 min", value: 67, note: "simulated" }, { label: "Connector Errors", value: 0, tone: "green" }].map((metric) => <div className={metric.tone || ""} key={metric.label}><strong>{metric.value}</strong><span>{metric.label}<small>{metric.note}</small></span></div>)}
      </section>

      <div className="source-monitor-grid">
        <section className="panel connector-panel">
          <header><div><RadioTower size={16} /><span><strong>Source connectors</strong><small>HEALTH DESCRIBES AVAILABILITY, NOT EVIDENCE TRUTH</small></span></div><b>{sourceConnectors.length} CONFIGURED</b></header>
          <div className="connector-columns"><span>Connector</span><span>Mode / health</span><span>Last ingestion</span><span>Signals</span><span>Evidence role</span><span>Policy</span></div>
          <div className="connector-list">{sourceConnectors.map((connector) => <button key={connector.id} onClick={() => setSelected(connector)}><div className="connector-name"><span>{connector.evidenceRole === "DISCOVERY" ? <Users size={15} /> : connector.sourceFamily.includes("Dataset") ? <Database size={15} /> : connector.sourceFamily.includes("Remote") ? <Satellite size={15} /> : <FileText size={15} />}</span><div><strong>{connector.name}</strong><small>{connector.sourceFamily}</small></div></div><div><span className={`connector-health ${healthClass(connector.health)}`}><i />{connector.health}</span><small>{connector.mode}</small></div><span>{connector.lastIngestion}</span><b>{connector.signalCount}</b><code>{connector.evidenceRole.replaceAll("_", " ")}</code><p>{connector.policy}</p><ArrowRight size={12} /></button>)}</div>
        </section>

        <aside className="source-monitor-aside">
          <section className="panel hashtag-watch"><header><div><Activity size={15} /><span><strong>Hashtag watch</strong><small>CAPTURED DEMO COUNTS</small></span></div></header><div>{hashtagWatch.map((item) => <div key={item.tag}><b>{item.tag}</b><span><i style={{ width: `${Math.max(12, item.count / 1.3)}%` }} />{item.count} signals</span></div>)}</div><footer>Social source access is API/platform-policy dependent. Replay mode preserves the connector interface for evaluator demonstration.</footer></section>
          <section className="panel source-policy-note"><ShieldCheck size={18} /><div><strong>Provenance policy</strong><p>Original source references are preserved where available. Connector availability never substitutes for evidence verification.</p></div></section>
        </aside>
      </div>

      <section className="source-family-flow">
        <div><span>DISCOVERY SOURCES</span><strong><Users size={14} />Citizen</strong><strong><RadioTower size={14} />Social</strong><strong><Globe2 size={14} />News / Web</strong></div>
        <ArrowDown size={17} />
        <div className="source-flow-core"><b>AtmoGrid</b><span>PROVENANCE · DEDUP · INDEPENDENCE</span></div>
        <ArrowDown size={17} />
        <div><span>CORROBORATION SOURCES</span><strong><Activity size={14} />Weather Observation</strong><strong><FileText size={14} />Official Context</strong><strong><Satellite size={14} />Radar / Precipitation</strong></div>
      </section>
      <ConnectorDrawer connector={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
