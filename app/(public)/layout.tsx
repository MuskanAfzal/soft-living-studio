import { PublicFooter } from '@/components/PublicFooter';
import { PublicNav } from '@/components/PublicNav';
import { getSiteSettings } from '@/lib/site-settings';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  const { data: recentPosts } = await supabase
    .from('posts')
    .select('id,title,slug')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(4);
  const { data: categories } = await supabase.from('categories').select('id,name,slug').order('name');
  const settings = await getSiteSettings(supabase);

  return (
    <>
      <PublicNav categories={categories} settings={settings} />
      {children}
      <PublicFooter recentPosts={recentPosts} settings={settings} />
    </>
  );
}
