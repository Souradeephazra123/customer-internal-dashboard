
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