export interface StockData {
  date: string;
  price: number;
  volume: number;
}

export interface PortfolioAsset {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  change: number;
}

export interface PerformanceMetric {
  label: string;
  value: number;
  percentage: number;
  trend: 'up' | 'down';
}

// 기준 가격에서 랜덤 워크로 시계열 생성
function generatePriceSeries(
  count: number,
  basePrice: number,
  volatility: number
): number[] {
  const prices: number[] = [basePrice];
  for (let i = 1; i < count; i++) {
    const change = (Math.random() - 0.48) * volatility;
    prices.push(Math.round((prices[i - 1] + change) * 100) / 100);
  }
  return prices;
}

// 볼륨 시리즈 생성
function generateVolumeSeries(count: number, baseVolume: number): number[] {
  return Array.from({ length: count }, () =>
    Math.round(baseVolume * (0.5 + Math.random()))
  );
}

// ── 1D: 9시~18시 1시간 간격 (10개 데이터 포인트) ──
const hours1D = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const prices1D = generatePriceSeries(hours1D.length, 35000, 300);
const volumes1D = generateVolumeSeries(hours1D.length, 500000);

export const stockData1D: StockData[] = hours1D.map((h, i) => ({
  date: h,
  price: prices1D[i],
  volume: volumes1D[i],
}));

// ── 1W: 최근 7일 ──
const prices1W = generatePriceSeries(7, 34500, 600);
const volumes1W = generateVolumeSeries(7, 1200000);

export const stockData1W: StockData[] = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (6 - i));
  return {
    date: `${d.getMonth() + 1}/${d.getDate()}`,
    price: prices1W[i],
    volume: volumes1W[i],
  };
});

// ── 1M: 최근 30일 ──
const prices1M = generatePriceSeries(30, 33800, 500);
const volumes1M = generateVolumeSeries(30, 1300000);

export const stockData1M: StockData[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return {
    date: `${d.getMonth() + 1}/${d.getDate()}`,
    price: prices1M[i],
    volume: volumes1M[i],
  };
});

// ── 3M: 최근 90일 (5일 단위 레이블) ──
const prices3M = generatePriceSeries(90, 31000, 450);
const volumes3M = generateVolumeSeries(90, 1400000);

export const stockData3M: StockData[] = Array.from({ length: 90 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (89 - i));
  return {
    date: i % 5 === 0 ? `${d.getMonth() + 1}/${d.getDate()}` : '',
    price: prices3M[i],
    volume: volumes3M[i],
  };
});

// ── 1Y: 최근 12개월 (월별) ──
const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const prices1Y = generatePriceSeries(12, 28500, 1200);
const volumes1Y = generateVolumeSeries(12, 1800000);

const now = new Date();
export const stockData1Y: StockData[] = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
  return {
    date: monthNames[d.getMonth()],
    price: prices1Y[i],
    volume: volumes1Y[i],
  };
});

// 기본 주가 데이터 (1Y와 동일)
export const stockPriceData: StockData[] = stockData1Y;

// 포트폴리오 자산
export const portfolioAssets: PortfolioAsset[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 50, price: 180.50, change: 2.45 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 30, price: 140.25, change: 1.85 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 40, price: 380.50, change: 3.12 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 25, price: 242.80, change: -1.50 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 20, price: 175.60, change: 2.75 },
];

// 성과 메트릭
export const performanceMetrics: PerformanceMetric[] = [
  { label: '총 자산', value: 145250, percentage: 15.8, trend: 'up' },
  { label: '일일 수익', value: 2150, percentage: 2.1, trend: 'up' },
  { label: '월간 수익', value: 12850, percentage: 9.7, trend: 'up' },
  { label: '연간 수익률', value: 24.5, percentage: 5.3, trend: 'down' },
];

// 자산 배분 데이터
export const assetAllocation = [
  { name: '주식', value: 65, color: '#3b82f6' },
  { name: '채권', value: 20, color: '#10b981' },
  { name: '부동산', value: 10, color: '#f59e0b' },
  { name: '현금', value: 5, color: '#6366f1' },
];

// 산업별 분포
export const industryDistribution = [
  { name: '기술', value: 35 },
  { name: '금융', value: 20 },
  { name: '헬스케어', value: 15 },
  { name: '소비재', value: 15 },
  { name: '에너지', value: 15 },
];