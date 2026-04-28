'use client';

import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { assetAllocation, industryDistribution } from '@/lib/financialData';
import { useTheme } from '@/lib/theme-context';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AssetAllocationChart() {
  const { theme } = useTheme();

  const borderColor = theme === 'dark' ? '#1f2937' : '#fff';
  const textColor = theme === 'dark' ? '#d1d5db' : '#6b7280';

  const assetData = {
    labels: assetAllocation.map((a) => a.name),
    datasets: [
      {
        data: assetAllocation.map((a) => a.value),
        backgroundColor: assetAllocation.map((a) => a.color),
        borderColor: borderColor,
        borderWidth: 2,
      },
    ],
  };

  const industryData = {
    labels: industryDistribution.map((i) => i.name),
    datasets: [
      {
        data: industryDistribution.map((i) => i.value),
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
        ],
        borderColor: borderColor,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: { size: 12 },
          color: textColor,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: { label: string; parsed: number }) {
            return context.label + ': ' + context.parsed + '%';
          },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">자산 배분</h3>
        <Doughnut data={assetData} options={options} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">산업별 분포</h3>
        <Pie data={industryData} options={options} />
      </div>
    </div>
  );
}
