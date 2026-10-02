import { SITE } from '@/lib/site';

export default function manifest() {
  return {
    name: SITE.name, short_name: 'UtilSuite', description: SITE.description,
    start_url: '/', display: 'standalone', background_color: '#f2f6f3', theme_color: '#0b7a5e',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
