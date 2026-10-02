import Link from 'next/link';
import { SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${SITE.name} handles your data: files are processed in your browser, and we use cookies for advertising and analytics.`,
  path: '/privacy-policy',
});

export default function Privacy() {
  return (
    <article className="legal mx-auto max-w-3xl">
      <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated: October 2, 2026</p>
      <p className="mt-6">Your privacy matters to us. This policy explains what {SITE.name} (“we”, “us”) collects when you use {SITE.url.replace('https://', '')} and how it is used.</p>

      <h2>1. Your files and text stay on your device</h2>
      <p>PDF, image, text, calculator and developer tools run entirely in your web browser. Files you select and text you type are <b>not uploaded to or stored on our servers</b>. They are discarded when you close or refresh the page.</p>

      <h2>2. Information we collect</h2>
      <ul>
        <li><b>Usage data:</b> if analytics is enabled, standard information such as pages viewed, device type, browser, approximate location (country/city) and referring site.</li>
        <li><b>Currency tool:</b> when you change currencies, our server requests exchange rates from a third-party rate provider. Only the currency code is sent.</li>
        <li><b>Messages:</b> if you email us, we keep your message and address to reply to you.</li>
      </ul>

      <h2>3. Cookies and advertising</h2>
      <p>We use Google AdSense to show ads. Google and its partners use cookies, including the DoubleClick cookie, to serve ads based on your visits to this and other websites. You can opt out of personalised advertising at <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">Google Ads Settings</a> or <a href="https://www.aboutads.info" rel="noopener noreferrer" target="_blank">aboutads.info</a>.</p>
      <p>Where required by law (for example in the EEA, UK and Switzerland), ads are personalised only with your consent. You can also block or delete cookies in your browser settings; the tools will keep working.</p>

      <h2>4. Analytics</h2>
      <p>We may use Google Analytics to understand which tools are popular. It collects anonymised usage statistics through cookies. See <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer" target="_blank">how Google uses data from partner sites</a>.</p>

      <h2>5. Third-party links</h2>
      <p>Our site may link to other websites. We are not responsible for their content or privacy practices.</p>

      <h2>6. Children</h2>
      <p>Our tools are general-purpose and not directed to children under 13. We do not knowingly collect personal information from children.</p>

      <h2>7. Your rights</h2>
      <p>Depending on where you live, you may have the right to access, correct or delete personal data we hold, or to object to its processing. Because we store very little, most requests are simple — email us and we will respond.</p>

      <h2>8. Changes</h2>
      <p>We may update this policy and will change the date above when we do.</p>

      <h2>9. Contact</h2>
      <p>Questions? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or use our <Link href="/contact">contact page</Link>.</p>
    </article>
  );
}
