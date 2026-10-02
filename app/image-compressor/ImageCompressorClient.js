"use client";
import { useEffect, useState } from 'react';
import FileUploadBox from '@/components/FileUploadBox';

export default function ImageCompressorClient() {
  const [file, setFile] = useState(null);
  const [q, setQ] = useState(75);
  const [fmt, setFmt] = useState('image/jpeg');
  const [out, setOut] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!file) return;
    let dead = false;
    const t = setTimeout(async () => {
      try {
        const bmp = await createImageBitmap(file);
        const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
        const ctx = c.getContext('2d');
        if (fmt === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); }
        ctx.drawImage(bmp, 0, 0);
        const blob = await new Promise((r) => c.toBlob(r, fmt, q / 100));
        if (!dead && blob) { setOut({ url: URL.createObjectURL(blob), size: blob.size }); setError(''); }
      } catch { if (!dead) setError('This image could not be compressed.'); }
    }, 200);
    return () => { dead = true; clearTimeout(t); };
  }, [file, q, fmt]);

  const kb = (n) => (n >= 1048576 ? `${(n / 1048576).toFixed(2)} MB` : `${(n / 1024).toFixed(1)} KB`);
  const saved = out && file ? ((file.size - out.size) / file.size) * 100 : 0;
  const ext = fmt === 'image/webp' ? 'webp' : 'jpg';

  return (
    <div className="space-y-5">
      <FileUploadBox onFilesAccepted={(f) => { setFile(f[0]); setOut(null); }} accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }} title="JPG, PNG or WebP" />
      {file && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="q" className="label">Quality: {q}%</label>
              <input id="q" type="range" min="10" max="100" value={q} onChange={(e) => setQ(+e.target.value)} className="w-full accent-[var(--color-brand)]" />
            </div>
            <div>
              <label htmlFor="of" className="label">Output format</label>
              <select id="of" className="select" value={fmt} onChange={(e) => setFmt(e.target.value)}>
                <option value="image/jpeg">JPG (most compatible)</option>
                <option value="image/webp">WebP (smallest)</option>
              </select>
            </div>
          </div>
          {error && <p className="error" role="alert">{error}</p>}
          {out && (
            <>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="stat"><b>{kb(file.size)}</b><span>Original</span></div>
                <div className="stat"><b>{kb(out.size)}</b><span>Compressed</span></div>
                <div className="stat"><b className={saved > 0 ? 'text-brand' : 'text-red-600'}>{saved > 0 ? '−' : '+'}{Math.abs(saved).toFixed(0)}%</b><span>{saved > 0 ? 'Saved' : 'Larger'}</span></div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={out.url} alt="Compressed preview" className="mx-auto max-h-80 rounded-xl border border-line" />
              <a className="btn-signal w-full" href={out.url} download={`${file.name.replace(/\.[^.]+$/, '')}-compressed.${ext}`}>Download compressed image</a>
            </>
          )}
        </>
      )}
    </div>
  );
}
