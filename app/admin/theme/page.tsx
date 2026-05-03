import { AdminImagePicker } from '@/components/AdminImagePicker';
import { AdminField } from '@/components/AdminField';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { defaultSiteSettings, getSiteSettings } from '@/lib/site-settings';
import { updateWebsiteSettings } from '../actions';

export default async function ThemePage({
  searchParams
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;
  const supabase = await createSupabaseServerClient();
  const settings = await getSiteSettings(supabase);

  return (
    <div>
      <h1>Website Settings</h1>
      <p className="lead">Change the public website name, homepage text, theme images, sidebar copy, social links, and footer content.</p>

      {success && <p className="notice success">Website settings updated.</p>}

      <form className="form" action={updateWebsiteSettings}>
        <h2 className="form-section-title">Brand</h2>
        <AdminField label="Website name" help="Shown in the header, footer, browser title, and sidebar signature.">
          <input className="input" name="site_name" placeholder="Website name" defaultValue={settings.site_name} />
        </AdminField>

        <h2 className="form-section-title">Homepage</h2>
        <AdminImagePicker name="theme_image" label="Homepage theme image" defaultValue={settings.theme_image} help="Large hero image shown on the homepage when there is no featured post cover image." />
        <AdminField label="Homepage small heading" help="Small text above the homepage hero title when no featured post is available.">
          <input className="input" name="hero_kicker" placeholder="Hero kicker" defaultValue={settings.hero_kicker} />
        </AdminField>
        <AdminField label="Homepage main title" help="Large homepage headline shown when no featured post is available.">
          <input className="input" name="hero_title" placeholder="Hero title" defaultValue={settings.hero_title} />
        </AdminField>
        <AdminField label="Homepage button text" help="Text inside the hero call-to-action button.">
          <input className="input" name="hero_cta" placeholder="Hero button text" defaultValue={settings.hero_cta} />
        </AdminField>
        <AdminField label="Homepage intro text" help="Intro paragraph below the hero image.">
          <textarea name="intro_text" placeholder="Homepage intro text" defaultValue={settings.intro_text} />
        </AdminField>
        <AdminField label="Homepage empty-state text" help="Shown when there are not enough published posts to fill the latest stories section.">
          <textarea name="homepage_empty_text" placeholder="Homepage empty-state text" defaultValue={settings.homepage_empty_text} />
        </AdminField>

        <h2 className="form-section-title">Navigation Labels</h2>
        <AdminField label="Home link label" help="Text for the Home link in the public navigation.">
          <input className="input" name="nav_home_label" placeholder="Home" defaultValue={settings.nav_home_label} />
        </AdminField>
        <AdminField label="Blog link label" help="Text for the Blog link in the public navigation.">
          <input className="input" name="nav_blog_label" placeholder="Blog" defaultValue={settings.nav_blog_label} />
        </AdminField>
        <AdminField label="About link label" help="Text for the About link in the public navigation.">
          <input className="input" name="nav_about_label" placeholder="About" defaultValue={settings.nav_about_label} />
        </AdminField>
        <AdminField label="Contact link label" help="Text for the Contact link in the public navigation.">
          <input className="input" name="nav_contact_label" placeholder="Contact" defaultValue={settings.nav_contact_label} />
        </AdminField>

        <h2 className="form-section-title">Blog Page</h2>
        <AdminImagePicker name="blog_banner_image" label="Blog and archive banner image" defaultValue={settings.blog_banner_image} help="Large image used on the Blog, Search, Contact, and Category header areas." />
        <AdminField label="Blog page title" help="Main heading at the top of the public Blog page.">
          <input className="input" name="blog_page_title" placeholder="Blog page title" defaultValue={settings.blog_page_title} />
        </AdminField>
        <AdminField label="Blog page subtitle" help="Short supporting text under the Blog page title.">
          <input className="input" name="blog_page_subtitle" placeholder="Blog page subtitle" defaultValue={settings.blog_page_subtitle} />
        </AdminField>
        <AdminField label="Blog empty-state text" help="Shown on the Blog page when there are no published posts.">
          <textarea name="blog_empty_text" placeholder="Blog empty-state text" defaultValue={settings.blog_empty_text} />
        </AdminField>
        <AdminField label="Category empty-state text" help="Shown on category pages that do not have published posts yet.">
          <textarea name="category_empty_text" placeholder="Category empty-state text" defaultValue={settings.category_empty_text} />
        </AdminField>

        <h2 className="form-section-title">Search Page</h2>
        <AdminField label="Search page title" help="Main heading on the Search page.">
          <input className="input" name="search_page_title" placeholder="Search" defaultValue={settings.search_page_title} />
        </AdminField>
        <AdminField label="Search page subtitle" help="Subtitle shown before a visitor searches.">
          <input className="input" name="search_page_subtitle" placeholder="Find posts" defaultValue={settings.search_page_subtitle} />
        </AdminField>
        <AdminField label="No search results message" help="Shown when a visitor searches and no posts match.">
          <textarea name="search_no_results_text" placeholder="No posts found." defaultValue={settings.search_no_results_text} />
        </AdminField>

        <h2 className="form-section-title">Contact Page</h2>
        <AdminField label="Contact page title" help="Main heading at the top of the Contact page.">
          <input className="input" name="contact_page_title" placeholder="Contact" defaultValue={settings.contact_page_title} />
        </AdminField>
        <AdminField label="Contact page subtitle" help="Small text under the Contact page title.">
          <input className="input" name="contact_page_subtitle" placeholder="Let's get in touch" defaultValue={settings.contact_page_subtitle} />
        </AdminField>
        <AdminField label="Inquiry sent message" help="Success message after a visitor submits the contact form.">
          <input className="input" name="contact_success_message" defaultValue={settings.contact_success_message} />
        </AdminField>
        <AdminField label="Subscription success message" help="Success message after a visitor subscribes to the newsletter.">
          <input className="input" name="contact_subscribed_message" defaultValue={settings.contact_subscribed_message} />
        </AdminField>
        <AdminField label="Contact form error message" help="Message shown when required contact fields are missing.">
          <input className="input" name="contact_error_message" defaultValue={settings.contact_error_message} />
        </AdminField>
        <AdminField label="Name field label" help="Label above the name field on the Contact page.">
          <input className="input" name="contact_name_label" defaultValue={settings.contact_name_label} />
        </AdminField>
        <AdminField label="Email field label" help="Label above the email field on the Contact page.">
          <input className="input" name="contact_email_label" defaultValue={settings.contact_email_label} />
        </AdminField>
        <AdminField label="Subject field label" help="Label above the subject field on the Contact page.">
          <input className="input" name="contact_subject_label" defaultValue={settings.contact_subject_label} />
        </AdminField>
        <AdminField label="Message field label" help="Label above the message field on the Contact page.">
          <input className="input" name="contact_message_label" defaultValue={settings.contact_message_label} />
        </AdminField>
        <AdminField label="Contact submit button text" help="Text inside the Contact page form button.">
          <input className="input" name="contact_submit_label" defaultValue={settings.contact_submit_label} />
        </AdminField>

        <h2 className="form-section-title">Sidebar</h2>
        <AdminField label="About widget title" help="Heading shown in the sidebar About box and About page banner.">
          <input className="input" name="about_title" placeholder="About widget title" defaultValue={settings.about_title} />
        </AdminField>
        <AdminImagePicker name="about_image" label="About image" defaultValue={settings.about_image} help="Image shown in the sidebar About box and About page." />
        <AdminField label="About text" help="Short introduction shown in the sidebar and About page.">
          <textarea name="about_text" placeholder="About text" defaultValue={settings.about_text} />
        </AdminField>
        <AdminField label="Newsletter heading" help="Heading shown above subscription forms in the sidebar.">
          <input className="input" name="newsletter_title" placeholder="Newsletter title" defaultValue={settings.newsletter_title} />
        </AdminField>
        <AdminField label="Newsletter email placeholder" help="Placeholder inside newsletter email fields.">
          <input className="input" name="newsletter_placeholder" placeholder="Your email address" defaultValue={settings.newsletter_placeholder} />
        </AdminField>
        <AdminField label="Newsletter button text" help="Text inside newsletter subscribe buttons.">
          <input className="input" name="newsletter_button_label" placeholder="Subscribe" defaultValue={settings.newsletter_button_label} />
        </AdminField>

        <h2 className="form-section-title">Social Links</h2>
        <AdminField label="Facebook URL" help="Link behind the Facebook icon in the header and sidebar.">
          <input className="input" name="social_facebook" placeholder="Facebook URL" defaultValue={settings.social_facebook} />
        </AdminField>
        <AdminField label="X/Twitter URL" help="Link behind the X icon in the header and sidebar.">
          <input className="input" name="social_twitter" placeholder="X/Twitter URL" defaultValue={settings.social_twitter} />
        </AdminField>
        <AdminField label="Pinterest URL" help="Link behind the Pinterest icon in the header and sidebar.">
          <input className="input" name="social_pinterest" placeholder="Pinterest URL" defaultValue={settings.social_pinterest} />
        </AdminField>
        <AdminField label="Contact email" help="Email address used by the email icon. Enter only the address, not mailto:.">
          <input className="input" name="social_email" placeholder="Email address" defaultValue={settings.social_email} />
        </AdminField>

        <h2 className="form-section-title">Footer</h2>
        <AdminField label="Footer subscription heading" help="Heading above the newsletter form in the footer.">
          <input className="input" name="footer_subscription_title" defaultValue={settings.footer_subscription_title} />
        </AdminField>
        <AdminField label="Footer recent posts heading" help="Heading above the recent posts list in the footer.">
          <input className="input" name="footer_recent_posts_title" defaultValue={settings.footer_recent_posts_title} />
        </AdminField>
        <AdminField label="Footer explore heading" help="Heading above the footer navigation links.">
          <input className="input" name="footer_explore_title" defaultValue={settings.footer_explore_title} />
        </AdminField>
        <AdminField label="Footer note" help="Small paragraph shown beside the website name in the footer.">
          <textarea name="footer_note" placeholder="Footer note" defaultValue={settings.footer_note || defaultSiteSettings.footer_note} />
        </AdminField>

        <button className="btn">Save Website Settings</button>
      </form>
    </div>
  );
}
