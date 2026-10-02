"use client";
import { useState } from 'react';
import FileUploadBox from '@/components/FileUploadBox';

const FORMATS = { 'image/png': 'PNG', 'image/jpeg': 'JPG', 'image/webp': 'WebP' };

export default function ImageConverterClient() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('image/png');
  const [out, setOut] = useState(null);
  const [error, setError] = useState('');

  const convert = async () => {
    setError(''); setOut(null);
    try {
      const bmp = await createImageBitmap(file);
      const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
      const ctx = c.getContext('2d');
      if (format === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height); } // JPG has no transparency
      ctx.drawImage(bmp, 0, 0);
      const blob = await new Promise((r) => c.toBlob(r, format, 0.92));
      if (!blob) throw new Error();
      setOut({ url: URL.createObjectURL(blob), size: blob.size });
    } catch { setError('This image could not be converted. Your browser may not support the chosen format.'); }
  };

  return (
    <div className="space-y-5">
      <FileUploadBox onFilesAccepted={(f) => { setFile(f[0]); setOut(null); }} accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }} title="JPG, PNG or WebP" />
      {file && (
        <>
          <p className="notice"><b>{file.name}</b> · {(file.size / 1024).toFixed(1)} KB</p>
          <div>
            <label htmlFor="fmt" className="label">Convert to</label>
            <select id="fmt" className="select" value={format} onChange={(e) => { setFormat(e.target.value); setOut(null); }}>
              {Object.entries(FORMATS).map(([v, n]) => <option key={v} value={v}>{n}</option>)}
            </select>
          </div>
          {error && <p className="error" role="alert">{error}</p>}
          <button className="btn w-full" onClick={convert}>Convert to {FORMATS[format]}</button>
        </>
      )}
      {out && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="font-display text-lg font-bold text-emerald-900">Converted · {(out.size / 1024).toFixed(1)} KB</p>
          <a className="btn-signal mt-3" href={out.url} download={`${file.name.replace(/\.[^.]+$/, '')}.${FORMATS[format].toLowerCase()}`}>Download {FORMATS[format]}</a>
        </div>
      )}
    </div>
  );
}
