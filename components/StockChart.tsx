'use client';

import { useState, useEffect } from 'react';
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
import { stockPriceData } from '@/lib/financialData';
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

export default function StockChart() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(true);

  const labels = stockPriceData.map((d) => d.date);
  const prices = stockPriceData.map((d) => d.price);
  const volumes = stockPriceData.map((d) => d.volume);

  const textColor = theme === 'dark' ? '#d1d5db' : '#6b7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  const lineChartData = {
    labels,
    datasets: [
      {
        label: '주가 (원)',
        data: prices,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
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
        backgroundColor: '#10b981',
        borderColor: '#059669',
        borderWidth: 1,
      },
    ],
  };

  const options = {
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
    },
    scales: {
      y: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">주가 추이</h3>
        <Line data={lineChartData} options={options} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">거래량</h3>
        <Bar data={barChartData} options={options} />
      </div>
    </div>
  );
}
