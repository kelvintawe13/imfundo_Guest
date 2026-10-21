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
        <p className="text-sm text-slate-300">{teacherClass.name}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-semibold">{primaryKpi.value}</p>
          <p className="text-xs text-success-soft">{primaryKpi.delta}</p>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-success" style={{ width: `${primaryKpi.progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-slate-500">Pilot target: 75% by end of term</p>
      </RailSection>
      <RailSection title={t('shell.updates')}>
        <UpdateList items={classUpdates} />
      </RailSection>
      <RailSection title="This week">
        <ul className="space-y-2">
          {classTasks.map((task) =>
          <li key={task.title} className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 px-3 py-2">
              <span className="text-sm text-slate-200">{task.title}</span>
              <span className="shrink-0 text-xs text-slate-500">{task.due}</span>
            </li>
          )}
        </ul>
      </RailSection>
      <RailSection title="Grow the pilot">
        <p className="text-xs text-slate-400">Know a school that should join? Applications take two minutes.</p>
        <button type="button" onClick={() => openModal('partner')} className="btn-secondary mt-3 w-full">
          {t('cta.partner')}
        </button>
      </RailSection>
    </>);

}