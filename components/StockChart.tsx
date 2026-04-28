"use client";

import { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { stockDatasets, timePeriodDays, TimePeriod } from "../lib/financialData";
import { useTheme } from "../lib/theme-context";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const TICKERS = Object.keys(stockDatasets) as (keyof typeof stockDatasets)[];
const PERIODS: TimePeriod[] = ["1W", "1M", "3M", "6M", "1Y"];

export default function StockChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const { theme } = useTheme();

  const [selectedTicker, setSelectedTicker] = useState<string>("AAPL");
  const [period, setPeriod] = useState<TimePeriod>("3M");

  useEffect(() => {
    if (!canvasRef.current) return;

    const stock = stockDatasets[selectedTicker];
    const days = timePeriodDays[period];
    const labels = stock.labels.slice(-days);
    const prices = stock.prices.slice(-days);

    const isDark = theme === "dark";
    const gridColor = isDark ? "rgba(148,163,184,0.15)" : "rgba(0,0,0,0.08)";
    const textColor = isDark ? "#94a3b8" : "#64748b";

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `${stock.ticker} – ${stock.name}`,
            data: prices,
            borderColor: stock.color,
            backgroundColor: `${stock.color}22`,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
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
              label: (ctx) => ` $${Number(ctx.raw).toFixed(2)}`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              maxTicksLimit: 8,
              font: { size: 11 },
            },
          },
          y: {
            grid: { color: gridColor },
            ticks: {
              color: textColor,
              font: { size: 11 },
              callback: (v) => `$${Number(v).toFixed(0)}`,
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [selectedTicker, period, theme]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Stock Price
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Historical price chart
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Ticker selector */}
          <select
            value={selectedTicker}
            onChange={(e) => setSelectedTicker(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            {TICKERS.map((t) => (
              <option key={t} value={t}>
                {t} – {stockDatasets[t].name}
              </option>
            ))}
          </select>

          {/* Period buttons */}
          <div className="flex rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  period === p
                    ? "bg-blue-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}