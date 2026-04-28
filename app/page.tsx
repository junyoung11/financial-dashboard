import Header from "../components/Header";
import PortfolioCards from "../components/PortfolioCards";
import StockChart from "../components/StockChart";
import AssetAllocationChart from "../components/AssetAllocationChart";
import PerformanceChart from "../components/PerformanceChart";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      <main className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Portfolio Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            April 28, 2026 &mdash; Last updated: 12:29 PM KST
          </p>
        </div>

        {/* Summary cards */}
        <section className="mb-6">
          <PortfolioCards />
        </section>

        {/* Stock chart (full width) */}
        <section className="mb-6">
          <StockChart />
        </section>

        {/* Asset allocation + Performance (side by side) */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AssetAllocationChart />
          <PerformanceChart />
        </section>
      </main>

      <footer className="mx-auto mt-8 max-w-screen-xl px-4 pb-6 sm:px-6">
        <p className="text-center text-xs text-slate-400 dark:text-slate-600">
          FinDash &copy; 2026 &mdash; Demo data only. Not financial advice.
        </p>
      </footer>
    </div>
  );
}