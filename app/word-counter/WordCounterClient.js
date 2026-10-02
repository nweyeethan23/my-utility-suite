"use client";
import { useMemo, useState } from 'react';
import CopyButton from '@/components/CopyButton';

const STOP = new Set('the and for are but not you all any can had her was one our out has have that this with from they will your what when who how its into than then them were been being would there their about which could other these those'.split(' '));

export default function WordCounterClient() {
  const [text, setText] = useState('');
  const s = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    const n = words.length;
    const freq = {};
    words.forEach((w) => { const k = w.toLowerCase().replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''); if (k.length > 2 && !STOP.has(k)) freq[k] = (freq[k] || 0) + 1; });
    const mins = (x) => (n === 0 ? '0 sec' : x < 1 ? `${Math.max(1, Math.round(x * 60))} sec` : `${Math.round(x)} min`);
    return {
      n, chars: text.length, noSpace: text.replace(/\s/g, '').length,
      sentences: (text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || []).filter((x) => x.trim()).length,
      paragraphs: text.split(/\n\s*\n/).filter((p) => p.trim()).length,
      read: mins(n / 225), speak: mins(n / 130),
      top: Object.entries(freq).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 8),
    };
  }, [text]);

  const cards = [['Words', s.n], ['Characters', s.chars], ['No spaces', s.noSpace], ['Sentences', s.sentences], ['Paragraphs', s.paragraphs], ['Reading time', s.read]];
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map(([k, v]) => <div key={k} className="stat"><b>{v}</b><span>{k}</span></div>)}
      </div>
      <div>
        <label htmlFor="txt" className="label">Your text</label>
        <textarea id="txt" className="textarea !min-h-64 !font-sans !text-base" placeholder="Type or paste your text here…" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="flex flex-wrap gap-2">
        <CopyButton text={text} label="Copy text" />
        <button className="btn-ghost" onClick={() => setText('')} disabled={!text}>Clear</button>
        <span className="notice !py-2">Speaking time ≈ {s.speak}</span>
      </div>
      {s.top.length > 0 && (
        <div>
          <h3 className="label">Top keywords</h3>
          <div className="flex flex-wrap gap-2">{s.top.map(([w, c]) => <span key={w} className="rounded-full bg-paper px-3 py-1 text-sm"><b>{w}</b> <span className="text-muted">×{c}</span></span>)}</div>
        </div>
      )}
    </div>
  );
}
