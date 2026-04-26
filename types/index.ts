
export type CustomerStatus = "Active" | "At Risk" | "Churned";
export type CustomerTier = "Enterprise" |  "Professional" | "Growth" | "Starter";
export type CSMName =
  | "James Okafor"
  | "Priya Nair"
  | "Aisha Patel"
  | "Tom Bennett"
  | "Sofia Reyes";

export interface Customer {
  customerId: string;        
  companyName: string;       
  city: string;
  state: string;
  latitude: number;          
  longitude: number;
  status: CustomerStatus;
  tier: CustomerTier;
  contractStart: string;     
  mrr: number;               
  csm: CSMName;
  primaryContact: string;    
  email: string;             
}

export interface UsageRecord {
  customerId: string;          
  companyName: string;        
  month: string;              
  inspections: number;
  damageDetected: number;      
  damageRate: number;          
  activeDrivers: number;
  apiCalls: number;
  logins: number;              
  reportsExported: number;    
}

export type TicketPriority = "Critical" | "High" | "Medium" | "Low";
export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Escalated" | "Waiting on Customer";
export type TicketChannel = "Slack Connect" | "Phone" | "In-App" | "Email" | "Intercom";

export interface Ticket {
  ticketId: string;                  
  customerId: string;                
  companyName: string;               
  subject: string;
  channel: TicketChannel;
  priority: TicketPriority;
  status: TicketStatus;
  createdDate: string;               
  lastUpdated: string;               
  assignedCsm: CSMName;              
  resolutionDays?: number | null | undefined;     
  csatScore?: number | undefined;          
}


export type TelematicsProvider = "Samsara" | "Verizon Connect" | "Geotab";
export type FMSPlatform = "Onfleet" | "RouteMaster" | "Tookan" | "DispatchTrack";

export interface FleetRecord {
  customerId: string;                  
  companyName: string;                 
  totalVehicles: number;               
  cargoVan: number;                    
  sprinterVan: number;                 
  boxTruck: number;                    
  pickupTruck: number;                 
  electricVan: number;                 
  avgVehicleAge: number;               
  telematicsProvider: string;          
  fmsPlatform: string;                 
  primaryUseCase: string;              
}

export type TabId = "overview" | "usage" | "support" | "fleet";

export interface TabDefinition {
  id: TabId;
  label: string;
}