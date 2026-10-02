import Link from 'next/link';
import { SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms of Use',
  description: `Terms of use for ${SITE.name}: free tools provided as-is, with no warranty. Please read before using the site.`,
  path: '/terms',
});

export default function Terms() {
  return (
    <article className="legal mx-auto max-w-3xl">
      <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Terms of Use</h1>
      <p className="mt-3 text-sm text-muted">Last updated: October 2, 2026</p>
      <p className="mt-6">By using {SITE.name} you agree to these terms. If you do not agree, please do not use the site.</p>

      <h2>1. Use of the tools</h2>
      <p>The tools are provided free of charge for personal and commercial use. Do not misuse the site: no attempts to disrupt it, overload it, or use it for unlawful purposes.</p>

      <h2>2. No warranty</h2>
      <p>Tools are provided “as is” without warranties of any kind. We try to make results accurate, but we cannot guarantee them. Always keep a copy of your original files.</p>

      <h2>3. Not professional advice</h2>
      <p>Calculators (BMI, loan EMI, currency and others) give estimates for information only. They are <b>not</b> medical, financial or legal advice. Exchange rates are mid-market rates and may differ from the rate your bank or provider offers.</p>

      <h2>4. Your content</h2>
      <p>You keep all rights to the files and text you process. Because processing happens in your browser, we do not receive or store your content. You are responsible for having the right to process the files you use.</p>

      <h2>5. Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {SITE.name} is not liable for any loss or damage arising from use of the site or its tools, including data loss or decisions made from calculator results.</p>

      <h2>6. Advertising and third parties</h2>
      <p>The site shows ads from Google AdSense and may link to third-party sites. We don’t control them. See our <Link href="/privacy-policy">Privacy Policy</Link>.</p>

      <h2>7. Changes</h2>
      <p>We may update these terms and the tools at any time. Continued use means you accept the updated terms.</p>

      <h2>8. Contact</h2>
      <p>Questions about these terms? <Link href="/contact">Contact us</Link> at {SITE.email}.</p>
    </article>
  );
}
