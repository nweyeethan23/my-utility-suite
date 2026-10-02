import { SITE } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact Us',
  description: `Contact ${SITE.name} with questions, bug reports or tool requests. We reply within 24–48 hours.`,
  path: '/contact',
});

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Contact us</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">Questions, bug reports or a tool you’d like to see? Send us an email and we’ll get back to you.</p>
      <div className="panel mt-8">
        <p className="label">Email</p>
        <a href={`mailto:${SITE.email}`} className="break-all font-display text-2xl font-bold text-brand hover:underline">{SITE.email}</a>
        <p className="mt-4 text-sm text-muted">We usually reply within 24–48 hours. Please don’t send sensitive documents — our tools work without them.</p>
      </div>
      <div className="mt-6 text-sm text-muted">
        <b className="text-ink">Reporting a problem?</b> Include the tool name, your browser and what you expected to happen — it helps us fix it quickly.
      </div>
    </div>
  );
}
