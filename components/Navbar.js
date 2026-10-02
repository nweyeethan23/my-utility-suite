import Link from 'next/link';
import { CATEGORIES } from '@/lib/tools';
import { SITE } from '@/lib/site';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-extrabold text-ink" aria-label={`${SITE.name} home`}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-lg text-white">⚙</span>
          SmartTools<span className="text-brand">Suite</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={c.path} className="rounded-lg px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-white hover:text-brand">
              {c.name.replace(' & Web', '')}
            </Link>
          ))}
        </nav>

        {/* Mobile menu — pure HTML <details>, no JavaScript needed */}
        <details className="relative lg:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold">Menu ☰</summary>
          <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-line bg-white p-2 shadow-xl">
            {CATEGORIES.map((c) => (
              <Link key={c.id} href={c.path} className="flex items-center gap-2 rounded-xl px-3 py-2.5 font-medium hover:bg-paper">
                <span aria-hidden="true">{c.icon}</span>{c.name}
              </Link>
            ))}
            <hr className="my-2 border-line" />
            <Link href="/about" className="block rounded-xl px-3 py-2.5 hover:bg-paper">About</Link>
            <Link href="/contact" className="block rounded-xl px-3 py-2.5 hover:bg-paper">Contact</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
