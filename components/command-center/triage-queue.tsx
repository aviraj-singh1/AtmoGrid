import { Incident } from "@/types/domain";
import { IncidentCard } from "@/components/incidents/incident-card";
import { EmptyState } from "@/components/shared/status";
export function TriageQueue({
  incidents,
  selected,
  onSelect,
  reset,
}: {
  incidents: Incident[];
  selected: string;
  onSelect: (id: string) => void;
  reset: () => void;
}) {
  return (
    <section className="panel triage-panel">
      <div className="panel-heading">
        <h2>
          <span className="live-dot" />
          Live triage <span className="count-pill">{incidents.length}</span>
        </h2>
        <span>PRIORITY FIRST</span>
      </div>
      <div className="queue-subtitle">
        Incidents that need your attention <span>↓</span>
      </div>
      <div className="queue-list">
        {incidents.length ? (
          incidents.map((x) => (
            <IncidentCard
              key={x.id}
              incident={x}
              selected={selected === x.id}
              onSelect={() => onSelect(x.id)}
            />
          ))
        ) : (
          <EmptyState reset={reset} />
        )}
      </div>
      <div className="panel-footnote">
        Ranked by operational priority, not report volume.
      </div>
    </section>
  );
}
