"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import PortfolioCards from "../components/PortfolioCards";

const StockChart = dynamic(() => import("../components/StockChart"), { ssr: false });
const AssetAllocationChart = dynamic(() => import("../components/AssetAllocationChart"), { ssr: false });
const PerformanceChart = dynamic(() => import("../components/PerformanceChart"), { ssr: false });

export default function DashboardPage() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    // 클라이언트 마운트 후 실시간 시간 표시 (SSR hydration 불일치 방지)
    const format = () =>
      new Date().toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

    setLastUpdated(format());

    const timer = setInterval(() => setLastUpdated(format()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      <main className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6">
        {/* 페이지 제목 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            포트폴리오 현황
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            마지막 업데이트:{" "}
            {lastUpdated ?? (
              <span className="inline-block w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-700">
                &nbsp;
              </span>
            )}{" "}
            (KST)
          </p>
        </div>

        {/* 요약 카드 */}
        <section className="mb-6">
          <PortfolioCards />
        </section>

        {/* 주가 차트 */}
        <section className="mb-6">
          <StockChart />
        </section>

        {/* 자산 배분 + 수익률 비교 */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AssetAllocationChart />
          <PerformanceChart />
        </section>
      </main>

      <footer className="mx-auto mt-8 max-w-screen-xl px-4 pb-6 sm:px-6">
        <p className="text-center text-xs text-slate-400 dark:text-slate-600">
          FinDash &copy; 2026 &mdash; 데모 데이터로 운영됩니다. 실제 투자 조언이 아닙니다.
        </p>
      </footer>
    </div>
  );
}