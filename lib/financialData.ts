// ─── Portfolio Summary ───────────────────────────────────────────────────────

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

// ─── Portfolio Cards ──────────────────────────────────────────────────────────

export const portfolioCards = [
  {
    title: "Total Portfolio Value",
    value: "$1,284,530",
    change: "+$8,342",
    changePct: "+0.65%",
    positive: true,
    icon: "💰",
    description: "Total assets under management",
  },
  {
    title: "Today's P&L",
    value: "+$8,342",
    change: "vs yesterday",
    changePct: "+0.65%",
    positive: true,
    icon: "📈",
    description: "Profit & Loss for today",
  },
  {
    title: "Monthly Return",
    value: "+5.87%",
    change: "+$71,324",
    changePct: "This month",
    positive: true,
    icon: "📊",
    description: "Return on investment this month",
  },
  {
    title: "Risk Score",
    value: "6.4 / 10",
    change: "Moderate",
    changePct: "Risk Level",
    positive: null,
    icon: "⚖️",
    description: "Portfolio risk assessment",
  },
];

// ─── Stock / Price Data ───────────────────────────────────────────────────────

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
  const now = new Date(2026, 3, 28); // April 28, 2026
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    labels.push(
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
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
    name: "Apple Inc.",
    ticker: "AAPL",
    prices: generatePriceData(165, DAYS_365, 3.5),
    labels: labels365,
    color: "#3b82f6",
  },
  MSFT: {
    name: "Microsoft Corp.",
    ticker: "MSFT",
    prices: generatePriceData(380, DAYS_365, 6),
    labels: labels365,
    color: "#8b5cf6",
  },
  GOOGL: {
    name: "Alphabet Inc.",
    ticker: "GOOGL",
    prices: generatePriceData(140, DAYS_365, 4),
    labels: labels365,
    color: "#10b981",
  },
  AMZN: {
    name: "Amazon.com Inc.",
    ticker: "AMZN",
    prices: generatePriceData(180, DAYS_365, 5),
    labels: labels365,
    color: "#f59e0b",
  },
  TSLA: {
    name: "Tesla Inc.",
    ticker: "TSLA",
    prices: generatePriceData(250, DAYS_365, 12),
    labels: labels365,
    color: "#ef4444",
  },
  NVDA: {
    name: "NVIDIA Corp.",
    ticker: "NVDA",
    prices: generatePriceData(850, DAYS_365, 25),
    labels: labels365,
    color: "#06b6d4",
  },
};

export type TimePeriod = "1W" | "1M" | "3M" | "6M" | "1Y";

export const timePeriodDays: Record<TimePeriod, number> = {
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "6M": 180,
  "1Y": 365,
};

// ─── Asset Allocation ─────────────────────────────────────────────────────────

export type AllocationCategory = "all" | "equity" | "fixed" | "alternative";

export const assetAllocation: Record<
  AllocationCategory,
  { labels: string[]; values: number[]; colors: string[] }
> = {
  all: {
    labels: ["US Stocks", "Int'l Stocks", "Bonds", "Real Estate", "Commodities", "Cash"],
    values: [42, 18, 22, 8, 6, 4],
    colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#64748b"],
  },
  equity: {
    labels: ["US Large Cap", "US Mid Cap", "US Small Cap", "Developed Markets", "Emerging Markets"],
    values: [45, 20, 10, 15, 10],
    colors: ["#1d4ed8", "#3b82f6", "#60a5fa", "#8b5cf6", "#a78bfa"],
  },
  fixed: {
    labels: ["US Treasury", "Corporate IG", "Corporate HY", "TIPS", "Intl Bonds"],
    values: [35, 28, 15, 12, 10],
    colors: ["#065f46", "#059669", "#10b981", "#34d399", "#6ee7b7"],
  },
  alternative: {
    labels: ["REITs", "Gold", "Oil & Gas", "Crypto", "Hedge Funds"],
    values: [35, 25, 20, 12, 8],
    colors: ["#92400e", "#d97706", "#f59e0b", "#fbbf24", "#fde68a"],
  },
};

// ─── Performance Bar Chart ────────────────────────────────────────────────────

export type PerformancePeriod = "monthly" | "quarterly" | "yearly";

export const performanceData: Record<
  PerformancePeriod,
  { labels: string[]; portfolio: number[]; benchmark: number[] }
> = {
  monthly: {
    labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    portfolio: [2.1, 3.4, -1.2, 4.8, 2.9, 5.87],
    benchmark: [1.8, 2.9, -0.8, 3.5, 2.1, 4.2],
  },
  quarterly: {
    labels: ["Q3 2025", "Q4 2025", "Q1 2026"],
    portfolio: [6.8, 9.1, 8.4],
    benchmark: [5.2, 7.6, 6.9],
  },
  yearly: {
    labels: ["2022", "2023", "2024", "2025", "2026 YTD"],
    portfolio: [-12.4, 22.7, 18.9, 31.2, 8.4],
    benchmark: [-14.1, 19.3, 15.6, 26.8, 6.9],
  },
};

// ─── Admin – Users ────────────────────────────────────────────────────────────

export const adminUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@finco.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2026-04-28",
    portfolioValue: "$4.2M",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.chen@finco.com",
    role: "Analyst",
    status: "Active",
    lastLogin: "2026-04-28",
    portfolioValue: "$1.8M",
  },
  {
    id: 3,
    name: "Michael Torres",
    email: "m.torres@finco.com",
    role: "Trader",
    status: "Active",
    lastLogin: "2026-04-27",
    portfolioValue: "$2.9M",
  },
  {
    id: 4,
    name: "Emily Park",
    email: "emily.park@finco.com",
    role: "Analyst",
    status: "Inactive",
    lastLogin: "2026-04-20",
    portfolioValue: "$890K",
  },
  {
    id: 5,
    name: "James Wilson",
    email: "j.wilson@finco.com",
    role: "Viewer",
    status: "Active",
    lastLogin: "2026-04-26",
    portfolioValue: "$560K",
  },
  {
    id: 6,
    name: "Lisa Rodriguez",
    email: "l.rodriguez@finco.com",
    role: "Trader",
    status: "Active",
    lastLogin: "2026-04-28",
    portfolioValue: "$3.1M",
  },
];

export const adminStats = [
  { title: "Total Users", value: "128", change: "+12 this month", icon: "👥" },
  { title: "Active Sessions", value: "43", change: "Right now", icon: "🟢" },
  { title: "Total AUM", value: "$284.5M", change: "+5.2% MTD", icon: "🏦" },
  { title: "Alerts Today", value: "7", change: "3 critical", icon: "🔔" },
];