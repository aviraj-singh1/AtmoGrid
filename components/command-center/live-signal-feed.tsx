import { Radio } from "lucide-react";
import { signals } from "@/data/mock-signals";
import { SourceBadge } from "@/components/shared/status";
export function LiveSignalFeed() {
  return (
    <section className="panel signal-panel">
      <div className="panel-heading">
        <h2>
          <Radio size={16} />
          Live signal stream <span className="count-pill">05</span>
        </h2>
        <span>
          <i className="live-dot" />
          SIMULATED FEED
        </span>
      </div>
      <div className="signal-table-wrap">
        <table className="signal-table">
          <thead>
            <tr>
              <th>TIME / IST</th>
              <th>SOURCE FAMILY</th>
              <th>LOCATION</th>
              <th>EVENT / CONTENT</th>
              <th>TRIAGE RESULT</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((x) => (
              <tr key={x.id}>
                <td className="mono">{x.observedAt}</td>
                <td>
                  <SourceBadge source={x.sourceFamily} />
                </td>
                <td>{x.location}</td>
                <td>{x.event}</td>
                <td>
                  <span
                    className={`signal-result ${x.disposition.includes("Duplicate") ? "muted" : x.disposition.includes("Recycled") ? "amber" : "cyan"}`}
                  >
                    <i />
                    {x.disposition}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="panel-footnote">
        Provenance preserved. Reposts do not count as independent sources.
      </div>
    </section>
  );
}
