import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and Conditions for Soft Living Studio.',
  alternates: {
    canonical: '/terms-and-conditions'
  }
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions" subtitle="Rules for using this website">
      <p>Last updated: May 3, 2026</p>

      <h2>Acceptance Of Terms</h2>
      <p>By using Soft Living Studio, you agree to these Terms and Conditions. If you do not agree, please stop using the website.</p>

      <h2>Content</h2>
      <p>All content is provided for general informational and editorial purposes only. We may update, remove, or change content at any time.</p>

      <h2>No Professional Advice</h2>
      <p>Content on this website is not professional, legal, medical, financial, or design advice. You are responsible for your own decisions and purchases.</p>

      <h2>Intellectual Property</h2>
      <p>Unless otherwise stated, website content, branding, text, layout, and original media belong to Soft Living Studio or its licensors. You may not copy, republish, or redistribute content without permission.</p>

      <h2>User Submissions</h2>
      <p>If you submit inquiries, comments, messages, or other content, you confirm that your submission is lawful and does not violate the rights of others.</p>

      <h2>External Links</h2>
      <p>This website may link to third-party websites. We are not responsible for third-party content, policies, prices, products, availability, or practices.</p>

      <h2>Affiliate Links And Advertising</h2>
      <p>Some pages may include affiliate links or advertising. We may earn commissions from qualifying purchases or receive compensation from advertising partners.</p>

      <h2>Limitation Of Liability</h2>
      <p>We are not liable for any loss, damage, or inconvenience resulting from your use of the website, reliance on content, third-party links, product purchases, or technical interruptions.</p>

      <h2>Changes To These Terms</h2>
      <p>We may update these Terms and Conditions at any time. Continued use of the website means you accept the updated terms.</p>

      <h2>Contact</h2>
      <p>For questions about these terms, contact us through the <a href="/contact">Contact page</a>.</p>
    </LegalPage>
  );
}
