// ─── 포트폴리오 요약 ─────────────────────────────────────────────────────────

export const portfolioSummary = {
  totalValue: 1_284_530,
  dailyChange: 8_342,
  dailyChangePct: 0.65,
  weeklyChangePct: 2.14,
  monthlyChangePct: 5.87,
  ytdChangePct: 18.43,
  totalGain: 284_530,
  totalGainPct: 28.45,
};

// ─── 포트폴리오 카드 ──────────────────────────────────────────────────────────

export const portfolioCards = [
  {
    title: "총 포트폴리오 가치",
    value: "$1,284,530",
    change: "+$8,342",
    changePct: "+0.65%",
    positive: true,
    icon: "💰",
    description: "운용 중인 전체 자산",
  },
  {
    title: "오늘의 손익",
    value: "+$8,342",
    change: "전일 대비",
    changePct: "+0.65%",
    positive: true,
    icon: "📈",
    description: "당일 손익(P&L)",
  },
  {
    title: "월간 수익률",
    value: "+5.87%",
    change: "+$71,324",
    changePct: "이번 달",
    positive: true,
    icon: "📊",
    description: "이번 달 투자 수익률",
  },
  {
    title: "리스크 점수",
    value: "6.4 / 10",
    change: "보통 수준",
    changePct: "위험 등급",
    positive: null,
    icon: "⚖️",
    description: "포트폴리오 리스크 평가",
  },
];

// ─── 주식 가격 데이터 ──────────────────────────────────────────────────────────

function generatePriceData(
  base: number,
  days: number,
  volatility: number
): number[] {
  const prices: number[] = [base];
  for (let i = 1; i < days; i++) {
    const change = (Math.random() - 0.48) * volatility;
    prices.push(Math.max(1, prices[i - 1] + change));
  }
  return prices.map((p) => Math.round(p * 100) / 100);
}

function generateLabels(days: number): string[] {
  const labels: string[] = [];
  const now = new Date(2026, 3, 28);
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    labels.push(
      d.toLocaleDateString("ko-KR", { month: "short", day: "numeric" })
    );
  }
  return labels;
}

const DAYS_365 = 365;
const labels365 = generateLabels(DAYS_365);

export const stockDatasets: Record<
  string,
  { name: string; ticker: string; prices: number[]; labels: string[]; color: string }
> = {
  AAPL: {
    name: "애플",
    ticker: "AAPL",
    prices: generatePriceData(165, DAYS_365, 3.5),
    labels: labels365,
    color: "#3b82f6",
  },
  MSFT: {
    name: "마이크로소프트",
    ticker: "MSFT",
    prices: generatePriceData(380, DAYS_365, 6),
    labels: labels365,
    color: "#8b5cf6",
  },
  GOOGL: {
    name: "알파벳(구글)",
    ticker: "GOOGL",
    prices: generatePriceData(140, DAYS_365, 4),
    labels: labels365,
    color: "#10b981",
  },
  AMZN: {
    name: "아마존",
    ticker: "AMZN",
    prices: generatePriceData(180, DAYS_365, 5),
    labels: labels365,
    color: "#f59e0b",
  },
  TSLA: {
    name: "테슬라",
    ticker: "TSLA",
    prices: generatePriceData(250, DAYS_365, 12),
    labels: labels365,
    color: "#ef4444",
  },
  NVDA: {
    name: "엔비디아",
    ticker: "NVDA",
    prices: generatePriceData(850, DAYS_365, 25),
    labels: labels365,
    color: "#06b6d4",
  },
};

export type TimePeriod = "1주" | "1개월" | "3개월" | "6개월" | "1년";

export const timePeriodDays: Record<TimePeriod, number> = {
  "1주": 7,
  "1개월": 30,
  "3개월": 90,
  "6개월": 180,
  "1년": 365,
};

// ─── 자산 배분 ────────────────────────────────────────────────────────────────

export type AllocationCategory = "all" | "equity" | "fixed" | "alternative";

export const assetAllocation: Record<
  AllocationCategory,
  { labels: string[]; values: number[]; colors: string[] }
