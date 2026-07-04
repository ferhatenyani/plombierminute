import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import Script from 'next/script';
import { getSite, getContact, getZone, telHref } from '@/lib/content';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EmergencyDock } from '@/components/EmergencyDock';
import './globals.css';

// Single family, variable weight. Bricolage Grotesque is a humanist
// grotesque with mechanical warmth, distinctive character, and enough
// range to carry both display and body without a second font.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  axes: ['opsz'],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = getSite();
  return {
    metadataBase: new URL(site.site_url),
    title: {
      default: site.seo_title,
      template: `%s — ${site.site_title}`,
    },
    description: site.seo_description,
    keywords: site.seo_keywords,
    applicationName: site.site_title,
    authors: [{ name: site.site_title }],
    creator: site.site_title,
    publisher: site.site_title,
    icons: {
      icon: [
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
        { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: '/icon-192.png',
      shortcut: '/favicon-96.png',
    },
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: site.site_url,
      siteName: site.site_title,
      title: site.seo_title,
      description: site.seo_description,
      images: [
        {
          url: site.hero_image,
          width: 1920,
          height: 1280,
          alt: site.hero_heading,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: site.seo_title,
      description: site.seo_description,
      images: [site.hero_image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#1357A6',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSite();
  const contact = getContact();
  const zone = getZone();

  const ldBusiness = {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${site.site_url}/#business`,
    name: site.site_title,
    alternateName: 'BTP France',
    description: site.seo_description,
    image: `${site.site_url}${site.hero_image}`,
    url: site.site_url,
    telephone: contact.telephone,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.adresse,
      addressLocality: contact.ville,
      postalCode: contact.code_postal,
      addressCountry: 'FR',
    },
    areaServed: zone.zones_couvertes.map((name) => ({
      '@type': 'City',
      name,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
  };

  return (
    <html lang="fr" className={bricolage.variable}>
      <body className="min-h-dvh bg-bg text-body antialiased">
        <a
          href="#top"
          className="sr-only-clip focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-ink focus:shadow-cardHover"
        >
          Aller au contenu principal
        </a>

        <Header
          site={site}
          phoneHref={telHref(contact.telephone)}
          phoneLabel={contact.telephone}
        />

        <main>{children}</main>

        <Footer site={site} contact={contact} zone={zone} />

        <EmergencyDock
          phoneHref={telHref(contact.telephone)}
          phoneLabel={contact.telephone}
        />

        <Script
          id="ld-localbusiness"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBusiness) }}
        />
      </body>
    </html>
  );
}
