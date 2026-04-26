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
import { VEHICLE_COLORS, VehicleBar } from "../ui/vehicleBar";


const CHART_COLORS = [
  "#1D9E75", "#378ADD", "#BA7517", "#6B21A8",
  "#E24B4A", "#888780", "#D4A017", "#2E8B57",
];


const tableHeader=["Customer ID",
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
                "Use Case"]
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


  const telCounts = getTelematicsCounts();
  const fmsCounts = getFmsCounts();
  const useCaseCounts = getUseCaseCounts();


  const telOptions = getDistinctValues("telematicsProvider");
  const fmsOptions = getDistinctValues("fmsPlatform");
  const useCaseOptions = getDistinctValues("primaryUseCase");

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


      
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm mb-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Fleet composition
        </h3>
        <div className="flex items-center gap-3 mb-2">
          {[
            { label: "Cargo", color: VEHICLE_COLORS.cargoVan, val: totalCargo },
            { label: "Sprinter", color: VEHICLE_COLORS.sprinterVan, val: totalSprinter },
            { label: "Box Truck", color: VEHICLE_COLORS.boxTruck, val: totalBox },
            { label: "Pickup", color: VEHICLE_COLORS.pickupTruck, val: totalPickup },
            { label: "Electric", color: VEHICLE_COLORS.electricVan, val: totalElectric },
          ].map((v) => (
            <span key={v.label} className="flex items-center gap-1.5 text-[11px] text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: v.color }} />
              {v.label}{" "}
              <span className="font-medium text-gray-700">
                {Math.round((v.val / totalVehicles) * 100)}%
              </span>
            </span>
          ))}
        </div>
        <VehicleBar
          total={totalVehicles}
          segments={[
            { value: totalCargo, color: VEHICLE_COLORS.cargoVan, label: "Cargo Van" },
            { value: totalSprinter, color: VEHICLE_COLORS.sprinterVan, label: "Sprinter Van" },
            { value: totalBox, color: VEHICLE_COLORS.boxTruck, label: "Box Truck" },
            { value: totalPickup, color: VEHICLE_COLORS.pickupTruck, label: "Pickup Truck" },
            { value: totalElectric, color: VEHICLE_COLORS.electricVan, label: "Electric Van" },
          ]}
        />
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartWithLegend title="Telematics Providers" counts={telCounts} />
        <ChartWithLegend title="FMS Platforms" counts={fmsCounts} />
        <ChartWithLegend title="Primary Use Case" counts={useCaseCounts} />
      </div>

     
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

    
      <div className="bg-white border border-gray-200 rounded-lg p-3.5 overflow-x-auto">
        <div className="px-5 pt-5 pb-3">
          <h3 className="text-sm font-semibold text-gray-900">
            Fleet by customer
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {filtered.length} of {FLEET.length} fleets shown
          </p>
        </div>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {tableHeader.map((h) => (
                <th
                  key={h}
                  className="text-left px-2.5 py-1.75 text-[11px] font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200 whitespace-nowrap"
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