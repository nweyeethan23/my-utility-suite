import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const alt = `${SITE.name} – free online tools`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 80, background: '#0f2a22', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: '#0b7a5e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>S</div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{SITE.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>Free online tools.</div>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, color: '#ffc833' }}>Nothing uploaded.</div>
        </div>
        <div style={{ fontSize: 30, color: '#a7c4b9' }}>PDF · Images · Text · Calculators · Converters</div>
      </div>
    ),
    size
  );
}
