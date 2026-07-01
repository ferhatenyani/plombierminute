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
          <span className="eyebrow">Zone d'intervention</span>
          <h2 className="h-display mt-3 text-2xl sm:text-3xl md:text-4xl">
            {zone.titre}
          </h2>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-body sm:mt-4 sm:text-lg">
            {zone.intro}
          </p>

          <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-50 px-3 py-2 text-sm text-brand-700">
            <Icon name="clock" className="h-4 w-4" />
            Délai indicatif&nbsp;:&nbsp;<span className="font-semibold">{zone.delai_intervention}</span>
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

        <div className="rounded-xl border border-border bg-bg p-4 sm:p-5">
          <h3 className="eyebrow">Communes desservies</h3>
          <ul className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
            {zone.zones_couvertes.map((z) => (
              <li
                key={z}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1 text-xs text-body sm:px-2.5 sm:py-1.5 sm:text-sm"
              >
                <Icon name="map-pin" className="h-3 w-3 text-brand-500 sm:h-3.5 sm:w-3.5" />
                {z}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">
            Vous ne voyez pas votre commune&nbsp;? Appelez-nous, on couvre souvent au-delà de cette liste.
          </p>

          {zone.map_embed_url ? (
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
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
