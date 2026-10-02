import ToolShell from '@/components/ToolShell';
import ExchangeRateClient from './ExchangeRateClient';
import Link from 'next/link';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';
import { PAIRS } from '@/lib/currency';

const tool = TOOL_BY_ID['exchange-rate'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ExchangeRateClient />
      <div className="mt-8 border-t border-line pt-6">
        <h2 className="font-display text-xl font-bold">Popular currency pairs</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {PAIRS.slice(0, 24).map(([a, b]) => (
            <Link key={a + b} href={`/exchange-rate/${a.toLowerCase()}-to-${b.toLowerCase()}`} className="btn-ghost !py-1.5">{a} to {b}</Link>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
