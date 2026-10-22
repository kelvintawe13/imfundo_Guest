export function PageHero({
  tone,
  title,
  subtitle,
  image,
  imageAlt,
}: {
  tone: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="border-b-2 border-ink bg-sky-light">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full border-2 border-ink bg-white px-3 py-1 font-display text-xs font-bold text-sky-dark">
              {tone}
            </p>
            <h1 className="mt-4 max-w-xl font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-lg text-sm text-ink-soft sm:text-base">{subtitle}</p>
          </div>
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-pop">
            <img src={image} alt={imageAlt} className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
