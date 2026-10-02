import Link from 'next/link';
import { SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${SITE.name} protects your data: zero server storage, local browser processing, and anonymous usage analytics.`,
  path: '/privacy-policy',
});

export default function Privacy() {
  const contactEmail = SITE.contactEmail || SITE.email || 'utilsuite79@gmail.com';

  return (
    <article className="legal mx-auto max-w-3xl">
      <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted">Last updated: October 2, 2026</p>
      <p className="mt-6">
        At {SITE.name}, we take your privacy seriously. This policy explains what information {SITE.name} (“we”, “us”) handles when you visit {SITE.url.replace('https://', '')} and how we keep your data secure.
      </p>

      <h2>1. Local Processing & Zero File Storage</h2>
      <p>
        All utility tools—including PDF editing, image conversion, text formatting, and calculation tools—run completely client-side in your web browser. Files you drop or text you enter are <b>never uploaded to or stored on our servers</b>. All session data is immediately cleared when you close or refresh the page.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li>
          <b>Local Tool Inputs:</b> Processed entirely on your machine. We cannot view, access, or log your tool inputs or uploaded documents.
        </li>
        <li>
          <b>Anonymous Analytics:</b> We may collect aggregate, anonymized technical metrics (such as visited pages, device type, and general geographic region) solely to monitor platform health and optimize performance.
        </li>
        <li>
          <b>Direct Inquiries:</b> If you reach out to our team by email, we retain your email address and message contents solely to answer your questions.
        </li>
      </ul>

      <h2>3. Third-Party Services & Links</h2>
      <p>
        Our site may include links to third-party tools or open-source documentation. We are not responsible for the privacy practices, policies, or content of external destinations.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We apply industry-standard security safeguards. Because your processing actions stay on your local hardware and we operate without database accounts or passwords, your personal information is fundamentally protected.
      </p>

      <h2>5. Children’s Privacy</h2>
      <p>
        Our services are general-purpose utilities and are not directed to individuals under the age of 13. We do not intentionally gather personal records from minors.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have questions or feedback about this policy, contact us at{' '}
        <a href={`mailto:${contactEmail}`} className="underline hover:text-brand">
          {contactEmail}
        </a>{' '}
        or visit our <Link href="/contact" className="underline hover:text-brand">contact page</Link>.
      </p>
    </article>
  );
}