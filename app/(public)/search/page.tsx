import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { PostCard } from '@/components/PostCard';
import { getSiteSettings } from '@/lib/site-settings';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search Soft Living Studio posts.',
  robots: {
    index: false,
    follow: true
  }
};

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = String(q || '').trim();
  const supabase = await createSupabaseServerClient();
  const settings = await getSiteSettings(supabase);
  const { data: categories } = await supabase.from('categories').select('id,name,slug').order('name');
  const { data: recentPosts } = await supabase
    .from('posts')
    .select('id,title,slug')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(5);

  const safeQuery = query.replace(/[^\p{L}\p{N}\s-]/gu, '').trim();
  const { data: posts } = safeQuery
    ? await supabase
        .from('posts')
        .select('*, categories(name)')
        .eq('status', 'published')
        .or(`title.ilike.%${safeQuery}%,excerpt.ilike.%${safeQuery}%,content.ilike.%${safeQuery}%`)
        .order('created_at', { ascending: false })
    : { data: [] };

  return (
    <main>
      <section className="page-banner">
        <img src={settings.blog_banner_image} alt="Search" />
        <div>
          <h1>{settings.search_page_title}</h1>
          <p>{query ? `Results for ${query}` : settings.search_page_subtitle}</p>
        </div>
      </section>

      <section className="container content-shell">
        <div>
          <form className="search-page-form" action="/search">
            <input className="input" name="q" type="search" placeholder="Search posts" defaultValue={query} />
            <button className="btn" type="submit">Search</button>
          </form>
          {query && posts?.length === 0 && <p className="notice">{settings.search_no_results_text} "{query}".</p>}
          <div className="post-grid">{posts?.map((post) => <PostCard key={post.id} post={post} />)}</div>
        </div>
        <BlogSidebar categories={categories} recentPosts={recentPosts} settings={settings} />
      </section>
    </main>
  );
}
