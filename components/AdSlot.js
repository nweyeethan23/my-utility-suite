'use client';

import { useEffect } from 'react';
import { AD_SLOTS, ADSENSE_CLIENT } from '@/lib/ads';

const SLOT_BY_POSITION = {
  top: AD_SLOTS.top,
  inline: AD_SLOTS.inline,
  sidebar: AD_SLOTS.sidebar,
  bottom: AD_SLOTS.bottom,
  home: AD_SLOTS.home,
};

export default function AdSlot({
  position,
  slot,
  format = 'auto',
  responsive = 'true',
  className = '',
}) {
  const adSlot = slot || SLOT_BY_POSITION[position] || '';

  useEffect(() => {
    if (!ADSENSE_CLIENT || !adSlot || typeof window === 'undefined') return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // AdSense can throw while an ad request is still being initialised.
      if (process.env.NODE_ENV !== 'production') console.warn('AdSense:', err);
    }
  }, [adSlot]);

  // Do not render empty ad containers before AdSense is configured.
  if (!ADSENSE_CLIENT || !adSlot) return null;

  return (
    <div className={`my-6 flex justify-center overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: 0 }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
