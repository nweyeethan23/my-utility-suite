"use client";
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

const words = (t) => t.match(/[\p{L}\p{N}]+/gu) || [];
const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
const SMALL = new Set('a an the and but or for nor on at to by of in as'.split(' '));

const STYLES = [
  ['UPPERCASE', (t) => t.toUpperCase()],
  ['lowercase', (t) => t.toLowerCase()],
  ['Title Case', (t) => t.toLowerCase().replace(/[\p{L}\p{N}']+/gu, (w, i) => (i > 0 && SMALL.has(w) ? w : cap(w)))],
  ['Sentence case', (t) => t.toLowerCase().replace(/(^\s*|[.!?]\s+)(\p{L})/gu, (_, a, b) => a + b.toUpperCase())],
  ['camelCase', (t) => words(t).map((w, i) => (i ? cap(w) : w.toLowerCase())).join('')],
  ['PascalCase', (t) => words(t).map(cap).join('')],
  ['snake_case', (t) => words(t).map((w) => w.toLowerCase()).join('_')],
  ['kebab-case', (t) => words(t).map((w) => w.toLowerCase()).join('-')],
  ['aLtErNaTiNg', (t) => [...t].map((c, i) => (i % 2 ? c.toUpperCase() : c.toLowerCase())).join('')],
];

export default function CaseConverterClient() {
  const [text, setText] = useState('');
  const [out, setOut] = useState('');
  const [active, setActive] = useState('');

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="in" className="label">Your text</label>
        <textarea id="in" className="textarea !font-sans !text-base" placeholder="Type or paste text…" value={text} onChange={(e) => { setText(e.target.value); if (active) setOut(STYLES.find(([n]) => n === active)[1](e.target.value)); }} />
      </div>
      <div className="flex flex-wrap gap-2">
        {STYLES.map(([name, fn]) => (
          <button key={name} className={`btn-ghost ${active === name ? '!border-brand !bg-emerald-50 !text-brand' : ''}`} onClick={() => { setActive(name); setOut(fn(text)); }}>{name}</button>
        ))}
      </div>
      <div>
        <label htmlFor="out" className="label">Result</label>
        <textarea id="out" readOnly className="textarea !font-sans !text-base bg-paper" value={out} placeholder="Choose a style above" />
      </div>
      <CopyButton text={out} label="Copy result" className="btn" />
    </div>
  );
}
