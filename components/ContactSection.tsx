import type { Contact, Site } from '@/lib/content';
import { telHref } from '@/lib/content';
import { Icon } from './Icon';
import { ContactForm } from './ContactForm';

type Props = { contact: Contact; site: Site };

export function ContactSection({ contact, site }: Props) {
  const phoneHref = telHref(contact.telephone);
  return (
    <section id="contact" className="section bg-bg overflow-hidden">
      <div className="container-pm grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-5">
          <h2 className="h-display text-2xl sm:text-3xl md:text-4xl">
            Une urgence ? Un projet ? Parlons-en.
          </h2>
          <p className="mt-3 max-w-prose text-base leading-relaxed text-body sm:mt-4 sm:text-lg">
            {contact.intro}
          </p>

          <a
            href={phoneHref}
            className="btn btn-urgent mt-5 w-full sm:w-auto"
            data-emergency-call
          >
            <Icon name="phone" className="h-5 w-5" />
            {site.cta_primary_label}
            <span className="hidden sm:inline">· {contact.telephone}</span>
          </a>

          <ul className="mt-6 grid gap-2.5 sm:mt-8 sm:gap-3">
            <ContactRow
              icon="phone"
              label="Téléphone"
              value={contact.telephone}
              href={phoneHref}
            />
            <ContactRow
              icon="map-pin"
              label="Adresse"
              value={`${contact.adresse}, ${contact.code_postal} ${contact.ville}`}
            />
            <ContactRow icon="clock" label="Horaires" value={contact.horaires} />
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs uppercase tracking-[0.14em] text-muted sm:mt-6">
            <span className="inline-flex items-center gap-1.5">
              <span className="pulse-dot" aria-hidden />
              <span className="font-semibold text-ink">Disponible maintenant</span>
            </span>
            <span aria-hidden className="hidden h-1 w-1 rounded-full bg-border-strong sm:inline-block" />
            <span>Devis clair avant travaux</span>
          </div>
        </div>

        <div className="min-w-0 rounded-xl2 border border-border bg-surface p-5 shadow-card sm:p-7 lg:col-span-7">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink sm:text-2xl">
                Formulaire de contact
              </h3>
              <p className="mt-1 text-sm text-muted">
                Réponse rapide en journée. Pour une urgence, appelez directement.
              </p>
            </div>
            <a
              href={phoneHref}
              className="hidden items-center gap-1.5 rounded-full border border-border bg-bg px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:border-brand-300 hover:text-brand-600 sm:inline-flex"
              data-emergency-call
            >
              <Icon name="phone" className="h-3.5 w-3.5" />
              {contact.telephone}
            </a>
          </div>
          <div className="mt-5 sm:mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-600 sm:h-10 sm:w-10">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
        <span className="text-sm font-medium text-ink break-words">{value}</span>
      </span>
    </>
  );
  const className =
    'flex items-center gap-3 rounded-lg border border-border bg-surface p-2.5 transition hover:border-brand-300 sm:p-3';
  return (
    <li>
      {href ? (
        <a href={href} className={className}>{inner}</a>
      ) : (
        <div className={className}>{inner}</div>
      )}
    </li>
  );
}
