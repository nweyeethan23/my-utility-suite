// Popular pairs get their own indexable page: /exchange-rate/usd-to-thb
export const PAIRS = [
  ['USD','THB'],['USD','MMK'],['USD','EUR'],['USD','GBP'],['USD','JPY'],['USD','INR'],['USD','CNY'],['USD','SGD'],
  ['USD','MYR'],['USD','AUD'],['USD','CAD'],['USD','KRW'],['USD','VND'],['USD','PHP'],['USD','IDR'],['USD','LAK'],
  ['THB','USD'],['THB','MMK'],['THB','EUR'],['THB','JPY'],['THB','CNY'],['THB','GBP'],['THB','LAK'],['THB','KRW'],
  ['MMK','THB'],['MMK','USD'],['EUR','USD'],['EUR','THB'],['EUR','GBP'],['GBP','USD'],['GBP','THB'],
  ['JPY','THB'],['JPY','USD'],['CNY','THB'],['CNY','USD'],['SGD','THB'],['AUD','THB'],['KRW','THB'],['INR','THB'],['INR','USD'],
];

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
