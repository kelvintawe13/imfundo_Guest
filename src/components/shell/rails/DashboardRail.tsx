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
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 44 44" className="h-16 w-16 -rotate-90" aria-hidden="true">
            <circle cx="22" cy="22" r="18" className="stroke-slate-800" strokeWidth="5" fill="none" />
            <circle
              cx="22"
              cy="22"
              r="18"
              className="stroke-teal"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${pct / 100 * 113.1} 113.1`} />
            
          </svg>
          <div>
            <p className="font-display text-lg font-extrabold">
              {dailyGoal.done}/{dailyGoal.target}
            </p>
            <p className="text-xs text-slate-400">Daily goal · {dailyGoal.unit}</p>
          </div>
        </div>
        <ul className="mt-3 flex justify-between" aria-label="This week">
          {weekStreak.map((d, i) =>
          <li key={i} className="flex flex-col items-center gap-1">
              <span
              className={`grid h-7 w-7 place-items-center rounded-full border-2 font-display text-[10px] font-bold ${
              d.done ?
              'border-ink bg-teal text-ink' :
              'today' in d && d.today ?
              'border-ink bg-sun text-ink' :
              'border-ink/20 text-slate-500'}`
              }>
              
                {d.done ? <CheckIcon className="h-3.5 w-3.5" /> : d.day}
              </span>
            </li>
          )}
        </ul>
      </RailSection>
      <div className="border-b-2 border-ink/15 px-4 py-3">
        <SyncQueuePanel plain />
      </div>
      <RailSection title={t('shell.updates')}>
        <UpdateList items={learnerUpdates} />
      </RailSection>
    </>);

}