import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Soft Living Studio.',
  alternates: {
    canonical: '/privacy-policy'
  }
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" subtitle="How we collect, use, and protect information">
      <p>Last updated: May 3, 2026</p>

      <h2>Who We Are</h2>
      <p>Soft Living Studio is a lifestyle blog that publishes home decor, fashion, shopping guide, and affiliate content.</p>

      <h2>Information We Collect</h2>
      <p>We may collect information you voluntarily submit, including your name, email address, subscription email, inquiry message, and any other information you send through forms on this website.</p>
      <p>We may also collect basic technical information through analytics, hosting logs, cookies, web beacons, IP addresses, browser information, device information, referring pages, and pages viewed.</p>

      <h2>How We Use Information</h2>
      <p>We use information to operate the website, respond to inquiries, manage subscriptions, improve content, protect the website, understand audience interest, and comply with legal obligations.</p>

      <h2>Google AdSense And Advertising</h2>
      <p>This website may use Google AdSense or other Google advertising products. Google and its partners may use cookies, web beacons, IP addresses, and other identifiers to serve ads, personalize ads where allowed, limit ad frequency, measure ad performance, and prevent abuse.</p>
      <p>Third parties, including Google, may place and read cookies on your browser or use web beacons or IP addresses as a result of ad serving on this website.</p>
      <p>You can learn how Google uses data when you use partner sites or apps at <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google's partner sites policy page</a>.</p>
      <p>You can manage ad personalization at <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>

      <h2>Cookies</h2>
      <p>Cookies are small files stored on your device. We and third-party services may use cookies for website functionality, analytics, advertising, security, frequency capping, and measurement. You can disable cookies in your browser settings, but some website features may not work properly.</p>

      <h2>Affiliate Links</h2>
      <p>Some links on this website may be affiliate links. If you click an affiliate link and make a purchase, we may earn a commission at no extra cost to you.</p>

      <h2>Email Subscriptions</h2>
      <p>If you subscribe to our newsletter, we store your email address so we can send updates. You may request removal from our mailing list at any time.</p>

      <h2>Contact Forms</h2>
      <p>If you send an inquiry, we store your message and contact details so we can respond.</p>

      <h2>Data Sharing</h2>
      <p>We do not sell personal information. We may share limited information with service providers that help operate the website, such as hosting, database, email, analytics, advertising, and security providers.</p>

      <h2>Data Retention</h2>
      <p>We keep information only as long as reasonably necessary for the purposes described in this policy, unless a longer retention period is required or allowed by law.</p>

      <h2>Your Choices</h2>
      <p>You may request access, correction, or deletion of personal information you have submitted to us. You may also unsubscribe from email communications.</p>

      <h2>Children's Privacy</h2>
      <p>This website is not directed to children under 13, and we do not knowingly collect personal information from children under 13.</p>

      <h2>Policy Updates</h2>
      <p>We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised date.</p>

      <h2>Contact</h2>
      <p>For privacy questions, contact us through the <a href="/contact">Contact page</a>.</p>
    </LegalPage>
  );
}
