import React from 'react';
import { CheckIcon } from 'lucide-react';
import { RailSection, UpdateList } from '../RailSection';
import { SyncQueuePanel } from '../../dashboard/SyncQueuePanel';
import { dailyGoal, learnerUpdates, weekStreak } from '../../../data/rail';
import { useLanguage } from '../../../contexts/LanguageContext';

export function DashboardRail() {
  const { t } = useLanguage();
  const pct = Math.round(dailyGoal.done / dailyGoal.target * 100);

  return (
    <>
      <RailSection title={t('shell.progress')}>
        <div className="flex items-center gap-4">
          <svg viewBox="0 0 44 44" className="h-16 w-16 -rotate-90" aria-hidden="true">
            <circle cx="22" cy="22" r="18" className="stroke-slate-800" strokeWidth="5" fill="none" />
            <circle
              cx="22"
              cy="22"
              r="18"
              className="stroke-success"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${pct / 100 * 113.1} 113.1`} />
            
          </svg>
          <div>
            <p className="text-lg font-semibold">
              {dailyGoal.done}/{dailyGoal.target}
            </p>
            <p className="text-xs text-slate-400">Daily goal · {dailyGoal.unit}</p>
          </div>
        </div>
        <ul className="mt-4 flex justify-between" aria-label="This week">
          {weekStreak.map((d, i) =>
          <li key={i} className="flex flex-col items-center gap-1">
              <span
              className={`grid h-7 w-7 place-items-center rounded-full border text-[10px] ${
              d.done ?
              'border-success bg-success text-white' :
              'today' in d && d.today ?
              'border-primary text-primary-soft' :
              'border-slate-700 text-slate-500'}`
              }>
              
                {d.done ? <CheckIcon className="h-3.5 w-3.5" /> : d.day}
              </span>
            </li>
          )}
        </ul>
      </RailSection>
      <div className="border-b border-slate-800 px-4 py-4">
        <SyncQueuePanel plain />
      </div>
      <RailSection title={t('shell.updates')}>
        <UpdateList items={learnerUpdates} />
      </RailSection>
    </>);

}