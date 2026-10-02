import { SITE } from '@/lib/site';
import { TOOLS, CATEGORIES } from '@/lib/tools';
import { PAIRS } from '@/lib/currency';

export default function sitemap() {
  const now = new Date(SITE.updated);
  const u = (path, priority, changeFrequency = 'monthly') => ({ url: `${SITE.url}${path}`, lastModified: now, changeFrequency, priority });
  return [
    u('/', 1, 'weekly'),
    ...CATEGORIES.map((c) => u(c.path, 0.8)),
    ...TOOLS.map((t) => u(t.path, 0.9)),
    ...PAIRS.map(([a, b]) => u(`/exchange-rate/${a.toLowerCase()}-to-${b.toLowerCase()}`, 0.6, 'daily')),
    u('/about', 0.4, 'yearly'), u('/contact', 0.4, 'yearly'),
    u('/privacy-policy', 0.3, 'yearly'), u('/terms', 0.3, 'yearly'),
  ];
}
