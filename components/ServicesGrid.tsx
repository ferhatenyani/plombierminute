import Link from 'next/link';
import type { Service } from '@/lib/content';
import { Icon } from './Icon';

type Props = { services: Service[] };

// Mobile-first: 2-per-row on all viewports up to lg, then 3-col on desktop.
// All cards identical size — small image, tight padding, single tap-through.
export function ServicesGrid({ services }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
      {services.map((s) => (
        <li key={s.slug}>
          <Link
            href="#contact"
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition hover:border-brand-300 hover:shadow-cardHover"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-surfaceMuted">
              <img
                src={s.image}
                alt={s.titre}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-3 sm:gap-2 sm:p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-600 sm:h-8 sm:w-8">
                  <Icon name={s.icone || 'drop'} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
                <h3 className="font-display text-[0.95rem] font-semibold leading-tight text-ink sm:text-base lg:text-lg">
                  {s.titre}
                </h3>
              </div>
              <p className="text-xs leading-snug text-body sm:text-sm sm:leading-relaxed">
                {s.description}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
