import { useState } from 'react';
import { BarChart3Icon, FolderOpenIcon } from 'lucide-react';
import { AnalyticsTab } from '../components/teacher/AnalyticsTab';
import { ResourcesTab } from '../components/teacher/ResourcesTab';
import { PageSkeleton } from '../components/ui/Skeleton';
import { teacherClass } from '../data/teacher';
import { useSimulatedLoad } from '../hooks/useSimulatedLoad';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';

type Tab = 'analytics' | 'resources';

export function TeacherCorner() {
  const { t } = useLanguage();
  const { openModal } = useApp();
  const [tab, setTab] = useState<Tab>('analytics');
  const loading = useSimulatedLoad(tab, 420, true);

  const tabs: {id: Tab;label: string;icon: typeof BarChart3Icon;}[] = [
  { id: 'analytics', label: t('teacher.analytics'), icon: BarChart3Icon },
  { id: 'resources', label: t('teacher.resources'), icon: FolderOpenIcon }];


  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">
            {teacherClass.name} · {teacherClass.school} · {teacherClass.learners} learners
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{t('teacher.title')}</h1>
        </div>
        <button type="button" onClick={() => openModal('partner')} className="btn-secondary self-start sm:self-auto">
          {t('cta.partner')}
        </button>
      </div>

      <div role="tablist" aria-label="Teacher views" className="mt-4 flex gap-1 border-b border-slate-800">
        {tabs.map(({ id, label, icon: Icon }) =>
        <button
          key={id}
          role="tab"
          type="button"
          aria-selected={tab === id}
          onClick={() => setTab(id)}
          className={`-mb-px flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
          tab === id ? 'border-primary text-slate-50' : 'border-transparent text-slate-400 hover:text-slate-200'}`
          }>
          
            <Icon className="h-4 w-4" /> {label}
          </button>
        )}
      </div>

      <div className="mt-4" role="tabpanel">
        {loading ?
        <div className="-mx-4 -my-8 sm:-mx-6">
            <PageSkeleton />
          </div> :
        tab === 'analytics' ?
        <AnalyticsTab /> :

        <ResourcesTab />
        }
      </div>
    </div>);

}