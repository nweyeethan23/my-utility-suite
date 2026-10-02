"use client";
import { useState, useEffect } from 'react';

const AMOUNTS = [1, 5, 10, 50, 100, 500, 1000];
const fmt = (n, max = 2) =>
  typeof n === 'number' && !isNaN(n)
    ? n.toLocaleString(undefined, {
        maximumFractionDigits: max,
        minimumFractionDigits: n < 1 ? Math.min(4, max) : 2,
      })
    : '—';

export default function ExchangeRateClient({ initialFrom = 'USD', initialTo = 'THB' }) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [amount, setAmount] = useState('1');
  const [data, setData] = useState(null); // { rates, updated }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    fetch(`/api/rates?base=${from}`)
      .then((r) =>
        r.json().then((j) => {
          if (!r.ok) throw new Error(j.error || 'Failed to load rates');
          return j;
        })
      )
      .then((j) => {
        if (!cancelled) setData(j);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [from]);

  const codes = data?.rates ? Object.keys(data.rates).sort() : [initialFrom, initialTo];
  const rate = data?.rates?.[to];
  const amt = parseFloat(amount);
  const result = rate && !isNaN(amt) && amt >= 0 ? amt * rate : null;

  return (
    <div className="space-y-6">
      {error && (
        <p className="error" role="alert">
          Couldn’t load live rates: {error}. Please try again in a minute.
        </p>
      )}

      <div>
        <label htmlFor="amt" className="label">
          Amount
        </label>
        <input
          id="amt"
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input !text-2xl !font-bold"
        />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <div>
          <label htmlFor="from" className="label">
            From
          </label>
          <select id="from" className="select" value={from} onChange={(e) => setFrom(e.target.value)}>
            {codes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn-ghost !h-[50px] !px-4 text-lg"
          aria-label="Swap currencies"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
        >
          ⇄
        </button>
        <div>
          <label htmlFor="to" className="label">
            To
          </label>
          <select id="to" className="select" value={to} onChange={(e) => setTo(e.target.value)}>
            {codes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="result" aria-live="polite">
        <small>
          {amount || 0} {from} =
        </small>
        <strong>
          {loading && !data ? 'Loading rates…' : result != null ? `${fmt(result, 4)} ${to}` : error ? 'Rate unavailable' : '—'}
        </strong>
        {typeof rate === 'number' && (
          <small className="mt-2 block">
            1 {from} = {rate.toFixed(4)} {to}
            {data?.updated ? ` · provider updated ${new Date(data.updated).toLocaleString()}` : ' · live provider rate'}
          </small>
        )}
      </div>

      {typeof rate === 'number' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="mb-2 text-left font-display text-lg font-bold">
              {from} to {to} conversion table
            </caption>
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="py-2 pr-4 font-semibold">{from}</th>
                <th className="py-2 font-semibold">{to}</th>
              </tr>
            </thead>
            <tbody>
              {AMOUNTS.map((a) => (
                <tr key={a} className="border-b border-line/60">
                  <td className="py-2 pr-4 font-semibold">{a.toLocaleString()}</td>
                  <td className="py-2">{fmt(a * rate, 4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="notice">
        Mid-market rates for information only. Banks and transfer services add fees, so the amount you receive may be lower.
      </p>
    </div>
  );
}