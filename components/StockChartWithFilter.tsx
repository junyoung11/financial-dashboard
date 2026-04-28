'use client';

import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import {
  stockData1D,
  stockData1W,
  stockData1M,
  stockData3M,
  stockData1Y,
} from '@/lib/financialData';
import { useTheme } from '@/lib/theme-context';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y';
type ChartType = 'line' | 'bar';

const datasetMap: Record<TimeRange, typeof stockData1D> = {
  '1D': stockData1D,
  '1W': stockData1W,
  '1M': stockData1M,
  '3M': stockData3M,
  '1Y': stockData1Y,
};

const rangeLabel: Record<TimeRange, string> = {
  '1D': '오늘 (시간별)',
  '1W': '최근 7일',
  '1M': '최근 30일',
  '3M': '최근 3개월',
  '1Y': '최근 1년',
};

export default function StockChartWithFilter() {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const [chartType, setChartType] = useState<ChartType>('line');

  const dataset = datasetMap[timeRange];
  const labels = dataset.map((d) => d.date);
  const prices = dataset.map((d) => d.price);
  const volumes = dataset.map((d) => d.volume);

  const textColor = theme === 'dark' ? '#d1d5db' : '#6b7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  // 3M은 데이터가 90개라 포인트 반경을 줄임
  const pointRadius = timeRange === '3M' ? 1 : timeRange === '1M' ? 2 : 4;

  const lineChartData = {
    labels,
    datasets: [
      {
        label: '주가 (원)',
        data: prices,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        borderWidth: 2,
        fill: true,
        pointRadius,
        pointHoverRadius: pointRadius + 2,
        pointBackgroundColor: '#3b82f6',
      },
    ],
  };

  const barChartData = {
    labels,
    datasets: [
      {
        label: '거래량 (주)',
        data: volumes,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: '#059669',
        borderWidth: 1,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 12 },
          color: textColor,
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: textColor,
          callback: (value: number | string) =>
            typeof value === 'number' ? value.toLocaleString() : value,
        },
        grid: { color: gridColor },
      },
      x: {
        ticks: {
          color: textColor,
          maxRotation: 45,
          autoSkip: true,
          maxTicksLimit: timeRange === '3M' ? 18 : undefined,
        },
        grid: { color: gridColor },
      },
    },
  };

  const timeRangeButtons: TimeRange[] = ['1D', '1W', '1M', '3M', '1Y'];

  return (
    <div className="space-y-4">
      {/* 컨트롤 바 */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* 기간 버튼 */}
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">기간:</span>
          {timeRangeButtons.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              title={rangeLabel[range]}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
            {rangeLabel[timeRange]} · {dataset.length}개 데이터
          </span>
        </div>

        {/* 차트 유형 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              chartType === 'line'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            📈 라인
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              chartType === 'bar'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            📊 막대
          </button>
        </div>
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">주가 추이</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{rangeLabel[timeRange]}</p>
          {chartType === 'line' ? (
            <Line data={lineChartData} options={commonOptions} />
          ) : (
            <Bar data={lineChartData} options={commonOptions} />
          )}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">거래량</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{rangeLabel[timeRange]}</p>
          <Bar data={barChartData} options={commonOptions} />
        </div>
      </div>
    </div>
  );
}