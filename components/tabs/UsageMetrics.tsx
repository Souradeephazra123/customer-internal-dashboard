// "use client";

// import { useState } from "react";
// import {
//   USAGE,
//   getLatestMonthUsage,
//   getUsageByCustomer,
//   getDistinctUsageCustomerIds,
// } from "@/data/usage";
// import { getCustomerName } from "@/data/customer";
// import { MetricCard } from "@/components/ui/MetricCard";
// import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
// import { LineChart } from "@/components/ui/LineChart";
// import { fmtNumber, fmtMonthLabel } from "@/lib/utils";

// export function UsageMetrics() {
//   const customerIds = getDistinctUsageCustomerIds();
//   const [selectedCustId, setSelectedCustId] = useState(customerIds[0]);

//   // Aggregate KPIs for latest month
//   const latestUsage = getLatestMonthUsage("2025-04");
//   const totalInsp = latestUsage.reduce((a, u) => a + u.inspections, 0);
//   const avgDmg = (
//     latestUsage.reduce((a, u) => a + u.dmgRate, 0) / latestUsage.length
//   ).toFixed(1);
//   const totalDrivers = latestUsage.reduce((a, u) => a + u.activeDrivers, 0);
//   const totalApi = latestUsage.reduce((a, u) => a + u.apiCalls, 0);

//   // Per-customer trend data
//   const custData = getUsageByCustomer(selectedCustId);
//   const labels = custData.map((u) => fmtMonthLabel(u.month));

//   return (
//     <>
//       {/* KPI row */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
//         <MetricCard
//           label="Inspections (Apr)"
//           value={totalInsp.toLocaleString()}
//           sub="across tracked customers"
//         />
//         <MetricCard
//           label="Avg damage rate"
//           value={`${avgDmg}%`}
//           sub="Apr 2025"
//         />
//         <MetricCard
//           label="Active drivers"
//           value={totalDrivers.toLocaleString()}
//           sub="Apr 2025"
//         />
//         <MetricCard
//           label="API calls (Apr)"
//           value={fmtNumber(totalApi)}
//           sub="across tracked accounts"
//         />
//       </div>

//       {/* Customer selector */}
//       <FilterBar>
//         <label className="text-xs text-gray-500">Customer:</label>
//         <FilterSelect
//           value={selectedCustId}
//           onChange={(e) => setSelectedCustId(Number(e.target.value))}
//         >
//           {customerIds.map((id) => (
//             <option key={id} value={id}>
//               {getCustomerName(id)}
//             </option>
//           ))}
//         </FilterSelect>
//       </FilterBar>

//       {/* Charts grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-white border border-gray-200 rounded-lg p-3.5">
//           <h3 className="text-[13px] font-medium text-gray-900 mb-3">
//             Monthly inspections
//           </h3>
//           <LineChart
//             labels={labels}
//             data={custData.map((u) => u.inspections)}
//             color="#1D9E75"
//             label="Inspections"
//           />
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-3.5">
//           <h3 className="text-[13px] font-medium text-gray-900 mb-3">
//             Damage rate (%)
//           </h3>
//           <LineChart
//             labels={labels}
//             data={custData.map((u) => u.dmgRate)}
//             color="#E24B4A"
//             label="Dmg %"
//           />
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-3.5">
//           <h3 className="text-[13px] font-medium text-gray-900 mb-3">
//             Active drivers
//           </h3>
//           <LineChart
//             labels={labels}
//             data={custData.map((u) => u.activeDrivers)}
//             color="#378ADD"
//             label="Drivers"
//           />
//         </div>

//         <div className="bg-white border border-gray-200 rounded-lg p-3.5">
//           <h3 className="text-[13px] font-medium text-gray-900 mb-3">
//             API calls
//           </h3>
//           <LineChart
//             labels={labels}
//             data={custData.map((u) => u.apiCalls)}
//             color="#BA7517"
//             label="API calls"
//           />
//         </div>
//       </div>
//     </>
//   );
// }



// src/components/tabs/UsageMetrics.tsx
"use client";

import { useState, useMemo } from "react";
import {
  USAGE,
  getLatestMonthUsage,
  getLatestMonth,
  getUsageByCustomer,
  getDistinctUsageCustomerIds,
} from "@/data/usage";
import { getCustomerName } from "@/data/customer";
import { MetricCard } from "@/components/ui/MetricCard";
import { FilterBar, FilterSelect } from "@/components/ui/FilterBar";
import { LineChart } from "@/components/ui/LineChart";
import { fmtNumber } from "@/lib/utils";

