"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { CUSTOMERS } from "@/data/customer";
import type { Customer } from "@/types";

function fmtMrr(n: number): string {
  return `$${n.toLocaleString()}`;
}

const STATUS_COLORS: Record<string, string> = {
  Active: "#1D9E75",
  "At Risk": "#D97706",
  Churned: "#DC2626",
};

const TIER_RADIUS: Record<string, number> = {
  Enterprise: 9,
  Professional: 7,
  Growth: 6,
  Starter: 5,
};

export function USMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    customer: Customer;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const w = el.offsetWidth || 640;
    const h = Math.round(w * 0.55);

   
    const existing = el.querySelector("svg");
    if (existing) existing.remove();

    const svg = d3
      .select(el)
      .append("svg")
      .attr("viewBox", `0 0 ${w} ${h}`)
      .attr("width", "100%")
      .style("border-radius", "12px");

    const proj = d3.geoAlbersUsa().scale(w * 1.28).translate([w / 2, h / 2]);

    d3.json<Topology>(
      "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
    )
      .then((us) => {
        if (!us) return;
        const path = d3.geoPath(proj);
        const states = feature(us, us.objects.states as any);

        
        svg
          .append("rect")
          .attr("width", w)
          .attr("height", h)
          .attr("fill", "#FAFAF8")
          .attr("rx", 12);

      
        svg
          .selectAll("path")
          .data((states as any).features)
          .join("path")
          .attr("d", path as any)
          .attr("fill", "#EDEBE4")
          .attr("stroke", "#D5D3CC")
          .attr("stroke-width", 0.5);

        
        CUSTOMERS.forEach((c) => {
          const xy = proj([c.longitude, c.latitude]);
          if (!xy) return;

          const color = STATUS_COLORS[c.status] ?? "#888";
          const r = TIER_RADIUS[c.tier] ?? 5;

          
          svg
            .append("circle")
            .attr("cx", xy[0])
            .attr("cy", xy[1])
            .attr("r", r + 4)
            .attr("fill", color)
            .attr("opacity", 0.12);

          
          const dot = svg
            .append("circle")
            .attr("cx", xy[0])
            .attr("cy", xy[1])
            .attr("r", r)
            .attr("fill", color)
            .attr("stroke", "#fff")
            .attr("stroke-width", 2)
            .attr("cursor", "pointer")
            .attr("filter", "drop-shadow(0 1px 2px rgba(0,0,0,0.15))")
            .style("transition", "r 0.15s ease, stroke-width 0.15s ease");

          
          dot
            .on("mouseenter", function (event: MouseEvent) {
              d3.select(this)
                .attr("r", r + 3)
                .attr("stroke-width", 3);

              const rect = el.getBoundingClientRect();
              setTooltipData({
                customer: c,
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
              });
            })
            .on("mousemove", function (event: MouseEvent) {
              const rect = el.getBoundingClientRect();
              setTooltipData((prev) =>
                prev
                  ? {
                      ...prev,
                      x: event.clientX - rect.left,
                      y: event.clientY - rect.top,
                    }
                  : null
              );
            })
            .on("mouseleave", function () {
              d3.select(this).attr("r", r).attr("stroke-width", 2);
              setTooltipData(null);
            });
        });
      })
      .catch(() => {
        el.innerHTML =
          '<p class="text-xs text-gray-500 p-4">Map unavailable — check network</p>';
      });
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm mt-5 overflow-hidden">
      
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900">
              US Customer Map
            </h3>
          </div>
          <p className="text-[11px] text-gray-400 mt-1 ml-8 font-semibold">
            {CUSTOMERS.filter((c) => c.status === "Active").length} active ·{" "}
            {CUSTOMERS.filter((c) => c.status === "At Risk").length} at risk ·{" "}
            {CUSTOMERS.filter((c) => c.status === "Churned").length} churned
          </p>
        </div>

        
        <div className="flex items-center gap-4">
          {[
            { color: STATUS_COLORS["Active"], label: "Active" },
            { color: STATUS_COLORS["At Risk"], label: "At Risk" },
            { color: STATUS_COLORS["Churned"], label: "Churned" },
          ].map((l) => (
            <span
              key={l.label}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500"
            >
              <span
                className="w-2.5 h-2.5 rounded-full ring-2 ring-white shadow-sm"
                style={{ background: l.color }}
              />
              {l.label}
            </span>
          ))}
          <span className="text-[10px] text-gray-300 ml-2">
            size = tier
          </span>
        </div>
      </div>

     
      <div ref={containerRef} className="relative w-full px-3 pb-3">
       
        {tooltipData && (
          <div
            ref={tooltipRef}
            className="absolute z-50 pointer-events-none"
            style={{
              left: tooltipData.x,
              top: tooltipData.y,
              transform: "translate(-50%, -120%)",
            }}
          >
            <div className="bg-gray-900 text-white rounded-xl px-4 py-3 shadow-xl min-w-45">
              
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-gray-900 rotate-45 rounded-sm"
              />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background:
                        STATUS_COLORS[tooltipData.customer.status] ?? "#888",
                    }}
                  />
                  <span className="font-semibold text-[12px] leading-tight">
                    {tooltipData.customer.companyName}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                  <span className="text-gray-400">Tier</span>
                  <span className="text-white font-medium text-right">
                    {tooltipData.customer.tier}
                  </span>
                  <span className="text-gray-400">MRR</span>
                  <span className="text-emerald-400 font-medium text-right">
                    {fmtMrr(tooltipData.customer.mrr)}
                  </span>
                  <span className="text-gray-400">Status</span>
                  <span className="text-white font-medium text-right">
                    {tooltipData.customer.status}
                  </span>
                  <span className="text-gray-400">CSM</span>
                  <span className="text-white font-medium text-right">
                    {tooltipData.customer.csm}
                  </span>
                  <span className="text-gray-400">Location</span>
                  <span className="text-white font-medium text-right">
                    {tooltipData.customer.city}, {tooltipData.customer.state}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}