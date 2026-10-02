"use client";
import { useState } from 'react';
import FileUploadBox from '@/components/FileUploadBox';
import { PDFDocument } from 'pdf-lib';

function parseRange(str, total) {
  const pages = new Set();
  str.split(',').forEach((part) => {
    const [a, b] = part.trim().split('-').map((n) => parseInt(n, 10));
    if (Number.isNaN(a)) return;
    const end = Number.isNaN(b) ? a : b;
    for (let i = Math.min(a, end); i <= Math.max(a, end); i++) if (i > 0 && i <= total) pages.add(i - 1);
  });
  return [...pages].sort((x, y) => x - y);
}

export default function SplitterClient() {
  const [file, setFile] = useState(null);
  const [total, setTotal] = useState(0);
  const [range, setRange] = useState('');
  const [url, setUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onFile = async (files) => {
    const f = files[0]; if (!f) return;
    setFile(f); setUrl(null); setError(''); setTotal(0);
    try { setTotal((await PDFDocument.load(await f.arrayBuffer(), { ignoreEncryption: true })).getPageCount()); }
    catch { setError('This PDF could not be read. It may be damaged or password-protected.'); }
  };

  const split = async () => {
    setBusy(true); setError(''); setUrl(null);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const idx = parseRange(range, src.getPageCount());
      if (!idx.length) throw new Error(`No valid pages. Use numbers between 1 and ${src.getPageCount()}, like 1-3, 5.`);
      const out = await PDFDocument.create();
      (await out.copyPages(src, idx)).forEach((p) => out.addPage(p));
      setUrl(URL.createObjectURL(new Blob([await out.save()], { type: 'application/pdf' })));
    } catch (e) { setError(e.message || 'Something went wrong while splitting.'); }
    setBusy(false);
  };

  return (
    <div className="space-y-5">
      <FileUploadBox onFilesAccepted={onFile} accept={{ 'application/pdf': ['.pdf'] }} title="PDF files only" />
      {file && <p className="notice"><b>{file.name}</b>{total ? ` · ${total} pages` : ''}</p>}
      <div>
        <label htmlFor="range" className="label">Pages to keep</label>
        <input id="range" className="input font-mono" placeholder="e.g. 1-3, 5, 10-12" value={range} onChange={(e) => setRange(e.target.value)} />
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn w-full" onClick={split} disabled={busy || !file || !range}>{busy ? 'Working…' : 'Split & create PDF'}</button>
      {url && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-display text-lg font-bold text-emerald-900">Your new PDF is ready</p>
          <a className="btn-signal mt-3" href={url} download={`${file.name.replace(/\.pdf$/i, '')}_pages.pdf`}>Download PDF</a>
        </div>
      )}
    </div>
  );
}
