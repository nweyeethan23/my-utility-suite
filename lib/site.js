// lib/site.js
export const SITE = {
  name: 'UtilSuite',
  shortName: 'UtilSuite',
  title: 'UtilSuite - Fast, Free & Private Online Utilities',
  description: 'Fast, free, and private browser-based utilities, calculators, and converters.',
  url: 'https://utilsuite.app',
  baseUrl: 'https://utilsuite.app',
  ogImage: 'https://utilsuite.app/opengraph-image.png',
  creator: 'UtilSuite Team',
  contactEmail: 'utilsuite79@gmail.com',
  updated: '2026-10-02T00:00:00.000Z',
  links: {
    github: 'https://github.com/nweyeethan23/my-utility-suite',
  },
};

/**
 * Returns an absolute URL using the site base URL
 */
export function abs(path = '') {
  if (!path) return SITE.url;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export const siteConfig = SITE;
export default SITE;