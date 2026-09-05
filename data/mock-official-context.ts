import { OfficialContextItem } from "@/types/domain";

export const officialContext: OfficialContextItem[] = [
  {
    id: "CTX-01",
    title: "Nearby rainfall observation",
    provider: "Ground observation sample",
    relationship: "SUPPORTS",
    measurement: "Heavy rainfall observed",
    distance: "4.8 km",
    timeDifference: "+6 min",
    label: "SIMULATED EVIDENCE",
  },
  {
    id: "CTX-02",
    title: "Radar / precipitation context",
    provider: "Historical radar sample",
    relationship: "CONSISTENT",
    measurement: "Strong precipitation signature near Jaipur",
    label: "HISTORICAL SAMPLE",
  },
  {
    id: "CTX-03",
    title: "IMD warning / nowcast context",
    provider: "Official-context demo record",
    relationship: "CONSISTENT",
    measurement: "Heavy rainfall / thunderstorm conditions expected",
    label: "DEMO CONTEXT",
  },
  {
    id: "CTX-04",
    title: "Satellite",
    provider: "Observation availability check",
    relationship: "UNAVAILABLE",
    measurement: "No suitable demo observation for event window",
    label: "DEMO CONTEXT",
  },
];
