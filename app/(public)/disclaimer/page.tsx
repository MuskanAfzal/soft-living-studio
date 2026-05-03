import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for Soft Living Studio.',
  alternates: {
    canonical: '/disclaimer'
  }
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" subtitle="Important information about our content">
      <p>Last updated: May 3, 2026</p>

      <h2>General Information</h2>
      <p>The content on Soft Living Studio is published for general informational and editorial purposes. We aim to keep information accurate, but we make no guarantees about completeness, accuracy, reliability, or availability.</p>

      <h2>Product And Shopping Content</h2>
      <p>Product details, prices, availability, promotions, and retailer policies may change without notice. Always verify information directly with the seller before making a purchase.</p>

      <h2>Affiliate Disclosure</h2>
      <p>Some links on this website are affiliate links. If you click a link and make a purchase, we may earn a commission at no extra cost to you. Affiliate relationships do not guarantee a positive review or recommendation.</p>

      <h2>Advertising Disclosure</h2>
      <p>This website may display ads served by Google AdSense or other advertising networks. Ads may be personalized or non-personalized depending on user settings, consent, location, and advertising partner rules.</p>

      <h2>External Websites</h2>
      <p>We are not responsible for third-party websites linked from this site, including their content, data practices, terms, pricing, products, or services.</p>

      <h2>No Professional Advice</h2>
      <p>Nothing on this website should be treated as professional advice. Use your own judgment and consult an appropriate professional where needed.</p>
    </LegalPage>
  );
}
