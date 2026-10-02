"use client";
import { useState } from 'react';

// factor = how many base units in 1 of this unit
const DATA = {
  Length: { base: 'm', u: { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.344 } },
  Weight: { base: 'kg', u: { mg: 1e-6, g: 0.001, kg: 1, tonne: 1000, ounce: 0.028349523, pound: 0.45359237, stone: 6.35029318 } },
  Volume: { base: 'L', u: { mL: 0.001, liter: 1, 'm³': 1000, 'tsp (US)': 0.00492892, 'tbsp (US)': 0.0147868, 'cup (US)': 0.236588, 'gallon (US)': 3.785411784, 'gallon (UK)': 4.54609 } },
  Speed: { base: 'm/s', u: { 'm/s': 1, 'km/h': 1 / 3.6, mph: 0.44704, knot: 0.514444 } },
  Temperature: { temp: true, u: { '°C': 1, '°F': 1, K: 1 } },
};

const toC = { '°C': (v) => v, '°F': (v) => (v - 32) * 5 / 9, K: (v) => v - 273.15 };
const fromC = { '°C': (v) => v, '°F': (v) => v * 9 / 5 + 32, K: (v) => v + 273.15 };

export default function UnitConverterClient() {
  const [cat, setCat] = useState('Length');
  const units = Object.keys(DATA[cat].u);
  const [from, setFrom] = useState('km');
  const [to, setTo] = useState('mile');
  const [val, setVal] = useState('1');

  const pick = (c) => { const k = Object.keys(DATA[c].u); setCat(c); setFrom(k[0]); setTo(k[1]); };
  const v = parseFloat(val);
  let res = null;
  if (!isNaN(v)) res = DATA[cat].temp ? fromC[to](toC[from](v)) : (v * DATA[cat].u[from]) / DATA[cat].u[to];
  const shown = res == null ? '—' : (Math.abs(res) >= 1e9 || (Math.abs(res) < 1e-4 && res !== 0) ? res.toExponential(4) : (Math.round(res * 1e8) / 1e8).toLocaleString(undefined, { maximumFractionDigits: 8 }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2" role="tablist">
        {Object.keys(DATA).map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => pick(c)} className={`btn-ghost ${cat === c ? '!border-brand !bg-emerald-50 !text-brand' : ''}`}>{c}</button>
        ))}
      </div>
      <div><label htmlFor="v" className="label">Value</label><input id="v" type="number" inputMode="decimal" className="input !text-2xl !font-bold" value={val} onChange={(e) => setVal(e.target.value)} /></div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
        <div><label htmlFor="uf" className="label">From</label><select id="uf" className="select" value={from} onChange={(e) => setFrom(e.target.value)}>{units.map((u) => <option key={u}>{u}</option>)}</select></div>
        <button className="btn-ghost !h-[50px] !px-4 text-lg" aria-label="Swap units" onClick={() => { setFrom(to); setTo(from); }}>⇄</button>
        <div><label htmlFor="ut" className="label">To</label><select id="ut" className="select" value={to} onChange={(e) => setTo(e.target.value)}>{units.map((u) => <option key={u}>{u}</option>)}</select></div>
      </div>
      <div className="result" aria-live="polite"><small>{val || 0} {from} =</small><strong>{shown} {to}</strong></div>
    </div>
  );
}
