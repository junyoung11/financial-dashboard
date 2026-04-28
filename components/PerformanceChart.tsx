"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { performanceData, PerformancePeriod } from "../lib/financialData";
import { useTheme } from "../lib/theme-context";

Chart.register(
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const PERIODS: { value: PerformancePeriod; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

export default function PerformanceChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const { theme } = useTheme();

  const [period, setPeriod] = useState<PerformancePeriod>("monthly");

  useEffect(() => {
    if (!canvasRef.current) return;

    const data = performanceData[period];
    const isDark = theme === "dark";
    const gridColor = isDark ? "rgba(148,163,184,0.15)" : "rgba(0,0,0,0.08)";
    const textColor = isDark ? "#94a3b8" : "#64748b";

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "My Portfolio",
            data: data.portfolio,
            backgroundColor: data.portfolio.map((v) =>
              v >= 0
                ? isDark
                  ? "rgba(59,130,246,0.8)"
                  : "rgba(59,130,246,0.85)"
                : isDark
                ? "rgba(239,68,68,0.8)"
                : "rgba(239,68,68,0.85)"
            ),
            borderRadius: 4,
            borderSkipped: false,
          },
          {
            label: "Benchmark (S&P 500)",
            data: data.benchmark,
            backgroundColor: isDark
              ? "rgba(148,163,184,0.4)"
              : "rgba(148,163,184,0.5)",
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: textColor,
              font: { size: 12 },
              boxWidth: 12,
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
              label: (ctx) =>
                ` ${ctx.dataset.label}: ${Number(ctx.raw) >= 0 ? "+" : ""}${Number(ctx.raw).toFixed(2)}%`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: { color: textColor, font: { size: 11 } },
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              font: { size: 11 },
              callback: (v) => `${Number(v) >= 0 ? "+" : ""}${Number(v).toFixed(1)}%`,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [period, theme]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Performance vs Benchmark
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Portfolio returns compared to S&P 500
          </p>
        </div>

        {/* Period filter */}
        <div className="flex rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                period === p.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              {p.label}
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