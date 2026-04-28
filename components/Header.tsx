'use client';

import Link from 'next/link';
import { useTheme } from '@/lib/theme-context';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                📊 금융 분석
              </div>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className={`transition-colors ${
                  pathname === '/'
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                대시보드
              </Link>
              <Link
                href="/admin"
                className={`transition-colors ${
                  pathname === '/admin'
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                관리자
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="테마 전환"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}