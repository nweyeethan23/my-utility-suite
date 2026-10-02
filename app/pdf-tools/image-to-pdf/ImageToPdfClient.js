"use client";
import { useState } from 'react';
import FileUploadBox from '@/components/FileUploadBox';
import { PDFDocument } from 'pdf-lib';

const A4 = [595.28, 841.89];

// Re-encode anything that isn't a plain JPG/PNG (e.g. progressive or odd files) through canvas
async function toPngBytes(file) {
  const bmp = await createImageBitmap(file);
  const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
  c.getContext('2d').drawImage(bmp, 0, 0);
  return new Uint8Array(await (await new Promise((r) => c.toBlob(r, 'image/png'))).arrayBuffer());
}

export default function ImageToPdfClient() {
  const [files, setFiles] = useState([]);
  const [size, setSize] = useState('a4');
  const [url, setUrl] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const move = (i, d) => setFiles((f) => { const n = [...f]; const j = i + d; if (j < 0 || j >= n.length) return f; [n[i], n[j]] = [n[j], n[i]]; return n; });

  const build = async () => {
    setBusy(true); setError(''); setUrl(null);
    try {
      const pdf = await PDFDocument.create();
      for (const f of files) {
        const buf = new Uint8Array(await f.arrayBuffer());
        let img;
        try { img = f.type === 'image/png' ? await pdf.embedPng(buf) : await pdf.embedJpg(buf); }
        catch { img = await pdf.embedPng(await toPngBytes(f)); }
        if (size === 'a4') {
          const [pw, ph] = A4, m = 28;
          const s = Math.min((pw - 2 * m) / img.width, (ph - 2 * m) / img.height);
          const w = img.width * s, h = img.height * s;
          pdf.addPage([pw, ph]).drawImage(img, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
        } else {
          pdf.addPage([img.width, img.height]).drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }
      }
      setUrl(URL.createObjectURL(new Blob([await pdf.save()], { type: 'application/pdf' })));
    } catch { setError('One of the images could not be added. Try JPG or PNG files.'); }
    setBusy(false);
  };

  return (
    <div className="space-y-5">
      <FileUploadBox multiple onFilesAccepted={(a) => { setFiles((p) => [...p, ...a]); setUrl(null); }} accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }} title="JPG or PNG images" />
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
      <div>
        <label htmlFor="psize" className="label">Page size</label>
        <select id="psize" className="select" value={size} onChange={(e) => { setSize(e.target.value); setUrl(null); }}>
          <option value="a4">A4 page, image centered</option>
          <option value="fit">Same size as each image</option>
        </select>
      </div>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn w-full" onClick={build} disabled={busy || !files.length}>{busy ? 'Creating PDF…' : `Create PDF from ${files.length || ''} image${files.length === 1 ? '' : 's'}`}</button>
      {url && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-display text-lg font-bold text-emerald-900">Your PDF is ready</p>
          <a className="btn-signal mt-3" href={url} download="images.pdf">Download PDF</a>
        </div>
      )}
    </div>
  );
}
