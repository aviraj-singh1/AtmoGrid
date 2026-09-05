"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertOctagon,
  ArrowLeft,
  BellRing,
  Check,
  CheckCheck,
  Clock3,
  FileQuestion,
  MapPin,
  ShieldCheck,
  TrendingUp,
  X,
} from "lucide-react";
import { Incident, AuditEntry, VerificationStatus } from "@/types/domain";
import { initialAuditEntries } from "@/data/mock-audit";
import { PriorityBadge, VerificationBadge } from "@/components/shared/status";
import {
  AuditTimeline,
  EvidenceCompressionFlow,
  EvidenceMetrics,
  EvidenceWorkspace,
  ImpactPanel,
  IncidentTimeline,
  MediaLineageWorkspace,
  OfficialContextPanel,
  SourceFamilyBreakdown,
  TrustPanel,
  VerificationReasoningPanel,
} from "./investigation-panels";

const IncidentMiniMap = dynamic(() => import("./incident-mini-map"), {
  ssr: false,
  loading: () => (
    <div className="panel detail-map-skeleton">
      Preparing Jaipur evidence map…
    </div>
  ),
});

const tabs = [
  "Overview",
  "Evidence",
  "Timeline",
  "Impact",
  "Official Context",
  "Media Lineage",
  "Audit",
] as const;
type Tab = (typeof tabs)[number];

export function IncidentInvestigation({ incident }: { incident: Incident }) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [verification, setVerification] = useState<VerificationStatus>(
    incident.verificationStatus,
  );
  const [auditEntries, setAuditEntries] =
    useState<AuditEntry[]>(initialAuditEntries);
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!verifyOpen) return;
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && setVerifyOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [verifyOpen]);

  const addAuditEntry = (action: string, detail?: string) => {
    setAuditEntries((current) => [
      ...current,
      {
        id: `SESSION-${current.length + 1}`,
        timestamp: "17:33:00",
        action,
        actor: "Demo Operator · OP",
        detail,
        temporary: true,
      },
    ]);
  };

  const confirmVerification = () => {
    setVerification("IMD_VERIFIED");
    addAuditEntry(
      "Operator verified incident",
      note.trim() || "No operator note supplied",
    );
    setVerifyOpen(false);
    setNote("");
    setToast("Incident marked IMD Verified · local demo state");
  };

  const changeStatus = (status: VerificationStatus, label: string) => {
    setVerification(status);
    addAuditEntry(
      label,
      `HIGHLY CORROBORATED → ${status.replaceAll("_", " ")}`,
    );
    setToast(`${label} · local demo state`);
  };

  const renderTab = () => {
    if (activeTab === "Evidence") return <EvidenceWorkspace />;
    if (activeTab === "Timeline") return <IncidentTimeline />;
    if (activeTab === "Impact") return <ImpactPanel />;
    if (activeTab === "Official Context") return <OfficialContextPanel />;
    if (activeTab === "Media Lineage") return <MediaLineageWorkspace />;
    if (activeTab === "Audit") return <AuditTimeline entries={auditEntries} />;
    return (
      <div className="overview-grid">
        <div className="overview-main">
          <TrustPanel />
          <VerificationReasoningPanel />
        </div>
        <aside className="overview-aside">
          <IncidentMiniMap />
          <SourceFamilyBreakdown />
        </aside>
      </div>
    );
  };

  return (
    <div className="incident-investigation">
      <Link href="/" className="back-link">
        <ArrowLeft size={13} />
        Command Center / Live triage
      </Link>
      <header className="incident-detail-header">
        <div className="incident-header-main">
          <div className="incident-id-row">
            <span>INCIDENT INVESTIGATION</span>
            <code>{incident.id}</code>
            <span className="phase-chip">SIMULATED DATA</span>
          </div>
          <h1>{incident.title}</h1>
          <p>
            <MapPin size={13} />
            {incident.location}
          </p>
          <div className="incident-status-row">
            <PriorityBadge priority={incident.priority} />
            <VerificationBadge status={verification} />
            <span className="trend-badge">
              <TrendingUp size={12} />
              Rising rapidly
            </span>
          </div>
        </div>
        <div className="incident-facts">
          <div>
            <span>FIRST OBSERVED</span>
            <strong>
              17:04 <small>IST</small>
            </strong>
          </div>
          <div>
            <span>LAST UPDATE</span>
            <strong>
              17:31 <small>IST</small>
            </strong>
          </div>
          <div>
            <span>LOCATION PROVENANCE</span>
            <strong>TEXT + MULTIPLE REPORT CONSENSUS</strong>
            <small>26.89° N, 75.80° E · approximate</small>
          </div>
        </div>
        <div className="operator-actions" aria-label="Operator actions">
          <span>OPERATOR ACTION</span>
          <div>
            <button
              className="verify-action"
              onClick={() => setVerifyOpen(true)}
            >
              <CheckCheck size={14} />
              Verify
            </button>
            <button
              onClick={() => changeStatus("DISPUTED", "Incident disputed")}
            >
              <AlertOctagon size={14} />
              Dispute
            </button>
            <button
              onClick={() =>
                changeStatus("INCONCLUSIVE", "Marked inconclusive")
              }
            >
              <FileQuestion size={14} />
              Mark inconclusive
            </button>
            <button
              onClick={() => {
                addAuditEntry(
                  "Incident escalated",
                  "Forwarded for senior operational review",
                );
                setToast("Incident escalated for review · local demo state");
              }}
            >
              <BellRing size={14} />
              Escalate
            </button>
          </div>
          <small>Actions reset when the page refreshes.</small>
        </div>
      </header>

      <EvidenceMetrics />
      <EvidenceCompressionFlow />

      <nav className="incident-tabs" aria-label="Investigation sections">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            aria-current={activeTab === tab ? "page" : undefined}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === "Media Lineage" && <small>ACTIVE</small>}
            {tab === "Audit" &&
              auditEntries.some((entry) => entry.temporary) && <i />}
          </button>
        ))}
      </nav>
      <div className="tab-content" key={activeTab}>
        {renderTab()}
      </div>

      {verifyOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setVerifyOpen(false)
          }
        >
          <section
            className="verification-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="verify-title"
          >
            <header>
              <div className="modal-icon">
                <ShieldCheck size={22} />
              </div>
              <div>
                <span>HUMAN VERIFICATION</span>
                <h2 id="verify-title">Verify this incident?</h2>
              </div>
              <button
                aria-label="Close verification dialog"
                onClick={() => setVerifyOpen(false)}
              >
                <X size={17} />
              </button>
            </header>
            <div className="modal-summary">
              <strong>{incident.title}</strong>
              <span>
                {incident.id} · {incident.location}
              </span>
            </div>
            <p>
              This records a human decision and changes the local verification
              state to <b>IMD Verified</b>. It does not publish an official
              warning.
            </p>
            <label htmlFor="operator-note">
              Operator note <small>OPTIONAL · 180 CHARACTERS</small>
            </label>
            <textarea
              id="operator-note"
              autoFocus
              maxLength={180}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Reason for verification or follow-up instruction…"
            />
            <div className="modal-caution">
              <Clock3 size={13} />
              Demo action only · local state resets on refresh.
            </div>
            <footer>
              <button onClick={() => setVerifyOpen(false)}>Cancel</button>
              <button className="verify-action" onClick={confirmVerification}>
                <Check size={14} />
                Confirm verification
              </button>
            </footer>
          </section>
        </div>
      )}
      {toast && (
        <div className="action-toast" role="status">
          <Check size={15} />
          <span>{toast}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => setToast("")}
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
