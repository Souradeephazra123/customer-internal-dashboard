
import { UsageRecord } from "@/types";

export const USAGE: UsageRecord[] = [
  { custId: 1, month: "2025-02", inspections: 1820, dmgRate: 8.2, activeDrivers: 142, apiCalls: 44200 },
  { custId: 1, month: "2025-03", inspections: 1950, dmgRate: 7.9, activeDrivers: 145, apiCalls: 47100 },
  { custId: 1, month: "2025-04", inspections: 2100, dmgRate: 7.5, activeDrivers: 149, apiCalls: 51300 },
  { custId: 2, month: "2025-02", inspections: 640, dmgRate: 14.1, activeDrivers: 58, apiCalls: 12800 },
  { custId: 2, month: "2025-03", inspections: 590, dmgRate: 15.8, activeDrivers: 51, apiCalls: 11200 },
  { custId: 2, month: "2025-04", inspections: 510, dmgRate: 17.2, activeDrivers: 44, apiCalls: 9600 },
  { custId: 3, month: "2025-02", inspections: 2340, dmgRate: 6.1, activeDrivers: 178, apiCalls: 62100 },
  { custId: 3, month: "2025-03", inspections: 2410, dmgRate: 5.9, activeDrivers: 182, apiCalls: 64300 },
  { custId: 3, month: "2025-04", inspections: 2580, dmgRate: 5.7, activeDrivers: 190, apiCalls: 68900 },
  { custId: 6, month: "2025-02", inspections: 2800, dmgRate: 5.4, activeDrivers: 210, apiCalls: 78400 },
  { custId: 6, month: "2025-03", inspections: 2950, dmgRate: 5.2, activeDrivers: 218, apiCalls: 81200 },
  { custId: 6, month: "2025-04", inspections: 3100, dmgRate: 4.9, activeDrivers: 224, apiCalls: 85600 },
  { custId: 10, month: "2025-02", inspections: 1650, dmgRate: 9.0, activeDrivers: 128, apiCalls: 38700 },
  { custId: 10, month: "2025-03", inspections: 1720, dmgRate: 8.7, activeDrivers: 132, apiCalls: 40100 },
  { custId: 10, month: "2025-04", inspections: 1800, dmgRate: 8.4, activeDrivers: 138, apiCalls: 42500 },
  { custId: 12, month: "2025-02", inspections: 2200, dmgRate: 6.8, activeDrivers: 165, apiCalls: 57800 },
  { custId: 12, month: "2025-03", inspections: 2350, dmgRate: 6.5, activeDrivers: 170, apiCalls: 60200 },
  { custId: 12, month: "2025-04", inspections: 2480, dmgRate: 6.2, activeDrivers: 176, apiCalls: 63400 },
  { custId: 20, month: "2025-02", inspections: 3100, dmgRate: 4.8, activeDrivers: 235, apiCalls: 91200 },
  { custId: 20, month: "2025-03", inspections: 3250, dmgRate: 4.5, activeDrivers: 241, apiCalls: 94800 },
  { custId: 20, month: "2025-04", inspections: 3400, dmgRate: 4.3, activeDrivers: 248, apiCalls: 98500 },
  { custId: 7, month: "2025-02", inspections: 780, dmgRate: 13.5, activeDrivers: 68, apiCalls: 17200 },
  { custId: 7, month: "2025-03", inspections: 720, dmgRate: 14.8, activeDrivers: 62, apiCalls: 15400 },
  { custId: 7, month: "2025-04", inspections: 660, dmgRate: 16.1, activeDrivers: 56, apiCalls: 13800 },
  { custId: 15, month: "2025-02", inspections: 860, dmgRate: 12.4, activeDrivers: 74, apiCalls: 19800 },
  { custId: 15, month: "2025-03", inspections: 790, dmgRate: 13.9, activeDrivers: 67, apiCalls: 17600 },
  { custId: 15, month: "2025-04", inspections: 710, dmgRate: 15.3, activeDrivers: 60, apiCalls: 15200 },
];

export function getUsageByCustomer(custId: number): UsageRecord[] {
  return USAGE.filter((u) => u.custId === custId).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
}

export function getLatestMonthUsage(month = "2025-04"): UsageRecord[] {
  return USAGE.filter((u) => u.month === month);
}

export function getDistinctUsageCustomerIds(): number[] {
  return [...new Set(USAGE.map((u) => u.custId))];
}