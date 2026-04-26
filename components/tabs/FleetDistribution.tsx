// "use client";

// import { FLEET } from "@/data/fleet";
// import { getCustomerName } from "@/data/customer";
// import { MetricCard } from "@/components/ui/MetricCard";
// import { ProgressBar } from "@/components/ui/ProgressBar";
// import { DoughnutChart } from "@/components/ui/DoughnutChart";

// interface LegendItemProps {
//   color: string;
//   label: string;
//   count: number;
// }

// function LegendItem({ color, label, count }: LegendItemProps) {
//   return (
//     <span className="flex items-center gap-1 text-[11px] text-gray-500">
//       <span
//         className="w-2.5 h-2.5 rounded-sm inline-block"
//         style={{ background: color }}
//       />
//       {label} {count}
//     </span>
//   );
// }

// export function FleetDistribution() {
//   const totalVans = FLEET.reduce((a, f) => a + f.vans, 0);
//   const totalTrucks = FLEET.reduce((a, f) => a + f.trucks, 0);
//   const totalEvs = FLEET.reduce((a, f) => a + f.evs, 0);
//   const avgAge = (
//     FLEET.reduce((a, f) => a + f.avgAge, 0) / FLEET.length
//   ).toFixed(1);
//   const evPct = Math.round((totalEvs / (totalVans + totalTrucks)) * 100);

//   // Telematics counts
//   const telCounts = {
//     samsara: FLEET.filter((f) => f.telematics === "Samsara").length,
//     verizon: FLEET.filter((f) => f.telematics === "Verizon Connect").length,
//     geotab: FLEET.filter((f) => f.telematics === "Geotab").length,
//   };

//   // FMS counts
//   const fmsCounts = {
//     onfleet: FLEET.filter((f) => f.fms === "Onfleet").length,
//     routemaster: FLEET.filter((f) => f.fms === "RouteMaster").length,
//     tookan: FLEET.filter((f) => f.fms === "Tookan").length,
//     dispatchtrack: FLEET.filter((f) => f.fms === "DispatchTrack").length,
//   };

//   return (
//     <>
//       {/* KPI row */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
//         <MetricCard label="Total vans" value={totalVans.toLocaleString()} />
//         <MetricCard label="Total trucks" value={totalTrucks.toLocaleString()} />
//         <MetricCard
//           label="EV vehicles"
//           value={totalEvs}
//           sub={`${evPct}% of fleet`}
//         />
//         <MetricCard label="Avg fleet age" value={`${avgAge}y`} />
//       </div>

//       {/* Charts row */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Telematics */}
//         <div className="bg-white border border-gray-200 rounded-lg p-3.5">
//           <h3 className="text-[13px] font-medium text-gray-900 mb-2">
//             Telematics providers
//           </h3>
//           <div className="flex flex-wrap gap-2 mb-2">
//             <LegendItem
//               color="#1D9E75"
//               label="Samsara"
//               count={telCounts.samsara}
//             />
//             <LegendItem
//               color="#378ADD"
//               label="Verizon"
//               count={telCounts.verizon}
//             />
//             <LegendItem
//               color="#888780"
//               label="Geotab"
//               count={telCounts.geotab}
//             />
//           </div>
//           <DoughnutChart
//             labels={["Samsara", "Verizon Connect", "Geotab"]}
//             data={[telCounts?.samsara, telCounts.verizon, telCounts.geotab]}
//             colors={["#1D9E75", "#378ADD", "#888780"]}
//           />
//         </div>

//         {/* FMS */}
//         <div className="bg-white border border-gray-200 rounded-lg p-3.5">
//           <h3 className="text-[13px] font-medium text-gray-900 mb-2">
//             FMS platforms
//           </h3>
//           <div className="flex flex-wrap gap-2 mb-2">
//             <LegendItem
//               color="#1D9E75"
//               label="Onfleet"
//               count={fmsCounts.onfleet}
//             />
//             <LegendItem
//               color="#378ADD"
//               label="RouteMaster"
//               count={fmsCounts.routemaster}
//             />
//             <LegendItem
//               color="#888780"
//               label="Tookan"
//               count={fmsCounts.tookan}
//             />
//             <LegendItem
//               color="#BA7517"
//               label="DispatchTrack"
//               count={fmsCounts.dispatchtrack}
//             />
//           </div>
//           <DoughnutChart
//             labels={["Onfleet", "RouteMaster", "Tookan", "DispatchTrack"]}
//             data={[
//               fmsCounts.onfleet,
//               fmsCounts.routemaster,
//               fmsCounts.tookan,
//               fmsCounts.dispatchtrack,
//             ]}
//             colors={["#1D9E75", "#378ADD", "#888780", "#BA7517"]}
//           />
//         </div>
//       </div>

