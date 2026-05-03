import Link from 'next/link';
import { Mail } from 'lucide-react';
import { subscribeToNewsletter } from '@/app/(public)/actions';
import type { SiteSettings } from '@/lib/site-settings';

export function BlogSidebar({
  categories,
  recentPosts,
  settings
}: {
  categories?: any[] | null;
  recentPosts?: any[] | null;
  settings: SiteSettings;
}) {
  return (
    <aside className="blog-sidebar">
      <section className="widget about-widget">
        <h3>{settings.about_title}</h3>
        <img src={settings.about_image} alt={settings.about_title} />
        <p>{settings.about_text}</p>
        <div className="signature">{settings.site_name}</div>
      </section>

      <section className="widget newsletter-widget">
        <h3>{settings.newsletter_title}</h3>
        <form action={subscribeToNewsletter}>
          <input type="hidden" name="source" value="sidebar" />
          <input className="input" name="email" type="email" placeholder={settings.newsletter_placeholder} required />
          <button className="btn" type="submit">{settings.newsletter_button_label}</button>
        </form>
      </section>

      <section className="widget">
        <h3>Follow Me On</h3>
        <div className="widget-social">
          <a href={settings.social_facebook || '#'} aria-label="Facebook">f</a>
          <a href={settings.social_twitter || '#'} aria-label="Twitter">x</a>
          <a href={settings.social_pinterest || '#'} aria-label="Pinterest">p</a>
          <a href={`mailto:${settings.social_email}`} aria-label="Email"><Mail size={17} /></a>
        </div>
      </section>

      <section className="widget">
        <h3>Recent Posts</h3>
        <div className="sidebar-list">
          {recentPosts?.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>{post.title}</Link>
          ))}
        </div>
      </section>

      <section className="widget">
        <h3>Categories</h3>
        <div className="category-list">
          {categories?.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>{category.name}</Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
