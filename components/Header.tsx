import Link from 'next/link';
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
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-surface/95 backdrop-blur shadow-sticky">
      {/* Urgency strip — dark navy with red dot */}
      <div className="bg-ink text-white">
        <div className="container-pm flex items-center justify-between gap-3 py-2 text-xs sm:text-sm">
          <span className="flex items-center gap-2 font-medium">
            <span className="pulse-dot" aria-hidden />
            <span>{site.emergency_label}</span>
            <span aria-hidden className="text-white/40">·</span>
            <span className="text-white/85">{site.response_minutes}</span>
          </span>
          <a
            href={phoneHref}
            className="hidden items-center gap-1.5 rounded-full px-2 py-0.5 font-semibold transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:inline-flex"
            data-emergency-call
          >
            <Icon name="phone" className="h-3.5 w-3.5" />
            {phoneLabel}
          </a>
        </div>
      </div>

      <div className="container-pm flex h-16 items-center justify-between gap-4 sm:h-[76px]">
        <Link
          href="/#top"
          className="flex items-center gap-2.5 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          aria-label={`Accueil ${site.site_title}`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white shadow-card sm:h-10 sm:w-10">
            <Icon name="drop" className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-ink sm:text-lg">
              {site.site_title}
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.14em] text-muted sm:block">
              24h/24 · 7j/7
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Navigation principale">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={`/${l.href}`}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-body transition hover:bg-brand-50 hover:text-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a href={phoneHref} className="btn btn-urgent text-sm" data-emergency-call>
          <Icon name="phone" className="h-4 w-4" />
          <span className="hidden sm:inline">Appeler</span>
          <span className="sm:hidden">Urgence</span>
        </a>
      </div>
    </header>
  );
}
