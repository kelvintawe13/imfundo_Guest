import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, CheckIcon, ZapIcon } from 'lucide-react';
import { lessonPlayerPreview, offlineSteps, surfaces } from '../../data/landing';
import { useLanguage } from '../../contexts/LanguageContext';
import { OfflineSyncIllustration } from '../illustrations/OfflineSyncIllustration';

export function PlatformSection() {
  const { t } = useLanguage();
  const LeadIcon = lessonPlayerPreview.icon;

  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">{t('platform.title')}</h2>

        <div className="mt-8 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
          <Link to={lessonPlayerPreview.to} className="glass-card group flex flex-col p-4 transition-colors duration-150 hover:border-slate-700">
            <div className="flex items-start justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-success/15 text-success-soft">
                <LeadIcon className="h-5 w-5" />
              </span>
              <ArrowUpRightIcon className="h-4 w-4 text-slate-500 transition-colors duration-150 group-hover:text-slate-200" />
            </div>
            <h3 className="mt-3 text-xl font-semibold">{lessonPlayerPreview.title}</h3>
            <p className="mt-1 max-w-md text-sm text-slate-400">{lessonPlayerPreview.text}</p>
            <div className="mt-4 grid gap-2 rounded-lg border border-slate-800 bg-slate-950/50 p-3 sm:grid-cols-2" aria-hidden="true">
              <div className="rounded-md border border-success/50 bg-success/10 px-3 py-2 text-sm text-slate-100">
                <span className="flex items-center justify-between">
                  x = ±3 <CheckIcon className="h-4 w-4 text-success" />
                </span>
              </div>
              <div className="rounded-md border border-slate-800 px-3 py-2 text-sm text-slate-400">x = 9</div>
              <p className="flex items-center gap-1.5 text-xs font-medium text-success-soft sm:col-span-2">
                <ZapIcon className="h-3.5 w-3.5" /> +10 XP · combo ×3 · checked on device in 12 ms
              </p>
            </div>
          </Link>

          <div className="grid gap-3">
            {surfaces.map(({ title, text, to, icon: Icon }) =>
            <Link key={to} to={to} className="glass-card group flex gap-3 p-4 transition-colors duration-150 hover:border-slate-700">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h3 className="flex items-center justify-between font-semibold">
                    {title}
                    <ArrowUpRightIcon className="h-4 w-4 text-slate-500 transition-colors duration-150 group-hover:text-slate-200" />
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">{text}</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        <h3 className="mt-14 text-xl font-semibold">{t('offline.title')}</h3>
        <div className="glass-card mt-4 px-4 py-3 sm:px-6">
          <OfflineSyncIllustration />
        </div>
        <ol className="mt-4 grid gap-5 md:grid-cols-3">
          {offlineSteps.map(({ title, text, icon: Icon }, i) =>
          <li key={title} className="relative border-t border-slate-800 pt-5">
              <span className="absolute -top-px left-0 h-px w-12 bg-primary" />
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tabular-nums text-slate-500">0{i + 1}</span>
                <Icon className="h-4 w-4 text-slate-300" />
                <p className="font-semibold text-slate-100">{title}</p>
              </div>
              <p className="mt-2 text-sm text-slate-400">{text}</p>
            </li>
          )}
        </ol>
      </div>
    </section>);

}