> = {
  all: {
    labels: ["미국 주식", "해외 주식", "채권", "부동산", "원자재", "현금"],
    values: [42, 18, 22, 8, 6, 4],
    colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#64748b"],
  },
  equity: {
    labels: ["미국 대형주", "미국 중형주", "미국 소형주", "선진국 시장", "신흥국 시장"],
    values: [45, 20, 10, 15, 10],
    colors: ["#1d4ed8", "#3b82f6", "#60a5fa", "#8b5cf6", "#a78bfa"],
  },
  fixed: {
    labels: ["미국 국채", "투자등급 회사채", "하이일드 채권", "물가연동채", "해외 채권"],
    values: [35, 28, 15, 12, 10],
    colors: ["#065f46", "#059669", "#10b981", "#34d399", "#6ee7b7"],
  },
  alternative: {
    labels: ["리츠(REITs)", "금", "석유·가스", "가상자산", "헤지펀드"],
    values: [35, 25, 20, 12, 8],
    colors: ["#92400e", "#d97706", "#f59e0b", "#fbbf24", "#fde68a"],
  },
};

// ─── 성과 차트 ────────────────────────────────────────────────────────────────

export type PerformancePeriod = "monthly" | "quarterly" | "yearly";

export const performanceData: Record<
  PerformancePeriod,
  { labels: string[]; portfolio: number[]; benchmark: number[] }
> = {
  monthly: {
    labels: ["11월", "12월", "1월", "2월", "3월", "4월"],
    portfolio: [2.1, 3.4, -1.2, 4.8, 2.9, 5.87],
    benchmark: [1.8, 2.9, -0.8, 3.5, 2.1, 4.2],
  },
  quarterly: {
    labels: ["2025 3Q", "2025 4Q", "2026 1Q"],
    portfolio: [6.8, 9.1, 8.4],
    benchmark: [5.2, 7.6, 6.9],
  },
  yearly: {
    labels: ["2022", "2023", "2024", "2025", "2026 YTD"],
    portfolio: [-12.4, 22.7, 18.9, 31.2, 8.4],
    benchmark: [-14.1, 19.3, 15.6, 26.8, 6.9],
  },
};

// ─── 관리자 – 사용자 ──────────────────────────────────────────────────────────

export const adminUsers = [
  {
    id: 1,
    name: "김민준",
    email: "minjun.kim@finco.co.kr",
    role: "관리자",
    status: "활성",
    lastLogin: "2026-04-28",
    portfolioValue: "₩42억",
  },
  {
    id: 2,
    name: "이서연",
    email: "seoyeon.lee@finco.co.kr",
    role: "애널리스트",
    status: "활성",
    lastLogin: "2026-04-28",
    portfolioValue: "₩18억",
  },
  {
    id: 3,
    name: "박도현",
    email: "dohyun.park@finco.co.kr",
    role: "트레이더",
    status: "활성",
    lastLogin: "2026-04-27",
    portfolioValue: "₩29억",
  },
  {
    id: 4,
    name: "최지우",
    email: "jiwoo.choi@finco.co.kr",
    role: "애널리스트",
    status: "비활성",
    lastLogin: "2026-04-20",
    portfolioValue: "₩8.9억",
  },
  {
    id: 5,
    name: "정하은",
    email: "haeun.jung@finco.co.kr",
    role: "뷰어",
    status: "활성",
    lastLogin: "2026-04-26",
    portfolioValue: "₩5.6억",
  },
  {
    id: 6,
    name: "한예진",
    email: "yejin.han@finco.co.kr",
    role: "트레이더",
    status: "활성",
    lastLogin: "2026-04-28",
    portfolioValue: "₩31억",
  },
];

export const adminStats = [
  { title: "전체 사용자", value: "128명", change: "이번 달 +12명", icon: "👥" },
  { title: "활성 세션", value: "43", change: "현재 접속 중", icon: "🟢" },
  { title: "총 운용자산(AUM)", value: "₩2,845억", change: "+5.2% MTD", icon: "🏦" },
  { title: "오늘의 알림", value: "7건", change: "긴급 3건", icon: "🔔" },
];