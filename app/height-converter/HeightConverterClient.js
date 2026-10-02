"use client";
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

const COMMON = [[5, 0], [5, 3], [5, 6], [5, 9], [6, 0], [6, 3]];

export default function HeightConverterClient() {
  const [mode, setMode] = useState('toCm');
  const [ft, setFt] = useState('5');
  const [inch, setInch] = useState('9');
  const [cm, setCm] = useState('175');

  const totalIn = (parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0);
  const cmOut = (totalIn * 2.54).toFixed(2);
  const inFromCm = (parseFloat(cm) || 0) / 2.54;
  const ftOut = Math.floor(inFromCm / 12), inOut = (inFromCm - ftOut * 12).toFixed(1);
  const answer = mode === 'toCm' ? `${cmOut} cm` : `${ftOut} ft ${inOut} in`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-paper p-1" role="tablist">
        {[['toCm', 'Feet & inches → cm'], ['toFt', 'cm → feet & inches']].map(([id, name]) => (
          <button key={id} role="tab" aria-selected={mode === id} onClick={() => setMode(id)}
            className={`rounded-xl px-3 py-2.5 text-sm font-bold ${mode === id ? 'bg-white text-brand shadow' : 'text-muted'}`}>{name}</button>
        ))}
      </div>

      {mode === 'toCm' ? (
        <div className="grid grid-cols-2 gap-4">
          <div><label htmlFor="ft" className="label">Feet</label><input id="ft" type="number" inputMode="decimal" className="input" value={ft} onChange={(e) => setFt(e.target.value)} /></div>
          <div><label htmlFor="in" className="label">Inches</label><input id="in" type="number" inputMode="decimal" className="input" value={inch} onChange={(e) => setInch(e.target.value)} /></div>
        </div>
      ) : (
        <div><label htmlFor="cm" className="label">Centimeters</label><input id="cm" type="number" inputMode="decimal" className="input" value={cm} onChange={(e) => setCm(e.target.value)} /></div>
      )}

      <div className="result" aria-live="polite">
        <small>Your height</small><strong>{answer}</strong>
        <small className="mt-1">{mode === 'toCm' ? `${totalIn} in × 2.54` : `${cm || 0} cm ÷ 2.54 = ${inFromCm.toFixed(2)} in`}</small>
      </div>
      <CopyButton text={answer} label="Copy result" />

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="mb-2 text-left font-display text-lg font-bold">Common heights</caption>
          <thead><tr className="border-b border-line text-muted"><th className="py-2">Feet & inches</th><th>Centimeters</th></tr></thead>
          <tbody>{COMMON.map(([f, i]) => (
            <tr key={`${f}${i}`} className="border-b border-line/60"><td className="py-2 font-semibold">{f}′ {i}″</td><td>{((f * 12 + i) * 2.54).toFixed(1)} cm</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
