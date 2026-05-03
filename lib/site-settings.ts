export const defaultSiteSettings = {
  site_name: 'Soft Living Studio',
  theme_image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1800&auto=format&fit=crop',
  blog_banner_image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop',
  hero_kicker: 'Home decor - outfits - shopping guides',
  hero_title: 'Curated living and everyday style.',
  hero_cta: 'Read More',
  intro_text: 'Home decor ideas, clothing inspiration, and buying guides with affiliate recommendations woven naturally into articles.',
  nav_home_label: 'Home',
  nav_blog_label: 'Blog',
  nav_about_label: 'About',
  nav_contact_label: 'Contact',
  blog_page_title: 'Blog',
  blog_page_subtitle: 'Home decor, outfit notes, and useful buying guides.',
  search_page_title: 'Search',
  search_page_subtitle: 'Find posts',
  search_no_results_text: 'No posts found for',
  contact_page_title: 'Contact',
  contact_page_subtitle: "Let's get in touch",
  contact_success_message: 'Your inquiry has been sent.',
  contact_subscribed_message: 'You are subscribed.',
  contact_error_message: 'Please fill in the required fields.',
  contact_name_label: 'Name *',
  contact_email_label: 'Email *',
  contact_subject_label: 'Subject',
  contact_message_label: 'Message *',
  contact_submit_label: 'Submit Form',
  about_title: 'About Me',
  about_image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=900&auto=format&fit=crop',
  about_text: 'A soft place for room styling, outfits, seasonal inspiration, and shopping notes worth saving.',
  newsletter_title: 'Subscribe To My Newsletter',
  newsletter_placeholder: 'Your email address',
  newsletter_button_label: 'Subscribe',
  footer_subscription_title: 'Subscription',
  footer_recent_posts_title: 'Recent Posts',
  footer_explore_title: 'Explore',
  footer_note: 'Some links may be affiliate links. Thank you for supporting the blog.',
  homepage_empty_text: 'Publish a few posts to fill this space with your latest stories.',
  blog_empty_text: 'No published posts yet.',
  category_empty_text: 'No published posts in this category yet.',
  social_facebook: '#',
  social_twitter: '#',
  social_pinterest: '#',
  social_email: 'hello@example.com'
};

export type SiteSettings = typeof defaultSiteSettings;

export async function getSiteSettings(supabase: any): Promise<SiteSettings> {
  const { data } = await supabase.from('site_settings').select('key,value');
  const settings = { ...defaultSiteSettings };

  data?.forEach((item: { key: keyof SiteSettings; value: string }) => {
    if (item.key in settings && item.value) {
      settings[item.key] = item.value;
    }
  });

  return settings;
}
