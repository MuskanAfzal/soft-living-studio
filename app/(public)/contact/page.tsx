import type { Metadata } from 'next';
import { BlogSidebar } from '@/components/BlogSidebar';
import { getSiteSettings } from '@/lib/site-settings';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { submitInquiry } from '../actions';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Soft Living Studio.',
  alternates: {
    canonical: '/contact'
  }
};

export default async function ContactPage({
  searchParams
}: {
  searchParams: Promise<{ sent?: string; subscribed?: string; error?: string }>;
}) {
  const { sent, subscribed, error } = await searchParams;
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
        <img src={settings.blog_banner_image} alt={settings.contact_page_title} />
        <div>
          <h1>{settings.contact_page_title}</h1>
          <p>{settings.contact_page_subtitle}</p>
        </div>
      </section>

      <section className="container content-shell">
        <div>
          {sent && <p className="notice success">{settings.contact_success_message}</p>}
          {subscribed && <p className="notice success">{settings.contact_subscribed_message}</p>}
          {error && <p className="notice">{settings.contact_error_message}</p>}

          <form className="contact-form" action={submitInquiry}>
            <label>{settings.contact_name_label}</label>
            <input className="input" name="name" required />
            <label>{settings.contact_email_label}</label>
            <input className="input" name="email" type="email" required />
            <label>{settings.contact_subject_label}</label>
            <input className="input" name="subject" />
            <label>{settings.contact_message_label}</label>
            <textarea name="message" required />
            <button className="btn" type="submit">{settings.contact_submit_label}</button>
          </form>
        </div>
        <BlogSidebar categories={categories} recentPosts={recentPosts} settings={settings} />
      </section>
    </main>
  );
}
