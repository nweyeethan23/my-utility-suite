"use client";
import { useState } from 'react';

const BANDS = [
  [18.5, 'Underweight', '#2563eb'], [25, 'Normal weight', '#0b7a5e'], [30, 'Overweight', '#d97706'], [Infinity, 'Obese', '#dc2626'],
];

export default function BmiCalculatorClient() {
  const [unit, setUnit] = useState('metric');
  const [cm, setCm] = useState('170');
  const [kg, setKg] = useState('65');
  const [ft, setFt] = useState('5');
  const [inch, setInch] = useState('7');
  const [lb, setLb] = useState('143');

  const hM = unit === 'metric' ? (+cm || 0) / 100 : ((+ft || 0) * 12 + (+inch || 0)) * 0.0254;
  const wKg = unit === 'metric' ? +kg || 0 : (+lb || 0) * 0.45359237;
  const bmi = hM > 0 && wKg > 0 ? wKg / (hM * hM) : null;
  const band = bmi ? BANDS.find(([max]) => bmi < max) : null;
  const lo = hM * hM * 18.5, hi = hM * hM * 24.9;
  const show = (kgv) => (unit === 'metric' ? `${kgv.toFixed(1)} kg` : `${(kgv / 0.45359237).toFixed(1)} lb`);
  const pos = bmi ? Math.min(100, Math.max(0, ((bmi - 12) / (40 - 12)) * 100)) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-paper p-1" role="tablist">
        {[['metric', 'Metric (cm, kg)'], ['imperial', 'Imperial (ft, lb)']].map(([id, n]) => (
          <button key={id} role="tab" aria-selected={unit === id} onClick={() => setUnit(id)} className={`rounded-xl px-3 py-2.5 text-sm font-bold ${unit === id ? 'bg-white text-brand shadow' : 'text-muted'}`}>{n}</button>
        ))}
      </div>
      {unit === 'metric' ? (
        <div className="grid grid-cols-2 gap-4">
          <div><label htmlFor="cm" className="label">Height (cm)</label><input id="cm" type="number" inputMode="decimal" className="input" value={cm} onChange={(e) => setCm(e.target.value)} /></div>
          <div><label htmlFor="kg" className="label">Weight (kg)</label><input id="kg" type="number" inputMode="decimal" className="input" value={kg} onChange={(e) => setKg(e.target.value)} /></div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div><label htmlFor="ft" className="label">Feet</label><input id="ft" type="number" className="input" value={ft} onChange={(e) => setFt(e.target.value)} /></div>
          <div><label htmlFor="in" className="label">Inches</label><input id="in" type="number" className="input" value={inch} onChange={(e) => setInch(e.target.value)} /></div>
          <div><label htmlFor="lb" className="label">Weight (lb)</label><input id="lb" type="number" className="input" value={lb} onChange={(e) => setLb(e.target.value)} /></div>
        </div>
      )}

      <div className="result" aria-live="polite">
        <small>Your BMI</small>
        <strong>{bmi ? bmi.toFixed(1) : '—'}</strong>
        {band && <small className="mt-1 !text-base font-bold" style={{ color: '#fff' }}>{band[1]}</small>}
        {bmi && (
          <div className="relative mt-5 h-3 rounded-full" style={{ background: 'linear-gradient(90deg,#2563eb 0 23%,#0b7a5e 23% 47%,#d97706 47% 64%,#dc2626 64%)' }}>
            <span className="absolute -top-1 h-5 w-1.5 rounded bg-white" style={{ left: `calc(${pos}% - 3px)` }} />
          </div>
        )}
      </div>
      {bmi && <p className="notice">Healthy weight range for your height (BMI 18.5–24.9): <b>{show(lo)} – {show(hi)}</b>. BMI is a screening tool, not a diagnosis — talk to a health professional for personal advice.</p>}
    </div>
  );
}
