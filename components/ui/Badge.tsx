// src/components/ui/Badge.tsx
import { cn } from "@/lib/utils";

type BadgeVariant = "green" | "amber" | "red" | "blue" | "gray" | "purple";

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  green: "bg-[#EAF3DE] text-[#3B6D11]",
  amber: "bg-[#FAEEDA] text-[#854F0B]",
  red: "bg-[#FCEBEB] text-[#A32D2D]",
  blue: "bg-[#E6F1FB] text-[#185FA5]",
  gray: "bg-[#F1EFE8] text-[#5F5E5A]",
  purple: "bg-[#F0E6FB] text-[#6B21A8]",
};

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 rounded-xl text-[11px] font-medium",
        VARIANT_STYLES[variant]
      )}
    >
      {children}
    </span>
  );
}

// ----- convenience mappers -----

import type {
  CustomerStatus,
  CustomerTier,
  TicketPriority,
  TicketStatus,
} from "@/types";

const STATUS_VARIANT: Record<CustomerStatus, BadgeVariant> = {
  Active: "green",      
  "At Risk": "amber",
  Churned: "red",
};

export function StatusBadge({ status }: { status: CustomerStatus }) {
  return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>;
}

const TIER_VARIANT: Record<CustomerTier, BadgeVariant> = {
  Enterprise: "blue",
  Professional: "purple", 
  Growth: "green",
  Starter: "gray",
};

export function TierBadge({ tier }: { tier: CustomerTier }) {
  return <Badge variant={TIER_VARIANT[tier]}>{tier}</Badge>;
}

// const CHURN_VARIANT: Record<ChurnRisk, BadgeVariant> = {
//   Low: "green",
//   Medium: "amber",
//   High: "red",
//   Lost: "gray",
// };

// export function ChurnBadge({ risk }: { risk: ChurnRisk }) {
//   return <Badge variant={CHURN_VARIANT[risk]}>{risk}</Badge>;
// }

const PRIO_VARIANT: Record<TicketPriority, BadgeVariant> = {
  Critical: "red",
  High: "amber",
  Medium: "blue",
  Low: "gray",
};

export function PrioBadge({ priority }: { priority: TicketPriority }) {
  return <Badge variant={PRIO_VARIANT[priority]}>{priority}</Badge>;
}

const TICKET_STATUS_VARIANT: Record<TicketStatus, BadgeVariant> = {
  Open: "amber",
  "In Progress": "blue",
  Resolved: "green",
  "Waiting on Customer": "purple",   
  "Escalated": "red",
};

export function TicketStatusBadge({ status }: { status: TicketStatus }) {
  return <Badge variant={TICKET_STATUS_VARIANT[status]}>{status}</Badge>;
}