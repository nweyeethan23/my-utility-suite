import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import { CAT_BY_ID, relatedOf } from '@/lib/tools';
import { toolJsonLd } from '@/lib/seo';

/** Wraps every tool page: heading, ads, how-to, FAQ, related tools and all structured data. */
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
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink">{tool.title.split(' – ')[0]}</h1>
        </div>
        <p className="mt-4 text-lg text-muted leading-relaxed">{tool.intro}</p>
        <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand">
          <span className="h-2 w-2 rounded-full bg-brand" /> Free · No sign-up · Private — runs in your browser
        </p>
      </header>

      <AdSlot position="top" className="mb-6" />

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
        <div className="min-w-0">
          <section aria-label={tool.name} className="panel">{children}</section>

          <AdSlot position="inline" className="my-8" />

          <section className="doc mt-10">
            <h2>How to use the {tool.name}</h2>
            <ol className="steps">
              {tool.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ol>
          </section>

          <section className="doc mt-10">
            <h2>Why use this {tool.name.toLowerCase()}?</h2>
            <ul className="ticks">
              {tool.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
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
