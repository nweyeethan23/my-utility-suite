import Link from 'next/link';
import { CATEGORIES, toolsIn } from '@/lib/tools';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_3fr]">
          <div>
            <p className="font-display text-2xl font-extrabold text-white">UtilSuite -<span className="text-signal">Smart Tools</span></p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">{SITE.tagline}. Your files and text are processed on your device and never uploaded.</p>
          </div>
          <nav aria-label="All tools" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {CATEGORIES.map((c) => (
              <div key={c.id}>
                <Link href={c.path} className="font-display font-bold text-white hover:text-signal">{c.name}</Link>
                <ul className="mt-3 space-y-2 text-sm">
                  {toolsIn(c.id).map((t) => (
                    <li key={t.id}><Link href={t.path} className="hover:text-white hover:underline">{t.name}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
