import type { Avantage, Site } from '@/lib/content';
import { Icon } from './Icon';

type Props = { avantages: Avantage[]; site: Site };

// 2-per-row on mobile, 4-per-row from lg. Small icon + title + short line.
export function AvantagesSection({ avantages, site }: Props) {
  return (
    <section id="pourquoi" className="section bg-bg">
      <div className="container-pm">
        <header className="max-w-3xl">
          <h2 className="h-display text-2xl sm:text-3xl md:text-4xl">
            Une équipe locale, simple et transparente.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-body sm:mt-4 sm:text-lg">
            On répond rapidement, on explique clairement, on annonce le prix
            avant de commencer. Trois règles qu'on garde partout, jour et nuit.
          </p>
        </header>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {avantages.map((a) => (
            <li key={a.titre}>
              <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-4 shadow-card sm:p-5">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-brand-50 text-brand-600 sm:h-11 sm:w-11">
                  <Icon name={a.icone || 'check'} className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <h3 className="mt-3 font-display text-base font-semibold leading-tight text-ink sm:mt-4 sm:text-lg">
                  {a.titre}
                </h3>
                <p className="mt-1.5 text-xs leading-snug text-body sm:mt-2 sm:text-sm sm:leading-relaxed">
                  {a.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
