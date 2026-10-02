import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import JsonLd from '@/components/JsonLd';
import { ToolTile } from '@/components/ToolBrowser';
import { toolsIn, CATEGORIES } from '@/lib/tools';
import { categoryJsonLd } from '@/lib/seo';

export default function CategoryHub({ cat }) {
  const tools = toolsIn(cat.id);
  const others = CATEGORIES.filter((c) => c.id !== cat.id);
  return (
    <div style={{ '--accent': cat.color }}>
      <JsonLd data={categoryJsonLd(cat, tools)} />
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link href="/">Home</Link><span>/</span><span aria-current="page">{cat.name}</span>
      </nav>
      <header className="mt-4 mb-8 max-w-3xl">
        <span className="chip" aria-hidden="true">{cat.icon}</span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">{cat.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{cat.description}</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => <ToolTile key={t.id} tool={t} color={cat.color} />)}
      </div>
      <AdSlot position="home" className="my-10" />
      <section className="doc">
        <h2>More free tools</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((c) => <Link key={c.id} href={c.path} className="btn-ghost">{c.icon} {c.name}</Link>)}
        </div>
      </section>
    </div>
  );
}
