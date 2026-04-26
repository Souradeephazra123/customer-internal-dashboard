"use client";

import { useRef, useEffect } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  type ChartData,
} from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip);


const DEFAULT_COLORS = [
  "#1D9E75", "#378ADD", "#BA7517", "#6B21A8",
  "#E24B4A", "#888780", "#D4A017", "#2E8B57",
];


interface DoughnutChartProps {
  labels: string[];
  data: number[];
  colors: string[];
}

export function DoughnutChart({ labels, data, colors }: DoughnutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);


  const chartColors = colors ?? labels.map((_, i) => DEFAULT_COLORS[i % DEFAULT_COLORS.length]);


  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();

    const chartData: ChartData<"doughnut"> = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: chartColors,
          borderWidth: 0,
        },
      ],
    };

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        cutout: "60%",
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [labels, data, chartColors]);

  return (
    <div className="relative h-45">
      <canvas ref={canvasRef} />
    </div>
  );
}