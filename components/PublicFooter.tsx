import Link from 'next/link';
import { subscribeToNewsletter } from '@/app/(public)/actions';
import type { SiteSettings } from '@/lib/site-settings';

export function PublicFooter({ recentPosts, settings }: { recentPosts?: any[] | null; settings: SiteSettings }) {
  const posts = recentPosts || [];

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-logo">{settings.site_name}</Link>
          <p>{settings.footer_note}</p>
        </div>
        <div>
          <h3>{settings.footer_subscription_title}</h3>
          <form className="footer-subscribe" action={subscribeToNewsletter}>
            <input type="hidden" name="source" value="footer" />
            <input name="email" type="email" placeholder={settings.newsletter_placeholder} required />
            <button type="submit">{settings.newsletter_button_label}</button>
          </form>
        </div>
        <div>
          <h3>{settings.footer_recent_posts_title}</h3>
          <div className="footer-links">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>{post.title}</Link>
            ))}
          </div>
        </div>
        <div>
          <h3>{settings.footer_explore_title}</h3>
          <div className="footer-links">
            <Link href="/">{settings.nav_home_label}</Link>
            <Link href="/blog">{settings.nav_blog_label}</Link>
            <Link href="/about">{settings.nav_about_label}</Link>
            <Link href="/contact">{settings.nav_contact_label}</Link>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">Copyright {new Date().getFullYear()} {settings.site_name}.</div>
    </footer>
  );
}
