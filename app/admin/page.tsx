"use client";

import { useState } from "react";
import Header from "../../components/Header";
import { adminUsers, adminStats } from "../../lib/financialData";

type RoleFilter = "all" | "관리자" | "애널리스트" | "트레이더" | "뷰어";
type StatusFilter = "all" | "활성" | "비활성";

export default function AdminPage() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = adminUsers.filter((u) => {
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    const matchSearch =
      search === "" ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchStatus && matchSearch;
  });

  const roles: RoleFilter[] = ["all", "관리자", "애널리스트", "트레이더", "뷰어"];
  const statuses: StatusFilter[] = ["all", "활성", "비활성"];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />

      <main className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6">
        {/* 페이지 제목 */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            관리자 패널
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            사용자, 권한, 시스템 설정 관리
          </p>
        </div>

        {/* 관리자 통계 */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {adminStats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {stat.title}
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {stat.change}
              </p>
            </div>
          ))}
        </section>

        {/* 사용자 관리 */}
        <section>
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
            {/* 필터 헤더 */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-5 dark:border-slate-700">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  사용자 관리
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {filtered.length}명의 사용자
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* 검색 */}
                <div className="relative">
                  <svg
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="사용자 검색..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-lg border border-slate-200 bg-white py-1.5 pl-9 pr-3 text-sm text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-500"
                  />
                </div>

                {/* 역할 필터 */}
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r === "all" ? "전체 역할" : r}
                    </option>
                  ))}
                </select>

                {/* 상태 필터 */}
                <div className="flex overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                        statusFilter === s
                          ? "bg-blue-600 text-white"
                          : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {s === "all" ? "전체" : s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 테이블 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      사용자
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      역할
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      상태
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      포트폴리오
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      마지막 접속
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                            {user.name[0]}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            user.role === "관리자"
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                              : user.role === "애널리스트"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                              : user.role === "트레이더"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            user.status === "활성"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              user.status === "활성" ? "bg-emerald-500" : "bg-slate-400"
                            }`}
                          />
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-700 dark:text-slate-200">
                        {user.portfolioValue}
                      </td>
                      <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                        {user.lastLogin}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button className="rounded-md px-2.5 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20">
                            수정
                          </button>
                          <button className="rounded-md px-2.5 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                  검색 조건에 맞는 사용자가 없습니다.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto mt-8 max-w-screen-xl px-4 pb-6 sm:px-6">
        <p className="text-center text-xs text-slate-400 dark:text-slate-600">
          FinDash &copy; 2026 &mdash; 관리자 패널
        </p>
      </footer>
    </div>
  );
}