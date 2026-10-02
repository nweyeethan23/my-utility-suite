import './globals.css';
import Script from 'next/script';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { siteJsonLd } from '@/lib/seo';
import { ADSENSE_CLIENT } from '@/lib/ads';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });
const body = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // optional: G-XXXXXXXXXX
const VERIFY = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION; // optional: Search Console token

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} – Free Online PDF, Image & Text Tools`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ['free online tools', 'pdf tools', 'image converter', 'currency converter', 'word counter', 'qr code generator', 'calculators'],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE.name} – Free Online Tools`,
    description: SITE.description,
    url: SITE.url, siteName: SITE.name, locale: SITE.locale, type: 'website',
  },
  twitter: { card: 'summary_large_image', title: `${SITE.name} – Free Online Tools`, description: SITE.description },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  verification: VERIFY ? { google: VERIFY } : undefined,
  other: ADSENSE_CLIENT ? { 'google-adsense-account': ADSENSE_CLIENT } : undefined,
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#0b7a5e' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-signal focus:px-4 focus:py-2 focus:font-bold">
          Skip to content
        </a>
        <JsonLd data={siteJsonLd()} />
        <Navbar />
        <main id="main" className="mx-auto min-h-[70vh] max-w-6xl px-4 py-8 md:py-12">{children}</main>
        <Footer />

        {ADSENSE_CLIENT && (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
