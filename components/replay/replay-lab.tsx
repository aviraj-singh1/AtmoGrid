"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileSearch,
  GitMerge,
  Pause,
  Play,
  Radio,
  RotateCcw,
  ShieldCheck,
  StepForward,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { jaipurReplayEvents, replayPipelineStages } from "@/data/mock-jaipur-replay";
import { reviewEvidenceRecords } from "@/data/mock-evidence-review";
import { LocationProvenanceBadge } from "@/components/incidents/evidence-badges";
import { PriorityBadge, VerificationBadge } from "@/components/shared/status";
import { ReplayEvent } from "@/types/domain";
import { ReplaySpeed, useReplayEngine } from "./use-replay-engine";

const IncidentMiniMap = dynamic(() => import("@/components/incidents/incident-mini-map"), {
  ssr: false,
  loading: () => <div className="panel replay-map-loading">Preparing Jaipur scenario map…</div>,
});

function ReplayControls({ engine }: { engine: ReturnType<typeof useReplayEngine> }) {
  return (
    <section className="replay-controls" aria-label="Replay controls">
      <div className="replay-scenario">
        <span>SCENARIO</span>
        <strong>Jaipur Urban Flooding</strong>
        <code>JPR-FLD-001</code>
      </div>
      <div className="replay-actions">
        {engine.status === "IDLE" || engine.status === "COMPLETE" ? (
          <button className="replay-primary" onClick={engine.start}>
            <Play size={14} /> {engine.status === "COMPLETE" ? "RESTART REPLAY" : "START REPLAY"}
          </button>
        ) : engine.status === "PLAYING" ? (
          <button onClick={engine.pause}><Pause size={14} /> PAUSE</button>
        ) : (
          <button className="replay-primary" onClick={engine.resume}><Play size={14} /> RESUME</button>
        )}
        <button onClick={engine.reset}><RotateCcw size={13} /> RESET</button>
        <button onClick={engine.stepForward}><StepForward size={13} /> STEP</button>
      </div>
      <fieldset className="replay-speed">
        <legend>SPEED</legend>
        {([0.5, 1, 2, 4] as ReplaySpeed[]).map((speed) => (
          <button
            key={speed}
            aria-pressed={engine.speed === speed}
            className={engine.speed === speed ? "active" : ""}
            onClick={() => engine.setSpeed(speed)}
          >
            {speed}×
          </button>
        ))}
      </fieldset>
      <div className="replay-clock">
        <span>SCENARIO TIME</span>
        <strong>{engine.scenarioTime} <small>IST</small></strong>
      </div>
      <div className="replay-progress">
        <div><span>REPLAY PROGRESS</span><b>{engine.progress}%</b></div>
        <progress max="100" value={engine.progress}>{engine.progress}%</progress>
        <small>{engine.status}</small>
      </div>
    </section>
  );
}

