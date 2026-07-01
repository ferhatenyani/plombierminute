// Light-mode hero used by the mentions-légales page.
type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
};

export function PageHero({ eyebrow, title, intro }: Props) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-pm py-10 sm:py-12 lg:py-16">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1 className="h-display mt-3 max-w-3xl text-3xl sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-4 max-w-prose text-base leading-relaxed text-body sm:text-lg">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
