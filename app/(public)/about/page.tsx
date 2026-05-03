import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { getSiteSettings } from '@/lib/site-settings';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Soft Living Studio.',
  alternates: {
    canonical: '/about'
  }
};

export default async function AboutPage() {
  const supabase = await createSupabaseServerClient();
  const settings = await getSiteSettings(supabase);
  const { data: recentPosts } = await supabase
    .from('posts')
    .select('id,title,slug')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(5);
  const { data: categories } = await supabase.from('categories').select('id,name,slug').order('name');

  return (
    <main>
      <section className="page-banner">
        <img src={settings.about_image} alt={settings.about_title} />
        <div>
          <h1>{settings.about_title}</h1>
          <p>{settings.site_name}</p>
        </div>
      </section>

      <section className="container content-shell">
        <article className="article-content">
          <h2>{settings.site_name}</h2>
          <p>{settings.about_text}</p>
        </article>
        <BlogSidebar categories={categories} recentPosts={recentPosts} settings={settings} />
      </section>
    </main>
  );
}
