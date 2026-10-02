"use client";
import { useCallback, useEffect, useState } from 'react';
import CopyButton from '@/components/CopyButton';

const SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz', upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789', symbol: '!@#$%^&*()-_=+[]{};:,.?',
};
const AMBIG = /[Il1O0o]/g;

// unbiased random int in [0, max)
function rnd(max) {
  const lim = Math.floor(0x100000000 / max) * max; const a = new Uint32Array(1);
  do { crypto.getRandomValues(a); } while (a[0] >= lim);
  return a[0] % max;
}

export default function PasswordGeneratorClient() {
  const [len, setLen] = useState(16);
  const [opt, setOpt] = useState({ lower: true, upper: true, number: true, symbol: true });
  const [noAmbig, setNoAmbig] = useState(false);
  const [pw, setPw] = useState('');

  const pools = Object.keys(SETS).filter((k) => opt[k]).map((k) => (noAmbig ? SETS[k].replace(AMBIG, '') : SETS[k]));
  const poolSize = pools.join('').length;

  const generate = useCallback(() => {
    if (!pools.length) return setPw('');
    const all = pools.join('');
    const chars = pools.map((p) => p[rnd(p.length)]); // guarantee one of each selected type
    while (chars.length < len) chars.push(all[rnd(all.length)]);
    for (let i = chars.length - 1; i > 0; i--) { const j = rnd(i + 1); [chars[i], chars[j]] = [chars[j], chars[i]]; }
    setPw(chars.slice(0, len).join(''));
  }, [pools.join('|'), len]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(generate, [generate]);

  const bits = poolSize ? Math.round(len * Math.log2(poolSize)) : 0;
  const [label, color] = bits < 50 ? ['Weak', '#dc2626'] : bits < 80 ? ['Fair', '#d97706'] : bits < 110 ? ['Strong', '#0b7a5e'] : ['Very strong', '#047857'];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-ink p-5">
        <p className="break-all font-mono text-2xl leading-snug text-signal" aria-live="polite">{pw || 'Select at least one character type'}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <CopyButton text={pw} label="Copy password" className="btn-signal !py-2.5" />
          <button className="btn-ghost !border-white/30 !bg-transparent !text-white" onClick={generate}>↻ Generate new</button>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between"><label htmlFor="len" className="label">Length: {len}</label><span className="text-sm font-bold" style={{ color }}>{label} · ~{bits} bits</span></div>
        <input id="len" type="range" min="8" max="64" value={len} onChange={(e) => setLen(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
        <div className="mt-2 h-2 rounded-full bg-paper"><div className="h-2 rounded-full transition-all" style={{ width: `${Math.min(100, (bits / 128) * 100)}%`, background: color }} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[['lower', 'Lowercase (a–z)'], ['upper', 'Uppercase (A–Z)'], ['number', 'Numbers (0–9)'], ['symbol', 'Symbols (!@#…)']].map(([k, n]) => (
          <label key={k} className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3 font-medium">
            <input type="checkbox" className="h-5 w-5 accent-[var(--color-brand)]" checked={opt[k]} onChange={(e) => setOpt({ ...opt, [k]: e.target.checked })} />{n}
          </label>
        ))}
      </div>
      <label className="flex cursor-pointer items-center gap-3 text-sm"><input type="checkbox" className="h-5 w-5 accent-[var(--color-brand)]" checked={noAmbig} onChange={(e) => setNoAmbig(e.target.checked)} /> Avoid look-alike characters (I, l, 1, O, 0)</label>
    </div>
  );
}
