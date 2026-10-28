import { notFound } from 'next/navigation';
import Link from 'next/link';
import ToolShell from '@/components/ToolShell';
import ExchangeRateClient from '../ExchangeRateClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';
import { PAIRS, CURRENCY_INFO, currencyName, fetchRates, formatRate, formatAmount } from '@/lib/currency';

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
  let rateValue = null;

  try {
    const res = await fetchRates(a);
    const r = res?.rates ? Number(res.rates[b]) : null;
    if (Number.isFinite(r) && r > 0) {
      rateValue = r;
      rateText = `At the latest update, 1 ${a} equals ${formatRate(r)} ${b}.`;
    }
  } catch {
    /* Fall back to the generic sentence if fetch fails at build time */
  }

  const ia = CURRENCY_INFO[a] || {};
  const ib = CURRENCY_INFO[b] || {};
  const sections = [];
  let table = null;
  let table2 = null;

  if (rateValue) {
    const inv = 1 / rateValue;
    sections.push({
      h: `${a} to ${b} exchange rate today`,
      p: [
        `${rateText} Going the other way, 1 ${b} is worth about ${formatRate(inv)} ${a}. These are mid-market rates from our rate provider, refreshed about once an hour, so they are a good guide for budgeting and price checks but not a guaranteed quote.`,
        `A quick way to estimate by hand: multiply any ${a} amount by ${formatRate(rateValue)} to get ${b}, or divide a ${b} amount by the same number to get ${a}. For example, 250 ${a} is about ${formatAmount(250 * rateValue)} ${b}, and 1,000 ${b} is about ${formatAmount(1000 * inv)} ${a}.`,
      ],
    });
    const AMOUNTS = [1, 5, 10, 25, 50, 100, 160, 250, 500, 1000, 5000, 10000];
    table = {
      title: `${a} to ${b} conversion table`,
      head: [a, b],
      rows: AMOUNTS.map((n) => [formatAmount(n), formatAmount(n * rateValue)]),
    };
    table2 = {
      title: `${b} to ${a} conversion table`,
      head: [b, a],
      rows: [10, 100, 500, 1000, 5000, 10000, 50000].map((n) => [formatAmount(n), formatAmount(n * inv)]),
    };
  }

  sections.push({
    h: `About the ${na} and the ${nb}`,
    p: [
      `The ${na} (${a}, symbol ${ia.symbol || a}) is the currency of ${ia.region || a}, issued under the authority of ${ia.bank || 'its central bank'}. The ${nb} (${b}, symbol ${ib.symbol || b}) is the currency of ${ib.region || b}, overseen by ${ib.bank || 'its central bank'}.`,
      `The ${a}/${b} rate moves with interest-rate decisions in both economies, inflation, trade flows and investor sentiment. Banks, cards and transfer services usually apply a margin on top of the mid-market rate, so compare the amount that actually arrives rather than the headline rate. Use the conversion table above to check common ${a} amounts, and the swap button to reverse the direction.`,
    ],
  });

  return {
    ...base,
    sections,
    table,
    table2,
    path: `/exchange-rate/${a.toLowerCase()}-to-${b.toLowerCase()}`,
    name: `${a} to ${b} Converter`,
    title: `${a} to ${b} – ${na} to ${nb} Converter & Live Rate`,
    description: (rateValue
      ? `${a} to ${b} today: 1 ${a} = ${formatRate(rateValue)} ${b}. Convert ${na} to ${nb} with a free live converter and amount table.`
      : `Convert ${na} (${a}) to ${nb} (${b}) with live exchange rates. Free ${a}/${b} calculator.`).slice(0, 160),
    keywords: [`${a} to ${b}`, `${a.toLowerCase()} to ${b.toLowerCase()}`, `${na} to ${nb}`, `${a} ${b} exchange rate`, `convert ${a} to ${b}`],
    intro: `Convert ${na} (${a}) to ${nb} (${b}) instantly. ${rateText}`,
    steps: [`Enter the amount in ${a}.`, `Keep ${a} as From and ${b} as To, or swap them with ⇄.`, `Read the converted ${b} amount and the conversion table.`],
    faqs: [
      [`What is the ${a} to ${b} exchange rate today?`, `${rateText} Rates move daily, so check this page for the latest value.`],
      ...(rateValue ? [
        [`How much is 100 ${a} in ${b}?`, `At the latest rate, 100 ${a} is about ${formatAmount(100 * rateValue)} ${b}.`],
        [`How much is 1,000 ${a} in ${b}?`, `At the latest rate, 1,000 ${a} is about ${formatAmount(1000 * rateValue)} ${b}.`],
      ] : []),
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
  const pairHref = (x, y) => `/exchange-rate/${x.toLowerCase()}-to-${y.toLowerCase()}`;
  const sameFrom = PAIRS.filter(([x, y]) => x === a && y !== b).slice(0, 12);
  const sameTo = PAIRS.filter(([x, y]) => y === b && x !== a).slice(0, 12);

  return (
    <ToolShell tool={tool}>
      <ExchangeRateClient initialFrom={a} initialTo={b} />
      <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
        {reverse && <Link className="btn-ghost" href={`/exchange-rate/${b.toLowerCase()}-to-${a.toLowerCase()}`}>{b} to {a}</Link>}
        <Link className="btn-ghost" href="/exchange-rate">All currencies</Link>
      </div>
      {(sameFrom.length > 0 || sameTo.length > 0) && (
        <div className="mt-6 space-y-4">
          {sameFrom.length > 0 && (
            <div>
              <h2 className="font-display text-lg font-bold">More {a} conversions</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {sameFrom.map(([x, y]) => <Link key={x + y} className="btn-ghost !py-1.5" href={pairHref(x, y)}>{x} to {y}</Link>)}
              </div>
            </div>
          )}
          {sameTo.length > 0 && (
            <div>
              <h2 className="font-display text-lg font-bold">Convert to {b}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {sameTo.map(([x, y]) => <Link key={x + y} className="btn-ghost !py-1.5" href={pairHref(x, y)}>{x} to {y}</Link>)}
              </div>
            </div>
          )}
        </div>
      )}
    </ToolShell>
  );
}