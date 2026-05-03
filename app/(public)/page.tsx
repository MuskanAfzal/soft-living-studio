import Link from 'next/link';
import { BlogSidebar } from '@/components/BlogSidebar';
import { PostCard } from '@/components/PostCard';
import { getSiteSettings } from '@/lib/site-settings';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { formatDate } from '@/lib/utils';

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('*, categories(name)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(7);
  const { data: categories } = await supabase.from('categories').select('id,name,slug').order('name');
  const settings = await getSiteSettings(supabase);

  const featured = posts?.[0];
  const remainingPosts = posts?.slice(1) || [];

  return (
    <main>
      <section className="editorial-hero">
        <img
          src={featured?.cover_image || settings.theme_image}
          alt={featured?.cover_image_alt || featured?.title || 'Editorial lifestyle feature'}
        />
        <div className="hero-overlay">
          <span>{featured ? formatDate(featured.created_at) : settings.hero_kicker}</span>
          <h1>{featured?.title || settings.hero_title}</h1>
          <Link href={featured ? `/blog/${featured.slug}` : '/blog'}>{settings.hero_cta}</Link>
        </div>
      </section>

      <section className="container intro-strip">
        <p>{settings.intro_text}</p>
      </section>

      <section className="container content-shell">
        <div>
          <div className="section-head centered-head">
            <h2>Latest Stories</h2>
          </div>
          {remainingPosts.length > 0 ? (
            <div className="post-grid">{remainingPosts.map((post) => <PostCard key={post.id} post={post} />)}</div>
          ) : (
            <p className="empty-state">{settings.homepage_empty_text}</p>
          )}
        </div>
        <BlogSidebar categories={categories} recentPosts={posts} settings={settings} />
      </section>
    </main>
  );
}
