import { notFound } from 'next/navigation';
import CategoryHub from '@/components/CategoryHub';
import { CATEGORIES } from '@/lib/tools';
import { pageMetadata } from '@/lib/seo';

const hubs = CATEGORIES.filter((c) => c.path.startsWith('/category/'));
const find = (slug) => hubs.find((c) => c.path === `/category/${slug}`);

export const dynamicParams = false;
export function generateStaticParams() {
  return hubs.map((c) => ({ slug: c.path.split('/').pop() }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = find(slug);
  if (!cat) return {};
  return pageMetadata({ title: cat.title, description: cat.description, path: cat.path });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const cat = find(slug);
  if (!cat) notFound();
  return <CategoryHub cat={cat} />;
}
