"use client";

import { FLEET } from "@/data/fleet";
import { getCustomerName } from "@/data/customer";
import { MetricCard } from "@/components/ui/MetricCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DoughnutChart } from "@/components/ui/DoughnutChart";

interface LegendItemProps {
  color: string;
  label: string;
  count: number;
}

function LegendItem({ color, label, count }: LegendItemProps) {
  return (
    <span className="flex items-center gap-1 text-[11px] text-gray-500">
      <span
        className="w-2.5 h-2.5 rounded-sm inline-block"
        style={{ background: color }}
      />
      {label} {count}
    </span>
  );
}

export function FleetDistribution() {
  const totalVans = FLEET.reduce((a, f) => a + f.vans, 0);
  const totalTrucks = FLEET.reduce((a, f) => a + f.trucks, 0);
  const totalEvs = FLEET.reduce((a, f) => a + f.evs, 0);
  const avgAge = (
    FLEET.reduce((a, f) => a + f.avgAge, 0) / FLEET.length
  ).toFixed(1);
  const evPct = Math.round((totalEvs / (totalVans + totalTrucks)) * 100);

  // Telematics counts
  const telCounts = {
    samsara: FLEET.filter((f) => f.telematics === "Samsara").length,
    verizon: FLEET.filter((f) => f.telematics === "Verizon Connect").length,
    geotab: FLEET.filter((f) => f.telematics === "Geotab").length,
  };

  // FMS counts
  const fmsCounts = {
    onfleet: FLEET.filter((f) => f.fms === "Onfleet").length,
    routemaster: FLEET.filter((f) => f.fms === "RouteMaster").length,
    tookan: FLEET.filter((f) => f.fms === "Tookan").length,
    dispatchtrack: FLEET.filter((f) => f.fms === "DispatchTrack").length,
  };

  return (
    <>
      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
        <MetricCard label="Total vans" value={totalVans.toLocaleString()} />
        <MetricCard label="Total trucks" value={totalTrucks.toLocaleString()} />
        <MetricCard
          label="EV vehicles"
          value={totalEvs}
          sub={`${evPct}% of fleet`}
        />
        <MetricCard label="Avg fleet age" value={`${avgAge}y`} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Telematics */}
        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-2">
            Telematics providers
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <LegendItem
              color="#1D9E75"
              label="Samsara"
              count={telCounts.samsara}
            />
            <LegendItem
              color="#378ADD"
              label="Verizon"
              count={telCounts.verizon}
            />
            <LegendItem
              color="#888780"
              label="Geotab"
              count={telCounts.geotab}
            />
          </div>
          <DoughnutChart
            labels={["Samsara", "Verizon Connect", "Geotab"]}
            data={[telCounts?.samsara, telCounts.verizon, telCounts.geotab]}
            colors={["#1D9E75", "#378ADD", "#888780"]}
          />
        </div>

        {/* FMS */}
        <div className="bg-white border border-gray-200 rounded-lg p-3.5">
          <h3 className="text-[13px] font-medium text-gray-900 mb-2">
            FMS platforms
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <LegendItem
              color="#1D9E75"
              label="Onfleet"
              count={fmsCounts.onfleet}
            />
            <LegendItem
              color="#378ADD"
              label="RouteMaster"
              count={fmsCounts.routemaster}
            />
            <LegendItem
              color="#888780"
              label="Tookan"
              count={fmsCounts.tookan}
            />
            <LegendItem
              color="#BA7517"
              label="DispatchTrack"
              count={fmsCounts.dispatchtrack}
            />
          </div>
          <DoughnutChart
            labels={["Onfleet", "RouteMaster", "Tookan", "DispatchTrack"]}
            data={[
              fmsCounts.onfleet,
              fmsCounts.routemaster,
              fmsCounts.tookan,
              fmsCounts.dispatchtrack,
            ]}
            colors={["#1D9E75", "#378ADD", "#888780", "#BA7517"]}
          />
        </div>
      </div>

      {/* Fleet table */}
      <div className="bg-white border border-gray-200 rounded-lg p-3.5 mt-4 overflow-x-auto">
        <h3 className="text-[13px] font-medium text-gray-900 mb-2.5">
          Fleet by customer
        </h3>
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              {[
                "Customer",
                "Vans",
                "Trucks",
                "EVs",
                "EV %",
                "Telematics",
                "FMS",
                "Avg age",
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
            {FLEET.map((f) => {
              const evPercent = Math.round((f.evs / (f.vans + f.trucks)) * 100);
              return (
                <tr key={f.custId} className="hover:bg-gray-50">
                  <td className="px-2.5 py-2 border-b border-gray-100 font-medium">
                    {getCustomerName(f.custId)}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.vans}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.trucks}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.evs}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    <div className="min-w-15">
                      <span className="text-[11px]">{evPercent}%</span>
                      <ProgressBar value={evPercent} />
                    </div>
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.telematics}
                  </td>
                  <td className="px-2.5 py-2 border-b border-gray-100">
                    {f.fms}
                  </td>
                  <td
                    className={`px-2.5 py-2 border-b border-gray-100 ${
                      f.avgAge > 6 ? "text-[#A32D2D]" : "text-gray-500"
                    }`}
                  >
                    {f.avgAge}y
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
