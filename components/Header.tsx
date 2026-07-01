'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import type { Site } from '@/lib/content';
import { Icon } from './Icon';

type Props = {
  site: Site;
  phoneHref: string;
  phoneLabel: string;
};

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#pourquoi', label: 'Pourquoi nous' },
  { href: '#zone', label: 'Zone' },
  { href: '#contact', label: 'Contact' },
];

export function Header({ site, phoneHref, phoneLabel }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close drawer when navigating to an anchor.
  const handleNav = useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/95 backdrop-blur shadow-sticky">
      {/* Urgency strip — restrained: dark navy with red dot */}
      <div className="bg-ink text-white">
        <div className="container-pm flex items-center justify-between gap-3 py-1.5 text-xs sm:text-sm">
          <span className="flex items-center gap-2 font-medium">
            <span className="pulse-dot" aria-hidden />
            {site.emergency_label} — intervention en {site.response_minutes} min
          </span>
          <a
            href={phoneHref}
            className="hidden items-center gap-1.5 font-semibold hover:underline sm:inline-flex"
            data-emergency-call
          >
            <Icon name="phone" className="h-3.5 w-3.5" />
            {phoneLabel}
          </a>
        </div>
      </div>

      <div className="container-pm flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Link
          href="/#top"
          onClick={handleNav}
          className="flex items-center gap-2.5"
          aria-label={`Accueil ${site.site_title}`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white sm:h-10 sm:w-10">
            <Icon name="drop" className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-ink sm:text-lg">
              {site.site_title}
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.14em] text-muted sm:block">
              Dépannage 24/7
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={`/${l.href}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-body transition hover:text-brand-600"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href={phoneHref} className="btn btn-urgent text-sm" data-emergency-call>
            <Icon name="phone" className="h-4 w-4" />
            <span className="hidden sm:inline">Appeler</span>
            <span className="sm:hidden">Urgence</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-md border border-border text-ink lg:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-ink/55"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-surface p-5 shadow-cardHover">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-ink">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-md border border-border text-ink"
                aria-label="Fermer le menu"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-6 flex flex-col gap-1" aria-label="Navigation mobile">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={`/${l.href}`}
                  onClick={handleNav}
                  className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-surfaceMuted"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/mentions-legales/"
                onClick={handleNav}
                className="rounded-md px-3 py-3 text-sm text-muted hover:bg-surfaceMuted"
              >
                Mentions légales
              </Link>
            </nav>
            <a
              href={phoneHref}
              onClick={handleNav}
              className="btn btn-urgent mt-auto w-full"
              data-emergency-call
            >
              <Icon name="phone" className="h-4 w-4" /> {phoneLabel}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
