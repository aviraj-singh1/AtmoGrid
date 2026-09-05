"use client";

import { Activity, Check, ChevronDown, ClipboardList, Database, Layers3, LockKeyhole, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { adminProcessingPolicies, adminSources, impactTaxonomy, initialAdminAudit, systemHealth, weatherTaxonomy } from "@/data/mock-admin";
import { AdminAuditEntry } from "@/types/domain";

const tabs = ["Sources", "Processing", "Taxonomy", "System", "Audit"] as const;
type AdminTab = (typeof tabs)[number];

function Toggle({ checked, locked, onChange, label }: { checked: boolean; locked?: boolean; onChange: () => void; label: string }) {
  return <button className={`admin-toggle ${checked ? "on" : ""}`} aria-pressed={checked} aria-label={`${label}: ${checked ? "Enabled" : "Disabled"}`} disabled={locked} onClick={onChange}><i /><span>{locked ? "LOCKED · ALWAYS ON" : checked ? "ENABLED" : "DISABLED"}</span></button>;
}

export function AdminPanel() {
  const [tab, setTab] = useState<AdminTab>("Sources");
  const [sources, setSources] = useState(adminSources);
  const [policies, setPolicies] = useState(adminProcessingPolicies);
  const [mergeWindow, setMergeWindow] = useState("Balanced");
  const [sensitivity, setSensitivity] = useState("Balanced");
  const [audit, setAudit] = useState<AdminAuditEntry[]>(initialAdminAudit);
  const [toast, setToast] = useState("");
  const [expandedTaxonomy, setExpandedTaxonomy] = useState<"weather" | "impact" | null>("weather");

  const addAudit = (action: string, detail: string) => setAudit((current) => [{ id: `SESSION-${current.length + 1}`, time: "17:33:00", action, detail, actor: "Operator OP", session: true }, ...current]);
  const toggleSource = (id: string) => {
    const source = sources.find((item) => item.id === id)!;
    const next = !source.enabled;
    setSources((current) => current.map((item) => item.id === id ? { ...item, enabled: next } : item));
    addAudit(`Connector ${next ? "enabled" : "disabled"}`, `${source.name} · local session state`);
    setToast(`${source.name} ${next ? "enabled" : "disabled"} · local demo state`);
  };
  const togglePolicy = (id: string) => {
    const policy = policies.find((item) => item.id === id)!;
    if (policy.locked) return;
    setPolicies((current) => current.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item));
    addAudit("Processing policy changed", `${policy.name}: ${policy.enabled ? "Enabled → Disabled" : "Disabled → Enabled"}`);
    setToast(`${policy.name} updated · local demo state`);
  };
  const changeProfile = (kind: "merge" | "sensitivity", value: string) => {
    const previous = kind === "merge" ? mergeWindow : sensitivity;
    if (kind === "merge") setMergeWindow(value); else setSensitivity(value);
    addAudit(`${kind === "merge" ? "Event merge window" : "Duplicate sensitivity"} changed`, `${previous} → ${value}`);
    setToast("Processing profile updated · local demo state");
  };
  const groups = useMemo(() => [...new Set(policies.map((policy) => policy.group))], [policies]);

  return (
    <div className="admin-page">
      <header className="page-heading"><div><div className="eyebrow">PLATFORM GOVERNANCE / PHASE 05</div><h1>Administration</h1><p>Manage AtmoGrid connector configuration, processing policies and operational audit settings.</p></div><span className="demo-tag">PROTOTYPE MODE · LOCAL STATE</span></header>
      <nav className="admin-tabs" aria-label="Administration sections">{tabs.map((item) => <button className={tab === item ? "active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</nav>
      <div className="admin-layout">
        <section className="panel admin-content">
          {tab === "Sources" && <><header><div><Database size={16} /><span><strong>Source configuration</strong><small>LOCAL DEMO TOGGLES</small></span></div><b>{sources.filter((item) => item.enabled).length} / {sources.length} ENABLED</b></header><div className="admin-source-list">{sources.map((source) => <div key={source.id}><div><strong>{source.name}</strong><span>{source.sourceFamily}</span></div><Toggle checked={source.enabled} label={source.name} onChange={() => toggleSource(source.id)} /></div>)}</div></>}
          {tab === "Processing" && <><header><div><SlidersHorizontal size={16} /><span><strong>Processing policies</strong><small>EXPLAINABLE EVIDENCE CONTROLS</small></span></div><b>LOCAL STATE</b></header><div className="admin-profile-selectors"><label>Event merge window<select value={mergeWindow} onChange={(event) => changeProfile("merge", event.target.value)}>{["Conservative", "Balanced", "Broad"].map((item) => <option key={item}>{item}</option>)}</select></label><label>Duplicate sensitivity<select value={sensitivity} onChange={(event) => changeProfile("sensitivity", event.target.value)}>{["Conservative", "Balanced", "Sensitive"].map((item) => <option key={item}>{item}</option>)}</select></label></div><div className="admin-policy-groups">{groups.map((group) => <section key={group}><h2>{group}</h2>{policies.filter((policy) => policy.group === group).map((policy) => <div key={policy.id}><span>{policy.locked && <LockKeyhole size={12} />}<strong>{policy.name}</strong></span><Toggle checked={policy.enabled} locked={policy.locked} label={policy.name} onChange={() => togglePolicy(policy.id)} /></div>)}</section>)}</div></>}
          {tab === "Taxonomy" && <><header><div><Layers3 size={16} /><span><strong>Event and impact taxonomy</strong><small>CONFIGURABLE IN PRODUCTION</small></span></div><b>{weatherTaxonomy.length + impactTaxonomy.length} TERMS</b></header><div className="admin-taxonomy"><section><button onClick={() => setExpandedTaxonomy(expandedTaxonomy === "weather" ? null : "weather")}><span><strong>Weather event categories</strong><small>{weatherTaxonomy.length} supported terms</small></span><ChevronDown size={15} /></button>{expandedTaxonomy === "weather" && <div>{weatherTaxonomy.map((item) => <b key={item}>{item}</b>)}</div>}</section><section><button onClick={() => setExpandedTaxonomy(expandedTaxonomy === "impact" ? null : "impact")}><span><strong>Impact taxonomy</strong><small>{impactTaxonomy.length} supported terms</small></span><ChevronDown size={15} /></button>{expandedTaxonomy === "impact" && <div>{impactTaxonomy.map((item) => <b key={item}>{item}</b>)}</div>}</section><p>Taxonomy changes are displayed for evaluator review only. Full CRUD and deployment controls are outside this prototype.</p></div></>}
          {tab === "System" && <><header><div><Activity size={16} /><span><strong>System status</strong><small>SIMULATED / LOCAL PROTOTYPE</small></span></div><b>DEMO ENVIRONMENT</b></header><div className="admin-health-grid">{systemHealth.map((item) => <article key={item.id}><span className={item.status.toLowerCase()}><i />{item.status}</span><strong>{item.name}</strong><p>{item.detail}</p></article>)}</div><div className="admin-architecture"><span>Source Connectors</span><b>→</b><span>Processing</span><b>→</b><span>Event Intelligence</span><b>→</b><span>Operations Console</span></div></>}
          {tab === "Audit" && <><header><div><ClipboardList size={16} /><span><strong>Administrative audit</strong><small>CONFIGURATION AND GOVERNANCE EVENTS</small></span></div><b>{audit.length} RECORDS</b></header><div className="admin-audit">{audit.map((entry) => <article key={entry.id}><time>{entry.time}</time><i /><div><strong>{entry.action}{entry.session && <span>SESSION</span>}</strong><p>{entry.detail}</p><small>{entry.actor}</small></div></article>)}</div></>}
        </section>

        <aside className="admin-governance panel"><header><ShieldCheck size={17} /><div><strong>Governance safeguards</strong><span>ALWAYS VISIBLE</span></div></header>{["Human verification required", "Original source preserved", "Operator actions audited", "Evidence exclusions explainable", "Restricted sources policy-dependent", "Missing evidence ≠ contradiction"].map((item) => <div key={item}><Check size={12} /><span>{item}</span></div>)}<footer><LockKeyhole size={14} /><p>Human verification cannot be disabled in this prototype.</p></footer></aside>
      </div>
      {toast && <div className="action-toast" role="status"><Check size={14} /><span>{toast}</span><button aria-label="Dismiss notification" onClick={() => setToast("")}><X size={13} /></button></div>}
    </div>
  );
}
