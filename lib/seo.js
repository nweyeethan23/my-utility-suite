import { SITE, abs } from './site';
import { CAT_BY_ID, relatedOf } from './tools';

export function toolMetadata(tool) {
  const url = abs(tool.path);
  return {
    title: tool.title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: { canonical: tool.path },
    openGraph: {
      title: tool.title, description: tool.description, url,
      siteName: SITE.name, locale: SITE.locale, type: 'website',
    },
    twitter: { card: 'summary_large_image', title: tool.title, description: tool.description },
  };
}

export function pageMetadata({ title, description, path, keywords }) {
  return {
    title, description, keywords,
    alternates: { canonical: path },
    openGraph: { title, description, url: abs(path), siteName: SITE.name, locale: SITE.locale, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

const crumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem', position: i + 1, name, item: abs(path),
  })),
});

export function toolJsonLd(tool) {
  const cat = CAT_BY_ID[tool.cat];
  const url = abs(tool.path);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication', '@id': `${url}#app`, name: tool.name, url,
        description: tool.description, applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any (web browser)', browserRequirements: 'Requires JavaScript',
        isAccessibleForFree: true, inLanguage: 'en',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@id': `${SITE.url}/#org` },
      },
      crumb([['Home', '/'], [cat.name, cat.path], [tool.name, tool.path]]),
      {
        '@type': 'FAQPage',
        mainEntity: tool.faqs.map(([q, a]) => ({
          '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@type': 'HowTo', name: `How to use the ${tool.name}`,
        step: tool.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })),
      },
    ],
  };
}

export function categoryJsonLd(cat, tools) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      crumb([['Home', '/'], [cat.name, cat.path]]),
      {
        '@type': 'CollectionPage', name: cat.title, url: abs(cat.path), description: cat.description,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: tools.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(t.path), name: t.name })),
        },
      },
    ],
  };
}

export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${SITE.url}/#org`, name: SITE.name, url: SITE.url,
        email: SITE.email, logo: abs('/icon.svg') },
      { '@type': 'WebSite', '@id': `${SITE.url}/#site`, name: SITE.name, url: SITE.url,
        description: SITE.description, inLanguage: 'en', publisher: { '@id': `${SITE.url}/#org` } },
    ],
  };
}
