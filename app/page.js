import Link from 'next/link';
import ToolBrowser from '@/components/ToolBrowser';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import { TOOLS, CATEGORIES } from '@/lib/tools';
import { SITE } from '@/lib/site';

export const metadata = {
  title: { absolute: `${SITE.name} – Free Online PDF, Image, Text & Calculator Tools` },
  description: SITE.description,
  alternates: { canonical: '/' },
};

const FAQ = [
  ['Are these tools really free?', 'Yes. Every tool is free to use with no account, no daily limits and no watermarks. The site is supported by advertising.'],
  ['Are my files uploaded to your servers?', 'No. PDF, image, text and calculator tools run inside your browser, so your files and text never leave your device.'],
  ['Do the tools work on mobile?', 'Yes. Every tool is built for phones, tablets and desktops and works in any modern browser.'],
];

const slim = TOOLS.map(({ id, path, cat, icon, name, short, keywords }) => ({ id, path, cat, icon, name, short, keywords }));
const popular = ['pdf-merger', 'image-compressor', 'qr-code-generator', 'exchange-rate', 'word-counter', 'bmi-calculator'];

export default function Home() {
  return (
    <div>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      }} />

      <section className="max-w-3xl pb-10 md:pb-14">
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
          Free tools that never see your files.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Merge PDFs, compress photos, convert currency, count words and more. Everything runs in your browser — no sign-up, no uploads.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-muted">Popular:</span>
          {popular.map((id) => {
            const t = TOOLS.find((x) => x.id === id);
            return <Link key={id} href={t.path} className="btn-ghost !py-1.5">{t.icon} {t.name}</Link>;
          })}
        </div>
      </section>

      <ToolBrowser tools={slim} categories={CATEGORIES} />

      <AdSlot position="home" className="my-12" />

      <section className="doc max-w-3xl">
        <h2>Online tools built for privacy and speed</h2>
        <p className="mt-3">
          {SITE.name} brings the everyday utilities people search for into one fast website: a PDF splitter and merger, an image converter and compressor,
          a live currency converter, a word counter, calculators for BMI, age and loan EMI, and developer helpers like a JSON formatter and QR code generator.
        </p>
        <p className="mt-3">
          Most file and text processing happens locally in your browser, so documents, photos and text are not uploaded to UtilSuite.
          This also means performance depends on your device and browser, especially for large files.
        </p>
        <h2 className="mt-10">Choose a tool category</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={category.path}
              className="panel !p-5 transition hover:-translate-y-0.5 hover:border-brand"
            >
              <span className="text-2xl" aria-hidden="true">{category.icon}</span>
              <h3 className="mt-2 font-display text-xl font-bold">{category.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{category.description}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Some tools use external data sources. For example, exchange rates are fetched from a rate provider and are
          informational rather than a guaranteed transaction rate. See each tool's notes and our Privacy Policy for details.
        </p>
        <h2 className="mt-10">Frequently asked questions</h2>
        <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                {q}<span className="text-2xl leading-none text-brand transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