//       {/* Fleet table */}
//       <div className="bg-white border border-gray-200 rounded-lg p-3.5 mt-4 overflow-x-auto">
//         <h3 className="text-[13px] font-medium text-gray-900 mb-2.5">
//           Fleet by customer
//         </h3>
//         <table className="w-full text-xs border-collapse">
//           <thead>
//             <tr>
//               {[
//                 "Customer",
//                 "Vans",
//                 "Trucks",
//                 "EVs",
//                 "EV %",
//                 "Telematics",
//                 "FMS",
//                 "Avg age",
//               ].map((h) => (
//                 <th
//                   key={h}
//                   className="text-left px-2.5 py-1.75 text-[11px] font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap"
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {FLEET.map((f) => {
//               const evPercent = Math.round((f.evs / (f.vans + f.trucks)) * 100);
//               return (
//                 <tr key={f.custId} className="hover:bg-gray-50">
//                   <td className="px-2.5 py-2 border-b border-gray-100 font-medium">
//                     {getCustomerName(f.custId)}
//                   </td>
//                   <td className="px-2.5 py-2 border-b border-gray-100">
//                     {f.vans}
//                   </td>
//                   <td className="px-2.5 py-2 border-b border-gray-100">
//                     {f.trucks}
//                   </td>
//                   <td className="px-2.5 py-2 border-b border-gray-100">
//                     {f.evs}
//                   </td>
//                   <td className="px-2.5 py-2 border-b border-gray-100">
//                     <div className="min-w-15">
//                       <span className="text-[11px]">{evPercent}%</span>
//                       <ProgressBar value={evPercent} />
//                     </div>
//                   </td>
//                   <td className="px-2.5 py-2 border-b border-gray-100">
//                     {f.telematics}
//                   </td>
//                   <td className="px-2.5 py-2 border-b border-gray-100">
//                     {f.fms}
//                   </td>
//                   <td
//                     className={`px-2.5 py-2 border-b border-gray-100 ${
//                       f.avgAge > 6 ? "text-[#A32D2D]" : "text-gray-500"
//                     }`}
//                   >
//                     {f.avgAge}y
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }




// src/components/tabs/FleetDistribution.tsx
"use client";

import { useState } from "react";
import {
  FLEET,
  getTelematicsCounts,
  getFmsCounts,
  getUseCaseCounts,
  getDistinctValues,
} from "@/data/fleet";
import { MetricCard } from "@/components/ui/MetricCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DoughnutChart } from "@/components/ui/DoughnutChart";
import { FilterBar, FilterSelect, FilterInput } from "@/components/ui/FilterBar";

// Palette for dynamic chart segments
const CHART_COLORS = [
  "#1D9E75", "#378ADD", "#BA7517", "#6B21A8",
  "#E24B4A", "#888780", "#D4A017", "#2E8B57",
];

interface LegendItemProps {
  color: string;
  label: string;
  count: number;
}

function LegendItem({ color, label, count }: LegendItemProps) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-gray-500">
      <span
        className="w-2.5 h-2.5 rounded-sm inline-block shrink-0"
        style={{ background: color }}
      />
      {label} ({count})
    </span>
  );
}

/** Renders a doughnut chart with auto-generated legend from a counts map */
function ChartWithLegend({
  title,
  counts,
}: {
  title: string;
  counts: Record<string, number>;
}) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const labels = entries.map(([k]) => k);
  const data = entries.map(([, v]) => v);
  const colors = labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3.5">
      <h3 className="text-[13px] font-medium text-gray-900 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {labels.map((label, i) => (
          <LegendItem
            key={label}
            color={colors[i]}
            label={label}
            count={data[i]}
          />
        ))}
      </div>
      <DoughnutChart labels={labels} data={data} colors={colors} />
    </div>
  );
}

