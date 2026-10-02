import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import { CAT_BY_ID, relatedOf } from '@/lib/tools';
import { toolJsonLd } from '@/lib/seo';

/**
 * Shared SEO/content shell for every tool.
 * The registry supplies tool-specific copy, examples, FAQs and related tools,
 * so every page contains useful information in addition to the interactive UI.
 */
export default function ToolShell({ tool, children }) {
  const cat = CAT_BY_ID[tool.cat];
  const related = relatedOf(tool);

  return (
    <div style={{ '--accent': cat.color }}>
      <JsonLd data={toolJsonLd(tool)} />

      <nav aria-label="Breadcrumb" className="crumbs">
        <Link href="/">Home</Link><span>/</span>
        <Link href={cat.path}>{cat.name}</Link><span>/</span>
        <span aria-current="page">{tool.name}</span>
      </nav>

      <header className="mt-4 mb-6 max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="chip" aria-hidden="true">{tool.icon}</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink">
            {tool.title.split(' – ')[0]}
          </h1>
        </div>
        <p className="mt-4 text-lg text-muted leading-relaxed">{tool.intro}</p>
        <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand">
          <span className="h-2 w-2 rounded-full bg-brand" />
          Free · No sign-up · Private — runs in your browser
        </p>
      </header>

      <AdSlot position="top" className="mb-6" />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
        <div className="min-w-0">
          <section aria-label={tool.name} className="panel">
            {children}
          </section>

          <AdSlot position="inline" className="my-8" />

          <section className="doc mt-10">
            <h2>About the {tool.name.toLowerCase()}</h2>
            <p>{tool.description}</p>
            <p className="mt-3">
              This {cat.name.toLowerCase()} tool is designed for quick, everyday tasks without requiring an account.
              {tool.cat === 'pdf' || tool.cat === 'image' || tool.cat === 'text'
                ? ' Processing for your files or text happens in your browser, so the content you work with is not uploaded to our servers.'
                : ' The calculation or conversion is performed directly in the browser; check the notes below when a result depends on an external data source.'}
            </p>
          </section>

          <section className="doc mt-10">
            <h2>How to use the {tool.name}</h2>
            <ol className="steps">
              {tool.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </section>

          <section className="doc mt-10">
            <h2>Key features and practical uses</h2>
            <ul className="ticks">
              {tool.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <p className="mt-4">
              Use the tool when you need a fast result without installing desktop software or creating an account.
              For important documents, calculations or conversions, review the result before relying on it and keep
              your original file or source information.
            </p>
          </section>

          <section className="doc mt-10">
            <h2>Privacy and limitations</h2>
            <p>
              {tool.cat === 'convert' && tool.id === 'exchange-rate'
                ? 'The currency converter needs current exchange-rate data from its rate provider. The amount and currency selection are used to request the displayed rate; the rate is informational and may differ from a bank, card or transfer provider.'
                : 'Your main tool input is processed in your browser and is not uploaded as a document to UtilSuite. Browser memory, device performance and the input format can affect how quickly a large task completes.'}
            </p>
            <p className="mt-3">
              Keep a copy of important originals and do not treat calculator results as professional medical, financial or legal advice.
              See the <Link href="/privacy-policy" className="font-semibold text-brand hover:underline">Privacy Policy</Link> for site-level data practices.
            </p>
          </section>

          <section className="doc mt-10" aria-labelledby="faq">
            <h2 id="faq">Frequently asked questions</h2>
            <div className="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">
              {tool.faqs.map(([q, a]) => (
                <details key={q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                    {q}
                    <span className="text-brand transition-transform group-open:rotate-45 text-2xl leading-none" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 text-muted leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <AdSlot position="bottom" className="mt-10" />
        </div>

        <aside className="mt-10 lg:mt-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            <AdSlot position="sidebar" />
            <div className="panel !p-5">
              <h2 className="font-display text-lg font-bold">More free tools</h2>
              <ul className="mt-3 space-y-1">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link href={r.path} className="flex items-start gap-3 rounded-xl p-2 -mx-2 hover:bg-paper">
                      <span className="chip chip-sm" aria-hidden="true">{r.icon}</span>
                      <span><b className="block text-ink">{r.name}</b><span className="text-sm text-muted">{r.short}</span></span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={cat.path} className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
                All {cat.name.toLowerCase()} →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
