"use client";
import { useEffect, useState } from 'react';

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function AgeCalculatorClient() {
  const [dob, setDob] = useState('');
  const [at, setAt] = useState('');
  useEffect(() => setAt(iso(new Date())), []); // set on client to avoid server/client date mismatch

  const b = dob ? new Date(`${dob}T00:00:00`) : null;
  const t = at ? new Date(`${at}T00:00:00`) : null;
  let r = null;
  if (b && t && t >= b) {
    let y = t.getFullYear() - b.getFullYear(), m = t.getMonth() - b.getMonth(), d = t.getDate() - b.getDate();
    if (d < 0) { m--; d += new Date(t.getFullYear(), t.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    const days = Math.round((t - b) / 864e5);
    let next = new Date(t.getFullYear(), b.getMonth(), b.getDate());
    if (next < t) next = new Date(t.getFullYear() + 1, b.getMonth(), b.getDate());
    r = { y, m, d, days, weeks: Math.floor(days / 7), hours: days * 24, next: Math.round((next - t) / 864e5), dow: next.toLocaleDateString(undefined, { weekday: 'long' }) };
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="dob" className="label">Date of birth</label><input id="dob" type="date" className="input" max={at} value={dob} onChange={(e) => setDob(e.target.value)} /></div>
        <div><label htmlFor="at" className="label">Age at (default: today)</label><input id="at" type="date" className="input" value={at} onChange={(e) => setAt(e.target.value)} /></div>
      </div>
      {dob && !r && <p className="error" role="alert">The “age at” date must be after the date of birth.</p>}
      {r ? (
        <>
          <div className="result" aria-live="polite">
            <small>Exact age</small>
            <strong>{r.y} years, {r.m} months, {r.d} days</strong>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="stat"><b>{r.days.toLocaleString()}</b><span>Days lived</span></div>
            <div className="stat"><b>{r.weeks.toLocaleString()}</b><span>Weeks</span></div>
            <div className="stat"><b>{r.hours.toLocaleString()}</b><span>Hours</span></div>
            <div className="stat"><b>{r.next === 0 ? 'Today! 🎉' : `${r.next} days`}</b><span>Next birthday ({r.dow})</span></div>
          </div>
        </>
      ) : !dob && <p className="notice">Pick a date of birth to see your exact age.</p>}
    </div>
  );
}