export function FleetDistribution() {
  const [search, setSearch] = useState("");
  const [telFilter, setTelFilter] = useState("");
  const [fmsFilter, setFmsFilter] = useState("");
  const [useCaseFilter, setUseCaseFilter] = useState("");

  // ---- Aggregate KPIs from actual client data ----
  const totalVehicles = FLEET.reduce((a, f) => a + f.totalVehicles, 0);
  const totalCargo = FLEET.reduce((a, f) => a + f.cargoVan, 0);
  const totalSprinter = FLEET.reduce((a, f) => a + f.sprinterVan, 0);
  const totalBox = FLEET.reduce((a, f) => a + f.boxTruck, 0);
  const totalPickup = FLEET.reduce((a, f) => a + f.pickupTruck, 0);
  const totalElectric = FLEET.reduce((a, f) => a + f.electricVan, 0);
  const avgAge =
    FLEET.length > 0
      ? (FLEET.reduce((a, f) => a + f.avgVehicleAge, 0) / FLEET.length).toFixed(1)
      : "0";
  const evPct =
    totalVehicles > 0 ? Math.round((totalElectric / totalVehicles) * 100) : 0;

  // ---- Distribution counts — derived from data, not hardcoded ----
  const telCounts = getTelematicsCounts();
  const fmsCounts = getFmsCounts();
  const useCaseCounts = getUseCaseCounts();

  // ---- Filter options from actual data ----
  const telOptions = getDistinctValues("telematicsProvider");
  const fmsOptions = getDistinctValues("fmsPlatform");
  const useCaseOptions = getDistinctValues("primaryUseCase");

  // ---- Filtered fleet ----
  const q = search.toLowerCase();
  const filtered = FLEET.filter(
    (f) =>
      (!q ||
        f.companyName.toLowerCase().includes(q) ||
        f.customerId.toLowerCase().includes(q)) &&
      (!telFilter || f.telematicsProvider === telFilter) &&
      (!fmsFilter || f.fmsPlatform === fmsFilter) &&
      (!useCaseFilter || f.primaryUseCase === useCaseFilter)
  );

  return (
    <>
      {/* KPI row — all real aggregates from client data */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-5">
        <MetricCard
          label="Total Vehicles"
          value={totalVehicles.toLocaleString()}
          sub={`${FLEET.length} fleets`}
        />
        <MetricCard label="Cargo Vans" value={totalCargo.toLocaleString()} />
        <MetricCard label="Sprinter Vans" value={totalSprinter.toLocaleString()} />
        <MetricCard label="Box Trucks" value={totalBox.toLocaleString()} />
        <MetricCard label="Pickup Trucks" value={totalPickup.toLocaleString()} />
        <MetricCard
          label="Electric Vans"
          value={totalElectric.toLocaleString()}
          sub={`${evPct}% of fleet`}
        />
        <MetricCard label="Avg Fleet Age" value={`${avgAge}y`} />
      </div>

      {/* Distribution charts — 3 columns, all derived from data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartWithLegend title="Telematics Providers" counts={telCounts} />
        <ChartWithLegend title="FMS Platforms" counts={fmsCounts} />
        <ChartWithLegend title="Primary Use Case" counts={useCaseCounts} />
      </div>

      {/* Filters */}
      <div className="mt-4">
        <FilterBar>
          <FilterInput
            placeholder="Search company or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 200 }}
          />
          <FilterSelect
            value={telFilter}
            onChange={(e) => setTelFilter(e.target.value)}
          >
            <option value="">All telematics</option>
            {telOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </FilterSelect>
          <FilterSelect
            value={fmsFilter}
            onChange={(e) => setFmsFilter(e.target.value)}
          >
            <option value="">All FMS</option>
            {fmsOptions.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </FilterSelect>
          <FilterSelect
            value={useCaseFilter}
            onChange={(e) => setUseCaseFilter(e.target.value)}
          >
            <option value="">All use cases</option>
            {useCaseOptions.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </FilterSelect>
        </FilterBar>
      </div>

      {/* Fleet table — every column is a real client field */}
      <div className="bg-white border border-gray-200 rounded-lg p-3.5 overflow-x-auto">
        <h3 className="text-[13px] font-medium text-gray-900 mb-2.5">
          Fleet by customer
        </h3>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {[
                "Customer ID",
                "Company",
                "Total",
                "Cargo Van",
                "Sprinter",
                "Box Truck",
                "Pickup",
                "Electric",
                "EV %",
                "Avg Age",
                "Telematics",
                "FMS",
                "Use Case",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-2.5 py-1.75 text-[11px] font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => {
              const evPercent =
                f.totalVehicles > 0
                  ? Math.round((f.electricVan / f.totalVehicles) * 100)
                  : 0;
              return (
                <tr key={f.customerId} className="hover:bg-gray-50">
                  <td className="px-2.5 py-2 border-b border-gray-100 text-gray-400 text-[11px]">
                    {f.customerId}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100 font-medium">
                    {f.companyName}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100 font-medium">
                    {f.totalVehicles}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.cargoVan}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.sprinterVan}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.boxTruck}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.pickupTruck}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.electricVan}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    <div className="min-w-15">
                      <span className="text-[11px]">{evPercent}%</span>
                      <ProgressBar value={evPercent} />
                    </div>
                  </td>
                  <td
                    className={`px-2.5 py-2 border-b border-gray-100 ${
                      f.avgVehicleAge > 6
                        ? "text-[#A32D2D] font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {f.avgVehicleAge}y
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.telematicsProvider}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.fmsPlatform}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.primaryUseCase}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={13}
                  className="px-2.5 py-8 text-center text-gray-400 text-sm"
                >
                  No fleet records match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}