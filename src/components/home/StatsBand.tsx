import React from 'react';
import { featuredStat, stats } from '../../data/site';

export function StatsBand() {
  return (
    <section className="bg-sun" aria-label="Key statistics">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr] lg:items-stretch">
          <div className="rounded-2xl border-2 border-ink bg-ink p-4 text-white">
            <p className="font-display text-4xl font-extrabold leading-none text-sun sm:text-5xl">{featuredStat.value}</p>
            <p className="mt-2 max-w-sm text-sm font-semibold text-white/90 line-clamp-2">{featuredStat.label}</p>
          </div>
          {stats.map((s) => (
            <div key={s.value} className="flex flex-col justify-end rounded-2xl border-2 border-ink bg-white/60 p-4">
              <p className="font-display text-3xl font-extrabold leading-none sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-sm font-semibold text-ink-soft line-clamp-2">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs font-semibold text-ink/75">
          Source: Statistics South Africa, General Household Survey 2023.
        </p>
      </div>
    </section>
  );
}
