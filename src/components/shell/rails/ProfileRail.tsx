import { RailSection, UpdateList } from '../RailSection';
import { accountUpdates, badgeProgress } from '../../../data/rail';
import { useLanguage } from '../../../contexts/LanguageContext';

export function ProfileRail() {
  const { t } = useLanguage();
  return (
    <>
      <RailSection title="Next badges">
        <ul className="space-y-2.5">
          {badgeProgress.map((b) =>
          <li key={b.name}>
              <div className="flex justify-between gap-2 text-xs">
                <span className="truncate text-slate-200">{b.name}</span>
                <span className="shrink-0 text-[10px] tabular-nums text-slate-400">
                  {b.current}
                  {'unit' in b ? b.unit : ''} / {b.target}
                  {'unit' in b ? b.unit : ''}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full border border-ink/30 bg-slate-950/40">
                <div className="h-full rounded-full bg-teal" style={{ width: `${Math.min(100, b.current / b.target * 100)}%` }} />
              </div>
            </li>
          )}
        </ul>
      </RailSection>
      <RailSection title={t('shell.updates')}>
        <UpdateList items={accountUpdates} />
      </RailSection>
    </>);

}