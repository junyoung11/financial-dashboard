'use client';

import Header from '@/components/Header';
import { useState } from 'react';

interface AdminStats {
  label: string;
  value: string | number;
  change: string;
  icon: string;
}

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'settings'>('overview');

  const stats: AdminStats[] = [
    {
      label: '활성 사용자',
      value: '2,450',
      change: '+12.5%',
      icon: '👥',
    },
    {
      label: '총 거래액',
      value: '$1.2M',
      change: '+23.8%',
      icon: '💰',
    },
    {
      label: '포트폴리오 수',
      value: '845',
      change: '+8.2%',
      icon: '📊',
    },
    {
      label: '시스템 가동률',
      value: '99.8%',
      change: '+0.1%',
      icon: '⚙️',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: '새로운 사용자 가입',
      user: 'Kim, Min-jae',
      time: '2시간 전',
    },
    {
      id: 2,
      action: '대량 거래 완료',
      user: 'Lee, Ji-woo',
      time: '4시간 전',
    },
    {
      id: 3,
      action: '포트폴리오 재구성',
      user: 'Park, Su-jin',
      time: '6시간 전',
    },
    {
      id: 4,
      action: '알림 설정 변경',
      user: 'Choi, Min-ho',
      time: '8시간 전',
    },
  ];

  const systemSettings = [
    {
      name: '자동 백업',
      enabled: true,
      description: '매일 자정에 데이터 백업 실행',
    },
    {
      name: '이메일 알림',
      enabled: true,
      description: '중요 거래 시 이메일 전송',
    },
    {
      name: '2단계 인증',
      enabled: true,
      description: '모든 관리자 계정에 필수',
    },
    {
      name: '실시간 동기화',
      enabled: false,
      description: '거래 데이터 실시간 동기화',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 제목 */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">관리자 대시보드</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">시스템 모니터링 및 설정 관리</p>
        </section>

        {/* 통계 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                  <p className="text-green-600 dark:text-green-400 text-sm mt-2">{stat.change}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </section>

        {/* 탭 네비게이션 */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedTab === 'overview'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            개요
          </button>
          <button
            onClick={() => setSelectedTab('settings')}
            className={`px-4 py-2 font-medium transition-colors ${
              selectedTab === 'settings'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            시스템 설정
          </button>
        </div>

        {/* 개요 탭 */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 최근 활동 */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">최근 활동</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">{activity.action}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{activity.user}</p>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 빠른 통계 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">빠른 통계</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">서버 CPU 사용률</span>
                    <span className="text-gray-900 dark:text-white font-semibold">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">메모리 사용률</span>
                    <span className="text-gray-900 dark:text-white font-semibold">48%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">디스크 사용률</span>
                    <span className="text-gray-900 dark:text-white font-semibold">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 설정 탭 */}
        {selectedTab === 'settings' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">시스템 설정</h3>
            <div className="space-y-4">
              {systemSettings.map((setting, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium">{setting.name}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{setting.description}</p>
                  </div>
                  <button
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      setting.enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* 액션 버튼 */}
            <div className="mt-8 flex gap-4">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                변경 사항 저장
              </button>
              <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
                취소
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © 2024 금융 분석 대시보드. 관리자 전용 페이지입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}