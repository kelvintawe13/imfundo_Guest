import { RailSection, UpdateList } from '../RailSection';
import { classTasks, classUpdates } from '../../../data/rail';
import { primaryKpi, teacherClass } from '../../../data/teacher';
import { useApp } from '../../../contexts/AppContext';
import { useLanguage } from '../../../contexts/LanguageContext';

export function TeacherRail() {
  const { t } = useLanguage();
  const { openModal } = useApp();

  return (
    <>
      <RailSection title={t('shell.progress')}>
        <p className="text-xs text-slate-400">{teacherClass.name}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <p className="font-display text-xl font-extrabold">{primaryKpi.value}</p>
          <p className="text-[11px] font-bold text-teal">{primaryKpi.delta}</p>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full border border-ink/30 bg-slate-950/40">
          <div className="h-full rounded-full bg-teal" style={{ width: `${primaryKpi.progress}%` }} />
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Pilot target: 75% by end of term</p>
      </RailSection>
      <RailSection title={t('shell.updates')}>
        <UpdateList items={classUpdates} />
      </RailSection>
      <RailSection title="This week">
        <ul className="space-y-1.5">
          {classTasks.map((task) =>
          <li key={task.title} className="flex items-center justify-between gap-2 rounded-lg border border-ink/15 px-2.5 py-1.5">
              <span className="truncate text-xs font-semibold text-slate-200">{task.title}</span>
              <span className="shrink-0 text-[10px] text-slate-500">{task.due}</span>
            </li>
          )}
        </ul>
      </RailSection>
      <RailSection title="Grow the pilot">
        <p className="text-[11px] leading-snug text-slate-400">Know a school that should join? Applications take two minutes.</p>
        <button type="button" onClick={() => openModal('partner')} className="btn-secondary mt-2 w-full !py-1.5 text-xs">
          {t('cta.partner')}
        </button>
      </RailSection>
    </>);

}