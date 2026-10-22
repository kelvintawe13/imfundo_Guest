import { useMemo, useState } from 'react';
import { DownloadIcon, SearchIcon, UsersIcon } from 'lucide-react';
import { TeacherPageHeader } from '../../components/teacher/TeacherPageHeader';
import { classRoster, kpis, teacherClass } from '../../data/teacher';

type RosterFilter = 'All learners' | 'Needs support' | 'On track' | 'Excelling';

const filters: RosterFilter[] = ['All learners', 'Needs support', 'On track', 'Excelling'];

export function ClassManagement() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<RosterFilter>('All learners');
  const search = query.trim().toLowerCase();
  const visibleLearners = useMemo(
    () => classRoster.filter((learner) =>
      (filter === 'All learners' || learner.status === filter) &&
      `${learner.name} ${learner.email}`.toLowerCase().includes(search)
    ),
    [filter, search]
  );

  const exportRoster = () => {
    const rows = [
      ['Name', 'Email', 'Progress', 'Status', 'Last synced'],
      ...classRoster.map((learner) => [
        learner.name,
        learner.email,
        `${learner.progress}%`,
        learner.status,
        learner.lastSync
      ])
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blobUrl = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'imfundo-demo-class-roster.csv';
    link.click();
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-3 px-4 py-3 sm:px-6">
      <TeacherPageHeader
        eyebrow="Staff · Class management"
        title="Your class"
        description="Review learner activity and progress in your demo class. The roster below is sample data."
        icon={UsersIcon} />

      <section className="glass-card flex flex-col divide-y-2 divide-ink/10 p-3 sm:flex-row sm:items-center sm:divide-x-2 sm:divide-y-0" aria-label="Class summary">
        <div className="min-w-0 pb-2.5 sm:flex-1 sm:pb-0 sm:pr-4">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Class</p>
          <p className="mt-0.5 truncate font-display text-sm font-extrabold text-slate-100">{teacherClass.name}</p>
          <p className="truncate text-[11px] text-slate-400">{teacherClass.school}</p>
        </div>
        <div className="min-w-0 py-2.5 sm:flex-1 sm:px-4 sm:py-0">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Enrolled learners</p>
          <p className="mt-0.5 font-display text-lg font-extrabold text-slate-100">{teacherClass.learners}</p>
          <p className="text-[11px] text-slate-400">Demo class total</p>
        </div>
        <div className="min-w-0 pt-2.5 sm:flex-1 sm:pl-4 sm:pt-0">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{kpis[0].label}</p>
          <p className="mt-0.5 font-display text-lg font-extrabold text-teal">{kpis[0].value}</p>
          <p className="text-[11px] text-slate-400">Based on sample activity</p>
        </div>
      </section>

      <section className="glass-card overflow-hidden" aria-labelledby="roster-title">
        <div className="flex flex-col gap-2.5 border-b-2 border-ink/15 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="roster-title" className="font-display text-base font-extrabold text-slate-100">Learner roster</h2>
            <p className="mt-0.5 text-[11px] text-slate-500">Showing {visibleLearners.length} of {classRoster.length} demo profiles</p>
          </div>
          <button type="button" onClick={exportRoster} className="btn-secondary self-start !py-1.5 text-xs sm:self-auto">
            <DownloadIcon className="h-3.5 w-3.5" /> Export sample CSV
          </button>
        </div>
        <div className="flex flex-col gap-2 border-b-2 border-ink/15 p-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-xs">
            <span className="sr-only">Search learners</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name or email"
              className="field !mt-0 !py-2 !pl-9" />
          </label>
          <div className="flex gap-1 overflow-x-auto" role="tablist" aria-label="Filter roster">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                onClick={() => setFilter(item)}
                className={`whitespace-nowrap rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-colors ${
                  filter === item ? 'border-ink bg-sun text-ink shadow-pop-sm' : 'border-transparent text-slate-400 hover:border-ink hover:bg-sun-light hover:text-ink'
                }`}>
                {item}
              </button>
            ))}
          </div>
        </div>

        {visibleLearners.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[660px] text-sm">
              <thead>
                <tr className="border-b-2 border-ink/15 text-left text-xs text-slate-500">
                  <th className="px-4 py-2 font-bold">Learner</th>
                  <th className="px-4 py-2 font-bold">Progress</th>
                  <th className="px-4 py-2 font-bold">Status</th>
                  <th className="px-4 py-2 font-bold">Last synced</th>
                </tr>
              </thead>
              <tbody>
                {visibleLearners.map((learner) => (
                  <tr key={learner.email} className="border-b border-ink/10 last:border-0">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-ink bg-sun text-[10px] font-extrabold text-ink">{learner.initials}</span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-slate-100">{learner.name}</span>
                          <span className="block text-xs text-slate-500">{learner.email}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-20 overflow-hidden rounded-full border border-ink/30 bg-slate-950/40">
                          <span className={`block h-full rounded-full ${learner.progress < 50 ? 'bg-coral' : 'bg-teal'}`} style={{ width: `${learner.progress}%` }} />
                        </span>
                        <span className="font-semibold tabular-nums text-xs text-slate-400">{learner.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`rounded-full border-2 border-ink px-2 py-0.5 text-[11px] font-bold ${
                        learner.status === 'Needs support'
                          ? 'bg-coral/20 text-ink'
                          : learner.status === 'Excelling'
                            ? 'bg-teal-light text-ink'
                            : 'bg-sky/20 text-ink'
                      }`}>
                        {learner.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-xs text-slate-400">{learner.lastSync}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-4 py-10 text-center text-sm text-slate-500">No demo learners match this search.</p>
        )}
      </section>
      <p className="text-xs text-slate-500">Roster and progress shown here are sample data for the prototype; they are not connected to a school system.</p>
    </div>
  );
}
