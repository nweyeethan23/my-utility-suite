// Central site settings. Set NEXT_PUBLIC_SITE_URL in .env.local / Vercel (no trailing slash).
export const SITE = {
  name: 'SmartTools Suite',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://utilsuite.app').replace(/\/$/, ''),
  tagline: 'Free online tools that run in your browser',
  description:
    'Free online tools for PDF, images, text, calculators and converters. No sign-up, no uploads — everything runs privately in your browser.',
  email: 'smarttoolsuite25@gmail.com',
  locale: 'en_US',
  twitter: '', // e.g. '@yourhandle'
  updated: '2026-10-02',
};

export const abs = (path = '/') => `${SITE.url}${path}`;
