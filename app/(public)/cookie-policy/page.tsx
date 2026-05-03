import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for Soft Living Studio.',
  alternates: {
    canonical: '/cookie-policy'
  }
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" subtitle="How cookies and similar technologies may be used">
      <p>Last updated: May 3, 2026</p>

      <h2>What Cookies Are</h2>
      <p>Cookies are small text files stored on your device when you visit a website. Similar technologies may include web beacons, pixels, local storage, tags, and identifiers.</p>

      <h2>How We Use Cookies</h2>
      <p>We may use cookies and similar technologies to operate the website, remember preferences, protect against abuse, understand traffic, measure performance, and support advertising.</p>

      <h2>Google AdSense And Advertising Cookies</h2>
      <p>If Google AdSense or other advertising services are used, Google and its partners may use cookies, web beacons, IP addresses, or other identifiers to serve ads, personalize ads where allowed, limit ad frequency, measure ad performance, and detect invalid activity.</p>
      <p>Third-party vendors, including Google, may use cookies to serve ads based on a user's prior visits to this website or other websites.</p>

      <h2>Managing Cookies</h2>
      <p>You can manage or block cookies through your browser settings. You can also manage Google ad personalization at <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>

      <h2>Consent</h2>
      <p>Where required by law, you may be asked to consent to certain cookies or advertising technologies. If a consent banner or privacy message is displayed, your choices may affect how ads and cookies operate on the website.</p>

      <h2>Updates</h2>
      <p>We may update this Cookie Policy as our website, tools, or legal requirements change.</p>
    </LegalPage>
  );
}
