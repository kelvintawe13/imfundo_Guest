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
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[13px] text-slate-400">
            Daily goal · <span className="font-display font-extrabold text-slate-100">{dailyGoal.done}/{dailyGoal.target}</span> {dailyGoal.unit}
          </p>
          <span className="text-[11px] font-semibold tabular-nums text-teal">{pct}%</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full border border-ink/30 bg-slate-950/40">
          <div className="h-full rounded-full bg-teal" style={{ width: `${pct}%` }} />
        </div>
        <ul className="mt-2 flex justify-between" aria-label="This week">
          {weekStreak.map((d, i) =>
          <li key={i} className="flex flex-col items-center gap-1">
              <span
              className={`grid h-6 w-6 place-items-center rounded-full border-2 font-display text-[9px] font-bold ${
              d.done ?
              'border-ink bg-teal text-ink' :
              'today' in d && d.today ?
              'border-ink bg-sun text-ink' :
              'border-ink/20 text-slate-500'}`
              }>
              
                {d.done ? <CheckIcon className="h-3 w-3" /> : d.day}
              </span>
            </li>
          )}
        </ul>
      </RailSection>
      <div className="border-b-2 border-ink/15 px-4 py-2.5">
        <SyncQueuePanel plain />
      </div>
      <RailSection title={t('shell.updates')}>
        <UpdateList items={learnerUpdates} />
      </RailSection>
    </>);

}