"use client";

import { portfolioCards } from "../lib/financialData";

export default function PortfolioCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {portfolioCards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-2xl">{card.icon}</span>
            {card.positive !== null && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  card.positive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                }`}
              >
                {card.changePct}
              </span>
            )}
          </div>

          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {card.title}
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {card.value}
          </p>

          <p
            className={`mt-1 text-sm font-medium ${
              card.positive === true
                ? "text-emerald-600 dark:text-emerald-400"
                : card.positive === false
                ? "text-red-600 dark:text-red-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {card.change}
          </p>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}