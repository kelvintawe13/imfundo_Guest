import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon, Clock3Icon, SearchIcon } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';
import { StoryCard } from '../components/parent/StoryCard';
import { learningStories, storyCategories } from '../data/parent';

export function ParentStories() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All stories');
  const search = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      learningStories.filter((story) => {
        const matchesCategory = category === 'All stories' || story.category === category;
        const matchesSearch =
          !search ||
          `${story.title} ${story.summary} ${story.category} ${story.author}`.toLowerCase().includes(search);
        return matchesCategory && matchesSearch;
      }),
    [category, search]
  );

  const featured = !search && category === 'All stories' ? learningStories.find((story) => story.featured) : null;
  const gridStories = featured ? visible.filter((story) => story.id !== featured.id) : visible;

  return (
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-display text-sm font-bold text-sky-dark">
            <BookOpenIcon className="h-3.5 w-3.5" /> Parent Corner · learning stories
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Learning stories for families</h1>
          <p className="mt-0.5 max-w-2xl text-xs leading-relaxed text-slate-400">
            Practical, evidence-informed reads on how children learn — and what you can do at home, even on a busy day.
          </p>
        </div>
        <Link to="/parents" className="btn-secondary shrink-0 self-start !py-1.5 text-xs sm:self-auto">
          <ArrowLeftIcon className="h-3.5 w-3.5" /> Parent Corner
        </Link>
      </header>

      {featured && (
        <section className="mt-3" aria-labelledby="featured-story-title">
          <Link
            to={`/parents/stories/${featured.id}`}
            className="group flex flex-col gap-2 rounded-2xl border-2 border-ink bg-sun-light p-4 text-ink shadow-pop transition-transform duration-150 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <span className="rounded-full border border-ink/30 bg-white/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
                Featured · {featured.category}
              </span>
              <h2 id="featured-story-title" className="mt-2 font-display text-xl font-extrabold leading-tight sm:text-2xl">
                {featured.title}
              </h2>
              <p className="mt-1 max-w-2xl text-xs leading-relaxed text-ink-soft">{featured.summary}</p>
              <p className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-ink-soft">
                <Clock3Icon className="h-3 w-3" /> {featured.readMins} min read · {featured.author}
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-1 self-start rounded-full border-2 border-ink bg-white px-3 py-1.5 font-display text-xs font-bold transition-transform group-hover:translate-x-0.5 sm:self-auto">
              Read the story <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
          </Link>
        </section>
      )}

      <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-xs">
          <span className="sr-only">Search learning stories</span>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search stories"
            className="field !mt-0 !py-2 !pl-9"
          />
        </label>
        <div className="flex gap-1 overflow-x-auto" role="tablist" aria-label="Filter stories by topic">
          {storyCategories.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full border-2 px-2.5 py-1 text-[11px] font-bold transition-colors ${
                category === item
                  ? 'border-ink bg-sun text-ink shadow-pop-sm'
                  : 'border-transparent text-slate-400 hover:border-ink hover:bg-sun-light hover:text-ink'
              }`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      {gridStories.length > 0 ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {gridStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <EmptyState
            icon={BookOpenIcon}
            title="No stories match that search"
            description="Try another topic or clear the search to see every story."
            action={
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('All stories');
                }}
                className="btn-primary !py-1.5 text-xs">
                Show all stories
              </button>
            }
          />
        </div>
      )}

      <p className="mt-3 text-[11px] leading-snug text-slate-500">
        These stories are written for the Imfundo Quest prototype. They are general guidance, not medical or
        psychological advice.
      </p>
    </div>
  );
}
