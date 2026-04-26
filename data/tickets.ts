import { Ticket } from "@/types";

export const TICKETS: Ticket[] = [
  { id: "T-001", custId: 1, subject: "API timeout during peak hours", priority: "High", status: "Open", channel: "Slack", csat: null, age: 3, csm: "Priya Nair" },
  { id: "T-002", custId: 2, subject: "Image upload failing on Android", priority: "Critical", status: "Open", channel: "Email", csat: null, age: 7, csm: "Marcus Lee" },
  { id: "T-003", custId: 3, subject: "Report export to PDF blank", priority: "Medium", status: "Resolved", channel: "Portal", csat: 4, age: 2, csm: "Priya Nair" },
  { id: "T-004", custId: 6, subject: "Dashboard loading slow", priority: "Low", status: "Resolved", channel: "Email", csat: 5, age: 1, csm: "Sara Kim" },
  { id: "T-005", custId: 7, subject: "Driver onboarding stuck", priority: "High", status: "Open", channel: "Slack", csat: null, age: 11, csm: "Tom Okafor" },
  { id: "T-006", custId: 10, subject: "Inspection count mismatch", priority: "Medium", status: "In Progress", channel: "Portal", csat: null, age: 5, csm: "Marcus Lee" },
  { id: "T-007", custId: 12, subject: "SSO login loop", priority: "Critical", status: "Resolved", channel: "Phone", csat: 5, age: 1, csm: "Priya Nair" },
  { id: "T-008", custId: 15, subject: "Missing damage annotations", priority: "High", status: "Open", channel: "Email", csat: null, age: 9, csm: "Sara Kim" },
  { id: "T-009", custId: 17, subject: "Billing invoice discrepancy", priority: "Medium", status: "Resolved", channel: "Email", csat: 4, age: 3, csm: "Priya Nair" },
  { id: "T-010", custId: 20, subject: "Webhook not firing on complete", priority: "High", status: "In Progress", channel: "Slack", csat: null, age: 4, csm: "Tom Okafor" },
  { id: "T-011", custId: 4, subject: "Mobile app crashes on iOS 18", priority: "Critical", status: "Open", channel: "Portal", csat: null, age: 6, csm: "Tom Okafor" },
  { id: "T-012", custId: 9, subject: "CSAT survey not sending", priority: "Low", status: "Resolved", channel: "Email", csat: 5, age: 1, csm: "Sara Kim" },
  { id: "T-013", custId: 11, subject: "Cannot add new vehicle", priority: "Medium", status: "Open", channel: "Email", csat: null, age: 8, csm: "Sara Kim" },
  { id: "T-014", custId: 23, subject: "API rate limit too low", priority: "Medium", status: "Resolved", channel: "Slack", csat: 4, age: 2, csm: "Sara Kim" },
  { id: "T-015", custId: 26, subject: "Driver app GPS inaccurate", priority: "High", status: "Open", channel: "Phone", csat: null, age: 13, csm: "Marcus Lee" },
  { id: "T-016", custId: 29, subject: "Custom report template lost", priority: "Medium", status: "In Progress", channel: "Portal", csat: null, age: 5, csm: "Priya Nair" },
  { id: "T-017", custId: 30, subject: "Login MFA not working", priority: "Critical", status: "Open", channel: "Email", csat: null, age: 10, csm: "Marcus Lee" },
  { id: "T-018", custId: 13, subject: "Map view not loading", priority: "Low", status: "Resolved", channel: "Email", csat: 3, age: 4, csm: "Tom Okafor" },
  { id: "T-019", custId: 18, subject: "Duplicate inspection records", priority: "Medium", status: "In Progress", channel: "Slack", csat: null, age: 6, csm: "Marcus Lee" },
  { id: "T-020", custId: 25, subject: "Notifications delayed by hours", priority: "High", status: "Open", channel: "Portal", csat: null, age: 4, csm: "Priya Nair" },
];

const PRIORITY_ORDER: Record<string, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

export function sortTicketsByPriority(tickets: Ticket[]): Ticket[] {
  return [...tickets].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  );
}