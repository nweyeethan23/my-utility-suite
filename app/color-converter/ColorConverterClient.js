"use client";
import { useState } from 'react';
import CopyButton from '@/components/CopyButton';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)].map((x) => Math.round(x * 255));
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  let h = 0, s = 0;
  if (d) {
    s = d / (1 - Math.abs(2 * l - 1));
    h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h = Math.round(h * 60); if (h < 0) h += 360;
  }
  return [h, Math.round(s * 100), Math.round(l * 100)];
}
function parse(input) {
  const t = input.trim().toLowerCase();
  let m = t.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (m) { let x = m[1]; if (x.length === 3) x = [...x].map((c) => c + c).join(''); return [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16)); }
  m = t.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (m) return m.slice(1, 4).map((x) => clamp(+x, 0, 255));
  m = t.match(/^hsla?\(\s*(\d+)[,\s]+(\d+)%?[,\s]+(\d+)%?/);
  if (m) return hslToRgb(+m[1] % 360, clamp(+m[2], 0, 100), clamp(+m[3], 0, 100));
  return null;
}

export default function ColorConverterClient() {
  const [text, setText] = useState('#0B7A5E');
  const rgb = parse(text);
  const hex = rgb ? `#${rgb.map((x) => x.toString(16).padStart(2, '0')).join('')}`.toUpperCase() : '';
  const hsl = rgb ? rgbToHsl(...rgb) : null;
  const rows = rgb ? [['HEX', hex], ['RGB', `rgb(${rgb.join(', ')})`], ['HSL', `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`]] : [];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
        <div>
          <label htmlFor="pick" className="label">Pick</label>
          <input id="pick" type="color" value={hex || '#000000'} onChange={(e) => setText(e.target.value)} className="h-[50px] w-24 cursor-pointer rounded-xl border-2 border-line bg-white p-1" />
        </div>
        <div>
          <label htmlFor="ct" className="label">Or type HEX, rgb() or hsl()</label>
          <input id="ct" className="input font-mono" value={text} onChange={(e) => setText(e.target.value)} placeholder="#0B7A5E" />
        </div>
      </div>
      {!rgb && text && <p className="error" role="alert">Not a valid color. Try #0B7A5E, rgb(11, 122, 94) or hsl(165, 84%, 26%).</p>}
      {rgb && (
        <>
          <div className="h-28 rounded-2xl border border-line" style={{ background: hex }} aria-label={`Color preview ${hex}`} />
          <div className="space-y-2">
            {rows.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-2.5">
                <span><b className="mr-3 inline-block w-10 text-muted">{k}</b><code className="font-mono">{v}</code></span>
                <CopyButton text={v} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
