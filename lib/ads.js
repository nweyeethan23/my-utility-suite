// ─────────────────────────────────────────────────────────────
//  GOOGLE ADSENSE — one place to switch ads on
//  1. Get approved by AdSense.
//  2. Put your publisher ID in .env.local:  NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1234567890123456
//  3. Create ad units in AdSense and paste each unit's slot ID below
//     (or set the matching NEXT_PUBLIC_ADSLOT_* env var).
//  Until then <AdSlot/> renders nothing in production, so visitors
//  never see empty boxes. Set NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS=true
//  to preview the positions on a live site.
// ─────────────────────────────────────────────────────────────
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';

export const AD_SLOTS = {
  top: process.env.NEXT_PUBLIC_ADSLOT_TOP || '',         // banner under the tool title
  inline: process.env.NEXT_PUBLIC_ADSLOT_INLINE || '',   // between tool and guide
  sidebar: process.env.NEXT_PUBLIC_ADSLOT_SIDEBAR || '', // sticky sidebar (desktop)
  bottom: process.env.NEXT_PUBLIC_ADSLOT_BOTTOM || '',   // after FAQ
  home: process.env.NEXT_PUBLIC_ADSLOT_HOME || '',       // home + category pages
};

export const SHOW_PLACEHOLDERS =
  process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS === 'true';
