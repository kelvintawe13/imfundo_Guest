
type RailSectionProps = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function RailSection({ title, action, children }: RailSectionProps) {
  return (
    <section className="border-b-2 border-ink/15 px-4 py-3 last:border-0">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{title}</h2>
        {action}
      </div>
      {children}
    </section>);

}

type UpdateItem = {title: string;text: string;when: string;};

export function UpdateList({ items }: {items: UpdateItem[];}) {
  return (
    <ol className="space-y-2.5">
      {items.map((u) =>
      <li key={u.title} className="relative pl-3.5">
          <span className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full border border-ink bg-coral" />
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate font-display text-[13px] font-bold text-slate-100">{u.title}</p>
            <span className="shrink-0 text-[10px] text-slate-500">{u.when}</span>
          </div>
          <p className="mt-0.5 line-clamp-1 text-[11px] leading-snug text-slate-400">{u.text}</p>
        </li>
      )}
    </ol>);

}
