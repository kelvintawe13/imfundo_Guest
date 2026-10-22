import React from 'react';
import { DownloadIcon, Gamepad2Icon, TrophyIcon } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { homeSteps } from '../../data/site';

const icons = [DownloadIcon, Gamepad2Icon, TrophyIcon];
const colors = ['bg-sky', 'bg-sun', 'bg-coral'];

export function HowItWorks() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
        <SectionHeading title="How it works" text="Three steps from install to levelling up." />
        <ol className="relative mt-8 grid gap-6 md:grid-cols-3 md:gap-4">
          <div
            className="absolute left-[16%] right-[16%] top-6 hidden border-t-2 border-dotted border-ink/60 md:block"
            aria-hidden="true"
          />
          {homeSteps.map((s, i) => {
            const Icon = icons[i];
            return (
              <li key={s.title} className="relative flex flex-col items-start md:items-center md:text-center">
                <span
                  className={`relative grid h-12 w-12 place-items-center rounded-xl border-2 border-ink shadow-pop-sm ${colors[i]}`}
                >
                  <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                  <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full border-2 border-ink bg-white font-display text-xs font-extrabold">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-1 max-w-xs text-sm text-ink-soft line-clamp-2">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
