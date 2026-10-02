import { notFound } from 'next/navigation';
import Link from 'next/link';
import ToolShell from '@/components/ToolShell';
import ExchangeRateClient from '../ExchangeRateClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';
import { PAIRS, currencyName, fetchRates } from '@/lib/currency';

export const revalidate = 3600;
export const dynamicParams = false;
export function generateStaticParams() {
  return PAIRS.map(([a, b]) => ({ pair: `${a.toLowerCase()}-to-${b.toLowerCase()}` }));
}

function parse(pair) {
  const m = /^([a-z]{3})-to-([a-z]{3})$/.exec(pair);
  if (!m) return null;
  const [a, b] = [m[1].toUpperCase(), m[2].toUpperCase()];
  return PAIRS.some(([x, y]) => x === a && y === b) ? [a, b] : null;
}

async function buildTool(a, b) {
  const base = TOOL_BY_ID['exchange-rate'];
  const [na, nb] = [currencyName(a), currencyName(b)];
  let rateText = `Use the live converter above for today’s ${a} to ${b} rate.`;

  try {
    const res = await fetchRates(a);
    const rateValue = res?.rates ? Number(res.rates[b]) : null;
    if (Number.isFinite(rateValue) && rateValue > 0) {
      rateText = `At the latest update, 1 ${a} equals ${rateValue.toFixed(4)} ${b}.`;
    }
  } catch {
    /* Fall back to the generic sentence if fetch fails at build time */
  }

  return {
    ...base,
    path: `/exchange-rate/${a.toLowerCase()}-to-${b.toLowerCase()}`,
    name: `${a} to ${b} Converter`,
    title: `${a} to ${b} Converter – ${na} to ${nb}`,
    description: `Convert ${na} (${a}) to ${nb} (${b}) with live exchange rates. ${rateText} Free ${a}/${b} calculator.`.slice(0, 160),
    keywords: [`${a} to ${b}`, `${a.toLowerCase()} to ${b.toLowerCase()}`, `${na} to ${nb}`, `${a} ${b} exchange rate`, `convert ${a} to ${b}`],
    intro: `Convert ${na} (${a}) to ${nb} (${b}) instantly. ${rateText}`,
    steps: [`Enter the amount in ${a}.`, `Keep ${a} as From and ${b} as To, or swap them with ⇄.`, `Read the converted ${b} amount and the conversion table.`],
    faqs: [
      [`What is the ${a} to ${b} exchange rate today?`, `${rateText} Rates move daily, so check this page for the latest value.`],
      [`How do I convert ${a} to ${b}?`, `Multiply the ${a} amount by the current ${a}/${b} rate, or type the amount into the converter above and it does the maths for you.`],
      [`Why is the ${a} to ${b} rate at my bank different?`, 'Banks and exchange counters add a margin to the mid-market rate shown here and may charge a fee.'],
    ],
    related: ['exchange-rate', 'unit-converter', 'emi-calculator'],
  };
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const p = parse(resolvedParams?.pair);
  if (!p) return {};
  return toolMetadata(await buildTool(...p));
}

export default async function PairPage({ params }) {
  const resolvedParams = await params;
  const p = parse(resolvedParams?.pair);
  if (!p) notFound();
  const [a, b] = p;
  const tool = await buildTool(a, b);
  const reverse = PAIRS.some(([x, y]) => x === b && y === a);

  return (
    <ToolShell tool={tool}>
      <ExchangeRateClient initialFrom={a} initialTo={b} />
      <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
        {reverse && <Link className="btn-ghost" href={`/exchange-rate/${b.toLowerCase()}-to-${a.toLowerCase()}`}>{b} to {a}</Link>}
        <Link className="btn-ghost" href="/exchange-rate">All currencies</Link>
      </div>
    </ToolShell>
  );
}