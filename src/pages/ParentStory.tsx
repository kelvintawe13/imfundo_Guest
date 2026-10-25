import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
  CheckIcon,
  Clock3Icon,
  LightbulbIcon,
  Share2Icon,
  UsersIcon
} from 'lucide-react';
import { StoryCard } from '../components/parent/StoryCard';
import { learningStories, type StoryAccent } from '../data/parent';

const accentClass: Record<StoryAccent, string> = {
  sun: 'bg-sun-light',
  teal: 'bg-teal-light',
  sky: 'bg-sky-light',
  coral: 'bg-coral/20'
};

export function ParentStory() {
  const { storyId } = useParams<{ storyId: string }>();
  const story = learningStories.find((item) => item.id === storyId);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    document.querySelector<HTMLElement>('main')?.scrollTo({ top: 0, behavior: 'instant' });
    setShared(false);
  }, [storyId]);

  if (!story) {
    return <Navigate to="/parents/stories" replace />;
  }

  const related = [
    ...learningStories.filter((item) => item.id !== story.id && item.category === story.category),
    ...learningStories.filter((item) => item.id !== story.id && item.category !== story.category)
  ].slice(0, 3);

  const shareStory = async () => {
    const url = window.location.href;
    const payload = {
      title: story.title,
      text: story.summary,
      url
    };

    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        // A cancelled share sheet is not an error worth showing; other share failures fall through to the clipboard.
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.warn('The share sheet is unavailable; trying the clipboard instead.', error);
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 2500);
    } catch (error) {
      console.warn('Unable to copy this story link.', error);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
      <nav className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500" aria-label="Breadcrumb">
        <Link to="/parents" className="hover:text-sun">
          Parent Corner
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/parents/stories" className="hover:text-sun">
          Learning stories
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-300">{story.category}</span>
      </nav>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <Link to="/parents/stories" className="btn-secondary !py-1.5 text-xs">
          <ArrowLeftIcon className="h-3.5 w-3.5" /> All stories
        </Link>
        <button type="button" onClick={() => void shareStory()} className="btn-secondary !py-1.5 text-xs">
          {shared ? <CheckIcon className="h-3.5 w-3.5 text-teal" /> : <Share2Icon className="h-3.5 w-3.5" />}
          {shared ? 'Link copied' : 'Share this story'}
        </button>
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.45fr_1fr]">
        <article className={`rounded-2xl border-2 border-ink p-4 text-ink shadow-pop sm:p-5 ${accentClass[story.accent]}`}>
          <header>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-ink/30 bg-white/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
                {story.category}
              </span>
              {story.featured && (
                <span className="rounded-full border border-ink/30 bg-coral/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide">
                  Featured story
                </span>
              )}
            </div>
            <h1 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{story.title}</h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-soft">{story.summary}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold text-ink-soft">
              <span className="flex items-center gap-1">
                <Clock3Icon className="h-3 w-3" /> {story.readMins} min read
              </span>
              <span className="flex items-center gap-1">
                <UsersIcon className="h-3 w-3" /> {story.author}
              </span>
            </div>
          </header>

          <div className="mt-4 space-y-4 border-t-2 border-ink/15 pt-4">
            {story.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-lg font-extrabold leading-tight">{section.heading}</h2>
                <div className="mt-1.5 space-y-2">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-ink-soft">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <footer className="mt-4 flex flex-col gap-2 border-t-2 border-ink/15 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] font-semibold text-ink-soft">
              Written by {story.author} for the Imfundo Quest prototype.
            </p>
            <Link to="/parents/stories" className="btn-primary self-start !py-1.5 text-xs sm:self-auto">
              More learning stories <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          </footer>
        </article>

        <aside className="space-y-3">
          <section className="glass-card p-3" aria-labelledby="try-this-title">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg border-2 border-ink bg-sun text-ink">
                <LightbulbIcon className="h-4 w-4" />
              </span>
              <div>
                <h2 id="try-this-title" className="font-display text-sm font-extrabold text-slate-100">
                  Try this at home
                </h2>
                <p className="text-[10px] text-slate-500">Small ideas, no extra resources needed.</p>
              </div>
            </div>
            <ul className="mt-2 space-y-1.5">
              {story.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 rounded-lg border-2 border-ink/15 p-2 text-[11px] leading-snug text-slate-300">
                  <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal" />
                  {tip}
                </li>
              ))}
            </ul>
          </section>

          <section className="glass-card p-3" aria-labelledby="parent-note-title">
            <h2 id="parent-note-title" className="font-display text-sm font-extrabold text-slate-100">
              A note for parents
            </h2>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
              You do not need to be a subject expert to help. Asking one curious question, protecting a short study slot,
              or listening without judgement is already useful support.
            </p>
            <Link to="/parents" className="btn-secondary mt-2 w-full !py-1.5 text-xs">
              <BookOpenIcon className="h-3.5 w-3.5" /> See your child’s progress
            </Link>
          </section>
        </aside>
      </div>

      <section className="mt-8" aria-labelledby="related-stories-title">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="related-stories-title" className="font-display text-lg font-extrabold text-slate-100">
              Keep reading
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-500">More practical ideas for learning at home.</p>
          </div>
          <Link to="/parents/stories" className="btn-secondary !py-1.5 text-xs">
            All stories <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-2 grid gap-2 md:grid-cols-3">
          {related.map((item) => (
            <StoryCard key={item.id} story={item} />
          ))}
        </div>
      </section>

      <p className="mt-3 text-[11px] leading-snug text-slate-500">
        Learning stories are general guidance for the prototype, not medical or psychological advice. If you are worried
        about your child’s wellbeing, speak to the school or a health professional.
      </p>
    </div>
  );
}
