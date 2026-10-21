import { SmartphoneIcon, RouterIcon } from 'lucide-react';
import { insightStats } from '../../data/landing';
import { ConnectivityGrid } from '../illustrations/ConnectivityGrid';
import { useLanguage } from '../../contexts/LanguageContext';

export function InsightBand() {
  const { t } = useLanguage();
  const { fixed, mobile } = insightStats;

  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t('insight.title')}</h2>
          <p className="mt-3 text-slate-400">
            Learners in the Eastern Cape already carry the hardware. What they lack is a connection at home. Imfundo Quest
            turns the phone in their pocket into a complete tutor that never needs data to work.
          </p>
          <ConnectivityGrid />
        </div>

        <div className="glass-card p-4">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <RouterIcon className="h-4 w-4" /> In-home internet · Eastern Cape
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-50">{fixed.value}</p>
              <p className="mt-2 text-sm text-slate-400">{fixed.label}</p>
              <p className="mt-2 text-xs text-slate-500">{fixed.source}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <SmartphoneIcon className="h-4 w-4" /> Mobile phone ownership · South Africa
              </p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-success-soft">{mobile.value}</p>
              <p className="mt-2 text-sm text-slate-400">{mobile.label}</p>
              <p className="mt-2 text-xs text-slate-500">{mobile.source}</p>
            </div>
          </div>

          <div className="mt-7 space-y-3 border-t border-slate-800 pt-6" aria-hidden="true">
            <div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Fixed / in-home connection</span>
                <span className="tabular-nums">≤ {fixed.barMax}%</span>
              </div>
              <div className="relative mt-1.5 h-2.5 rounded-full bg-slate-800">
                <div className="absolute inset-y-0 left-0 rounded-full bg-slate-500" style={{ width: `${fixed.barMin}%` }} />
                <div
                  className="absolute inset-y-0 rounded-r-full bg-slate-500/50"
                  style={{ left: `${fixed.barMin}%`, width: `${fixed.barMax - fixed.barMin}%` }} />
                
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Own a mobile phone</span>
                <span className="tabular-nums">{mobile.bar}%</span>
              </div>
              <div className="mt-1.5 h-2.5 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-success" style={{ width: `${mobile.bar}%` }} />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-slate-200">
            The gap between those two bars is the market Imfundo Quest serves: data-free, offline execution.
          </p>
        </div>
      </div>
    </section>);

}