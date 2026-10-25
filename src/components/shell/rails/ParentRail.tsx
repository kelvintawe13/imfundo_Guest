import { Link } from 'react-router-dom';
import { ArrowRightIcon, BookOpenIcon, HeartHandshakeIcon, MailIcon } from 'lucide-react';
import { RailSection, UpdateList } from '../RailSection';
import { learningStories, parentSupportTips } from '../../../data/parent';
import { useParentSnapshot } from '../../../utils/parentData';

export function ParentRail() {
  const snapshot = useParentSnapshot();
  const featured = learningStories.find((story) => story.featured) ?? learningStories[0];
  const modeLabel = snapshot.mode === 'linked' ? 'Live progress' : snapshot.mode === 'idle' ? 'No activity yet' : 'Demo learner';

  return (
    <>
      <RailSection title="Linked learner">
        <div className="flex items-start gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-sun font-display text-[11px] font-extrabold text-ink">
            {snapshot.childName
              .trim()
              .split(/\s+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase() ?? '')
              .join('') || 'L'}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-[13px] font-bold text-slate-100">{snapshot.childName}</p>
            <p className="truncate text-[11px] text-slate-500">
              {snapshot.grade} · {snapshot.school}
            </p>
          </div>
        </div>
        <span className={`mt-2 inline-flex rounded-full border-2 border-ink px-2 py-0.5 text-[10px] font-bold ${
          snapshot.mode === 'linked' ? 'bg-teal-light text-ink' : snapshot.mode === 'idle' ? 'bg-coral/20 text-ink' : 'bg-sun-light text-ink'
        }`}>
          {modeLabel}
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-ink/15 px-2 py-1.5">
            <p className="font-display text-sm font-extrabold text-slate-100">{snapshot.streak}</p>
            <p className="text-[10px] text-slate-500">day streak</p>
          </div>
          <div className="rounded-lg border border-ink/15 px-2 py-1.5">
            <p className="font-display text-sm font-extrabold text-slate-100">{snapshot.lessonsThisWeek}</p>
            <p className="text-[10px] text-slate-500">lessons this week</p>
          </div>
        </div>
        <p className="mt-1.5 text-[10px] text-slate-500">Last activity: {snapshot.lastSynced}</p>
      </RailSection>

      <RailSection title="Recent updates">
        {snapshot.updates.length > 0 ? (
          <UpdateList items={snapshot.updates.slice(0, 3)} />
        ) : (
          <p className="text-[11px] leading-snug text-slate-500">
            No activity has synced yet. Once your child finishes a lesson, it will appear here.
          </p>
        )}
      </RailSection>

      <RailSection
        title="Story spotlight"
        action={
          <Link to="/parents/stories" className="text-[10px] font-bold text-coral hover:underline">
            All stories
          </Link>
        }>
        <Link
          to={`/parents/stories/${featured.id}`}
          className="block rounded-xl border-2 border-ink/15 p-2.5 transition-colors hover:border-ink hover:bg-sun/10">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-coral">
            <BookOpenIcon className="h-3 w-3" /> {featured.category}
          </p>
          <p className="mt-1 font-display text-[13px] font-bold leading-tight text-slate-100">{featured.title}</p>
          <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-400">{featured.summary}</p>
          <p className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-sky">
            {featured.readMins} min read <ArrowRightIcon className="h-3 w-3" />
          </p>
        </Link>
      </RailSection>

      <RailSection title="A small reminder">
        <p className="flex gap-2 text-[11px] leading-snug text-slate-400">
          <HeartHandshakeIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral" />
          {parentSupportTips[0]}
        </p>
        <a
          href="mailto:hello@imfundoquest.co.za?subject=Parent%20Corner%20question"
          className="btn-secondary mt-2 w-full !py-1.5 text-xs">
          <MailIcon className="h-3.5 w-3.5" /> Contact the school
        </a>
      </RailSection>
    </>
  );
}
