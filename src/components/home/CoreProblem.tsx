import { GraduationCapIcon, HomeIcon, PresentationIcon, SparklesIcon, TargetIcon, TrendingUpIcon } from 'lucide-react';
import { opportunities, stakeholders } from '../../data/site';
import { images } from '../../data/images';

const tierIcons = [GraduationCapIcon, PresentationIcon, HomeIcon];
const tierColors = ['bg-coral', 'bg-teal', 'bg-sky'];
const oppIcons = [TargetIcon, TrendingUpIcon, SparklesIcon];

export function CoreProblem() {
  return (
    <section id="problem" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
        <div className="max-w-3xl">
          <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            The core problem & market opportunity
          </h2>
          <p className="mt-3 text-sm text-ink-soft sm:text-base line-clamp-4">
            In the Eastern Cape, only 8% to 10.4% of households have a fixed or in-home internet connection. Yet 96.1% of
            South African households own at least one mobile phone. The opportunity is to make learning work on the
            devices learners already have, without relying on a home internet connection.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h3 className="font-display text-lg font-bold">Who the divide leaves behind</h3>
            <ol className="mt-4 space-y-4">
              {stakeholders.map((s, i) => {
                const Icon = tierIcons[i];
                return (
                  <li key={s.who} className="flex gap-3">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-ink ${tierColors[i]}`}
                    >
                      <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display text-base font-bold">
                        {s.who} <span className="text-sm font-semibold text-ink-soft">· {s.tier} stakeholders</span>
                      </p>
                      <p className="mt-0.5 text-sm text-ink-soft line-clamp-2">{s.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-6 overflow-hidden rounded-2xl border-2 border-ink">
              <img
                src={images.story}
                alt="Cartoon rural classroom with old textbooks during load shedding"
                className="aspect-[16/8] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-2xl border-2 border-ink bg-ink p-5 text-white shadow-pop sm:p-6">
            <p className="font-display text-sm font-bold text-sun">For Imfundo Quest</p>
            <h3 className="mt-1 font-display text-xl font-extrabold leading-tight sm:text-2xl">
              This regional inequality is a vital business and market opportunity.
            </h3>
            <p className="mt-3 text-sm text-white/85 line-clamp-4">
              By building a gamified, offline AI tutor that works without active internet connectivity, Imfundo Quest serves
              an unserved rural student demographic while aligning with the GCGO Education challenge.
            </p>
            <ul className="mt-6 space-y-4">
              {opportunities.map((o, i) => {
                const Icon = oppIcons[i];
                return (
                  <li key={o.title} className="flex gap-3 border-t border-white/15 pt-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sun">
                      <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display text-base font-bold">{o.title}</p>
                      <p className="mt-0.5 text-sm text-white/80 line-clamp-2">{o.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