function SignalStream({
  events,
  selectedId,
  onSelect,
}: {
  events: ReplayEvent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const signals = events.filter((event) => event.signal).reverse();
  return (
    <section className="panel replay-stream">
      <header className="replay-panel-heading">
        <div><Radio size={15} /><span><strong>Incoming signal stream</strong><small>STATE-DRIVEN REPLAY INPUT</small></span></div>
        <b>{signals.length} visible</b>
      </header>
      <div className="replay-signal-list">
        {signals.length === 0 && (
          <div className="replay-waiting"><Radio size={23} /><strong>WAITING FOR SIGNALS</strong><span>Start the replay or step forward.</span></div>
        )}
        {signals.map((event, index) => (
          <button
            key={event.id}
            className={`${selectedId === event.id ? "selected" : ""} ${index === 0 ? "new" : ""}`}
            onClick={() => onSelect(event.id)}
          >
            <header><span>{event.scenarioTime} IST</span><code>{event.signal?.evidenceId || event.id}</code></header>
            <strong>{event.signal?.source}</strong>
            <p>{event.signal?.claim}</p>
            <div><span>{event.signal?.media}</span><b>{event.signal?.classification}</b></div>
            <footer><LocationProvenanceBadge provenance={event.signal!.locationProvenance} /><span>{event.signal?.contribution}</span></footer>
          </button>
        ))}
      </div>
    </section>
  );
}

function CompressionPanel({ engine }: { engine: ReturnType<typeof useReplayEngine> }) {
  const { snapshot, currentEvent } = engine;
  const steps = [
    [snapshot.rawReports, "RAW REPORTS", "incoming appearances"],
    [snapshot.uniqueEvidence, "UNIQUE EVIDENCE", "after content checks"],
    [snapshot.independentGroups, "INDEPENDENT GROUPS", "source origins"],
    [snapshot.eventState === "ACTIVE_EVENT" ? 1 : 0, "INCIDENT", "event cluster"],
  ] as const;
  return (
    <section className={`panel replay-compression ${currentEvent.highlightTarget === "compression" ? "highlight" : ""}`}>
      <header className="replay-panel-heading">
        <div><GitMerge size={15} /><span><strong>Evidence compression</strong><small>REPORT COUNT ≠ EVIDENCE COUNT</small></span></div>
        <b>LIVE STATE</b>
      </header>
      <div className="replay-compression-flow">
        {steps.map(([value, label, note], index) => (
          <div className="replay-compression-step" key={label}>
            <div><b>{value}</b><strong>{label}</strong><small>{note}</small></div>
            {index < steps.length - 1 && <ArrowDown size={15} />}
          </div>
        ))}
      </div>
      <div className="replay-dedup-strip">
        <span><b>{snapshot.duplicatesSuppressed}</b> DUPLICATES / DERIVED</span>
        <ArrowRight size={15} />
        <span><b>{snapshot.independentGroups}</b> INDEPENDENT CONFIRMATIONS</span>
      </div>
      {currentEvent.insight && (
        <div className={`replay-insight ${currentEvent.severity.toLowerCase()}`} aria-live="polite">
          {currentEvent.severity === "CAUTION" ? <AlertTriangle size={16} /> : <ShieldCheck size={16} />}
          <div><strong>{currentEvent.title}</strong><p>{currentEvent.insight}</p></div>
        </div>
      )}
    </section>
  );
}

function IncidentState({ engine, verified, onVerify }: { engine: ReturnType<typeof useReplayEngine>; verified: boolean; onVerify: () => void }) {
  const state = engine.snapshot;
  return (
    <section className={`panel replay-incident-state ${engine.currentEvent.highlightTarget === "verification" || engine.currentEvent.highlightTarget === "priority" ? "highlight" : ""}`}>
      <header className="replay-panel-heading">
        <div><ShieldCheck size={15} /><span><strong>Incident state</strong><small>EXPLAINABLE OPERATIONAL STATE</small></span></div>
        <b>{state.eventState.replaceAll("_", " ")}</b>
      </header>
      <div className="replay-state-title"><div><span>EVENT</span><h2>{state.eventState === "NOT_FORMED" ? "Not formed" : "Urban Flooding"}</h2><p>Tonk Road, Jaipur</p></div><PriorityBadge priority={state.priority} /></div>
      <div className="replay-state-verification"><span>VERIFICATION</span><VerificationBadge status={verified ? "IMD_VERIFIED" : state.verification} /></div>
      <dl className="replay-state-facts">
        <div><dt>Source families</dt><dd>{state.sourceFamilies}</dd></div>
        <div><dt>Evidence trend</dt><dd>{state.rawReports ? "RISING" : "WAITING"}</dd></div>
        <div><dt>Ground impacts</dt><dd>{state.impacts.length}</dd></div>
        <div><dt>Misleading evidence</dt><dd>{state.misleadingExcluded} EXCLUDED</dd></div>
        <div><dt>Physical support</dt><dd>{state.physicalSupport}</dd></div>
        <div><dt>Official context</dt><dd>{state.officialContext}</dd></div>
      </dl>
      <div className="replay-impact-list">
        <span>DETECTED GROUND IMPACT</span>
        {state.impacts.length ? state.impacts.map((impact) => <b key={impact}><Check size={10} />{impact}</b>) : <p>No impact detected yet</p>}
      </div>
      {state.reviewRequired && (
        <div className="replay-review-actions">
          <strong>{verified ? "OPERATOR DECISION RECORDED" : "REVIEW REQUIRED"}</strong>
          {!verified && <button onClick={onVerify}><CheckCircle2 size={13} /> VERIFY EVENT</button>}
          <Link href="/incidents/JPR-FLD-001">OPEN INCIDENT <ExternalLink size={11} /></Link>
          <Link href="/evidence-review">OPEN EVIDENCE REVIEW <ExternalLink size={11} /></Link>
        </div>
      )}
    </section>
  );
}

function ExplanationFeed({ events, verified }: { events: ReplayEvent[]; verified: boolean }) {
  const messages = events.filter((event) => event.insight).slice(-4).reverse();
  return (
    <section className="panel replay-explanations">
      <header className="replay-panel-heading"><div><FileSearch size={15} /><span><strong>System reasoning</strong><small>CATEGORICAL EXPLANATIONS</small></span></div></header>
      <div>
        {verified && <article className="supporting"><time>OPERATOR</time><p>Human review completed. Local demo state changed to IMD Verified.</p></article>}
        {messages.map((event) => <article className={event.severity.toLowerCase()} key={event.id}><time>{event.scenarioTime.slice(0, 5)}</time><p>{event.insight}</p></article>)}
      </div>
    </section>
  );
}

export function ReplayLab() {
  const engine = useReplayEngine();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (engine.status === "IDLE") {
      setSelectedId(null);
      setVerified(false);
      return;
    }
    const latestSignal = jaipurReplayEvents
      .slice(0, engine.currentIndex + 1)
      .reverse()
      .find((event) => event.signal);
    if (latestSignal) setSelectedId(latestSignal.id);
  }, [engine.currentIndex, engine.status]);

  const selectedEvent = useMemo(
    () => jaipurReplayEvents.find((event) => event.id === selectedId) || null,
    [selectedId],
  );
  const canonicalEvidence = selectedEvent?.signal?.evidenceId
    ? reviewEvidenceRecords.find((record) => record.id === selectedEvent.signal?.evidenceId)
    : null;

  return (
    <div className="replay-lab">
      <header className="page-heading replay-heading">
        <div><div className="eyebrow">JAIPUR SCENARIO REPLAY</div><h1>Jaipur Urban Flooding — Evidence Replay</h1><p>Watch AtmoGrid reconstruct and verify a weather incident from noisy incoming signals.</p></div>
        <span className="replay-mode-badge"><i /> REPLAY MODE</span>
      </header>
      <div className="replay-disclaimer"><Clock3 size={13} /><strong>SIMULATED / HISTORICAL DEMO REPLAY</strong><span>No live production data, ingestion infrastructure or model output.</span></div>
      <ReplayControls engine={engine} />

      <div className="replay-main-grid">
        <SignalStream events={engine.visibleEvents} selectedId={selectedId} onSelect={setSelectedId} />
        <div className="replay-center-stack">
          <CompressionPanel engine={engine} />
          <IncidentMiniMap replayStage={engine.currentIndex} compact />
        </div>
        <div className="replay-right-stack">
          <IncidentState engine={engine} verified={verified} onVerify={() => setVerified(true)} />
          <ExplanationFeed events={engine.visibleEvents} verified={verified} />
        </div>
      </div>

      {selectedEvent && (
        <section className="replay-selected-signal" aria-live="polite">
          <div><span>SELECTED REPLAY EVENT</span><strong>{selectedEvent.signal?.source || selectedEvent.title}</strong><p>{selectedEvent.description}</p></div>
          <dl><div><dt>Classification</dt><dd>{selectedEvent.signal?.classification || selectedEvent.kind.replaceAll("_", " ")}</dd></div><div><dt>Final contribution</dt><dd>{selectedEvent.signal?.contribution || selectedEvent.pipelineStage.replaceAll("_", " ")}</dd></div><div><dt>Canonical record</dt><dd>{canonicalEvidence?.id || "SYSTEM MILESTONE"}</dd></div></dl>
        </section>
      )}

      <section className="replay-pipeline" aria-label="Replay pipeline stages">
        <header><strong>Operational pipeline</strong><span>Active stage: {engine.currentEvent.pipelineStage.replaceAll("_", " ")}</span></header>
        <div>{replayPipelineStages.map((stage, index) => {
          const active = stage === engine.currentEvent.pipelineStage;
          const visited = engine.visibleEvents.some((event) => event.pipelineStage === stage);
          return <span className={active ? "active" : visited ? "complete" : ""} key={stage}>{visited && !active ? <Check size={10} /> : <i />}{stage.replaceAll("_", " ")}</span>;
        })}</div>
      </section>

      <section className="replay-timeline" aria-label="Replay milestones">
        {jaipurReplayEvents.slice(1).map((event, index) => (
          <button
            key={event.id}
            className={index + 1 === engine.currentIndex ? "active" : index + 1 < engine.currentIndex ? "complete" : ""}
            disabled={index + 1 > engine.currentIndex}
            onClick={() => setSelectedId(event.id)}
          >
            <i />
            <span>{event.scenarioTime.slice(0, 5)}</span>
            <strong>{event.title}</strong>
          </button>
        ))}
      </section>
    </div>
  );
}
