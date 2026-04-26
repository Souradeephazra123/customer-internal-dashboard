
import { TabDefinition } from "@/types";

export const TABS: TabDefinition[] = [
  { id: "overview", label: "Customer Overview" },
  { id: "usage", label: "Usage Metrics" },
  { id: "support", label: "Support & Comms" },
  { id: "fleet", label: "Fleet Distribution" },
];

export const CSM_LIST = [
  "Priya Nair",
  "Marcus Lee",
  "Sara Kim",
  "Tom Okafor",
] as const;

export const STATE_COORDS: Record<string, [number, number]> = {
  CA: [36.7, -119.4], TX: [31.2, -99.3], NY: [42.9, -75.5],
  WA: [47.4, -120.5], CO: [39.0, -105.5], IL: [40.0, -89.2],
  AZ: [34.3, -111.6], MN: [46.4, -94.3], FL: [27.8, -81.6],
  GA: [32.9, -83.4], LA: [31.2, -92.0], OH: [40.4, -82.8],
  NC: [35.6, -79.0], OR: [44.6, -120.5], UT: [39.5, -111.5],
  KS: [38.5, -98.4], PA: [40.9, -77.8], TN: [35.7, -86.7],
  MI: [44.3, -85.4], NM: [34.8, -106.2], VA: [37.8, -78.2],
  SC: [33.8, -81.2], NV: [38.8, -116.4], MO: [38.5, -92.5],
  ID: [44.4, -114.6], MS: [32.7, -89.7], MA: [42.4, -71.9],
  OK: [35.5, -97.5],
};