import React from 'react';
import { RailSection, UpdateList } from '../RailSection';
import { accountUpdates, badgeProgress } from '../../../data/rail';
import { useLanguage } from '../../../contexts/LanguageContext';

export function ProfileRail() {
  const { t } = useLanguage();
  return (
    <>
      <RailSection title="Next badges">
        <ul className="space-y-4">
          {badgeProgress.map((b) =>
          <li key={b.name}>
              <div className="flex justify-between text-sm">
                <span className="text-slate-200">{b.name}</span>
                <span className="tabular-nums text-slate-400">
                  {b.current}
                  {'unit' in b ? b.unit : ''} / {b.target}
                  {'unit' in b ? b.unit : ''}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, b.current / b.target * 100)}%` }} />
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