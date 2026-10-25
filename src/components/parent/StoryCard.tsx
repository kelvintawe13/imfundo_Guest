import { Link } from 'react-router-dom';
import { ArrowRightIcon, Clock3Icon } from 'lucide-react';
import type { LearningStory, StoryAccent } from '../../data/parent';

const accentClass: Record<StoryAccent, string> = {
  sun: 'bg-sun-light',
  teal: 'bg-teal-light',
  sky: 'bg-sky-light',
  coral: 'bg-coral/20'
};

export function StoryCard({ story }: { story: LearningStory }) {
  return (
    <Link
      to={`/parents/stories/${story.id}`}
      className={`group flex h-full flex-col rounded-2xl border-2 border-ink p-3 text-ink shadow-pop-sm transition-transform duration-150 hover:-translate-y-0.5 ${accentClass[story.accent]}`}>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-full border border-ink/30 bg-white/50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
          {story.category}
        </span>
        {story.featured && (
          <span className="rounded-full border border-ink/30 bg-coral/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
            Featured
          </span>
        )}
      </div>
      <h3 className="mt-2 font-display text-base font-extrabold leading-tight">{story.title}</h3>
      <p className="mt-1 line-clamp-3 flex-1 text-xs leading-relaxed text-ink-soft">{story.summary}</p>
      <div className="mt-2 flex items-center justify-between gap-2 border-t border-ink/15 pt-2 text-[10px] font-bold">
        <span className="flex items-center gap-1 text-ink-soft">
          <Clock3Icon className="h-3 w-3" /> {story.readMins} min read
        </span>
        <span className="flex items-center gap-1 text-coral transition-transform group-hover:translate-x-0.5">
          Read story <ArrowRightIcon className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
