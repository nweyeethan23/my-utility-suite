import { SITE } from '@/lib/site';
import { TOOLS, CATEGORIES } from '@/lib/tools';
import { PAIRS } from '@/lib/currency';

// Google ignores <priority> and <changefreq>, and trusts <lastmod> only when it is accurate,
// so only real modification dates are published. Update SITE.updated in lib/site.js when content changes.
export default function sitemap() {
  const content = new Date(SITE.updated);
  const legal = new Date(SITE.legalUpdated || SITE.updated);
  const u = (path, lastModified = content) => ({ url: `${SITE.url}${path}`, lastModified });

  return [
    u('/'),
    ...CATEGORIES.map((c) => u(c.path)),
    ...TOOLS.map((t) => u(t.path)),
    ...PAIRS.map(([a, b]) => u(`/exchange-rate/${a.toLowerCase()}-to-${b.toLowerCase()}`)),
    u('/about', legal),
    u('/contact', legal),
    u('/privacy-policy', legal),
    u('/terms', legal),
  ];
}
