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

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  colors: string[];
}

export function DoughnutChart({ labels, data, colors }: DoughnutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();

    const chartData: ChartData<"doughnut"> = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
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
  }, [labels, data, colors]);

  return (
    <div className="relative h-45">
      <canvas ref={canvasRef} />
    </div>
  );
}