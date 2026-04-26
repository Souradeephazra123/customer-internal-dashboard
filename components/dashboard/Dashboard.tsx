"use client";

import { useState } from "react";
import { Header } from "./header";
import { TabNav } from "./Tabnav";
import { CustomerOverview } from "@/components/tabs/CustomerOverview";
import { UsageMetrics } from "@/components/tabs/UsageMetrics";
import { SupportComms } from "@/components/tabs/SupportComms";
import { FleetDistribution } from "@/components/tabs/FleetDistribution";
import type { TabId } from "@/types";

const TAB_COMPONENTS: Record<TabId, React.FC> = {
  overview: CustomerOverview,
  usage: UsageMetrics,
  support: SupportComms,
  fleet: FleetDistribution,
};

export function DashboardShell() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const ActivePanel = TAB_COMPONENTS[activeTab];

  return (
    <div className="w-full mx-auto">
      <Header />
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="p-5">
        <ActivePanel />
      </div>
    </div>
  );
}