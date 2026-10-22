import { GraduationCapIcon, HomeIcon, PresentationIcon, TargetIcon } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { StatsBand } from '../components/home/StatsBand';
import { FounderStory } from '../components/home/FounderStory';
import { CtaBand } from '../components/CtaBand';
import { stakeholders } from '../data/site';
import { images } from '../data/images';

const tierIcons = [GraduationCapIcon, PresentationIcon, HomeIcon];
const tierColors = ['bg-coral', 'bg-teal', 'bg-sky'];

const beliefs = [
  {
    title: 'Offline is the starting point',
    text: 'We design for no data, low battery and shared devices, then add connectivity as a bonus.',
  },
  {
    title: 'Learning should feel like play',
    text: 'Short lessons, points and levels turn study time into something learners want to return to.',
  },
  {
    title: 'Local language, local context',
    text: 'Explanations move between isiXhosa and English so learners are never lost in translation.',
  },
];

export function About() {
  return (
    <>
      <PageHero
        tone="About us"
        title="A tutor for the learners the internet left behind"
        subtitle="Imfundo Quest started with one simple observation: learners have phones, but they do not always have data, Wi-Fi or steady power. We build for that reality."
        image={images.landscape}
        imageAlt="Cartoon landscape of the rural Eastern Cape with a school in the distance"
      />

      <StatsBand />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-12">
          <div>
            <p className="inline-flex items-center gap-2 font-display text-sm font-bold text-coral">
              <TargetIcon className="h-4 w-4" aria-hidden="true" /> Our mission
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl">
              Make modern learning available without modern connectivity
            </h2>
            <p className="mt-4 text-sm text-ink-soft sm:text-base">
              In 2023, only 1.6% of Eastern Cape households had access to public Wi-Fi, the lowest of all provinces.
              For a Grade 11 learner in Idutywa, that can mean no research, no video lessons and no one to ask when a
              maths problem does not make sense.
            </p>
            <p className="mt-3 text-sm text-ink-soft sm:text-base">
              Imfundo Quest puts a gamified AI tutor and a library of micro-lessons directly on the phone. Content is
              packed once at a school hotspot, then works anywhere, any time, without a signal.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border-2 border-ink shadow-pop">
            <img
              src={images.story}
              alt="Cartoon rural classroom with old textbooks during load shedding"
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-ink bg-teal-light">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">What we believe</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {beliefs.map((belief, i) => (
              <div key={belief.title} className="rounded-2xl border-2 border-ink bg-white p-5">
                <span className={`grid h-10 w-10 place-items-center rounded-xl border-2 border-ink ${tierColors[i]}`}>
                  <span className="font-display text-sm font-extrabold">{i + 1}</span>
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{belief.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{belief.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <h2 className="max-w-2xl font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Who the digital divide leaves behind
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {stakeholders.map((s, i) => {
              const Icon = tierIcons[i];
              return (
                <li key={s.who} className="rounded-2xl border-2 border-ink bg-cream p-5">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl border-2 border-ink ${tierColors[i]}`}>
                    <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold">{s.who}</p>
                  <p className="font-display text-xs font-bold uppercase tracking-wide text-ink-soft">
                    {s.tier} stakeholders
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <FounderStory />
      <CtaBand />
    </>
  );
}
