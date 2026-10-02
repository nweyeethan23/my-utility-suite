# UtilSuite - Smart Tools

21 free, browser-based tools built with Next.js (App Router) and Tailwind CSS v4.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Before you deploy — set these environment variables

Copy `.env.example` to `.env.local` (or add them in Vercel → Settings → Environment Variables).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your real domain, e.g. `https://utilsuite.app` (sitemap, canonical URLs, Open Graph) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher ID `ca-pub-XXXXXXXXXXXXXXXX` (after approval) |
| `NEXT_PUBLIC_ADSLOT_TOP / INLINE / SIDEBAR / BOTTOM / HOME` | Ad unit slot IDs |
| `NEXT_PUBLIC_GA_ID` | Optional Google Analytics `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Optional Search Console verification token |
| `EXCHANGE_RATE_API_KEY` | Optional. Without it the free keyless feed is used |

## Add a new tool (3 steps)

1. Add an entry to `lib/tools.js` (title, description, intro, steps, FAQs, related…).
2. Create `app/<tool>/<Tool>Client.js` (the interactive part, `"use client"`).
3. Create `app/<tool>/page.js`:

```js
import ToolShell from '@/components/ToolShell';
import MyClient from './MyClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';
const tool = TOOL_BY_ID['my-tool'];
export const metadata = toolMetadata(tool);
export default function Page() { return <ToolShell tool={tool}><MyClient /></ToolShell>; }
```

Metadata, structured data (WebApplication, HowTo, FAQ, Breadcrumb), sitemap, footer/nav links, related-tool links and ad slots are all automatic.

## AdSense

Ad positions (`top`, `inline`, `sidebar`, `bottom`, `home`) are already placed on every tool page via `<AdSlot />`. Until `NEXT_PUBLIC_ADSENSE_CLIENT` and a slot ID are set they render nothing in production (dashed placeholders in `npm run dev`). Also replace the commented line in `public/ads.txt` with your own publisher line once approved.
