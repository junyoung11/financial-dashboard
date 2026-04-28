'use client';

import { portfolioAssets, performanceMetrics } from '@/lib/financialData';

export default function PortfolioCards() {
  return (
    <div className="space-y-6">
      {/* 성과 메트릭 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{metric.label}</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
              {typeof metric.value === 'number' && metric.value > 1000
                ? `₩${(metric.value / 1000).toFixed(1)}K`
                : `${metric.value.toFixed(1)}%`}
            </p>
            <div
              className={`flex items-center mt-2 ${
                metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              <span className="text-sm font-semibold">{Math.abs(metric.percentage)}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* 포트폴리오 자산 목록 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">보유 자산</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm">
                  종목
                </th>
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm">
                  회사명
                </th>
                <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm">
                  보유주
                </th>
                <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm">
                  현재가
                </th>
                <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm">
                  변동률
                </th>
                <th className="text-right py-3 px-4 text-gray-600 dark:text-gray-400 font-semibold text-sm">
                  평가금액
                </th>
              </tr>
            </thead>
            <tbody>
              {portfolioAssets.map((asset, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="py-3 px-4 text-gray-800 dark:text-white font-semibold">{asset.symbol}</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{asset.name}</td>
                  <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                    {asset.shares.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700 dark:text-gray-300">
                    ${asset.price.toLocaleString()}
                  </td>
                  <td
                    className={`py-3 px-4 text-right font-semibold ${
                      asset.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {asset.change >= 0 ? '+' : ''}
                    {asset.change.toFixed(2)}%
                  </td>
                  <td className="py-3 px-4 text-right text-gray-800 dark:text-white font-semibold">
                    ${(asset.shares * asset.price).toLocaleString('en-US', {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
