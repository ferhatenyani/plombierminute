import Link from 'next/link';
import type { Zone, Contact } from '@/lib/content';
import { Icon } from './Icon';
import { telHref } from '@/lib/content';

type Props = { zone: Zone; contact: Contact };

export function ZoneSection({ zone, contact }: Props) {
  const phoneHref = telHref(contact.telephone);
  return (
    <section id="zone" className="section bg-surface">
      <div className="container-pm grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div>
          <h2 className="h-display text-2xl sm:text-3xl md:text-4xl">
            {zone.titre}
          </h2>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-body sm:mt-4 sm:text-lg">
            {zone.intro}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-50 px-3 py-2 text-sm text-brand-700">
            <Icon name="clock" className="h-4 w-4" />
            <span className="font-semibold capitalize">{zone.delai_intervention}</span>
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
            <a
              href={phoneHref}
              className="btn btn-urgent w-full sm:w-auto"
              data-emergency-call
            >
              <Icon name="phone" className="h-4 w-4" />
              Vérifier ma commune
            </a>
            <Link href="#contact" className="btn btn-outline w-full sm:w-auto">
              Demander un devis
            </Link>
          </div>
        </div>

        <div className="rounded-xl2 border border-border bg-bg p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="eyebrow">Communes desservies</h3>
            <span className="text-xs font-semibold text-muted">
              {zone.zones_couvertes.length} zones
            </span>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
            {zone.zones_couvertes.map((z, i) => {
              const featured = i === 0;
              return (
                <li key={z}>
                  <span
                    className={
                      featured
                        ? 'inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1.5 text-sm font-semibold text-white shadow-card'
                        : 'inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-ink transition hover:border-brand-300 hover:bg-brand-50'
                    }
                  >
                    <Icon
                      name="map-pin"
                      className={featured ? 'h-3.5 w-3.5' : 'h-3.5 w-3.5 text-brand-500'}
                    />
                    {z}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-muted sm:text-sm">
            <Icon name="phone" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden />
            <span>
              Vous ne voyez pas votre commune&nbsp;? Appelez-nous — on couvre souvent au-delà.
            </span>
          </p>

          {zone.map_embed_url ? (
            <div className="mt-5 overflow-hidden rounded-lg border border-border">
              <iframe
                src={zone.map_embed_url}
                className="aspect-[4/3] w-full"
                loading="lazy"
                title="Carte de la zone d'intervention"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
