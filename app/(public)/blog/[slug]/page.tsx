import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { getSiteSettings } from '@/lib/site-settings';
import { absoluteUrl } from '@/lib/site-url';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: post } = await supabase
    .from('posts')
    .select('title,excerpt,cover_image,cover_image_alt,meta_title,meta_description,seo_keywords,canonical_url,og_image')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!post) return {};

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;
  const image = post.og_image || post.cover_image || undefined;

  return {
    title,
    description,
    keywords: post.seo_keywords || undefined,
    alternates: { canonical: post.canonical_url || absoluteUrl(`/blog/${slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/blog/${slug}`),
      images: image ? [image] : undefined,
      type: 'article'
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined
    }
  };
}

export default async function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: post } = await supabase
    .from('posts')
    .select('*, categories(name,slug)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  const { data: recentPosts } = await supabase
    .from('posts')
    .select('id,title,slug')
    .eq('status', 'published')
    .neq('slug', slug)
    .order('created_at', { ascending: false })
    .limit(5);
  const { data: categories } = await supabase.from('categories').select('id,name,slug').order('name');
  const settings = await getSiteSettings(supabase);

  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    image: post.og_image || post.cover_image || undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      '@type': 'Organization',
      name: settings.site_name
    },
    publisher: {
      '@type': 'Organization',
      name: settings.site_name
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/blog/${post.slug}`)
    },
    articleSection: post.categories?.name
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {post.cover_image && (
        <section className="single-hero">
          <img src={post.cover_image} alt={post.cover_image_alt || post.title} />
        </section>
      )}

      <section className="container post-title-block">
        <div className="meta">{post.categories?.name || 'Style'}</div>
        <h1>{post.title}</h1>
        <time>{formatDate(post.created_at)}</time>
      </section>

      <section className="container content-shell">
        <article className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        <BlogSidebar categories={categories} recentPosts={recentPosts} settings={settings} />
      </section>
    </main>
  );
}
