import Link from 'next/link';
import type { Site, Contact } from '@/lib/content';
import { telHref } from '@/lib/content';
import { Icon } from './Icon';

type Props = { site: Site; contact: Contact };

export function Hero({ site, contact }: Props) {
  const phoneHref = telHref(contact.telephone);

  return (
    <section id="top" className="bg-surface">
      <div className="container-pm grid items-stretch gap-6 pb-8 pt-6 sm:gap-8 sm:pb-12 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-7 lg:py-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-semibold text-brand-600 sm:px-3 sm:py-1.5">
            <span className="pulse-dot" aria-hidden />
            <span className="uppercase tracking-[0.14em]">{site.emergency_label}</span>
          </span>

          <h1 className="h-display mt-4 text-[1.75rem] leading-[1.1] sm:mt-5 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            {site.hero_heading}
          </h1>

          <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-body sm:mt-4 sm:text-lg">
            {site.hero_subtext}
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
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

        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl2 border border-border bg-bg sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[420px]">
            <img
              src={site.hero_image}
              alt="Plombier intervenant sur une canalisation"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
