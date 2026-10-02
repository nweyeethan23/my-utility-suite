import CategoryHub from '@/components/CategoryHub';
import { CAT_BY_ID } from '@/lib/tools';
import { pageMetadata } from '@/lib/seo';

const cat = CAT_BY_ID.pdf;
export const metadata = pageMetadata({
  title: cat.title, description: cat.description, path: cat.path,
  keywords: ['pdf tools', 'split pdf', 'merge pdf', 'compress pdf', 'jpg to pdf', 'free pdf tools'],
});

export default function PdfHub() { return <CategoryHub cat={cat} />; }
