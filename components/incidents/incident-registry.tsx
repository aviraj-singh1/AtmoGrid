"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CloudFog,
  CloudLightning,
  CloudRain,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Waves,
  Wind,
} from "lucide-react";
import { useMemo, useState } from "react";
import { incidents } from "@/data/mock-incidents";
import { metrics, verificationDistribution } from "@/data/mock-metrics";
import { minutesAgo, statusLabel } from "@/lib/format";
import { Incident, OperationalPriority } from "@/types/domain";
import { PriorityBadge, VerificationBadge } from "@/components/shared/status";

const eventIcons = {
  Flooding: Waves,
  Rainfall: CloudRain,
  Thunderstorm: CloudLightning,
  Fog: CloudFog,
  "Strong Wind": Wind,
  Heatwave: CloudRain,
  "Dust Storm": Wind,
};

const initialFilters = {
  event: "All",
  location: "All India",
  verification: "All",
  priority: "All",
  search: "",
};

type RegistryFilters = typeof initialFilters;

const activeIncidents = metrics.find(
  (metric) => metric.label === "Active Incidents",
)?.value;
const p1Review = metrics.find((metric) => metric.label === "P1 Review")?.value;

const summary = [
  { label: "Active Incidents", value: activeIncidents, tone: "cyan" },
  { label: "P1 Review", value: p1Review, tone: "red" },
  {
    label: "Highly Corroborated",
    value: verificationDistribution.find(
      (item) => item.label === "Highly Corroborated",
    )?.count,
    tone: "green",
  },
  {
    label: "Corroborating",
    value: verificationDistribution.find(
      (item) => item.label === "Corroborating",
    )?.count,
    tone: "cyan",
  },
  {
    label: "Emerging",
    value: verificationDistribution.find((item) => item.label === "Emerging")
      ?.count,
    tone: "muted",
  },
];

function IncidentRegistryRow({ incident }: { incident: Incident }) {
  const Icon = eventIcons[incident.eventType];
  const isFlagship = incident.id === "JPR-FLD-001";

  const content = (
    <>
      <div className="registry-identity">
        <span className={`registry-event-icon ${incident.priority.toLowerCase()}`}>
          <Icon size={18} />
        </span>
        <div>
          <span>{incident.id}</span>
          <h2>{incident.title}</h2>
          <p>
            <MapPin size={11} />
            {incident.city}, {incident.state}
          </p>
        </div>
      </div>
      <div className="registry-status">
        <PriorityBadge priority={incident.priority} />
        <VerificationBadge status={incident.verificationStatus} />
      </div>
      <div className="registry-update">
        <strong>{incident.lastUpdated.slice(11, 16)} IST</strong>
        <span>{minutesAgo(incident.lastUpdated)} min ago</span>
      </div>
      <div className="registry-evidence-counts">
        <span><b>{incident.rawReportCount}</b>Raw reports</span>
        <span><b>{incident.uniqueEvidenceCount}</b>Unique evidence</span>
        <span><b>{incident.independentGroupCount}</b>Independent groups</span>
      </div>
      <div className="registry-impact">
        <span>KEY IMPACTS</span>
        <p>{incident.impacts.join(" · ")}</p>
      </div>
      <div className="registry-action">
        {isFlagship ? (
          <>
            <span>OPEN INVESTIGATION</span>
            <ArrowUpRight size={15} />
          </>
        ) : (
          <span>Flagship detail: Jaipur</span>
        )}
      </div>
    </>
  );

  if (isFlagship) {
    return (
      <Link
        href="/incidents/JPR-FLD-001"
        className="registry-row flagship"
        aria-label="Open Urban Flooding investigation in Jaipur"
      >
        {content}
      </Link>
    );
  }

  return <article className="registry-row">{content}</article>;
}

