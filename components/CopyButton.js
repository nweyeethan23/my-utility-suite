"use client";
import { useState } from 'react';

export default function CopyButton({ text, label = 'Copy', className = 'btn-ghost' }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className={className} disabled={!text}
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); } catch { /* clipboard blocked */ }
      }}>
      {done ? '✓ Copied' : label}
    </button>
  );
}
