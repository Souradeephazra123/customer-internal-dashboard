"use client";

import { useState } from "react";
import {
  USAGE,
  getLatestMonthUsage,
  getUsageByCustomer,
  getDistinctUsageCustomerIds,
} from "@/data/usage";
import { getCustomerName } from "@/data/customer";
import { MetricCard } from "@/components/ui/MetricCard";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { LineChart } from "@/components/ui/LineChart";
import { fmtNumber, fmtMonthLabel } from "@/lib/utils";

export function UsageMetrics() {
  const customerIds = getDistinctUsageCustomerIds();
  const [selectedCustId, setSelectedCustId] = useState(customerIds[0]);

  // Aggregate KPIs for latest month
  const latestUsage = getLatestMonthUsage("2025-04");
  const totalInsp = latestUsage.reduce((a, u) => a + u.inspections, 0);
  const avgDmg = (
    latestUsage.reduce((a, u) => a + u.dmgRate, 0) / latestUsage.length
  ).toFixed(1);
  const totalDrivers = latestUsage.reduce((a, u) => a + u.activeDrivers, 0);
  const totalApi = latestUsage.reduce((a, u) => a + u.apiCalls, 0);

  // Per-customer trend data
  const custData = getUsageByCustomer(selectedCustId);
  const labels = custData.map((u) => fmtMonthLabel(u.month));

  return (
    <>
      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        <MetricCard
          label="Inspections (Apr)"
          value={totalInsp.toLocaleString()}
          sub="across tracked customers"
        />
        <MetricCard
          label="Avg damage rate"
          value={`${avgDmg}%`}
          sub="Apr 2025"
        />
        <MetricCard
          label="Active drivers"
          value={totalDrivers.toLocaleString()}
          sub="Apr 2025"
        />
        <MetricCard
          label="API calls (Apr)"
          value={fmtNumber(totalApi)}
          sub="across tracked accounts"
        />
      </div>

      {/* Customer selector */}
      <FilterBar>
        <label className="text-xs text-gray-500">Customer:</label>
        <FilterSelect
          value={selectedCustId}
          onChange={(e) => setSelectedCustId(Number(e.target.value))}
        >
          {customerIds.map((id) => (
            <option key={id} value={id}>
              {getCustomerName(id)}
            </option>
          ))}
        </FilterSelect>
      </FilterBar>

      {/* Charts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-3">
            Monthly inspections
          </h3>
          <LineChart
            labels={labels}
            data={custData.map((u) => u.inspections)}
            color="#1D9E75"
            label="Inspections"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-3">
            Damage rate (%)
          </h3>
          <LineChart
            labels={labels}
            data={custData.map((u) => u.dmgRate)}
            color="#E24B4A"
            label="Dmg %"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-3">
            Active drivers
          </h3>
          <LineChart
            labels={labels}
            data={custData.map((u) => u.activeDrivers)}
            color="#378ADD"
            label="Drivers"
          />
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-3">
            API calls
          </h3>
          <LineChart
            labels={labels}
            data={custData.map((u) => u.apiCalls)}
            color="#BA7517"
            label="API calls"
          />
        </div>
      </div>
    </>
  );
}
