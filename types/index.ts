
export type CustomerStatus = "Healthy" | "At Risk" | "Churned";
export type CustomerTier = "Enterprise" | "Growth" | "Starter";
export type ChurnRisk = "Low" | "Medium" | "High" | "Lost";
export type CSMName = "Priya Nair" | "Marcus Lee" | "Sara Kim" | "Tom Okafor"; // due to the small dataset, we have only 4 CSMs, but this can be easily expanded in the future as defined string

export interface Customer {
  id: number;
  name: string;
  csm: CSMName;
  tier: CustomerTier;
  mrr: number;
  status: CustomerStatus;
  state: string;
  city: string;
  nps: number;
  churnRisk: ChurnRisk;
  since: string;
}

export interface UsageRecord {
  custId: number;
  month: string;
  inspections: number;
  dmgRate: number;
  activeDrivers: number;
  apiCalls: number;
}

export type TicketPriority = "Critical" | "High" | "Medium" | "Low";
export type TicketStatus = "Open" | "In Progress" | "Resolved";
export type TicketChannel = "Slack" | "Email" | "Portal" | "Phone";

export interface Ticket {
  id: string;
  custId: number;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  channel: TicketChannel;
  csat: number | null;
  age: number;
  csm: CSMName;
}

export type TelematicsProvider = "Samsara" | "Verizon Connect" | "Geotab";
export type FMSPlatform = "Onfleet" | "RouteMaster" | "Tookan" | "DispatchTrack";

export interface FleetRecord {
  custId: number;
  vans: number;
  trucks: number;
  evs: number;
  telematics: TelematicsProvider;
  fms: FMSPlatform;
  avgAge: number;
}

export type TabId = "overview" | "usage" | "support" | "fleet";

export interface TabDefinition {
  id: TabId;
  label: string;
}