"use client";

import { useRef, useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  type ChartData,
} from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

interface LineChartProps {
  labels: string[];
  data: number[];
  color: string;
  label: string;
}

export function LineChart({ labels, data, color, label }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current?.destroy();

    const chartData: ChartData<"line"> = {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          backgroundColor: color + "22",
          borderWidth: 2,
          pointRadius: 3,
          tension: 0.3,
          fill: true,
        },
      ],
    };

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: "#888780", font: { size: 10 } },
            grid: { color: "rgba(0,0,0,0.06)" },
          },
          y: {
            ticks: { color: "#888780", font: { size: 10 } },
            grid: { color: "rgba(0,0,0,0.06)" },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [labels, data, color, label]);

  return (
    <div className="relative h-45">
      <canvas ref={canvasRef} aria-label={label} />
    </div>
  );
}