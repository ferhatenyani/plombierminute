import Link from 'next/link';
import type { Site, Contact } from '@/lib/content';
import { telHref } from '@/lib/content';
import { Icon } from './Icon';

type Props = { site: Site; contact: Contact };

export function Hero({ site, contact }: Props) {
  const phoneHref = telHref(contact.telephone);

  return (
    <section id="top" className="bg-surface">
      <div className="container-pm grid items-stretch gap-6 pb-10 pt-6 sm:gap-8 sm:pb-14 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="flex flex-col lg:col-span-7 lg:py-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-semibold text-brand-600 sm:px-3 sm:py-1.5">
            <span className="pulse-dot" aria-hidden />
            <span className="uppercase tracking-[0.14em]">{site.emergency_label}</span>
          </span>

          <h1 className="h-display mt-5 text-[1.85rem] leading-[1.08] sm:mt-6 sm:text-[2.5rem] md:text-5xl lg:text-[3.5rem]">
            {site.hero_heading}
          </h1>

          <p className="mt-4 max-w-prose text-[0.95rem] leading-relaxed text-body sm:mt-5 sm:text-lg">
            {site.hero_subtext}
          </p>

          <div className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
            <a
              href={phoneHref}
              className="btn btn-urgent w-full sm:w-auto"
              data-emergency-call
            >
              <Icon name="phone" className="h-5 w-5" />
              {site.cta_primary_label}
              <span className="hidden sm:inline">· {contact.telephone}</span>
            </a>
            <Link href="#contact" className="btn btn-outline w-full sm:w-auto">
              {site.cta_secondary_label}
            </Link>
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-body sm:mt-9">
            <li className="inline-flex items-center gap-1.5">
              <Icon name="clock" className="h-4 w-4 text-brand-500" aria-hidden />
              <span>24h/24, 7j/7</span>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-4 w-4 text-brand-500" aria-hidden />
              <span>Devis clair et gratuit</span>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Icon name="map-pin" className="h-4 w-4 text-brand-500" aria-hidden />
              <span>Paris &amp; communes limitrophes</span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 border border-border bg-bg shadow-card sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[460px]">
            <img
              src={site.hero_image}
              alt="Plombier intervenant sur une canalisation"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/70 via-ink/25 to-transparent"
            />
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 sm:inset-x-4 sm:bottom-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-surface/95 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur sm:px-3 sm:py-1.5 sm:text-sm">
                <Icon name="map-pin" className="h-3.5 w-3.5 text-brand-500" aria-hidden />
                Paris 11ᵉ · République
              </span>
              <span className="hidden items-center gap-1.5 rounded-full bg-urgent-500/95 px-2.5 py-1 text-xs font-semibold text-white sm:inline-flex sm:px-3 sm:py-1.5 sm:text-sm">
                <span className="pulse-dot pulse-dot--light" aria-hidden />
                En intervention
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
