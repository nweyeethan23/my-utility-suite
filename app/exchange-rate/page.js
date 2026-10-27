import ToolShell from '@/components/ToolShell';
import ExchangeRateClient from './ExchangeRateClient';
import Link from 'next/link';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';
import { PAIRS, POPULAR_PAIRS } from '@/lib/currency';

const tool = TOOL_BY_ID['exchange-rate'];
const href = (a, b) => `/exchange-rate/${a.toLowerCase()}-to-${b.toLowerCase()}`;
const groups = PAIRS.reduce((m, [a, b]) => { (m[a] ||= []).push(b); return m; }, {});
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ExchangeRateClient />
      <p className="mt-6 text-sm text-muted">
        Rates are retrieved from our exchange-rate provider and cached for up to one hour. They are
        informational mid-market rates and may differ from rates offered by banks, cards, or transfer services.
      </p>
      <div className="mt-8 border-t border-line pt-6">
        <h2 className="font-display text-xl font-bold">Popular currency pairs</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {POPULAR_PAIRS.map(([a, b]) => (
            <Link key={a + b} href={href(a, b)} className="btn-ghost !py-1.5">{a} to {b}</Link>
          ))}
        </div>
        <h2 className="mt-8 font-display text-xl font-bold">All currency conversions</h2>
        <div className="mt-3 space-y-4">
          {Object.entries(groups).map(([a, list]) => (
            <div key={a}>
              <h3 className="font-semibold text-ink">Convert from {a}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {list.map((b) => <Link key={a + b} href={href(a, b)} className="btn-ghost !py-1.5">{a} to {b}</Link>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
