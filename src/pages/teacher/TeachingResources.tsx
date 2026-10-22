import { useMemo, useState } from 'react';
import { BookOpenIcon, CheckIcon, FileTextIcon, SearchIcon } from 'lucide-react';
import { TeacherPageHeader } from '../../components/teacher/TeacherPageHeader';
import { resources } from '../../data/teacher';

const topics = ['All resources', ...Array.from(new Set(resources.map((resource) => resource.topic)))];

export function TeachingResources() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('All resources');
  const [saved, setSaved] = useState<string[]>([]);
  const search = query.trim().toLowerCase();
  const visibleResources = useMemo(
    () => resources.filter((resource) =>
      (topic === 'All resources' || resource.topic === topic) &&
      `${resource.title} ${resource.type} ${resource.topic}`.toLowerCase().includes(search)
    ),
    [search, topic]
  );

  const toggleSaved = (id: string) => {
    setSaved((current) => current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 sm:px-6">
      <TeacherPageHeader
        eyebrow="Staff · Teaching resources"
        title="Resource library"
        description="Find lesson guides, worksheets, and references for offline-friendly teaching."
        icon={BookOpenIcon} />

      <section className="glass-card p-4" aria-label="Resource library filters">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Search teaching resources</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search guides, worksheets, topics"
              className="field !mt-0 !py-2 !pl-9" />
          </label>
          <label className="flex items-center gap-2 font-display text-xs font-bold text-slate-400">
            Topic
            <select value={topic} onChange={(event) => setTopic(event.target.value)} className="field !mt-0 !w-auto !py-2">
              {topics.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {visibleResources.map((resource) => {
          const isSaved = saved.includes(resource.id);
          return (
            <article key={resource.id} className="glass-card flex min-h-52 flex-col p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-ink bg-sun text-ink">
                  <FileTextIcon className="h-5 w-5" />
                </span>
                <span className="rounded-full border-2 border-ink/20 px-2 py-1 text-[10px] font-bold text-slate-400">{resource.type}</span>
              </div>
              <h2 className="mt-4 font-display text-sm font-bold leading-snug text-slate-100">{resource.title}</h2>
              <p className="mt-1 text-xs text-slate-400">{resource.topic} · PDF · {resource.size}</p>
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <span className="text-[11px] text-slate-500">Resource file is a demo placeholder</span>
                <button
                  type="button"
                  onClick={() => toggleSaved(resource.id)}
                  aria-pressed={isSaved}
                  className={isSaved ? 'btn-primary !px-3 !py-1.5 text-xs' : 'btn-secondary !px-3 !py-1.5 text-xs'}>
                  {isSaved ? <CheckIcon className="h-3.5 w-3.5" /> : <BookOpenIcon className="h-3.5 w-3.5" />}
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
      {!visibleResources.length && (
        <div className="glass-card px-4 py-12 text-center">
          <p className="text-sm font-medium text-slate-300">No matching resources</p>
          <p className="mt-1 text-xs text-slate-500">Try another search or topic.</p>
        </div>
      )}
      <p className="text-xs text-slate-500">Saved markers are temporary demo state. Real file downloads will be connected when resource files are added.</p>
    </div>
  );
}
