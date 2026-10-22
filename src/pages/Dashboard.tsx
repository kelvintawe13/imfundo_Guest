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
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
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

      <div className="mt-3 glass-card flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="grid h-9 shrink-0 place-items-center rounded-xl border-2 border-ink bg-teal-light px-2 font-display text-xs font-extrabold text-ink">
            Lv {learnerStats.level}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Level progress</p>
              <p className="text-xs font-semibold tabular-nums text-slate-400">
                <span className="text-teal">{xp.toLocaleString()}</span> / {learnerStats.xpForNext.toLocaleString()} XP
              </p>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full border-2 border-ink bg-slate-950/40">
              <div className="h-full rounded-full bg-teal" style={{ width: `${xpPct}%` }} />
            </div>
            <p className="mt-1 text-[11px] font-semibold text-slate-500">
              {Math.max(0, learnerStats.xpForNext - xp)} XP to Level 8
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-4 border-t-2 border-ink/10 pt-2.5 sm:border-l-2 sm:border-t-0 sm:pl-5 sm:pt-0">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-ink bg-sun">
              <FlameIcon className="h-4 w-4 text-ink" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-base font-extrabold">{learnerStats.streak}</p>
              <p className="text-[10px] font-semibold text-slate-500">{t('dash.streak')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-ink bg-sky">
              <CloudDownloadIcon className="h-4 w-4 text-ink" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-base font-extrabold">{learnerStats.offlineReady}</p>
              <p className="text-[10px] font-semibold text-slate-500">lessons offline</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        <section className="flex flex-col gap-3 rounded-2xl border-2 border-ink bg-sun-light p-3.5 text-ink shadow-pop sm:flex-row sm:items-center sm:justify-between" aria-labelledby="continue-title">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-sun text-ink">
              <SigmaIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <h2 id="continue-title" className="truncate font-display text-base font-extrabold sm:text-lg">
                  {continueLesson.title}
                </h2>
                <span className="shrink-0 rounded-full border border-ink/40 bg-white/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-soft">
                  {progress?.finished ? t('dash.lessonComplete') : progress ? t('dash.continue') : t('dash.start')}
                </span>
              </div>
              <p className="truncate text-xs font-semibold text-ink-soft">
                {continueLesson.subject} ·{' '}
                {progress?.finished
                  ? t('lesson.complete')
                  : remaining === 0
                    ? t('dash.readyToFinish')
                    : `${remaining} ${t('dash.questionsLeft')}`} · +{continueLesson.xp} XP
              </p>
              <div className="mt-1.5 h-1.5 max-w-xs overflow-hidden rounded-full border border-ink/60 bg-white">
                <div className="h-full rounded-full bg-coral" style={{ width: `${lessonProgress}%` }} />
              </div>
            </div>
          </div>
          <Link to="/lesson" className="btn-primary shrink-0 self-start !py-1.5 sm:self-auto">
            {progress?.finished
              ? t('dash.reviewResults')
              : progress
                ? t('cta.continue')
                : t('dash.startLesson')}{' '}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </section>
        <LessonList />
      </div>
    </div>);

}
