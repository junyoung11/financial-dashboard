// 더미 금융 데이터
export interface FinancialData {
  date: string;
  value: number;
  volume: number;
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface PortfolioItem {
  id: number;
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  return: number;
}

// 시계열 금융 데이터
export const chartData: FinancialData[] = [
  { date: '2024-01-01', value: 28000, volume: 1250000 },
  { date: '2024-01-02', value: 28500, volume: 1320000 },
  { date: '2024-01-03', value: 27800, volume: 1180000 },
  { date: '2024-01-04', value: 29200, volume: 1450000 },
  { date: '2024-01-05', value: 29800, volume: 1380000 },
  { date: '2024-01-08', value: 29500, volume: 1200000 },
  { date: '2024-01-09', value: 30100, volume: 1520000 },
  { date: '2024-01-10', value: 30800, volume: 1680000 },
  { date: '2024-01-11', value: 31200, volume: 1420000 },
  { date: '2024-01-12', value: 32100, volume: 1890000 },
  { date: '2024-01-15', value: 31800, volume: 1350000 },
  { date: '2024-01-16', value: 32500, volume: 1550000 },
  { date: '2024-01-17', value: 32900, volume: 1720000 },
  { date: '2024-01-18', value: 33200, volume: 1480000 },
  { date: '2024-01-19', value: 33800, volume: 1910000 },
  { date: '2024-01-22', value: 33500, volume: 1280000 },
  { date: '2024-01-23', value: 34200, volume: 1650000 },
  { date: '2024-01-24', value: 34900, volume: 1820000 },
  { date: '2024-01-25', value: 35400, volume: 1520000 },
  { date: '2024-01-26', value: 36100, volume: 2050000 },
];

// KPI 데이터
export const kpiData = {
  totalAssets: 1250000,
  portfolioValue: 1450000,
  dailyReturn: 2850,
  returnRate: 16.0,
};

// 주식 데이터
export const stockData: StockData[] = [
  { symbol: 'AAPL', price: 185.52, change: 2.52, changePercent: 1.38 },
  { symbol: 'GOOGL', price: 139.42, change: -1.58, changePercent: -1.12 },
  { symbol: 'MSFT', price: 415.33, change: 5.33, changePercent: 1.30 },
  { symbol: 'AMZN', price: 178.65, change: -2.35, changePercent: -1.30 },
  { symbol: 'NVDA', price: 875.28, change: 15.28, changePercent: 1.77 },
];

// 포트폴리오 데이터
export const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 100,
    buyPrice: 150.0,
    currentPrice: 185.52,
    return: 3552,
  },
  {
    id: 2,
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 50,
    buyPrice: 140.0,
    currentPrice: 139.42,
    return: -29,
  },
  {
    id: 3,
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 75,
    buyPrice: 350.0,
    currentPrice: 415.33,
    return: 4899.75,
  },
  {
    id: 4,
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    quantity: 40,
    buyPrice: 180.0,
    currentPrice: 178.65,
    return: -54,
  },
  {
    id: 5,
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    quantity: 30,
    buyPrice: 600.0,
    currentPrice: 875.28,
    return: 8258.4,
  },
];