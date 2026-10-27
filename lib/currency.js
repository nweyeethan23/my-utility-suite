// Popular pairs are listed first (hub page, related links). Every pair in PAIRS gets its own indexable page.
export const POPULAR_PAIRS = [
  ['USD','THB'],['USD','MMK'],['USD','EUR'],['USD','GBP'],['USD','JPY'],['USD','INR'],['USD','CNY'],['USD','SGD'],
  ['USD','MYR'],['USD','AUD'],['USD','CAD'],['USD','KRW'],['USD','VND'],['USD','PHP'],['USD','IDR'],['USD','LAK'],
  ['THB','USD'],['THB','MMK'],['THB','EUR'],['THB','JPY'],['THB','CNY'],['THB','GBP'],['THB','LAK'],['THB','KRW'],
  ['MMK','THB'],['MMK','USD'],['EUR','USD'],['EUR','THB'],['EUR','GBP'],['GBP','USD'],['GBP','THB'],
  ['JPY','THB'],['JPY','USD'],['CNY','THB'],['CNY','USD'],['SGD','THB'],['AUD','THB'],['KRW','THB'],['INR','THB'],['INR','USD'],
];

// Long-tail coverage: every currency paired with each hub currency, in both directions.
// Hubs are the currencies people most often convert to/from (USD, THB, MMK, LAK, EUR, GBP).
const CODES = ['USD','THB','MMK','LAK','EUR','GBP','JPY','CNY','INR','SGD','MYR','AUD','CAD','KRW','VND','PHP','IDR','KHR','HKD','AED'];
const HUBS = ['USD','THB','MMK','LAK','EUR','GBP'];
const seen = new Set();
export const PAIRS = [...POPULAR_PAIRS, ...HUBS.flatMap((h) => CODES.filter((c) => c !== h).flatMap((c) => [[c, h], [h, c]]))]
  .filter(([a, b]) => { const k = a + b; if (seen.has(k)) return false; seen.add(k); return true; });

export const currencyName = (code) => {
  try { return new Intl.DisplayNames(['en'], { type: 'currency' }).of(code) || code; } catch { return code; }
};

// Server-side rate fetch (cached 1h by Next). Uses EXCHANGE_RATE_API_KEY if set,
// otherwise the free keyless open.er-api.com feed. The key never reaches the browser.
export async function fetchRates(base) {
  const key = process.env.EXCHANGE_RATE_API_KEY;
  const url = key
    ? `https://v6.exchangerate-api.com/v6/${key}/latest/${base}`
    : `https://open.er-api.com/v6/latest/${base}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Rate provider returned ${res.status}`);
  const data = await res.json();
  const rates = data.conversion_rates || data.rates;
  if (data.result === 'error' || !rates) throw new Error(data['error-type'] || 'Rate provider error');
  return { base, rates, updated: data.time_last_update_utc || null };
}

// Stable facts used to make each pair page unique and informative.
export const CURRENCY_INFO = {
  USD: { symbol: '$', region: 'the United States', bank: 'the Federal Reserve' },
  THB: { symbol: '฿', region: 'Thailand', bank: 'the Bank of Thailand' },
  MMK: { symbol: 'K', region: 'Myanmar', bank: 'the Central Bank of Myanmar' },
  EUR: { symbol: '€', region: 'the euro area', bank: 'the European Central Bank' },
  GBP: { symbol: '£', region: 'the United Kingdom', bank: 'the Bank of England' },
  JPY: { symbol: '¥', region: 'Japan', bank: 'the Bank of Japan' },
  INR: { symbol: '₹', region: 'India', bank: 'the Reserve Bank of India' },
  CNY: { symbol: '¥', region: 'mainland China', bank: 'the People’s Bank of China' },
  SGD: { symbol: 'S$', region: 'Singapore', bank: 'the Monetary Authority of Singapore' },
  MYR: { symbol: 'RM', region: 'Malaysia', bank: 'Bank Negara Malaysia' },
  AUD: { symbol: 'A$', region: 'Australia', bank: 'the Reserve Bank of Australia' },
  CAD: { symbol: 'C$', region: 'Canada', bank: 'the Bank of Canada' },
  KRW: { symbol: '₩', region: 'South Korea', bank: 'the Bank of Korea' },
  VND: { symbol: '₫', region: 'Vietnam', bank: 'the State Bank of Vietnam' },
  PHP: { symbol: '₱', region: 'the Philippines', bank: 'Bangko Sentral ng Pilipinas' },
  IDR: { symbol: 'Rp', region: 'Indonesia', bank: 'Bank Indonesia' },
  LAK: { symbol: '₭', region: 'Laos', bank: 'the Bank of the Lao PDR' },
  KHR: { symbol: '៛', region: 'Cambodia', bank: 'the National Bank of Cambodia' },
  HKD: { symbol: 'HK$', region: 'Hong Kong', bank: 'the Hong Kong Monetary Authority' },
  AED: { symbol: 'د.إ', region: 'the United Arab Emirates', bank: 'the Central Bank of the UAE' },
};

// Number formatting that keeps small rates readable and large rates compact.
export function formatRate(v) {
  const digits = v >= 100 ? 2 : v >= 1 ? 4 : 6;
  return v.toLocaleString('en-US', { maximumFractionDigits: digits });
}
export function formatAmount(v) {
  const digits = v >= 1000 ? 2 : v >= 1 ? 2 : 4;
  return v.toLocaleString('en-US', { maximumFractionDigits: digits });
}
