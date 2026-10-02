'use client';

import { useEffect } from 'react';

export default function AdSlot({ slot, format = 'auto', responsive = 'true', className = '' }) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && adClient) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adClient]);

  // Hide the element completely until you have an active AdSense client ID
  if (!adClient) {
    return null;
  }

  return (
    <div className={`my-6 flex justify-center overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}