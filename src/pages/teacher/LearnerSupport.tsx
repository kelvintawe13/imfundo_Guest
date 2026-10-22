import { useMemo, useState } from 'react';
import { CheckCircle2Icon, CircleAlertIcon, SearchIcon, UserRoundCheckIcon } from 'lucide-react';
import { TeacherPageHeader } from '../../components/teacher/TeacherPageHeader';
import { attentionLearners } from '../../data/teacher';

export function LearnerSupport() {
  const [query, setQuery] = useState('');
  const [reviewed, setReviewed] = useState<string[]>([]);
  const search = query.trim().toLowerCase();
  const learners = useMemo(
    () => attentionLearners.filter((learner) => `${learner.name} ${learner.topic}`.toLowerCase().includes(search)),
    [search]
  );
  const outstanding = attentionLearners.filter((learner) => !reviewed.includes(learner.name)).length;

  const toggleReviewed = (name: string) => {
    setReviewed((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5 px-4 py-5 sm:px-6">
      <TeacherPageHeader
        eyebrow="Staff · Learner support"
        title="Support follow-ups"
        description="Prioritize learners who may benefit from a check-in, based on sample class mastery signals."
        icon={UserRoundCheckIcon} />

      <section className="grid gap-3 sm:grid-cols-3" aria-label="Support queue summary">
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500">Needs review</p>
          <p className="mt-1 text-2xl font-semibold text-warn">{outstanding}</p>
          <p className="mt-1 text-xs text-slate-400">Open demo follow-ups</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500">Reviewed</p>
          <p className="mt-1 text-2xl font-semibold text-success-soft">{reviewed.length}</p>
          <p className="mt-1 text-xs text-slate-400">This page session</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-slate-500">Support signals</p>
          <p className="mt-1 text-2xl font-semibold text-slate-100">{attentionLearners.length}</p>
          <p className="mt-1 text-xs text-slate-400">Sample learners below 50% mastery</p>
        </div>
      </section>

      <section className="glass-card overflow-hidden" aria-labelledby="support-list-title">
        <div className="flex flex-col gap-3 border-b border-slate-800 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="support-list-title" className="text-base font-semibold text-slate-100">Learners to check in with</h2>
            <p className="mt-1 text-xs text-slate-500">A follow-up marker is temporary and only stored for this page session.</p>
          </div>
          <label className="relative block w-full sm:max-w-xs">
            <span className="sr-only">Search support list</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search learner or topic"
              className="field !mt-0 !py-2 !pl-9" />
          </label>
        </div>
        <ul className="divide-y divide-slate-800">
          {learners.map((learner) => {
            const isReviewed = reviewed.includes(learner.name);
            return (
              <li key={learner.name} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                  isReviewed ? 'bg-success/10 text-success-soft' : 'bg-warn/10 text-warn'
                }`}>
                  {isReviewed ? <CheckCircle2Icon className="h-5 w-5" /> : <CircleAlertIcon className="h-5 w-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-100">{learner.name}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      isReviewed ? 'bg-success/10 text-success-soft' : 'bg-warn/10 text-warn'
                    }`}>
                      {isReviewed ? 'Reviewed' : 'Needs check-in'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">Focus area: {learner.topic} · {learner.mastery}% mastery</p>
                  <p className="mt-1 text-[11px] text-slate-500">Last synced: {learner.lastSync}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleReviewed(learner.name)}
                  aria-pressed={isReviewed}
                  className={isReviewed ? 'btn-secondary w-full !py-1.5 text-xs sm:w-auto' : 'btn-primary w-full !py-1.5 text-xs sm:w-auto'}>
                  {isReviewed ? 'Undo review' : 'Mark reviewed'}
                </button>
              </li>
            );
          })}
          {!learners.length && (
            <li className="px-4 py-10 text-center text-sm text-slate-500">No learners match your search.</li>
          )}
        </ul>
      </section>
      <p className="text-xs text-slate-500">This prototype uses sample learner names and mastery figures. Do not use them for real learner decisions.</p>
    </div>
  );
}
