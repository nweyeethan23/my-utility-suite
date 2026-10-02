import { NextResponse } from 'next/server';
import { fetchRates } from '@/lib/currency';

export async function GET(request) {
  const base = (new URL(request.url).searchParams.get('base') || 'USD').toUpperCase();
  if (!/^[A-Z]{3}$/.test(base)) {
    return NextResponse.json({ error: 'Invalid currency code' }, { status: 400 });
  }
  try {
    return NextResponse.json(await fetchRates(base), {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch (e) {
    return NextResponse.json({ error: e.message || 'Failed to load rates' }, { status: 502 });
  }
}
