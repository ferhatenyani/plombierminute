import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import Script from 'next/script';
import { getSite, getContact, getZone, telHref } from '@/lib/content';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EmergencyDock } from '@/components/EmergencyDock';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
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
    icons: { icon: '/favicon.ico' },
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
    alternateName: 'Plombier Minute',
    description: site.seo_description,
    image: `${site.site_url}${site.hero_image}`,
    url: site.site_url,
    telephone: contact.telephone,
    email: contact.email,
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
    <html lang="fr" className={`${sans.variable} ${display.variable}`}>
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
