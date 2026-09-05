"use client";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { incidents } from "@/data/mock-incidents";
import { statusLabel } from "@/lib/format";
export interface Filters {
  time: string;
  event: string;
  location: string;
  verification: string;
  start: string;
  end: string;
}
export const initialFilters: Filters = {
  time: "Today",
  event: "All",
  location: "All India",
  verification: "All",
  start: "2026-09-05",
  end: "2026-09-05",
};
export function FilterBar({
  filters,
  onChange,
  reset,
  count,
}: {
  filters: Filters;
  onChange: (value: Filters) => void;
  reset: () => void;
  count: number;
}) {
  const update = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value });
  return (
    <section className="filter-bar" aria-label="Incident filters">
      <SlidersHorizontal size={16} />
      <label>
        Time
        <select
          value={filters.time}
          onChange={(e) => update("time", e.target.value)}
        >
          {["Last 15 min", "Last hour", "Today", "Custom"].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      {filters.time === "Custom" && (
        <div className="date-range">
          <input
            aria-label="Start date"
            type="date"
            value={filters.start}
            onChange={(e) => update("start", e.target.value)}
          />
          <span>to</span>
          <input
            aria-label="End date"
            type="date"
            min={filters.start}
            value={filters.end}
            onChange={(e) => update("end", e.target.value)}
          />
        </div>
      )}
      <label>
        Event
        <select
          value={filters.event}
          onChange={(e) => update("event", e.target.value)}
        >
          {[
            "All",
            "Flooding",
            "Rainfall",
            "Thunderstorm",
            "Fog",
            "Strong Wind",
            "Heatwave",
            "Dust Storm",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      <label>
        Location
        <select
          value={filters.location}
          onChange={(e) => update("location", e.target.value)}
        >
          <option>All India</option>
          <optgroup label="State">
            {[...new Set(incidents.map((x) => x.state))].map((x) => (
              <option key={x} value={`state:${x}`}>
                {x}
              </option>
            ))}
          </optgroup>
          <optgroup label="City">
            {incidents.map((x) => (
              <option key={x.id} value={`city:${x.city}`}>
                {x.city}
              </option>
            ))}
          </optgroup>
        </select>
      </label>
      <label>
        Verification
        <select
          value={filters.verification}
          onChange={(e) => update("verification", e.target.value)}
        >
          <option>All</option>
          {[
            "UNVERIFIED",
            "EMERGING",
            "CORROBORATING",
            "HIGHLY_CORROBORATED",
            "DISPUTED",
            "LIKELY_MISLEADING",
            "INCONCLUSIVE",
            "IMD_VERIFIED",
            "RESOLVED",
          ].map((x) => (
            <option key={x} value={x}>
              {statusLabel(x)}
            </option>
          ))}
        </select>
      </label>
      <button className="reset-button" onClick={reset} title="Reset filters">
        <RotateCcw size={14} />
        Reset
      </button>
      <span className="filter-count">{count} featured incidents</span>
    </section>
  );
}
