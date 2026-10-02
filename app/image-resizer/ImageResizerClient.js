"use client";
import { useState } from 'react';
import FileUploadBox from '@/components/FileUploadBox';

export default function ImageResizerClient() {
  const [file, setFile] = useState(null);
  const [orig, setOrig] = useState(null);
  const [w, setW] = useState('');
  const [h, setH] = useState('');
  const [lock, setLock] = useState(true);
  const [out, setOut] = useState(null);
  const [error, setError] = useState('');

  const onFile = async (files) => {
    const f = files[0]; if (!f) return;
    try {
      const b = await createImageBitmap(f);
      setFile(f); setOrig({ w: b.width, h: b.height }); setW(String(b.width)); setH(String(b.height)); setOut(null); setError('');
    } catch { setError('This image could not be read.'); }
  };
  const ratio = orig ? orig.w / orig.h : 1;
  const changeW = (v) => { setW(v); if (lock && v) setH(String(Math.round(v / ratio))); setOut(null); };
  const changeH = (v) => { setH(v); if (lock && v) setW(String(Math.round(v * ratio))); setOut(null); };
  const pct = (p) => { setW(String(Math.round(orig.w * p / 100))); setH(String(Math.round(orig.h * p / 100))); setOut(null); };

  const resize = async () => {
    try {
      const nw = Math.max(1, +w), nh = Math.max(1, +h);
      const bmp = await createImageBitmap(file);
      const c = document.createElement('canvas'); c.width = nw; c.height = nh;
      const ctx = c.getContext('2d'); ctx.imageSmoothingQuality = 'high';
      if (file.type === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, nw, nh); }
      ctx.drawImage(bmp, 0, 0, nw, nh);
      const type = ['image/png', 'image/webp'].includes(file.type) ? file.type : 'image/jpeg';
      const blob = await new Promise((r) => c.toBlob(r, type, 0.92));
      setOut({ url: URL.createObjectURL(blob), size: blob.size, type, w: nw, h: nh });
    } catch { setError('Resizing failed. Try a smaller size.'); }
  };

  return (
    <div className="space-y-5">
      <FileUploadBox onFilesAccepted={onFile} accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }} title="JPG, PNG or WebP" />
      {error && <p className="error" role="alert">{error}</p>}
      {file && orig && (
        <>
          <p className="notice"><b>{file.name}</b> · original {orig.w} × {orig.h} px</p>
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
            <div><label htmlFor="w" className="label">Width (px)</label><input id="w" type="number" min="1" className="input" value={w} onChange={(e) => changeW(e.target.value)} /></div>
            <button type="button" className="btn-ghost !h-[50px]" aria-pressed={lock} onClick={() => setLock(!lock)} title="Lock aspect ratio">{lock ? '🔒' : '🔓'}</button>
            <div><label htmlFor="h" className="label">Height (px)</label><input id="h" type="number" min="1" className="input" value={h} onChange={(e) => changeH(e.target.value)} /></div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[25, 50, 75, 100, 150].map((p) => <button key={p} className="btn-ghost" onClick={() => pct(p)}>{p}%</button>)}
          </div>
          <button className="btn w-full" onClick={resize} disabled={!w || !h}>Resize image</button>
        </>
      )}
      {out && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-display text-lg font-bold text-emerald-900">{out.w} × {out.h} px · {(out.size / 1024).toFixed(1)} KB</p>
          <a className="btn-signal mt-3" href={out.url} download={`${file.name.replace(/\.[^.]+$/, '')}-${out.w}x${out.h}.${out.type.split('/')[1].replace('jpeg', 'jpg')}`}>Download image</a>
        </div>
      )}
    </div>
  );
}
