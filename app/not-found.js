import Link from 'next/link';
import { TOOLS } from '@/lib/tools';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-6xl" aria-hidden="true">🧭</p>
      <h1 className="mt-4 font-display text-4xl font-bold">That page doesn’t exist</h1>
      <p className="mt-3 text-muted">The link may be old. Try one of our most-used tools instead:</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {TOOLS.slice(0, 8).map((t) => <Link key={t.id} href={t.path} className="btn-ghost">{t.icon} {t.name}</Link>)}
      </div>
      <Link href="/" className="btn mt-8">Back to all tools</Link>
    </div>
  );
}
