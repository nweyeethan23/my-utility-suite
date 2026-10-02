"use client";
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

const enc = (s) => { const b = new TextEncoder().encode(s); let bin = ''; b.forEach((x) => (bin += String.fromCharCode(x))); return btoa(bin); };
const dec = (s) => {
  const bin = atob(s.replace(/\s/g, '').replace(/-/g, '+').replace(/_/g, '/'));
  return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
};

export default function Base64Client() {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  let output = '', error = '';
  if (input) {
    try { output = mode === 'encode' ? enc(input) : dec(input); }
    catch { error = mode === 'decode' ? 'This is not valid Base64 text (or it does not decode to readable text).' : 'Could not encode this text.'; }
  }
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-paper p-1" role="tablist">
        {[['encode', 'Encode → Base64'], ['decode', 'Decode ← Base64']].map(([id, n]) => (
          <button key={id} role="tab" aria-selected={mode === id} onClick={() => setMode(id)} className={`rounded-xl px-3 py-2.5 text-sm font-bold ${mode === id ? 'bg-white text-brand shadow' : 'text-muted'}`}>{n}</button>
        ))}
      </div>
      <div>
        <label htmlFor="b-in" className="label">{mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}</label>
        <textarea id="b-in" className="textarea" spellCheck={false} value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Hello, world! สวัสดี 👋' : 'SGVsbG8sIHdvcmxkIQ=='} />
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <div>
        <div className="mb-1.5 flex items-center justify-between"><span className="label !mb-0">Result</span><CopyButton text={output} /></div>
        <textarea readOnly className="textarea bg-paper" value={output} aria-label="Result" />
      </div>
      <button className="btn-ghost" onClick={() => { setInput(output); setMode(mode === 'encode' ? 'decode' : 'encode'); }} disabled={!output}>⇅ Use result as new input</button>
    </div>
  );
}
