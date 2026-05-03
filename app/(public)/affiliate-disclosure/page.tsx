import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Affiliate Disclosure for Soft Living Studio.',
  alternates: {
    canonical: '/affiliate-disclosure'
  }
};

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage title="Affiliate Disclosure" subtitle="How affiliate links work on this website">
      <p>Last updated: May 3, 2026</p>

      <h2>Affiliate Links</h2>
      <p>Soft Living Studio may include affiliate links in blog posts, buying guides, newsletters, and other website content. If you click an affiliate link and make a purchase, we may receive a small commission at no extra cost to you.</p>

      <h2>Editorial Independence</h2>
      <p>We aim to recommend products and ideas that fit the topic and audience of the website. Affiliate compensation may influence which links are included, but it does not require us to publish positive opinions.</p>

      <h2>No Extra Cost</h2>
      <p>Using an affiliate link does not increase your price. Any commission is paid by the retailer or affiliate program.</p>

      <h2>Retailer Responsibility</h2>
      <p>Purchases are completed on third-party websites. We are not responsible for product fulfillment, shipping, returns, warranties, customer service, pricing, or availability.</p>

      <h2>Questions</h2>
      <p>If you have questions about affiliate links, contact us through the <a href="/contact">Contact page</a>.</p>
    </LegalPage>
  );
}
