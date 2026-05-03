import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { PostCard } from '@/components/PostCard';
import { getSiteSettings } from '@/lib/site-settings';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Home decor ideas, clothing inspiration, and buying guides.',
  alternates: {
    canonical: '/blog'
  }
};

export default async function BlogPage() {
  const supabase = await createSupabaseServerClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('*, categories(name)')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  const { data: categories } = await supabase.from('categories').select('id,name,slug').order('name');
  const settings = await getSiteSettings(supabase);

  return (
    <main>
      <section className="page-banner">
        <img src={settings.blog_banner_image} alt={settings.blog_page_title} />
        <div>
          <h1>{settings.blog_page_title}</h1>
          <p>{settings.blog_page_subtitle}</p>
        </div>
      </section>

      <section className="container content-shell">
        <div>
          {posts && posts.length > 0 ? (
            <div className="post-grid">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div>
          ) : (
            <p className="empty-state">{settings.blog_empty_text}</p>
          )}
        </div>
        <BlogSidebar categories={categories} recentPosts={posts} settings={settings} />
      </section>
    </main>
  );
}
