"use client";
import { useEffect, useState } from 'react';

const esc = (s) => s.replace(/([\\;,:"])/g, '\\$1');

export default function QrCodeGeneratorClient() {
  const [type, setType] = useState('text');
  const [text, setText] = useState('https://www.example.com');
  const [ssid, setSsid] = useState('');
  const [pass, setPass] = useState('');
  const [sec, setSec] = useState('WPA');
  const [size, setSize] = useState(512);
  const [fg, setFg] = useState('#0f2a22');
  const [bg, setBg] = useState('#ffffff');
  const [img, setImg] = useState('');
  const [error, setError] = useState('');

  const data = type === 'text' ? text : ssid ? `WIFI:T:${sec};S:${esc(ssid)};${sec === 'nopass' ? '' : `P:${esc(pass)};`};` : '';

  useEffect(() => {
    let dead = false;
    if (!data) { setImg(''); return; }
    (async () => {
      try {
        const QR = (await import('qrcode')).default;
        const url = await QR.toDataURL(data, { width: size, margin: 2, errorCorrectionLevel: 'M', color: { dark: fg, light: bg } });
        if (!dead) { setImg(url); setError(''); }
      } catch { if (!dead) { setImg(''); setError('That content is too long for a QR code. Try something shorter.'); } }
    })();
    return () => { dead = true; };
  }, [data, size, fg, bg]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-paper p-1" role="tablist">
          {[['text', 'URL / Text'], ['wifi', 'Wi-Fi']].map(([id, n]) => (
            <button key={id} role="tab" aria-selected={type === id} onClick={() => setType(id)} className={`rounded-xl px-3 py-2.5 text-sm font-bold ${type === id ? 'bg-white text-brand shadow' : 'text-muted'}`}>{n}</button>
          ))}
        </div>
        {type === 'text' ? (
          <div><label htmlFor="qt" className="label">Link or text</label><textarea id="qt" className="textarea !min-h-28 !font-sans !text-base" value={text} onChange={(e) => setText(e.target.value)} /></div>
        ) : (
          <>
            <div><label htmlFor="ss" className="label">Network name (SSID)</label><input id="ss" className="input" value={ssid} onChange={(e) => setSsid(e.target.value)} /></div>
            <div><label htmlFor="pw" className="label">Password</label><input id="pw" className="input" value={pass} onChange={(e) => setPass(e.target.value)} disabled={sec === 'nopass'} /></div>
            <div><label htmlFor="sc" className="label">Security</label><select id="sc" className="select" value={sec} onChange={(e) => setSec(e.target.value)}><option value="WPA">WPA/WPA2/WPA3</option><option value="WEP">WEP</option><option value="nopass">None</option></select></div>
          </>
        )}
        <div className="grid grid-cols-3 gap-3">
          <div><label htmlFor="sz" className="label">Size</label><select id="sz" className="select" value={size} onChange={(e) => setSize(+e.target.value)}>{[256, 512, 1024].map((s) => <option key={s} value={s}>{s}px</option>)}</select></div>
          <div><label htmlFor="fg" className="label">Code</label><input id="fg" type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-[50px] w-full rounded-xl border-2 border-line bg-white p-1" /></div>
          <div><label htmlFor="bg" className="label">Background</label><input id="bg" type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-[50px] w-full rounded-xl border-2 border-line bg-white p-1" /></div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-paper p-6">
        {error && <p className="error" role="alert">{error}</p>}
        {img ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="Generated QR code" className="w-full max-w-[280px] rounded-xl border border-line" />
            <a className="btn-signal w-full max-w-[280px]" href={img} download="qr-code.png">Download PNG</a>
          </>
        ) : !error && <p className="text-center text-muted">Your QR code appears here.</p>}
        {fg.toLowerCase() === bg.toLowerCase() && <p className="notice">Code and background colors are the same — it won’t scan.</p>}
      </div>
    </div>
  );
}
