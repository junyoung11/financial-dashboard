'use client';

import Header from '@/components/Header';
import PortfolioCards from '@/components/PortfolioCards';
import AssetAllocationChart from '@/components/AssetAllocationChart';
import StockChartWithFilter from '@/components/StockChartWithFilter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 제목 및 날짜 */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">금융 분석 대시보드</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </section>

        {/* 포트폴리오 카드 섹션 */}
        <section className="mb-8">
          <PortfolioCards />
        </section>

        {/* 차트 필터와 함께 제공 */}
        <section className="mb-8">
          <StockChartWithFilter />
        </section>

        {/* 자산 배분 차트 섹션 */}
        <section className="mb-8">
          <AssetAllocationChart />
        </section>

        {/* 요약 정보 */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">포트폴리오 요약</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">총 포트폴리오 가치</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$145,250</p>
              <p className="text-green-600 dark:text-green-400 text-sm mt-2">+15.8% YTD</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">현금 잔고</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$12,450</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">전체의 8.6%</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">최근 30일 성과</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">+$5,280</p>
              <p className="text-green-600 dark:text-green-400 text-sm mt-2">+3.8%</p>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © 2024 금융 분석 대시보드. 모든 데이터는 샘플입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
