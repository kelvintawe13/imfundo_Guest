import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AtomIcon, CircleCheckIcon, DownloadIcon, LanguagesIcon, MonitorIcon, SigmaIcon } from 'lucide-react';
import { SkeletonRows } from '../ui/Skeleton';
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

        <ul className="space-y-2">
            {visible.map((l) => {
            const Icon = subjectIcon[l.subject];
            const progress = l.id === quizMeta.lessonId && savedQuiz
              ? savedQuiz.finished
                ? 100
                : Math.round((savedQuiz.index + (savedQuiz.checked ? 1 : 0)) / quizQuestions.length * 100)
              : l.progress;
            const done = l.id === quizMeta.lessonId && savedQuiz
              ? savedQuiz.finished
              : progress >= 100;
            return (
              <li key={l.id}>
                  <Link
                  to="/lesson"
                  className="flex items-center gap-2.5 rounded-xl border-2 border-ink/15 p-2.5 transition-colors duration-150 hover:border-ink hover:bg-sun/10">
                  
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
                  l.downloaded ?
                  <span className="hidden rounded-full border-2 border-ink bg-teal-light px-2 py-0.5 text-[11px] font-bold text-ink sm:inline">
                        Offline ready
                      </span> :

                  <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                        <DownloadIcon className="h-3.5 w-3.5" /> {l.size}
                      </span>
                  }
                  </Link>
                </li>);

          })}
          </ul>
        }
      </div>
    </section>);

}
