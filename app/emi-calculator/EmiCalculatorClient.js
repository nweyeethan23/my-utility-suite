"use client";
import { useMemo, useState } from 'react';

const f = (v) => v.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

export default function EmiCalculatorClient() {
  const [amount, setAmount] = useState('100000');
  const [rate, setRate] = useState('7.5');
  const [term, setTerm] = useState('5');
  const [unit, setUnit] = useState('years');

  const r = useMemo(() => {
    const P = +amount, annual = +rate, months = Math.round(unit === 'years' ? +term * 12 : +term);
    if (!(P > 0) || !(months > 0) || annual < 0 || isNaN(annual)) return null;
    const i = annual / 1200;
    const emi = i === 0 ? P / months : (P * i * (1 + i) ** months) / ((1 + i) ** months - 1);
    const rows = []; let bal = P, ip = 0, pp = 0;
    for (let m = 1; m <= months; m++) {
      const int = bal * i, prin = emi - int; bal = Math.max(0, bal - prin); ip += int; pp += prin;
      if (m % 12 === 0 || m === months) { rows.push({ y: Math.ceil(m / 12), ip, pp, bal }); ip = 0; pp = 0; }
    }
    const total = emi * months;
    return { emi, total, interest: total - P, P, rows };
  }, [amount, rate, term, unit]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div><label htmlFor="amt" className="label">Loan amount</label><input id="amt" type="number" inputMode="decimal" className="input" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
        <div><label htmlFor="rate" className="label">Interest rate (% / year)</label><input id="rate" type="number" step="0.01" inputMode="decimal" className="input" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
        <div>
          <label htmlFor="term" className="label">Term</label>
          <div className="flex gap-2">
            <input id="term" type="number" inputMode="decimal" className="input" value={term} onChange={(e) => setTerm(e.target.value)} />
            <select aria-label="Term unit" className="select !w-32" value={unit} onChange={(e) => setUnit(e.target.value)}><option>years</option><option>months</option></select>
          </div>
        </div>
      </div>

      {r ? (
        <>
          <div className="result" aria-live="polite">
            <small>Monthly EMI</small><strong>{f(r.emi)}</strong>
            <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-white/20" aria-hidden="true">
              <span style={{ width: `${(r.P / r.total) * 100}%` }} className="bg-signal" /><span className="flex-1 bg-rose-400" />
            </div>
            <div className="mt-2 flex justify-between text-xs text-white/70"><span>■ Principal</span><span>■ Interest</span></div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="stat"><b>{f(r.P)}</b><span>Principal</span></div>
            <div className="stat"><b>{f(r.interest)}</b><span>Total interest</span></div>
            <div className="stat"><b>{f(r.total)}</b><span>Total payment</span></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="mb-2 text-left font-display text-lg font-bold">Yearly breakdown</caption>
              <thead><tr className="border-b border-line text-muted"><th className="py-2">Year</th><th>Principal paid</th><th>Interest paid</th><th>Balance</th></tr></thead>
              <tbody>{r.rows.map((x) => <tr key={x.y} className="border-b border-line/60"><td className="py-2 font-semibold">{x.y}</td><td>{f(x.pp)}</td><td>{f(x.ip)}</td><td>{f(x.bal)}</td></tr>)}</tbody>
            </table>
          </div>
        </>
      ) : <p className="notice">Enter a loan amount, a rate and a term to see your monthly payment.</p>}
      <p className="notice">Estimate only. Fees, insurance and rate changes are not included and this is not financial advice.</p>
    </div>
  );
}
