import './globals.css';
import type { Metadata } from 'next';
import { absoluteUrl, getSiteUrl } from '@/lib/site-url';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  applicationName: 'Soft Living Studio',
  title: {
    default: 'Soft Living Studio',
    template: '%s | Soft Living Studio'
  },
  description: 'Home decor and clothing blog with affiliate recommendations inside useful buying guides.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Soft Living Studio',
    description: 'Home decor and clothing blog with affiliate recommendations inside useful buying guides.',
    url: '/',
    siteName: 'Soft Living Studio',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soft Living Studio',
    description: 'Home decor and clothing blog with affiliate recommendations inside useful buying guides.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  icons: {
    icon: '/icon.svg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Soft Living Studio',
    url: getSiteUrl(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/search')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
