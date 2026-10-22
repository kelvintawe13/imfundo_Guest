import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, CheckIcon, ZapIcon } from 'lucide-react';
import { lessonPlayerPreview, offlineSteps, surfaces } from '../../data/landing';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

export function PlatformSection() {
  const { t } = useLanguage();
  const { setRole } = useApp();
  const LeadIcon = lessonPlayerPreview.icon;
  const chooseRole = (to: string) => setRole(to === '/teachers' ? 'staff' : 'learner');

  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">{t('platform.title')}</h2>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1.35fr_1fr]">
          <Link to={lessonPlayerPreview.to} onClick={() => chooseRole(lessonPlayerPreview.to)} className="glass-card group flex flex-col p-3 transition-colors duration-150 hover:border-slate-700">
            <div className="flex items-start justify-between">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-success/15 text-success-soft">
                <LeadIcon className="h-4 w-4" />
              </span>
              <ArrowUpRightIcon className="h-3.5 w-3.5 text-slate-500 transition-colors duration-150 group-hover:text-slate-200" />
            </div>
            <h3 className="mt-2 text-base font-semibold">{lessonPlayerPreview.title}</h3>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-400">{lessonPlayerPreview.text}</p>
            <div className="mt-3 grid gap-1.5 rounded-lg border border-slate-800 bg-slate-950/50 p-2 sm:grid-cols-2" aria-hidden="true">
              <div className="rounded-md border border-success/50 bg-success/10 px-2 py-1.5 text-xs text-slate-100">
                <span className="flex items-center justify-between">
                  x = ±3 <CheckIcon className="h-3.5 w-3.5 text-success" />
                </span>
              </div>
              <div className="rounded-md border border-slate-800 px-2 py-1.5 text-xs text-slate-400">x = 9</div>
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-success-soft sm:col-span-2">
                <ZapIcon className="h-3.5 w-3.5" /> +10 XP · combo ×3 · checked on device
              </p>
            </div>
          </Link>

          <div className="grid gap-3">
            {surfaces.map(({ title, text, to, icon: Icon }) =>
            <Link key={to} to={to} onClick={() => chooseRole(to)} className="glass-card group flex gap-2.5 p-3 transition-colors duration-150 hover:border-slate-700">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary-soft">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center justify-between text-sm font-semibold">
                    {title}
                    <ArrowUpRightIcon className="h-3.5 w-3.5 text-slate-500 transition-colors duration-150 group-hover:text-slate-200" />
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{text}</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        <h3 className="mt-8 text-lg font-semibold">{t('offline.title')}</h3>
        <div className="glass-card mt-3 grid divide-y divide-slate-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {offlineSteps.map(({ title, text, icon: Icon }, i) =>
          <div key={title} className="p-3">
              <div className="flex items-center gap-2 text-[11px] font-semibold tabular-nums text-slate-500">
                0{i + 1}
                <Icon className="h-3.5 w-3.5 text-primary-soft" />
              </div>
              <p className="mt-1.5 text-sm font-semibold text-slate-100">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{text}</p>
            </div>
          )}
        </div>
      </div>
    </section>);
}
