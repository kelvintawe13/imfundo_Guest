import { SmartphoneIcon, RouterIcon } from 'lucide-react';
import { insightStats } from '../../data/landing';
import { ConnectivityGrid } from '../illustrations/ConnectivityGrid';
import { useLanguage } from '../../contexts/LanguageContext';

export function InsightBand() {
  const { t } = useLanguage();
  const { fixed, mobile } = insightStats;

  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_1.25fr] lg:items-center">
        <div>
          <h2 className="max-w-md text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">{t('insight.title')}</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
            Phones are everywhere. Home connections are not. Imfundo Quest turns the phone learners already own into a
            full tutor.
          </p>
          <ConnectivityGrid />
        </div>

        <div className="glass-card p-3 sm:p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                <RouterIcon className="h-3.5 w-3.5" /> In-home internet · Eastern Cape
              </p>
              <p className="mt-1.5 text-2xl font-semibold tracking-tight text-slate-50">{fixed.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{fixed.label}</p>
              <p className="mt-1.5 text-[10px] text-slate-500">{fixed.source}</p>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                <SmartphoneIcon className="h-3.5 w-3.5" /> Mobile ownership · South Africa
              </p>
              <p className="mt-1.5 text-2xl font-semibold tracking-tight text-success-soft">{mobile.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{mobile.label}</p>
              <p className="mt-1.5 text-[10px] text-slate-500">{mobile.source}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2.5 border-t border-slate-800 pt-3" aria-hidden="true">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>In-home connection</span>
                <span className="tabular-nums">≤ {fixed.barMax}%</span>
              </div>
              <div className="relative mt-1 h-1.5 rounded-full bg-slate-800">
                <div className="absolute inset-y-0 left-0 rounded-full bg-slate-500" style={{ width: `${fixed.barMin}%` }} />
                <div
                  className="absolute inset-y-0 rounded-r-full bg-slate-500/50"
                  style={{ left: `${fixed.barMin}%`, width: `${fixed.barMax - fixed.barMin}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Owns a mobile phone</span>
                <span className="tabular-nums">{mobile.bar}%</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-success" style={{ width: `${mobile.bar}%` }} />
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs font-medium text-slate-300">
            That gap is the market: data-free, offline learning.
          </p>
        </div>
      </div>
    </section>);
}
