import type { Service } from '@/lib/content';
import { ServicesGrid } from './ServicesGrid';

type Props = { services: Service[] };

export function ServicesSection({ services }: Props) {
  return (
    <section id="services" className="section bg-surface">
      <div className="container-pm">
        <header className="max-w-3xl">
          <span className="eyebrow">Interventions</span>
          <h2 className="h-display mt-3 text-2xl sm:text-3xl md:text-4xl">
            Tous les services d'un plombier, sur simple appel.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-body sm:mt-4 sm:text-lg">
            Diagnostic et déplacement gratuits, prix annoncé avant chaque
            intervention.
          </p>
        </header>

        <div className="mt-8 sm:mt-10">
          <ServicesGrid services={services} />
        </div>
      </div>
    </section>
  );
}
