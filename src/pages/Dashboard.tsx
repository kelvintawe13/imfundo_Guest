import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CloudDownloadIcon, FlameIcon, SigmaIcon } from 'lucide-react';
import { Toggle } from '../components/ui/Toggle';
import { LessonList } from '../components/dashboard/LessonList';
import { continueLesson, learnerStats } from '../data/lessons';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';

export function Dashboard() {
  const { t } = useLanguage();
  const { online, setOnline } = useApp();
  const xpPct = Math.round(learnerStats.xp / learnerStats.xpForNext * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-sm text-slate-400">Grade 11 · Idutywa</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{t('dash.greeting')}</h1>
        </div>
        <div className="glass-card px-4 py-1 sm:w-72">
          <Toggle
            label={t('dash.simulate')}
            description={online ? 'Syncing queued progress' : 'Everything works offline'}
            checked={online}
            onChange={setOnline} />
          
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="glass-card p-4 sm:col-span-2">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-slate-400">
              {t('dash.level')} <span className="text-2xl font-semibold text-slate-50">{learnerStats.level}</span>
            </p>
            <p className="text-sm tabular-nums text-slate-400">
              <span className="font-semibold text-success-soft">{learnerStats.xp.toLocaleString()}</span> /{' '}
              {learnerStats.xpForNext.toLocaleString()} XP
            </p>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-success" style={{ width: `${xpPct}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-500">{learnerStats.xpForNext - learnerStats.xp} XP to Level 8</p>
        </div>
        <div className="glass-card flex items-center gap-3 p-4">
          <FlameIcon className="h-6 w-6 text-warn" />
          <div>
            <p className="text-2xl font-semibold">{learnerStats.streak}</p>
            <p className="text-xs text-slate-400">{t('dash.streak')}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 p-4">
          <CloudDownloadIcon className="h-6 w-6 text-primary-soft" />
          <div>
            <p className="text-2xl font-semibold">{learnerStats.offlineReady}</p>
            <p className="text-xs text-slate-400">lessons ready offline</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="space-y-4">
          <section className="rounded-xl border border-primary/30 bg-primary/10 p-4 sm:p-5" aria-labelledby="continue-title">
            <p className="text-xs font-medium text-primary-soft">{t('dash.continue')}</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center xl:grid-cols-[auto_minmax(0,1fr)_auto]">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary-soft">
                <SigmaIcon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h2 id="continue-title" className="text-lg font-semibold">
                  {continueLesson.title}
                </h2>
                <p className="text-sm text-slate-400">
                  {continueLesson.subject} · {continueLesson.remaining} · +{continueLesson.xp} XP
                </p>
                <div className="mt-3 h-1.5 max-w-sm rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${continueLesson.progress}%` }} />
                </div>
              </div>
              <Link to="/lesson" className="btn-primary justify-self-start sm:col-start-2 xl:col-start-auto">
                {t('cta.continue')} <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </section>
          <LessonList />
        </div>
      </div>
    </div>);

}