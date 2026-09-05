"use client";

import { useState } from "react";
import { AlertTriangle, ArrowDown, Check, ChevronDown, Copy, Fingerprint, Languages, Link2, ShieldCheck } from "lucide-react";
import { historicalMediaMatch, semanticDuplicateExample } from "@/data/mock-evidence-review";
import { jaipurDuplicateFamily } from "@/data/mock-duplicate-groups";
import { independenceGroups } from "@/data/mock-independence-groups";
import { DuplicateStatusBadge, InfoTerm, MediaIntegrityBadge } from "./integrity-badges";

export function DuplicateFamilyCard() {
  const [expanded, setExpanded] = useState(true);
  return <section className="panel duplicate-family"><header><div><span>DUPLICATE FAMILY</span><h2><Copy size={15} />Jaipur flood video propagation</h2></div><button aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>{expanded ? "Collapse" : "Expand"}<ChevronDown size={13} /></button></header><div className="duplicate-origin"><div><span>ORIGINAL MEDIA</span><strong>{jaipurDuplicateFamily.originalEvidenceId}</strong><small>{jaipurDuplicateFamily.firstObserved} IST · {jaipurDuplicateFamily.source}</small></div><div className="duplicate-equation"><b>18</b><span>appearances</span><em>≠</em><b>18</b><span>confirmations</span></div></div>{expanded && <div className="duplicate-appearances">{jaipurDuplicateFamily.appearances.map((item) => <div key={item.id}><time>{item.timestamp}</time><i /><span>{item.label}<small>{item.id}</small></span><DuplicateStatusBadge status={item.relation} /></div>)}</div>}<footer>{[{ value: 18, label: "Raw appearances" }, { value: 1, label: "Unique media" }, { value: 1, label: "Independence contribution" }, { value: 17, label: "Duplicates / derived" }].map((metric) => <div key={metric.label}><b>{metric.value}</b><span>{metric.label}</span></div>)}</footer></section>;
}

export function IndependenceAnalysis() {
  const [selected, setSelected] = useState("IG-03");
  return <section className="panel independence-analysis"><header><div><span>SOURCE INDEPENDENCE</span><h2><Fingerprint size={16} /><InfoTerm label="Independent evidence" help="Evidence that does not derive from the same underlying source or media." /></h2></div><div className="independence-flow"><b>42</b><span>raw</span><ArrowDown size={12} /><b>11</b><span>unique</span><ArrowDown size={12} /><b>7</b><span>groups</span></div></header><div className="independence-groups">{independenceGroups.map((group) => <button key={group.id} className={selected === group.id ? "selected" : ""} onClick={() => setSelected(group.id)}><span>{group.id}</span><strong>{group.title}</strong><small>{group.sourceType}</small>{group.dependentSummary && <em>{group.dependentSummary.join(" · ")}</em>}<i>{group.independent ? "INDEPENDENT" : "DEPENDENT"}</i></button>)}</div>{independenceGroups.find((group) => group.id === selected)?.nuance && <div className="independence-nuance"><Link2 size={14} />{independenceGroups.find((group) => group.id === selected)?.nuance}</div>}<footer>A news article may be independent reporting while its embedded media remains derived from another source.</footer></section>;
}

export function HistoricalMediaAlert() {
  return <section className="historical-alert panel"><header><div><AlertTriangle size={19} /><span>RECYCLED MEDIA SCENARIO<small>DEMO ANALYSIS</small></span></div><MediaIntegrityBadge status={historicalMediaMatch.result} /></header><div className="historical-claim"><span>{historicalMediaMatch.evidenceId}</span><blockquote>“Jaipur flooding right now 😱 #IMD #Flood”</blockquote></div><div className="historical-compare"><div><span>EARLIEST KNOWN OCCURRENCE</span><strong>{historicalMediaMatch.earliestKnownOccurrence}</strong></div><em>vs</em><div><span>CURRENT CLAIM</span><strong>{historicalMediaMatch.currentClaimDate}</strong></div></div><div className="integrity-pipeline"><span>Historical fingerprint search <b>previous match found</b></span><ArrowDown size={13} /><span>Temporal consistency <b className="failed">FAILED</b></span><ArrowDown size={13} /><span>Final contribution <b className="failed">EXCLUDED</b></span></div><p>{historicalMediaMatch.message}</p><footer><ShieldCheck size={13} />The incident remains <b>HIGHLY CORROBORATED</b>. One bad item does not make the event false.</footer></section>;
}

export function SemanticDuplicateExample() {
  return <section className="panel semantic-example"><header><div><Languages size={16} /><span>SEMANTIC RELATIONSHIP<small>MULTILINGUAL DEMO</small></span></div><strong>{semanticDuplicateExample.result}</strong></header><div className="semantic-reports">{semanticDuplicateExample.reports.map((report) => <blockquote key={report.label}><span>{report.label}</span>{report.text}</blockquote>)}</div><div className="semantic-checks"><span>Text <b>DIFFERENT</b></span><span>Meaning <b>HIGHLY SIMILAR</b></span><span>Location <b>SAME</b></span><span>Time <b>SAME EVENT WINDOW</b></span></div><p>{semanticDuplicateExample.explanation}</p><footer><span><Copy size={12} />Same wording / copied content → <b>DUPLICATE</b></span><span><Check size={12} />Same event independently described → <b>INDEPENDENT SUPPORT</b></span></footer></section>;
}

export function ContributionComparison() {
  return <section className="contribution-comparison"><div><span>RAW INPUT</span><strong>42</strong><small>Naive interpretation: 42 confirmations</small></div><ArrowDown size={17} /><div><span>ATMOGRID CONTENT CHECK</span><strong>14 + 17 + 1</strong><small>Duplicates · dependent media · recycled item</small></div><ArrowDown size={17} /><div><span>VERIFICATION CONTRIBUTION</span><strong>11 → 7</strong><small>Unique evidence → independent groups</small></div></section>;
}
