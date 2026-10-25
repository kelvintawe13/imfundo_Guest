import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  BellIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  CircleHelpIcon,
  FlameIcon,
  HeartHandshakeIcon,
  LinkIcon,
  MailIcon,
  SparklesIcon,
  TargetIcon,
  UsersIcon
} from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';
import { StoryCard } from '../components/parent/StoryCard';
import { learningStories, parentSupportTips } from '../data/parent';
import { updateChildEmail, useAuth } from '../utils/auth';
import { useParentSnapshot } from '../utils/parentData';

export function ParentCorner() {
  const account = useAuth();
  const snapshot = useParentSnapshot();
  const [doneTips, setDoneTips] = useState<number[]>([]);
  const [linkOpen, setLinkOpen] = useState(false);
  const [childEmailDraft, setChildEmailDraft] = useState(account?.childEmail ?? '');
  const [linkError, setLinkError] = useState('');
  const [linkNotice, setLinkNotice] = useState('');

  const openLinkForm = () => {
    setChildEmailDraft(account?.childEmail ?? '');
    setLinkError('');
    setLinkNotice('');
    setLinkOpen(true);
  };

  const saveLink = (event: React.FormEvent) => {
    event.preventDefault();
    const result = updateChildEmail(childEmailDraft);
    if (!result.ok) {
      setLinkError(result.error);
      return;
    }
    setLinkError('');
    setLinkOpen(false);
    setLinkNotice('Linked learner updated. Live progress appears when that learner has activity on this device.');
  };
  const first = snapshot.childName.trim().split(/\s+/)[0] || 'your child';
  const maxMinutes = Math.max(1, ...snapshot.weekly.map((day) => day.minutes));
  const totalMinutes = snapshot.weekly.reduce((total, day) => total + day.minutes, 0);
  const stories = [
    ...learningStories.filter((story) => story.featured),
    ...learningStories.filter((story) => !story.featured)
  ].slice(0, 3);

  const stats = [
    {
      label: 'Day streak',
      value: snapshot.streak,
      detail: snapshot.streak > 0 ? 'Keep the habit going' : 'Start with one short lesson',
      icon: FlameIcon,
      color: 'bg-sun'
    },
    {
      label: 'Lessons this week',
      value: snapshot.lessonsThisWeek,
      detail: 'Short sessions count',
      icon: BookOpenIcon,
      color: 'bg-teal'
    },
    {
      label: 'Questions answered',
      value: snapshot.questionsAnswered,
      detail: 'Across all lessons',
      icon: CircleHelpIcon,
      color: 'bg-sky'
    },
    {
      label: 'Average accuracy',
      value: `${snapshot.accuracy}%`,
      detail: snapshot.accuracy > 0 ? 'From completed practice' : 'No answers yet',
      icon: TargetIcon,
      color: 'bg-coral'
    }
  ];

  const modeStyle =
    snapshot.mode === 'linked'
      ? 'border-ink bg-teal-light text-ink'
      : snapshot.mode === 'idle'
        ? 'border-ink bg-coral/20 text-ink'
        : 'border-ink bg-sun-light text-ink';

  const modeTitle =
    snapshot.mode === 'linked'
      ? `Live progress for ${snapshot.childName}`
      : snapshot.mode === 'idle'
        ? `${snapshot.childName} is linked, but has no activity yet`
        : 'Demo preview of a linked learner';

  const modeText =
    snapshot.mode === 'linked'
      ? `Progress is read from ${snapshot.childName}'s learner account on this device. Last activity: ${snapshot.lastSynced}.`
      : snapshot.mode === 'idle'
        ? 'Once your child completes a lesson on this device, their progress will appear here automatically.'
        : 'This is a sample learner so you can explore the corner. Create a learner account on this device, then sign up as a parent with that learner email to see live progress.';

  return (
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-display text-sm font-bold text-sky-dark">
            <HeartHandshakeIcon className="h-3.5 w-3.5" /> Parent Corner · weekly update
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
            Supporting {first} at home
          </h1>
          <p className="mt-0.5 max-w-2xl text-xs leading-relaxed text-slate-400">
            See what your child is working on, celebrate the small wins and find practical ways to help without taking
            over the homework.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2 self-start sm:self-auto">
          <Link to="/parents/stories" className="btn-secondary !py-1.5 text-xs">
            <BookOpenIcon className="h-3.5 w-3.5" /> Learning stories
          </Link>
          <a href="mailto:hello@imfundoquest.co.za?subject=Parent%20Corner%20question" className="btn-primary !py-1.5 text-xs">
            <MailIcon className="h-3.5 w-3.5" /> Ask the school
          </a>
        </div>
      </header>

      <section className={`mt-3 flex items-start gap-2.5 rounded-2xl border-2 p-3 ${modeStyle}`} aria-label="Linked learner status">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-ink bg-white/60 text-ink">
          <UsersIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-extrabold">{modeTitle}</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-soft">{modeText}</p>
          {snapshot.linkedEmail && (
            <p className="mt-1 text-[10px] font-semibold text-ink-soft">Linked email: {snapshot.linkedEmail}</p>
          )}

          {account?.role === 'parent' && (
            <div className="mt-2 border-t-2 border-ink/15 pt-2">
              {linkOpen ? (
                <form onSubmit={saveLink} className="flex flex-col gap-1.5 sm:flex-row sm:items-start">
                  <label className="min-w-0 flex-1">
                    <span className="sr-only">Learner email</span>
                    <input
                      type="email"
                      autoComplete="off"
                      value={childEmailDraft}
                      onChange={(event) => {
                        setChildEmailDraft(event.target.value);
                        setLinkError('');
                      }}
                      placeholder="learner@example.com"
                      className="w-full rounded-xl border-2 border-ink bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-ink outline-none placeholder:text-ink/40 focus:ring-2 focus:ring-sky"
                    />
                  </label>
                  <div className="flex shrink-0 gap-1.5">
                    <button type="submit" className="btn-primary !px-3 !py-1 text-[11px]">
                      Save link
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkOpen(false);
                        setLinkError('');
                      }}
                      className="btn-secondary !px-3 !py-1 text-[11px]">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={openLinkForm}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-ink-soft underline decoration-dotted underline-offset-2 hover:text-ink">
                  <LinkIcon className="h-3 w-3" />
                  {account.childEmail ? 'Change linked learner' : 'Link a learner account'}
                </button>
              )}
              {linkError && (
                <p role="alert" className="mt-1 rounded-lg border-2 border-danger/40 bg-white/60 px-2 py-1 text-[10px] font-semibold text-danger">
                  {linkError}
                </p>
              )}
              {linkNotice && (
                <p role="status" className="mt-1 text-[10px] font-semibold text-ink-soft">
                  {linkNotice}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {stats.map(({ label, value, detail, icon: Icon, color }) => (
          <div key={label} className="glass-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-1 font-display text-2xl font-extrabold text-slate-100">{value}</p>
              </div>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-ink ${color} text-ink`}>
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-1 text-[10px] text-slate-500">{detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3">
          <section className="glass-card p-3" aria-labelledby="rhythm-title">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 id="rhythm-title" className="font-display text-base font-extrabold text-slate-100">Learning rhythm</h2>
                <p className="mt-0.5 text-[11px] text-slate-500">Minutes of practice over the last seven days.</p>
              </div>
              <p className="text-[11px] font-semibold text-teal">{totalMinutes} min this week</p>
            </div>

            <div className="mt-3 flex h-32 items-end gap-1.5 sm:gap-2" aria-label="Weekly learning minutes chart">
              {snapshot.weekly.map((day, index) => {
                const height = day.minutes > 0 ? Math.max(10, Math.round(day.minutes / maxMinutes * 100)) : 3;
                return (
                  <div key={`${day.label}-${index}`} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                    <span className="text-[9px] font-bold text-slate-500">{day.minutes > 0 ? `${day.minutes}m` : ''}</span>
                    <div className="flex h-20 w-full items-end justify-center">
                      <div
                        className={`w-full max-w-9 rounded-t-md border-2 border-ink ${day.minutes > 0 ? 'bg-teal' : 'bg-slate-800'}`}
                        style={{ height: `${height}%` }}
                        title={`${day.label}: ${day.minutes} minutes, ${day.lessons} lessons`}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400">{day.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2 border-t-2 border-ink/10 pt-2">
              <div>
                <p className="font-display text-sm font-extrabold text-slate-100">{snapshot.weekly.reduce((total, day) => total + day.lessons, 0)}</p>
                <p className="text-[10px] text-slate-500">lessons</p>
              </div>
              <div>
                <p className="font-display text-sm font-extrabold text-slate-100">{snapshot.weekly.reduce((total, day) => total + day.questions, 0)}</p>
                <p className="text-[10px] text-slate-500">questions</p>
              </div>
              <div>
                <p className="font-display text-sm font-extrabold text-slate-100">{snapshot.lastSynced}</p>
                <p className="text-[10px] text-slate-500">last activity</p>
              </div>
            </div>
          </section>

          <section className="glass-card p-3" aria-labelledby="updates-title">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 id="updates-title" className="font-display text-base font-extrabold text-slate-100">Recent updates</h2>
                <p className="mt-0.5 text-[11px] text-slate-500">What {first} has been working on.</p>
              </div>
              <BellIcon className="h-4 w-4 shrink-0 text-coral" />
            </div>
            {snapshot.updates.length > 0 ? (
              <ol className="mt-3 space-y-3 border-l-2 border-ink/15 pl-3.5">
                {snapshot.updates.map((update) => (
                  <li key={update.id} className="relative">
                    <span className="absolute -left-[19px] top-1.5 h-1.5 w-1.5 rounded-full border border-ink bg-coral" />
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <p className="font-display text-[13px] font-bold leading-tight text-slate-100">{update.title}</p>
                      <span className="text-[10px] text-slate-500">{update.when}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-snug text-slate-400">{update.text}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="mt-2">
                <EmptyState
                  compact
                  icon={BellIcon}
                  title="No updates yet"
                  description="When a lesson is completed, the update will appear here."
                />
              </div>
            )}
          </section>

          <section className="glass-card p-3" aria-labelledby="subjects-title">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 id="subjects-title" className="font-display text-base font-extrabold text-slate-100">Subject snapshot</h2>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {snapshot.mode === 'linked'
                    ? 'Live progress currently covers Mathematics. Other subjects will appear as they are added.'
                    : 'Sample subject mix for the pilot.'}
                </p>
              </div>
            </div>
            <ul className="mt-2 space-y-2.5">
              {snapshot.subjects.map((subject) => (
                <li key={subject.subject}>
                  <div className="flex justify-between gap-2 text-xs">
                    <span className="min-w-0 truncate font-semibold text-slate-300">{subject.subject}</span>
                    <span className="shrink-0 font-bold tabular-nums text-slate-400">
                      {subject.mastery > 0 ? `${subject.mastery}%` : 'Not started'}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full border border-ink/30 bg-slate-950/40">
                    <div className={`h-full rounded-full ${subject.color}`} style={{ width: `${subject.mastery}%` }} />
                  </div>
                  <p className="mt-0.5 text-[10px] text-slate-500">{subject.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-3">
          <section className="glass-card p-3" aria-labelledby="focus-title">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg border-2 border-ink bg-sun text-ink">
                <SparklesIcon className="h-4 w-4" />
              </span>
              <div>
                <h2 id="focus-title" className="font-display text-sm font-extrabold text-slate-100">How to help this week</h2>
                <p className="text-[10px] text-slate-500">Small actions, no extra data needed.</p>
              </div>
            </div>
            <ul className="mt-2 space-y-1.5">
              {parentSupportTips.map((tip, index) => {
                const done = doneTips.includes(index);
                return (
                  <li key={tip}>
                    <button
                      type="button"
                      onClick={() =>
                        setDoneTips((current) =>
                          current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
                        )
                      }
                      aria-pressed={done}
                      className={`flex w-full items-start gap-2 rounded-lg border-2 p-2 text-left transition-colors ${
                        done ? 'border-ink bg-teal-light text-ink' : 'border-ink/15 text-slate-300 hover:border-ink hover:bg-sun/10'
                      }`}>
                      <CheckCircle2Icon className={`mt-0.5 h-4 w-4 shrink-0 ${done ? 'text-ink' : 'text-slate-500'}`} />
                      <span className="text-[11px] leading-snug">{tip}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-1.5 text-[10px] text-slate-500">
              {doneTips.length} of {parentSupportTips.length} tried this week
            </p>
          </section>

          <section className="glass-card p-3" aria-labelledby="teacher-note-title">
            <div className="flex items-center justify-between gap-2">
              <h2 id="teacher-note-title" className="font-display text-sm font-extrabold text-slate-100">Teacher note</h2>
              <span className="rounded-full border border-ink/25 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                Sample
              </span>
            </div>
            <blockquote className="mt-2 border-l-2 border-coral pl-2.5 text-[12px] italic leading-relaxed text-slate-300">
              {snapshot.teacherNote}
            </blockquote>
            <p className="mt-1.5 text-[10px] font-semibold text-slate-500">{snapshot.teacherName}</p>
            <a
              href="mailto:hello@imfundoquest.co.za?subject=Parent%20Corner%20question"
              className="btn-secondary mt-2 w-full !py-1.5 text-xs">
              <MailIcon className="h-3.5 w-3.5" /> Contact the teacher
            </a>
          </section>

          <section className="glass-card p-3" aria-labelledby="spotlight-title">
            <div className="flex items-end justify-between gap-2">
              <div>
                <h2 id="spotlight-title" className="font-display text-sm font-extrabold text-slate-100">Story spotlight</h2>
                <p className="text-[10px] text-slate-500">Ideas for learning at home.</p>
              </div>
              <Link to="/parents/stories" className="flex items-center gap-1 text-[10px] font-bold text-coral hover:underline">
                All stories <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </div>
            <div className="mt-2 space-y-2">
              {stories.slice(0, 2).map((story) => (
                <Link
                  key={story.id}
                  to={`/parents/stories/${story.id}`}
                  className="block rounded-xl border-2 border-ink/15 p-2.5 transition-colors hover:border-ink hover:bg-sun/10">
                  <p className="text-[9px] font-bold uppercase tracking-wide text-coral">{story.category}</p>
                  <p className="mt-0.5 font-display text-[13px] font-bold leading-tight text-slate-100">{story.title}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500">{story.readMins} min read</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="mt-3" aria-labelledby="stories-title">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="stories-title" className="font-display text-lg font-extrabold text-slate-100">Learning stories for families</h2>
            <p className="mt-0.5 text-[11px] text-slate-500">
              Evidence-informed ideas on how children learn, written for busy parents and guardians.
            </p>
          </div>
          <Link to="/parents/stories" className="btn-secondary !py-1.5 text-xs">
            Browse all stories <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-2 grid gap-2 md:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      <p className="mt-3 text-[11px] leading-snug text-slate-500">
        Progress is stored on this device. Parent Corner only reads a linked learner’s data when both accounts exist in
        this browser. Teacher notes and subject mixes are sample data in this prototype.
      </p>
    </div>
  );
}