export function UsageMetrics() {
  const customerIds = useMemo(() => getDistinctUsageCustomerIds(), []);
  const [selectedCustId, setSelectedCustId] = useState(customerIds[0] ?? "");

  // ---- Aggregate KPIs for latest month ----
  const latestMonth = useMemo(() => getLatestMonth(), []);
  const latestUsage = useMemo(() => getLatestMonthUsage(), []);

  const totalInsp = latestUsage.reduce((a, u) => a + u.inspections, 0);
  const totalDmgDetected = latestUsage.reduce((a, u) => a + u.damageDetected, 0);
  const avgDmgRate =
    latestUsage.length > 0
      ? (latestUsage.reduce((a, u) => a + u.damageRate, 0) / latestUsage.length).toFixed(1)
      : "0";
  const totalDrivers = latestUsage.reduce((a, u) => a + u.activeDrivers, 0);
  const totalApi = latestUsage.reduce((a, u) => a + u.apiCalls, 0);
  const totalLogins = latestUsage.reduce((a, u) => a + u.logins, 0);
  const totalReports = latestUsage.reduce((a, u) => a + u.reportsExported, 0);

  // ---- Per-customer trend data ----
  const custData =  getUsageByCustomer(selectedCustId);

  const labels = custData.map((u) => u.month); // "Jan-25" etc — already readable

  return (
    <>
      {/* KPI row — all metrics from client CSV, no invented fields */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-5">
        <MetricCard
          label="Inspections"
          value={totalInsp.toLocaleString()}
          sub={latestMonth}
        />
        <MetricCard
          label="Damage Detected"
          value={totalDmgDetected.toLocaleString()}
          sub={latestMonth}
          valueColor="#A32D2D"
        />
        <MetricCard
          label="Avg Damage Rate"
          value={`${avgDmgRate}%`}
          sub={latestMonth}
        />
        <MetricCard
          label="Active Drivers"
          value={totalDrivers.toLocaleString()}
          sub={latestMonth}
        />
        <MetricCard
          label="API Calls"
          value={fmtNumber(totalApi)}
          sub={latestMonth}
        />
        <MetricCard
          label="Logins"
          value={totalLogins.toLocaleString()}
          sub={latestMonth}
        />
        <MetricCard
          label="Reports Exported"
          value={totalReports.toLocaleString()}
          sub={latestMonth}
        />
      </div>

      {/* Customer selector */}
      <FilterBar>
        <label className="text-xs text-gray-500">Customer:</label>
        <FilterSelect
          value={selectedCustId}
          onChange={(e) => setSelectedCustId(e.target.value)}
        >
          {customerIds.map((id) => (
            <option key={id} value={id}>
              {getCustomerName(id)}
            </option>
          ))}
        </FilterSelect>
      </FilterBar>

      {/* Charts — 6 metrics from client CSV, 3×2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Inspections */}
        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-3">
            Monthly Inspections
          </h3>
          <LineChart
            labels={labels}
            data={custData.map((u) => u.inspections)}
            color="#1D9E75"
            label="Inspections"
          />
        </div>

        {/* Damage Detected */}
        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-3">
            Damage Detected
          </h3>
          <LineChart
            labels={labels}
            data={custData.map((u) => u.damageDetected)}
            color="#E24B4A"
            label="Damage Detected"
          />
        </div>

        {/* Damage Rate */}
        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-3">
            Damage Rate (%)
          </h3>
          <LineChart
            labels={labels}
            data={custData.map((u) => u.damageRate)}
            color="#A32D2D"
            label="Damage Rate %"
          />
        </div>

        {/* Active Drivers */}
        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-3">
            Active Drivers
          </h3>
          <LineChart
            labels={labels}
            data={custData.map((u) => u.activeDrivers)}
            color="#378ADD"
            label="Active Drivers"
          />
        </div>

        {/* API Calls */}
        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-3">
            API Calls
          </h3>
          <LineChart
            labels={labels}
            data={custData.map((u) => u.apiCalls)}
            color="#BA7517"
            label="API Calls"
          />
        </div>

        {/* Logins */}
        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-3">
            Logins
          </h3>
          <LineChart
            labels={labels}
            data={custData.map((u) => u.logins)}
            color="#6B21A8"
            label="Logins"
          />
        </div>

        {/* Reports Exported — full width at bottom */}
        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-3">
            Reports Exported
          </h3>
          <LineChart
            labels={labels}
            data={custData.map((u) => u.reportsExported)}
            color="#888780"
            label="Reports Exported"
          />
        </div>
      </div>

      {/* Data table for selected customer */}
      <div className="bg-white border border-gray-200 rounded-lg p-3.5 mt-4 overflow-x-auto">
        <h3 className="text-sm font-semibold text-gray-900 mb-2.5">
          Monthly breakdown — {getCustomerName(selectedCustId)}
        </h3>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {[
                "Month",
                "Inspections",
                "Damage Detected",
                "Damage Rate (%)",
                "Active Drivers",
                "API Calls",
                "Logins",
                "Reports Exported",
              ].map((h) => (
                <th
                  key={h}
                  className="text-center px-2.5 py-1.75 text-[11px] font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {custData.map((u) => (
              <tr key={u.month} className="hover:bg-gray-50 text-center">
                <td className="px-2.5 py-2 border-b border-gray-100 font-medium ">
                  {u.month}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  {u.inspections.toLocaleString()}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100 text-[#A32D2D]">
                  {u.damageDetected}
                </td>
                <td
                  className={`px-2.5 py-2 border-b border-gray-100 ${
                    u.damageRate > 10
                      ? "text-[#A32D2D] font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {u.damageRate}%
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  {u.activeDrivers}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  {u.apiCalls.toLocaleString()}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  {u.logins}
                </td>
                <td className="px-2.5 py-2 border-b border-gray-100">
                  {u.reportsExported}
                </td>
              </tr>
            ))}
            {custData.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-2.5 py-8 text-center text-gray-400 text-sm"
                >
                  No usage data for this customer.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}