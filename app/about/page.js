import Link from 'next/link';
import { TOOLS, CATEGORIES } from '@/lib/tools';
import { SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About Us',
  description: `${SITE.name} offers ${TOOLS.length} free online tools for PDFs, images, text and calculations that run privately in your browser.`,
  path: '/about',
});

export default function About() {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Useful tools, no strings attached.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        {SITE.name} is a growing collection of {TOOLS.length} free utilities for the small jobs that come up every day — merging a PDF, shrinking a photo,
        checking an exchange rate, counting words. We build them to be fast, clear and private.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          ['Private by design', 'Our PDF, image and text processing is designed to run inside your browser. Files processed by these tools are not uploaded to our servers.'],
          ['Free without a catch', 'No account, no watermark and no daily limit. Advertising helps us cover hosting.'],
          ['Built for every screen', 'Every tool works on phones, tablets and desktops without installing anything.'],
        ].map(([t, d]) => (
          <div key={t} className="panel !p-6"><h2 className="font-display text-xl font-bold">{t}</h2><p className="mt-2 leading-relaxed text-muted">{d}</p></div>
        ))}
      </div>

      <h2 className="mt-14 font-display text-3xl font-bold">What you can do here</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {CATEGORIES.map((c) => (
          <div key={c.id}>
            <Link href={c.path} className="font-display text-xl font-bold text-ink hover:text-brand">{c.icon} {c.name}</Link>
            <ul className="mt-2 space-y-1">
              {TOOLS.filter((t) => t.cat === c.id).map((t) => (
                <li key={t.id}><Link href={t.path} className="font-semibold text-brand hover:underline">{t.name}</Link> <span className="text-muted">— {t.short}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-3xl bg-ink p-8 text-white md:p-10">
        <h2 className="font-display text-2xl font-bold">Found a bug or have an idea?</h2>
        <p className="mt-2 max-w-xl text-white/75">Tell us which tool you’d like next or what’s not working. We read every message.</p>
        <Link href="/contact" className="btn-signal mt-5">Contact us</Link>
      </div>
    </div>
  );
}
