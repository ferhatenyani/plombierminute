import Link from 'next/link';
import type { Site, Contact, Zone } from '@/lib/content';
import { Icon } from './Icon';
import { telHref, mailHref } from '@/lib/content';

type Props = { site: Site; contact: Contact; zone: Zone };

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#pourquoi', label: 'Pourquoi nous' },
  { href: '/#zone', label: 'Zone' },
  { href: '/#contact', label: 'Contact' },
];

export function Footer({ site, contact, zone }: Props) {
  const phoneHref = telHref(contact.telephone);
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-pm grid gap-8 py-10 sm:gap-10 sm:py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-14">
        <div className="lg:col-span-2">
          <Link href="/#top" className="inline-flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white">
              <Icon name="drop" className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-semibold text-ink">
              {site.site_title}
            </span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-body">
            {site.tagline}. Une équipe joignable jour et nuit, avec un prix
            annoncé avant chaque intervention.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <a href={phoneHref} className="btn btn-urgent text-sm" data-emergency-call>
              <Icon name="phone" className="h-4 w-4" />
              {contact.telephone}
            </a>
            <Link href="/#contact" className="btn btn-outline text-sm">
              Demander un devis
            </Link>
          </div>
        </div>

        <div>
          <h2 className="eyebrow">Coordonnées</h2>
          <ul className="mt-3 space-y-2.5 text-sm text-body sm:mt-4">
            <li className="flex items-start gap-2">
              <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              <span>
                {contact.adresse}<br />
                {contact.code_postal} {contact.ville}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              <a href={phoneHref} className="hover:text-brand-600">{contact.telephone}</a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              <a href={mailHref(contact.email)} className="break-all hover:text-brand-600">{contact.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              <span>{contact.horaires}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="eyebrow">Navigation</h2>
          <ul className="mt-3 space-y-1 text-sm sm:mt-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-1.5 text-body hover:text-brand-600">{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/mentions-legales/" className="block py-1.5 text-body hover:text-brand-600">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-pm py-3 text-xs text-muted">
          <span className="font-medium text-body">Zone desservie : </span>
          {zone.zones_couvertes.slice(0, 12).join(' · ')}
          {zone.zones_couvertes.length > 12 ? ' …' : ''}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-pm flex flex-col items-start justify-between gap-2 py-4 text-xs text-muted sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {site.site_title}. Tous droits réservés.</span>
          <span>Crédits photos : Unsplash & Pexels — Hébergé par Netlify.</span>
        </div>
      </div>
    </footer>
  );
}
