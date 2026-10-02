"use client";
import { useMemo, useState } from 'react';
import Link from 'next/link';

export function ToolTile({ tool, color }) {
  return (
    <Link href={tool.path} className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-[color:var(--accent)]" style={{ '--accent': color }}>
      <span className="chip" aria-hidden="true">{tool.icon}</span>
      <span className="min-w-0">
        <b className="block font-display text-lg leading-tight text-ink group-hover:text-[color:var(--accent)]">{tool.name}</b>
        <span className="mt-1 block text-sm leading-snug text-muted">{tool.short}</span>
      </span>
    </Link>
  );
}

export default function ToolBrowser({ tools, categories }) {
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const sections = useMemo(
    () => categories
      .map((c) => ({
        ...c,
        items: tools.filter((t) => t.cat === c.id && (!term || `${t.name} ${t.short} ${t.keywords.join(' ')}`.toLowerCase().includes(term))),
      }))
      .filter((c) => c.items.length),
    [tools, categories, term]
  );

  return (
    <div>
      <div className="relative max-w-2xl">
        <label htmlFor="tool-search" className="sr-only">Search tools</label>
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl" aria-hidden="true">🔎</span>
        <input
          id="tool-search" type="search" value={q} onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${tools.length} tools — try “pdf”, “qr”, “bmi”…`}
          className="input !rounded-2xl !py-4 !pl-12 text-lg shadow-sm"
        />
      </div>

      {sections.length === 0 && (
        <p className="notice mt-8">No tool matches “{q}”. Try a shorter word such as “pdf” or “image”.</p>
      )}

      <div className="mt-10 space-y-12">
        {sections.map((c) => (
          <section key={c.id} aria-labelledby={`cat-${c.id}`}>
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 id={`cat-${c.id}`} className="font-display text-2xl font-bold">{c.icon} {c.name}</h2>
                <p className="text-sm text-muted">{c.blurb}</p>
              </div>
              <Link href={c.path} className="shrink-0 text-sm font-semibold text-brand hover:underline">View all</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.items.map((t) => <ToolTile key={t.id} tool={t} color={c.color} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