export function IncidentRegistry() {
  const [filters, setFilters] = useState<RegistryFilters>(initialFilters);
  const update = (key: keyof RegistryFilters, value: string) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const visible = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return incidents.filter((incident) => {
      if (filters.event !== "All" && incident.eventType !== filters.event)
        return false;
      if (
        filters.verification !== "All" &&
        incident.verificationStatus !== filters.verification
      )
        return false;
      if (filters.priority !== "All" && incident.priority !== filters.priority)
        return false;
      if (filters.location !== "All India") {
        const [kind, value] = filters.location.split(":");
        if ((kind === "state" ? incident.state : incident.city) !== value)
          return false;
      }
      if (
        query &&
        ![
          incident.id,
          incident.title,
          incident.eventType,
          incident.city,
          incident.state,
          incident.location,
          ...incident.impacts,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
        return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="incident-registry">
      <header className="page-heading registry-heading">
        <div>
          <div className="eyebrow">INCIDENT OPERATIONS / REGISTRY</div>
          <h1>Incidents</h1>
          <p>
            Monitor reconstructed weather incidents and inspect the evidence behind
            their verification state.
          </p>
        </div>
        <span className="demo-tag">NATIONAL VIEW <span>/</span> SIMULATED DATA</span>
      </header>

      <section className="registry-summary" aria-label="Incident registry summary">
        {summary.map((item) => (
          <div className={item.tone} key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="registry-filter-bar" aria-label="Registry filters">
        <SlidersHorizontal size={15} />
        <label>
          Event
          <select value={filters.event} onChange={(event) => update("event", event.target.value)}>
            <option>All</option>
            {[...new Set(incidents.map((incident) => incident.eventType))].map((event) => (
              <option key={event}>{event}</option>
            ))}
          </select>
        </label>
        <label>
          Location
          <select value={filters.location} onChange={(event) => update("location", event.target.value)}>
            <option>All India</option>
            <optgroup label="State">
              {[...new Set(incidents.map((incident) => incident.state))].map((state) => (
                <option key={state} value={`state:${state}`}>{state}</option>
              ))}
            </optgroup>
            <optgroup label="City">
              {incidents.map((incident) => (
                <option key={incident.id} value={`city:${incident.city}`}>{incident.city}</option>
              ))}
            </optgroup>
          </select>
        </label>
        <label>
          Verification
          <select value={filters.verification} onChange={(event) => update("verification", event.target.value)}>
            <option>All</option>
            {[...new Set(incidents.map((incident) => incident.verificationStatus))].map((status) => (
              <option key={status} value={status}>{statusLabel(status)}</option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select value={filters.priority} onChange={(event) => update("priority", event.target.value)}>
            <option>All</option>
            {(["P1", "P2", "P3"] as OperationalPriority[]).map((priority) => (
              <option key={priority}>{priority}</option>
            ))}
          </select>
        </label>
        <label className="registry-search">
          <Search size={13} />
          <input
            aria-label="Search incidents"
            placeholder="Search incident, city or impact"
            value={filters.search}
            onChange={(event) => update("search", event.target.value)}
          />
        </label>
        <button onClick={() => setFilters(initialFilters)}>
          <RotateCcw size={12} /> Reset
        </button>
        <span>{visible.length} featured incidents</span>
      </section>

      <section className="registry-panel" aria-label="Featured incident registry">
        <header>
          <div>
            <h2>Featured incident registry</h2>
            <p>Prioritized by operational review state and latest evidence activity.</p>
          </div>
          <span>5 OF 14 · DEMO COVERAGE</span>
        </header>
        <div className="registry-columns" aria-hidden="true">
          <span>Incident</span><span>Operational state</span><span>Last update</span>
          <span>Evidence</span><span>Impact</span><span>Availability</span>
        </div>
        <div className="registry-list">
          {visible.map((incident) => (
            <IncidentRegistryRow incident={incident} key={incident.id} />
          ))}
          {visible.length === 0 && (
            <div className="registry-empty">
              <Search size={24} />
              <h2>No matching incidents</h2>
              <p>Adjust the registry filters or search terms.</p>
              <button onClick={() => setFilters(initialFilters)}>Reset filters</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
