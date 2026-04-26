// src/components/maps/USMap.tsx
"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { CUSTOMERS } from "@/data/customer";
import { STATE_COORDS } from "@/lib/constants";

export function USMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const w = el.offsetWidth || 640;
    const h = Math.round(w * 0.55);
    el.innerHTML = "";

    const svg = d3
      .select(el)
      .append("svg")
      .attr("viewBox", `0 0 ${w} ${h}`)
      .attr("width", "100%");

    const proj = d3.geoAlbersUsa().scale(w * 1.28).translate([w / 2, h / 2]);

    d3.json<Topology>(
      "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
    )
      .then((us) => {
        if (!us) return;
        const path = d3.geoPath(proj);
        const states = feature(us, us.objects.states as any);
        
console.log(us.objects.states,"us objects states");
console.log(states,"states");
console.log(path,"path");
        svg
          .selectAll("path")
          .data((states as any).features)
          .join("path")
          .attr("d", path as any)
          .attr("fill", "#F1EFE8")
          .attr("stroke", "#D3D1C7")
          .attr("stroke-width", 0.5);

        CUSTOMERS.forEach((c) => {
          const coord = STATE_COORDS[c.state];
          if (!coord) return;
          const xy = proj([coord[1], coord[0]]);
          if (!xy) return;

          const color =
            c.status === "Healthy"
              ? "#1D9E75"
              : c.status === "At Risk"
              ? "#BA7517"
              : "#A32D2D";
          const r = c.tier === "Enterprise" ? 7 : c.tier === "Growth" ? 5 : 4;

          svg
            .append("circle")
            .attr("cx", xy[0])
            .attr("cy", xy[1])
            .attr("r", r)
            .attr("fill", color)
            .attr("opacity", 0.85)
            .attr("stroke", "#fff")
            .attr("stroke-width", 1);
        });

        // Legend
        const legend: [string, string][] = [
          ["#1D9E75", "Healthy"],
          ["#BA7517", "At Risk"],
          ["#A32D2D", "Churned"],
        ];
        legend.forEach((l, i) => {
          svg
            .append("circle")
            .attr("cx", 14)
            .attr("cy", h - 60 + i * 18)
            .attr("r", 5)
            .attr("fill", l[0]);
          svg
            .append("text")
            .attr("x", 24)
            .attr("y", h - 56 + i * 18)
            .attr("fill", "#5F5E5A")
            .attr("font-size", 11)
            .text(l[1]);
        });

        svg
          .append("text")
          .attr("x", 14)
          .attr("y", h - 76)
          .attr("fill", "#888780")
          .attr("font-size", 10)
          .text("Circle size = tier · Color = status");
      })
      .catch(() => {
        el.innerHTML =
          '<p class="text-xs text-gray-500 p-2">Map unavailable</p>';
      });
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3.5 mt-4">
      <h3 className="text-[13px] font-medium text-gray-900 mb-2.5">
        US customer map
      </h3>
      <div ref={containerRef} className="w-full" />
    </div>
  );
}