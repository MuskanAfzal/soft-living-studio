import type { MetadataRoute } from 'next';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { absoluteUrl } from '@/lib/site-url';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createSupabaseServerClient();
  const now = new Date();
  const { data: posts } = await supabase
    .from('posts')
    .select('slug,updated_at,created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  const { data: categories } = await supabase
    .from('categories')
    .select('slug,created_at')
    .order('name');

  return [
    {
      url: absoluteUrl('/'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: absoluteUrl('/blog'),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: absoluteUrl('/about'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: absoluteUrl('/contact'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4
    },
    {
      url: absoluteUrl('/privacy-policy'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: absoluteUrl('/terms-and-conditions'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: absoluteUrl('/affiliate-disclosure'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: absoluteUrl('/cookie-policy'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: absoluteUrl('/disclaimer'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    ...(categories || []).map((category) => ({
      url: absoluteUrl(`/category/${category.slug}`),
      lastModified: category.created_at ? new Date(category.created_at) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.7
    })),
    ...(posts || []).map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  ];
}
