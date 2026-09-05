import { AdminAuditEntry, AdminProcessingPolicy, AdminSourceSetting, SystemHealthItem } from "@/types/domain";

export const adminSources: AdminSourceSetting[] = [
  { id: "citizen", name: "Citizen Gateway", sourceFamily: "Citizen Reports", enabled: true },
  { id: "news", name: "News / RSS", sourceFamily: "News / Web", enabled: true },
  { id: "social", name: "Social Replay", sourceFamily: "Social / #IMD", enabled: true },
  { id: "physical", name: "Physical Observation", sourceFamily: "Weather Observation", enabled: true },
  { id: "official", name: "Official Context", sourceFamily: "Official Context", enabled: true },
  { id: "satellite", name: "Satellite Demo", sourceFamily: "Remote Context", enabled: false },
];

export const adminProcessingPolicies: AdminProcessingPolicy[] = [
  { id: "semantic", group: "Duplicate Detection", name: "Text semantic similarity", enabled: true },
  { id: "image", group: "Duplicate Detection", name: "Image near-duplicate detection", enabled: true },
  { id: "lineage", group: "Duplicate Detection", name: "Media lineage", enabled: true },
  { id: "historical", group: "Duplicate Detection", name: "Historical media lookup", enabled: true },
  { id: "geotime", group: "Event Formation", name: "Geo-Time clustering", enabled: true },
  { id: "independence", group: "Event Formation", name: "Source independence", enabled: true },
  { id: "physical-context", group: "Verification", name: "Physical corroboration", enabled: true },
  { id: "official-context", group: "Verification", name: "Official context", enabled: true },
  { id: "contradiction", group: "Verification", name: "Contradiction handling", enabled: true },
  { id: "human", group: "Verification", name: "Human verification required", enabled: true, locked: true },
];

export const weatherTaxonomy = ["Rainfall", "Heavy Rainfall", "Thunderstorm", "Lightning", "Flooding", "Urban Flooding", "River Flooding", "Heatwave", "Fog", "Dust Storm", "Strong Wind"];
export const impactTaxonomy = ["Road Waterlogging", "Vehicle Stranded", "Traffic Disruption", "Road Blockage", "People Stranded", "House Flooding", "Tree Fall", "Power Outage", "Infrastructure Damage", "Low Visibility"];

export const systemHealth: SystemHealthItem[] = [
  { id: "ingestion", name: "Ingestion", status: "NOMINAL", detail: "Demo connectors responsive" },
  { id: "processing", name: "Processing", status: "NOMINAL", detail: "Local state pipeline" },
  { id: "storage", name: "Storage", status: "LOCAL", detail: "No persistent database" },
  { id: "maps", name: "Map services", status: "NOMINAL", detail: "Bundled geographic context" },
  { id: "replay", name: "Replay Engine", status: "NOMINAL", detail: "Jaipur scenario ready" },
  { id: "queue", name: "Evidence Queue", status: "DEMO", detail: "12 representative records" },
];

export const initialAdminAudit: AdminAuditEntry[] = [
  { id: "ADM-01", time: "06:31:18", action: "Social Replay Connector enabled", detail: "Connector available for captured demo stream", actor: "Operator OP" },
  { id: "ADM-02", time: "06:34:02", action: "Duplicate sensitivity changed", detail: "Balanced → Sensitive", actor: "Operator OP" },
  { id: "ADM-03", time: "06:35:12", action: "Duplicate sensitivity restored", detail: "Sensitive → Balanced", actor: "Operator OP" },
  { id: "ADM-04", time: "06:36:20", action: "Verification policy checked", detail: "Human verification remains locked and always on", actor: "System" },
];
