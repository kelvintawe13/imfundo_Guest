import { opportunities, stakeholders } from '../../data/landing';
import { useLanguage } from '../../contexts/LanguageContext';
import { ZapIcon } from 'lucide-react';

export function ProblemOpportunity() {
  const { t } = useLanguage();
  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">{t('problem.title')}</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
              In Idutywa and across the Eastern Cape, infrastructure gaps still shut rural learners out of modern
              schooling.
            </p>
            <ol className="mt-3 divide-y divide-slate-800 border-y border-slate-800">
              {stakeholders.map(({ tier, who, text, icon: Icon }) =>
              <li key={who} className="flex gap-2.5 py-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-100">
                      {who} <span className="text-[10px] font-normal uppercase tracking-wide text-slate-500">{tier}</span>
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{text}</p>
                  </div>
                </li>
              )}
            </ol>
          </div>

          <div className="glass-card p-3 sm:p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-soft">Market opportunity</p>
            <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight text-slate-50">
              An unserved market, ready for an offline tutor.
            </h3>
            <ul className="mt-3 space-y-2.5">
              {opportunities.map(({ title, text, icon: Icon }) =>
              <li key={title} className="flex gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary-soft">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-100">{title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{text}</p>
                  </div>
                </li>
              )}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 border-t border-slate-800 pt-2.5 text-[11px] text-slate-500">
              <ZapIcon className="h-3.5 w-3.5 text-warn" /> Short levels · instant feedback · real rewards
            </p>
          </div>
        </div>
      </div>
    </section>);
}
