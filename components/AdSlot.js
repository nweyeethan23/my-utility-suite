"use client";
import { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT, AD_SLOTS, SHOW_PLACEHOLDERS } from '@/lib/ads';

// Reserved heights stop the page jumping when an ad loads (good for Core Web Vitals).
const SIZES = {
  top: 'min-h-[100px] md:min-h-[100px]',
  inline: 'min-h-[250px]',
  sidebar: 'min-h-[600px]',
  bottom: 'min-h-[250px]',
  home: 'min-h-[100px]',
};

/**
 * <AdSlot position="top|inline|sidebar|bottom|home" />
 * Position → slot ID mapping lives in lib/ads.js.
 */
export default function AdSlot({ position = 'inline', className = '' }) {
  const slot = AD_SLOTS[position];
  const live = Boolean(ADSENSE_CLIENT && slot);
  const pushed = useRef(false);

  useEffect(() => {
    if (!live || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blocker or script not ready — ignore */
    }
  }, [live]);

  if (!live) {
    if (!SHOW_PLACEHOLDERS) return null;
    return (
      <div
        aria-hidden="true"
        className={`ad-placeholder ${SIZES[position]} ${className}`}
        data-ad-position={position}
      >
        <span></span>
      </div>
    );
  }

  return (
    <aside aria-label="Advertisement" className={`ad-wrap ${SIZES[position]} ${className}`}>
      <span className="ad-label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
