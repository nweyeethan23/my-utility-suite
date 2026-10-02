"use client";
import { useState } from 'react';
import FileUploadBox from '@/components/FileUploadBox';
import { PDFDocument } from 'pdf-lib';

export default function MergerClient() {
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const move = (i, d) => setFiles((f) => { const n = [...f]; const j = i + d; if (j < 0 || j >= n.length) return f; [n[i], n[j]] = [n[j], n[i]]; return n; });

  const merge = async () => {
    setBusy(true); setError(''); setUrl(null);
    try {
      const out = await PDFDocument.create();
      for (const f of files) {
        const src = await PDFDocument.load(await f.arrayBuffer());
        (await out.copyPages(src, src.getPageIndices())).forEach((p) => out.addPage(p));
      }
      setUrl(URL.createObjectURL(new Blob([await out.save()], { type: 'application/pdf' })));
    } catch { setError('One of the files could not be read. It may be damaged or password-protected.'); }
    setBusy(false);
  };

  return (
    <div className="space-y-5">
      <FileUploadBox multiple onFilesAccepted={(a) => { setFiles((p) => [...p, ...a]); setUrl(null); }} accept={{ 'application/pdf': ['.pdf'] }} title="Add two or more PDFs" />
      {files.length > 0 && (
        <ol className="space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3 py-2 text-sm">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-brand text-xs font-bold text-white">{i + 1}</span>
              <span className="min-w-0 flex-1 truncate font-medium">{f.name}</span>
              <button className="btn-ghost !px-2.5 !py-1" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${f.name} up`}>↑</button>
              <button className="btn-ghost !px-2.5 !py-1" onClick={() => move(i, 1)} disabled={i === files.length - 1} aria-label={`Move ${f.name} down`}>↓</button>
              <button className="btn-ghost !px-2.5 !py-1 text-red-600" onClick={() => { setFiles(files.filter((_, k) => k !== i)); setUrl(null); }} aria-label={`Remove ${f.name}`}>✕</button>
            </li>
          ))}
        </ol>
      )}
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn w-full" onClick={merge} disabled={busy || files.length < 2}>{busy ? 'Merging…' : files.length < 2 ? 'Add at least 2 PDFs' : `Merge ${files.length} PDFs`}</button>
      {url && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-display text-lg font-bold text-emerald-900">Merged successfully</p>
          <a className="btn-signal mt-3" href={url} download="merged.pdf">Download merged PDF</a>
        </div>
      )}
    </div>
  );
}
