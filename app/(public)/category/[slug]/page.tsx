import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { PostCard } from '@/components/PostCard';
import { getSiteSettings } from '@/lib/site-settings';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: category } = await supabase.from('categories').select('name,description').eq('slug', slug).single();

  if (!category) return {};

  return {
    title: category.name,
    description: category.description || `Posts filed under ${category.name}.`,
    alternates: {
      canonical: `/category/${slug}`
    }
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const settings = await getSiteSettings(supabase);
  const { data: category } = await supabase.from('categories').select('*').eq('slug', slug).single();

  if (!category) notFound();

  const { data: posts } = await supabase
    .from('posts')
    .select('*, categories(name)')
    .eq('status', 'published')
    .eq('category_id', category.id)
    .order('created_at', { ascending: false });
  const { data: categories } = await supabase.from('categories').select('id,name,slug').order('name');

  return (
    <main>
      <section className="page-banner">
        <img src={settings.blog_banner_image} alt={category.name} />
        <div>
          <h1>{category.name}</h1>
          <p>{category.description || 'Category archive'}</p>
        </div>
      </section>

      <section className="container content-shell">
        <div>
          {posts && posts.length > 0 ? (
            <div className="post-grid">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div>
          ) : (
            <p className="empty-state">{settings.category_empty_text}</p>
          )}
        </div>
        <BlogSidebar categories={categories} recentPosts={posts} settings={settings} />
      </section>
    </main>
  );
}
