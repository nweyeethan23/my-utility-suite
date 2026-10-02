"use client";
import { useState } from 'react';

const n = (v) => (v === '' || isNaN(+v) ? null : +v);
const out = (v) => (v == null || !isFinite(v) ? '—' : (Math.round(v * 1e6) / 1e6).toLocaleString(undefined, { maximumFractionDigits: 6 }));

function Row({ title, a, b, la, lb, setA, setB, children, result }) {
  return (
    <div className="rounded-2xl border border-line p-5">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <label><span className="label">{la}</span><input type="number" inputMode="decimal" className="input" value={a} onChange={(e) => setA(e.target.value)} /></label>
        <label><span className="label">{lb}</span><input type="number" inputMode="decimal" className="input" value={b} onChange={(e) => setB(e.target.value)} /></label>
      </div>
      <p className="mt-4 rounded-xl bg-ink px-4 py-3 text-white" aria-live="polite">{children} <b className="font-display text-xl text-signal">{result}</b></p>
    </div>
  );
}

export default function PercentageCalculatorClient() {
  const [a1, setA1] = useState('15'), [b1, setB1] = useState('200');
  const [a2, setA2] = useState('30'), [b2, setB2] = useState('120');
  const [a3, setA3] = useState('80'), [b3, setB3] = useState('100');
  const r1 = n(a1) != null && n(b1) != null ? (n(a1) / 100) * n(b1) : null;
  const r2 = n(a2) != null && n(b2) ? (n(a2) / n(b2)) * 100 : null;
  const r3 = n(a3) != null && n(b3) != null && n(a3) !== 0 ? ((n(b3) - n(a3)) / Math.abs(n(a3))) * 100 : null;
  return (
    <div className="space-y-4">
      <Row title="What is X% of Y?" a={a1} b={b1} la="Percent (%)" lb="Of number" setA={setA1} setB={setB1} result={out(r1)}>Answer:</Row>
      <Row title="X is what % of Y?" a={a2} b={b2} la="Number X" lb="Total Y" setA={setA2} setB={setB2} result={r2 == null ? '—' : `${out(r2)}%`}>Answer:</Row>
      <Row title="Percentage increase / decrease" a={a3} b={b3} la="From (old)" lb="To (new)" setA={setA3} setB={setB3} result={r3 == null ? '—' : `${r3 > 0 ? '+' : ''}${out(r3)}%`}>{r3 == null ? 'Change:' : r3 >= 0 ? 'Increase:' : 'Decrease:'}</Row>
    </div>
  );
}
