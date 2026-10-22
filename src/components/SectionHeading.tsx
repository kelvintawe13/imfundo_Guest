export function SectionHeading({ title, text }: { title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm text-ink-soft sm:text-base line-clamp-3">{text}</p>
    </div>
  );
}
