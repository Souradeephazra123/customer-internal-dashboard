
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function fmtNumber(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function fmtMrr(n: number): string {
  return `
${n.toLocaleString()}`;
}

export function fmtMonthLabel(month: string): string {
  // "2025-04" → "04/25"
  return `${month.slice(5)}/${month.slice(2, 4)}`;
}


const MONTH_MAP: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04",
  May: "05", Jun: "06", Jul: "07", Aug: "08",
  Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

export function parseMonthToSortable(month: string): string {
  // "Jan-25" → "2025-01"
  const [abbr, yr] = month.split("-");
  return `20${yr}-${MONTH_MAP[abbr] ?? "01"}`;
}

export function sortByMonth(a: string, b: string): number {
  return parseMonthToSortable(a).localeCompare(parseMonthToSortable(b));
}