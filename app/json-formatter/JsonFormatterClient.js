"use client";
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

export default function JsonFormatterClient() {
  const [src, setSrc] = useState('');
  const [indent, setIndent] = useState('2');
  const [out, setOut] = useState('');
  const [msg, setMsg] = useState({ ok: null, text: '' });

  const run = (mode) => {
    if (!src.trim()) return setMsg({ ok: false, text: 'Paste some JSON first.' });
    try {
      const obj = JSON.parse(src);
      const space = indent === 'tab' ? '\t' : +indent;
      if (mode === 'minify') setOut(JSON.stringify(obj));
      else if (mode === 'format') setOut(JSON.stringify(obj, null, space));
      setMsg({ ok: true, text: mode === 'validate' ? '✓ Valid JSON' : mode === 'minify' ? '✓ Minified' : '✓ Valid JSON — formatted' });
    } catch (e) {
      setOut(''); setMsg({ ok: false, text: `Invalid JSON: ${e.message}` });
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="src" className="label">Input JSON</label>
        <textarea id="src" className="textarea !min-h-52" spellCheck={false} placeholder='{"name":"UtilSuite - Smart Tools","tools":21}' value={src} onChange={(e) => { setSrc(e.target.value); setMsg({ ok: null, text: '' }); }} />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className="btn" onClick={() => run('format')}>Format</button>
        <button className="btn-ghost" onClick={() => run('minify')}>Minify</button>
        <button className="btn-ghost" onClick={() => run('validate')}>Validate</button>
        <select aria-label="Indent" className="select !w-auto" value={indent} onChange={(e) => setIndent(e.target.value)}>
          <option value="2">2 spaces</option><option value="4">4 spaces</option><option value="tab">Tab</option>
        </select>
        <button className="btn-ghost" onClick={() => { setSrc(''); setOut(''); setMsg({ ok: null, text: '' }); }}>Clear</button>
      </div>
      {msg.text && <p className={msg.ok ? 'notice !border-emerald-200 !bg-emerald-50 !text-emerald-800 font-semibold' : 'error'} role="status">{msg.text}</p>}
      {out && (
        <div>
          <div className="mb-1.5 flex items-center justify-between"><span className="label !mb-0">Output</span><CopyButton text={out} /></div>
          <textarea readOnly className="textarea !min-h-52 bg-paper" value={out} spellCheck={false} aria-label="Output JSON" />
        </div>
      )}
    </div>
  );
}
