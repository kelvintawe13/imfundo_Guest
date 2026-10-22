import type { LucideIcon } from 'lucide-react';

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  compact?: boolean;
};

export function EmptyState({ icon: Icon, title, description, action, compact = false }: EmptyStateProps) {
  if (compact) {
    return (
      <div className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-dashed border-ink/20 bg-slate-950/20 px-3 py-3 text-center">
        <span className="grid h-8 w-8 place-items-center rounded-lg border-2 border-ink/20 bg-slate-900 text-slate-400">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <p className="font-display text-xs font-bold text-slate-300">{title}</p>
        <p className="text-[11px] leading-snug text-slate-500">{description}</p>
        {action}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border-2 border-dashed border-ink/25 bg-slate-950/20 p-3.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-ink/20 bg-slate-900 text-slate-400">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-sm font-bold text-slate-200">{title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}
