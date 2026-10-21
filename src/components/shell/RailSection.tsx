import React from 'react';

type RailSectionProps = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

export function RailSection({ title, action, children }: RailSectionProps) {
  return (
    <section className="border-b border-slate-800 px-4 py-4 last:border-0">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-400">{title}</h2>
        {action}
      </div>
      {children}
    </section>);

}

type UpdateItem = {title: string;text: string;when: string;};

export function UpdateList({ items }: {items: UpdateItem[];}) {
  return (
    <ol className="space-y-4">
      {items.map((u) =>
      <li key={u.title} className="relative pl-4">
          <span className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-sm font-medium text-slate-100">{u.title}</p>
            <span className="shrink-0 text-[11px] text-slate-500">{u.when}</span>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">{u.text}</p>
        </li>
      )}
    </ol>);

}