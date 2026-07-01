import type { Metadata } from 'next';
import Link from 'next/link';
import { getMentions, getSite } from '@/lib/content';
import { PageHero } from '@/components/PageHero';
import { Icon } from '@/components/Icon';

// Minimal inline markdown renderer (paragraphs, lists, h2, h3, bold, code).
function MdBody({ source }: { source: string }) {
  const lines = source.split('\n');
  const out: React.ReactNode[] = [];
  let para: string[] = [];
  let ul: string[] | null = null;

  const flushPara = () => {
    if (para.length) {
      out.push(
        <p key={'p' + out.length} className="text-base leading-relaxed text-body">
          {inline(para.join(' '))}
        </p>,
      );
      para = [];
    }
  };
  const flushUl = () => {
    if (ul && ul.length) {
      out.push(
        <ul key={'u' + out.length} className="list-disc space-y-2 pl-5 text-body marker:text-brand-500">
          {ul.map((item, i) => <li key={i}>{inline(item)}</li>)}
        </ul>,
      );
      ul = null;
    }
  };

  for (const raw of lines) {
    const h2 = raw.match(/^##\s+(.+)/);
    const h3 = raw.match(/^###\s+(.+)/);
    const li = raw.match(/^[-*]\s+(.+)/);
    if (h2) {
      flushPara(); flushUl();
      out.push(
        <h2 key={'h2' + out.length} className="font-display mt-8 text-2xl font-semibold text-ink sm:text-3xl">
          {inline(h2[1])}
        </h2>,
      );
    } else if (h3) {
      flushPara(); flushUl();
      out.push(
        <h3 key={'h3' + out.length} className="font-display mt-5 text-lg font-semibold text-ink">
          {inline(h3[1])}
        </h3>,
      );
    } else if (li) {
      flushPara();
      ul ??= [];
      ul.push(li[1]);
    } else if (raw.trim() === '') {
      flushPara(); flushUl();
    } else {
      flushUl();
      para.push(raw);
    }
  }
  flushPara(); flushUl();
  return <div className="space-y-4">{out}</div>;
}

function inline(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={m.index} className="font-semibold text-ink">{m[1]}</strong>);
    else if (m[2]) parts.push(<code key={m.index} className="rounded bg-surfaceMuted px-1 py-0.5 text-sm text-ink">{m[2]}</code>);
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function generateMetadata(): Metadata {
  const m = getMentions();
  return {
    title: m.seo_title,
    description: m.seo_description,
    alternates: { canonical: '/mentions-legales' },
    robots: { index: true, follow: true },
  };
}

export default function MentionsLegalesPage() {
  const m = getMentions();
  const site = getSite();

  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        title={m.titre}
        intro="Coordonnées de l'éditeur, hébergeur et informations relatives au traitement des données personnelles (RGPD)."
      />

      <section className="bg-bg py-12 sm:py-16">
        <div className="container-pm max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            <Icon name="arrow-right" className="h-4 w-4 rotate-180" /> Retour à l'accueil
          </Link>

          <div className="mt-5 rounded-xl2 border border-border bg-surface p-5 shadow-card sm:p-8">
            {/* Summary table */}
            <dl className="mb-8 grid gap-3 sm:grid-cols-2">
              <SummaryRow label="Éditeur" value={m.editeur} />
              <SummaryRow label="Responsable de publication" value={m.responsable_publication} />
              <SummaryRow label="Adresse" value={m.adresse_editeur} />
              <SummaryRow label="E-mail" value={m.email_editeur} />
              <SummaryRow label="Téléphone" value={m.telephone_editeur} />
              <SummaryRow label="Hébergeur" value={`${m.hebergeur} — ${m.adresse_hebergeur}`} />
            </dl>

            <MdBody source={m.body} />
          </div>
          <p className="mt-6 text-xs text-muted">
            Dernière mise à jour&nbsp;: {new Date().toLocaleDateString('fr-FR')} — Site édité par {site.site_title}.
          </p>
        </div>
      </section>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg p-3">
      <dt className="text-xs uppercase tracking-wider text-muted">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-ink break-words">{value}</dd>
    </div>
  );
}
