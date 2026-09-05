import { Incident } from "@/types/domain";
import type { Filters } from "@/components/command-center/filter-bar";
import { SIMULATED_NOW } from "@/data/mock-incidents";
export function filterIncidents(items: Incident[], filters: Filters) {
  return items
    .filter((x) => {
      if (filters.event !== "All" && x.eventType !== filters.event)
        return false;
      if (
        filters.verification !== "All" &&
        x.verificationStatus !== filters.verification
      )
        return false;
      if (filters.location !== "All India") {
        const [kind, value] = filters.location.split(":");
        if ((kind === "state" ? x.state : x.city) !== value) return false;
      }
      const age = Date.parse(SIMULATED_NOW) - Date.parse(x.lastUpdated);
      if (filters.time === "Last 15 min" && age > 900000) return false;
      if (filters.time === "Last hour" && age > 3600000) return false;
      if (
        filters.time === "Today" &&
        x.lastUpdated.slice(0, 10) !== SIMULATED_NOW.slice(0, 10)
      )
        return false;
      if (filters.time === "Custom") {
        const date = x.lastUpdated.slice(0, 10);
        if (
          !filters.start ||
          !filters.end ||
          date < filters.start ||
          date > filters.end
        )
          return false;
      }
      return true;
    })
    .sort((a, b) => a.priority.localeCompare(b.priority));
}
