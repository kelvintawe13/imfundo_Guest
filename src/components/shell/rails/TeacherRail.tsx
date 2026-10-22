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
          <p className="font-display text-2xl font-extrabold">{primaryKpi.value}</p>
          <p className="text-xs font-bold text-teal">{primaryKpi.delta}</p>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full border-2 border-ink bg-slate-950/40">
          <div className="h-full rounded-full bg-teal" style={{ width: `${primaryKpi.progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-slate-500">Pilot target: 75% by end of term</p>
      </RailSection>
      <RailSection title={t('shell.updates')}>
        <UpdateList items={classUpdates} />
      </RailSection>
      <RailSection title="This week">
        <ul className="space-y-2">
          {classTasks.map((task) =>
          <li key={task.title} className="flex items-center justify-between gap-3 rounded-xl border-2 border-ink/15 px-3 py-2">
              <span className="text-sm font-semibold text-slate-200">{task.title}</span>
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