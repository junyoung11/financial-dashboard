"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { assetAllocation, AllocationCategory } from "../lib/financialData";
import { useTheme } from "../lib/theme-context";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const CATEGORIES: { value: AllocationCategory; label: string }[] = [
  { value: "all", label: "All Assets" },
  { value: "equity", label: "Equity" },
  { value: "fixed", label: "Fixed Income" },
  { value: "alternative", label: "Alternatives" },
];

export default function AssetAllocationChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const { theme } = useTheme();

  const [category, setCategory] = useState<AllocationCategory>("all");

  useEffect(() => {
    if (!canvasRef.current) return;

    const data = assetAllocation[category];
    const isDark = theme === "dark";
    const textColor = isDark ? "#94a3b8" : "#64748b";

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.values,
            backgroundColor: data.colors,
            borderColor: isDark ? "#1e293b" : "#ffffff",
            borderWidth: 3,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: textColor,
              font: { size: 11 },
              boxWidth: 12,
              padding: 12,
            },
          },
          tooltip: {
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
            titleColor: isDark ? "#f1f5f9" : "#0f172a",
            bodyColor: isDark ? "#94a3b8" : "#64748b",
            borderColor: isDark ? "#334155" : "#e2e8f0",
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw}%`,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [category, theme]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Asset Allocation
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Portfolio composition breakdown
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                category === c.value
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}