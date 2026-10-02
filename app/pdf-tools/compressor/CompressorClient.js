"use client";
import { useState } from 'react';
import FileUploadBox from '@/components/FileUploadBox';
import { PDFDocument } from 'pdf-lib';

const LEVELS = [
  ['recommended', 'Recommended', 'Rebuilds the file with compact object streams'],
  ['less', 'Light', 'Keeps the original structure; smallest change'],
];

export default function CompressorClient() {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState('recommended');
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState(null);
  const [error, setError] = useState('');

  const run = async () => {
    setBusy(true); setError(''); setOut(null);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const bytes = await doc.save({ useObjectStreams: level !== 'less', addDefaultPages: false });
      const blob = new Blob([bytes], { type: 'application/pdf' });
      setOut({ url: URL.createObjectURL(blob), before: file.size, after: blob.size });
    } catch { setError('This PDF could not be processed. It may be damaged or password-protected.'); }
    setBusy(false);
  };
  const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
  const saved = out ? Math.max(0, ((out.before - out.after) / out.before) * 100) : 0;

  return (
    <div className="space-y-5">
      <FileUploadBox onFilesAccepted={(f) => { setFile(f[0]); setOut(null); setError(''); }} accept={{ 'application/pdf': ['.pdf'] }} title="PDF files only" />
      {file && (
        <>
          <p className="notice"><b>{file.name}</b> · {kb(file.size)}</p>
          <fieldset className="grid gap-3 sm:grid-cols-2">
            <legend className="label">Compression level</legend>
            {LEVELS.map(([id, name, desc]) => (
              <label key={id} className={`cursor-pointer rounded-2xl border-2 p-4 ${level === id ? 'border-brand bg-emerald-50' : 'border-line'}`}>
                <input type="radio" name="lvl" className="sr-only" checked={level === id} onChange={() => { setLevel(id); setOut(null); }} />
                <b className="block font-display">{name}</b><span className="text-sm text-muted">{desc}</span>
              </label>
            ))}
          </fieldset>
          {error && <p className="error" role="alert">{error}</p>}
          <button className="btn w-full" onClick={run} disabled={busy}>{busy ? 'Optimising…' : 'Compress PDF'}</button>
        </>
      )}
      {out && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-display text-lg font-bold text-emerald-900">{kb(out.before)} → {kb(out.after)}{saved > 0 ? ` (−${saved.toFixed(1)}%)` : ''}</p>
          {saved === 0 && <p className="mt-1 text-sm text-muted">This PDF was already well optimised.</p>}
          <a className="btn-signal mt-3" href={out.url} download={`compressed_${file.name}`}>Download PDF</a>
        </div>
      )}
    </div>
  );
}
