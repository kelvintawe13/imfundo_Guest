import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AtomIcon, CircleCheckIcon, DownloadIcon, LanguagesIcon, MonitorIcon, SigmaIcon } from 'lucide-react';
import { SkeletonRows } from '../ui/Skeleton';
import { lessons, subjectFilters } from '../../data/lessons';
import { useSimulatedLoad } from '../../hooks/useSimulatedLoad';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Subject } from '../../types/learning';

const subjectIcon: Record<Subject, React.ComponentType<{className?: string;}>> = {
  Mathematics: SigmaIcon,
  'Physical Sciences': AtomIcon,
  'Computer Literacy': MonitorIcon,
  English: LanguagesIcon
};

type Filter = (typeof subjectFilters)[number];

export function LessonList() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>('All');
  const loading = useSimulatedLoad(filter, 380, true);
  const visible = filter === 'All' ? lessons : lessons.filter((l) => l.subject === filter);

  return (
    <section className="glass-card p-4" aria-labelledby="lessons-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="lessons-title" className="text-sm font-semibold">
          {t('dash.lessons')}
        </h2>
        <div role="tablist" aria-label="Filter by subject" className="-mx-1 flex gap-1 overflow-x-auto px-1">
          {subjectFilters.map((f) =>
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            type="button"
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-150 ${
            filter === f ? 'bg-slate-800 text-slate-50' : 'text-slate-400 hover:text-slate-200'}`
            }>
            
              {f === 'All' ? 'All' : f.split(' ')[0]}
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">
        {loading ?
        <SkeletonRows rows={Math.min(visible.length || 3, 4)} /> :

        <ul className="space-y-2">
            {visible.map((l) => {
            const Icon = subjectIcon[l.subject];
            const done = l.progress >= 100;
            return (
              <li key={l.id}>
                  <Link
                  to="/lesson"
                  className="flex items-center gap-3 rounded-lg border border-slate-800 p-3 transition-colors duration-150 hover:border-slate-700 hover:bg-slate-800/40">
                  
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-800 text-slate-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-100">{l.title}</p>
                      <p className="text-xs text-slate-500">
                        {l.subject} · {l.minutes} min · {l.xp} XP
                      </p>
                      {l.progress > 0 && !done &&
                    <div className="mt-1.5 h-1 w-32 rounded-full bg-slate-800">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${l.progress}%` }} />
                        </div>
                    }
                    </div>
                    {done ?
                  <span className="flex items-center gap-1 text-xs font-medium text-success-soft">
                        <CircleCheckIcon className="h-4 w-4" /> Done
                      </span> :
                  l.downloaded ?
                  <span className="hidden rounded-full border border-slate-700 px-2 py-0.5 text-[11px] text-slate-400 sm:inline">
                        Offline ready
                      </span> :

                  <span className="flex items-center gap-1 text-xs text-slate-500">
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