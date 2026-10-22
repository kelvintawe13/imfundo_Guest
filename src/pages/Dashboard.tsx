import { Link } from 'react-router-dom';
import { ArrowRightIcon, CloudDownloadIcon, FlameIcon, SigmaIcon } from 'lucide-react';
import { Toggle } from '../components/ui/Toggle';
import { LessonList } from '../components/dashboard/LessonList';
import { continueLesson, learnerStats } from '../data/lessons';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { quizMeta, quizQuestions } from '../data/quiz';

export function Dashboard() {
  const { t } = useLanguage();
  const { online, setOnline, quizProgress } = useApp();
  const progress = quizProgress[quizMeta.lessonId];
  const xp = learnerStats.xp + Object.values(quizProgress).reduce((total, lesson) => total + lesson.earnedXp, 0);
  const xpPct = Math.min(100, Math.round(xp / learnerStats.xpForNext * 100));
  const answered = progress ? progress.index + (progress.checked ? 1 : 0) : 0;
  const lessonProgress = progress?.finished ? 100 : Math.round(answered / quizQuestions.length * 100);
  const remaining = Math.max(0, quizQuestions.length - answered);

  return (
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="font-display text-sm font-bold text-sky-dark">Grade 11 · Idutywa</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{t('dash.greeting')}</h1>
        </div>
        <div className="glass-card px-4 py-1 sm:w-72">
          <Toggle
            label={t('dash.simulate')}
            description={online ? 'Syncing queued progress' : 'Everything works offline'}
            checked={online}
            onChange={setOnline} />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="glass-card p-4 sm:col-span-2">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-display text-sm font-bold text-slate-400">
              {t('dash.level')} <span className="text-2xl font-extrabold text-slate-50">{learnerStats.level}</span>
            </p>
            <p className="text-sm tabular-nums text-slate-400">
              <span className="font-semibold text-teal">{xp.toLocaleString()}</span> /{' '}
              {learnerStats.xpForNext.toLocaleString()} XP
            </p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full border-2 border-ink bg-slate-950/40">
            <div className="h-full rounded-full bg-teal" style={{ width: `${xpPct}%` }} />
          </div>
          <p className="mt-2 text-xs font-semibold text-slate-500">{Math.max(0, learnerStats.xpForNext - xp)} XP to Level 8</p>
        </div>
        <div className="glass-card flex items-center gap-3 p-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-ink bg-sun">
            <FlameIcon className="h-6 w-6 text-ink" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-2xl font-extrabold">{learnerStats.streak}</p>
            <p className="text-xs font-semibold text-slate-400">{t('dash.streak')}</p>
          </div>
        </div>
        <div className="glass-card flex items-center gap-3 p-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-ink bg-sky">
            <CloudDownloadIcon className="h-6 w-6 text-ink" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-2xl font-extrabold">{learnerStats.offlineReady}</p>
            <p className="text-xs font-semibold text-slate-400">lessons ready offline</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="space-y-4">
          <section className="rounded-2xl border-2 border-ink bg-sun-light p-4 text-ink shadow-pop sm:p-5" aria-labelledby="continue-title">
            <p className="font-display text-xs font-bold uppercase tracking-[0.14em] text-sky-dark">
              {progress?.finished ? t('dash.lessonComplete') : progress ? t('dash.continue') : t('dash.start')}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center xl:grid-cols-[auto_minmax(0,1fr)_auto]">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-ink bg-sun text-ink">
                <SigmaIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 id="continue-title" className="font-display text-xl font-extrabold">
                  {continueLesson.title}
                </h2>
                <p className="text-sm font-semibold text-ink-soft">
                  {continueLesson.subject} ·{' '}
                  {progress?.finished
                    ? t('lesson.complete')
                    : remaining === 0
                      ? t('dash.readyToFinish')
                      : `${remaining} ${t('dash.questionsLeft')}`} · +{continueLesson.xp} XP
                </p>
                <div className="mt-3 h-2 max-w-sm overflow-hidden rounded-full border-2 border-ink bg-white">
                  <div className="h-full rounded-full bg-coral" style={{ width: `${lessonProgress}%` }} />
                </div>
              </div>
              <Link to="/lesson" className="btn-primary justify-self-start sm:col-start-2 xl:col-start-auto">
                {progress?.finished
                  ? t('dash.reviewResults')
                  : progress
                    ? t('cta.continue')
                    : t('dash.startLesson')}{' '}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </section>
          <LessonList />
        </div>
      </div>
    </div>);

}
