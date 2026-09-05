import { SIMULATED_NOW } from "@/data/mock-incidents";
export const statusLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")
    .replace("Imd", "IMD");
export const minutesAgo = (value: string) =>
  Math.round((Date.parse(SIMULATED_NOW) - Date.parse(value)) / 60000);
