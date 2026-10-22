import type { LucideIcon } from 'lucide-react';

type TeacherPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function TeacherPageHeader({ eyebrow, title, description, icon: Icon }: TeacherPageHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-sun text-ink">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.15em] text-coral">{eyebrow}</p>
          <h1 className="mt-0.5 font-display text-2xl font-extrabold tracking-tight text-slate-50">{title}</h1>
          <p className="mt-0.5 line-clamp-1 max-w-2xl text-xs leading-relaxed text-slate-400">{description}</p>
        </div>
      </div>
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-ink bg-sun-light px-2.5 py-1 text-[10px] font-bold text-ink">
        Demo workspace
      </span>
    </header>
  );
}
