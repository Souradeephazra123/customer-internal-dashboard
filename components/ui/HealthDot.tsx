import { cn } from "@/lib/utils";
import type { CustomerStatus } from "@/types";

const DOT_COLOR: Record<CustomerStatus, string> = {
  Healthy: "bg-[#639922]",
  "At Risk": "bg-[#BA7517]",
  Churned: "bg-[#E24B4A]",
};

export function HealthDot({ status }: { status: CustomerStatus }) {
  return (
    <span
      className={cn("inline-block w-2 h-2 rounded-full mr-1.5", DOT_COLOR[status])}
    />
  );
}