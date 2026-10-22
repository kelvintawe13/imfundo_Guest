import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, AtomIcon, CircleCheckIcon, Clock3Icon, LanguagesIcon, MonitorIcon, SigmaIcon } from 'lucide-react';
import { SkeletonRows } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';
import { lessons, subjectFilters } from '../../data/lessons';
import { useSimulatedLoad } from '../../hooks/useSimulatedLoad';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Subject } from '../../types/learning';
import { useApp } from '../../contexts/AppContext';
import { quizMeta, quizQuestions } from '../../data/quiz';

const subjectIcon: Record<Subject, React.ComponentType<{className?: string;}>> = {
  Mathematics: SigmaIcon,
  'Physical Sciences': AtomIcon,
  'Computer Literacy': MonitorIcon,
  English: LanguagesIcon
};

const subjectColor: Record<Subject, string> = {
  Mathematics: 'bg-sun',
  'Physical Sciences': 'bg-teal',
  'Computer Literacy': 'bg-sky',
  English: 'bg-coral'
};

type Filter = (typeof subjectFilters)[number];

export function LessonList() {
  const { t } = useLanguage();
  const { quizProgress } = useApp();
  const savedQuiz = quizProgress[quizMeta.lessonId];
  const [filter, setFilter] = useState<Filter>('All');
  const loading = useSimulatedLoad(filter, 380, true);
  const visible = filter === 'All' ? lessons : lessons.filter((l) => l.subject === filter);

  return (
    <section className="glass-card p-4" aria-labelledby="lessons-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="lessons-title" className="font-display text-lg font-extrabold">
          {t('dash.lessons')}
        </h2>
        <div role="tablist" aria-label="Filter by subject" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {subjectFilters.map((f) =>
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            type="button"
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap rounded-full border-2 px-3 py-1 text-xs font-bold transition-colors duration-150 ${
            filter === f ? 'border-ink bg-sun text-ink shadow-pop-sm' : 'border-transparent text-slate-400 hover:border-ink hover:bg-sun-light hover:text-ink'}`
            }>
            
              {f === 'All' ? 'All' : f}
            </button>
          )}
        </div>
      </div>

      <div className="mt-3">
        {loading ?
        <SkeletonRows rows={Math.min(visible.length || 3, 4)} /> :

        visible.length === 0 ?
        <EmptyState
          compact
          icon={SigmaIcon}
          title="No lessons in this subject yet"
          description="Try another subject or check back after your next sync." /> :

        <ul className="space-y-2">
            {visible.map((l) => {
            const Icon = subjectIcon[l.subject];
            const isAvailable = l.id === quizMeta.lessonId;
            const saved = isAvailable ? savedQuiz : undefined;
            const progress = saved
              ? saved.finished
                ? 100
                : Math.round((saved.index + (saved.checked ? 1 : 0)) / quizQuestions.length * 100)
              : 0;
            const done = Boolean(saved?.finished);

            const row = (
              <>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border-2 border-ink ${subjectColor[l.subject]}`}>
                  <Icon className="h-4 w-4 text-ink" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-bold text-slate-100">{l.title}</p>
                  <p className="text-xs text-slate-500">
                    {l.subject} · {l.minutes} min · {l.xp} XP
                  </p>
                  {progress > 0 && !done &&
                <div className="mt-1.5 h-1.5 w-32 overflow-hidden rounded-full border border-ink/30 bg-slate-950/40">
                      <div className="h-full rounded-full bg-sky" style={{ width: `${progress}%` }} />
                    </div>
                }
                </div>
                {done ?
              <span className="flex items-center gap-1 text-xs font-bold text-teal">
                    <CircleCheckIcon className="h-4 w-4" /> Done
                  </span> :
              isAvailable ?
              <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                    {saved ? 'Continue' : 'Start'} <ArrowRightIcon className="h-3.5 w-3.5" />
                  </span> :

              <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <Clock3Icon className="h-3.5 w-3.5" /> {t('dash.comingSoon')}
                  </span>
              }
              </>
            );

            return (
              <li key={l.id}>
                  {isAvailable ?
                <Link
                  to="/lesson"
                  className="flex items-center gap-2.5 rounded-xl border-2 border-ink/15 p-2.5 transition-colors duration-150 hover:border-ink hover:bg-sun/10">
                  
                      {row}
                    </Link> :

                <div className="flex items-center gap-2.5 rounded-xl border-2 border-dashed border-ink/15 p-2.5 opacity-65">
                      {row}
                    </div>
                }
                </li>);

          })}
          </ul>
        }
      </div>
    </section>);

}
