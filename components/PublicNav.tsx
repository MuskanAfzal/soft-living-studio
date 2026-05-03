import Link from 'next/link';
import { Mail, Search } from 'lucide-react';
import type { SiteSettings } from '@/lib/site-settings';

export function PublicNav({ categories, settings }: { categories?: any[] | null; settings: SiteSettings }) {
  return (
    <header className="nav">
      <div className="container masthead">
        <div className="social-row" aria-label="Social links">
          <a href={settings.social_facebook || '#'} aria-label="Facebook">f</a>
          <a href={settings.social_twitter || '#'} aria-label="Twitter">x</a>
          <a href={settings.social_pinterest || '#'} aria-label="Pinterest">p</a>
          <a href={`mailto:${settings.social_email}`} aria-label="Email"><Mail size={16} /></a>
        </div>
        <Link href="/" className="logo">{settings.site_name}</Link>
        <form className="search-form" action="/search">
          <input name="q" type="search" placeholder="Search" aria-label="Search posts" />
          <button className="search-button" type="submit" aria-label="Search"><Search size={17} /></button>
        </form>
      </div>
      <div className="nav-bar">
        <nav className="container nav-links">
          <Link href="/">{settings.nav_home_label}</Link>
          <Link href="/blog">{settings.nav_blog_label}</Link>
          <Link href="/about">{settings.nav_about_label}</Link>
          <Link href="/contact">{settings.nav_contact_label}</Link>
          {categories?.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>{category.name}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
