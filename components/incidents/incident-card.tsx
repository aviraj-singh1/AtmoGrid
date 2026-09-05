import Link from "next/link";
import {
  ArrowUpRight,
  CloudFog,
  CloudLightning,
  CloudRain,
  MapPin,
  TrendingUp,
  Waves,
  Wind,
} from "lucide-react";
import { Incident } from "@/types/domain";
import { minutesAgo } from "@/lib/format";
import { PriorityBadge, VerificationBadge } from "@/components/shared/status";
const icons = {
  Flooding: Waves,
  Rainfall: CloudRain,
  Thunderstorm: CloudLightning,
  Fog: CloudFog,
  "Strong Wind": Wind,
  Heatwave: CloudRain,
  "Dust Storm": Wind,
};
export function IncidentCard({
  incident,
  selected,
  onSelect,
}: {
  incident: Incident;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = icons[incident.eventType];
  return (
    <article
      className={`incident-card ${selected ? "is-selected" : ""}`}
      onMouseEnter={onSelect}
      onFocus={onSelect}
    >
      <div className="incident-top">
        <div className={`event-icon ${incident.priority.toLowerCase()}`}>
          <Icon size={19} />
        </div>
        <div className="incident-title">
          <Link href={`/incidents/${incident.id}`}>
            {incident.title}
            <ArrowUpRight size={14} />
          </Link>
          <p>
            <MapPin size={11} />
            {incident.location}
          </p>
        </div>
        <span className="time-ago">
          {minutesAgo(incident.lastUpdated)}m ago
        </span>
      </div>
      <div className="incident-badges">
        <PriorityBadge priority={incident.priority} />
        <VerificationBadge status={incident.verificationStatus} />
      </div>
      <div className="evidence-counts">
        <span>
          <b>{incident.rawReportCount}</b> raw
        </span>
        <span>
          <b>{incident.uniqueEvidenceCount}</b> unique
        </span>
        <span className="independent">
          <b>{incident.independentGroupCount}</b> independent groups
        </span>
        <span>
          <b>{incident.sourceFamilyCount}</b> families
        </span>
      </div>
      {selected && (
        <div className="incident-impact">
          <span>{incident.impacts.join(" · ")}</span>
          <small>
            <TrendingUp size={12} />
            {incident.trend}
          </small>
        </div>
      )}
      <button
        className="map-select"
        aria-label={`Locate ${incident.city} on map`}
        onClick={onSelect}
      >
        Locate on map
      </button>
    </article>
  );
}
