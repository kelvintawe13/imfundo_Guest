import { CalculatorIcon, FlaskConicalIcon, LanguagesIcon, MonitorIcon } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { HowItWorks } from '../components/home/HowItWorks';
import { WhySection } from '../components/home/WhySection';
import { CtaBand } from '../components/CtaBand';
import { images } from '../data/images';

const subjects = [
  {
    title: 'Mathematics',
    text: 'Worked examples, practice sets and step-by-step hints for Grades 10 to 12.',
    image: images.maths,
    alt: 'Cartoon learner solving a maths problem on a chalkboard',
    icon: CalculatorIcon,
    color: 'bg-sun',
  },
  {
    title: 'Physical Sciences',
    text: 'Short explanations and quizzes that make experiments and formulas stick.',
    image: images.science,
    alt: 'Cartoon learner doing a science experiment with test tubes',
    icon: FlaskConicalIcon,
    color: 'bg-teal',
  },
  {
    title: 'Computer Literacy',
    text: 'Digital skills practised on a phone, with no lab or desktop required.',
    image: images.computer,
    alt: 'Cartoon learner learning computer skills on a phone',
    icon: MonitorIcon,
    color: 'bg-sky',
  },
  {
    title: 'English',
    text: 'Reading, comprehension and writing support that switches between isiXhosa and English.',
    image: images.language,
    alt: 'Two cartoon learners explaining a problem to each other over a textbook',
    icon: LanguagesIcon,
    color: 'bg-coral',
  },
];

export function Programmes() {
  return (
    <>
      <PageHero
        tone="Programmes"
        title="One app. Four subjects. Zero data."
        subtitle="Imfundo Quest packs micro-lessons, practice quizzes and an offline AI tutor onto the phone a learner already owns."
        image={images.offline}
        imageAlt="Cartoon learner studying on a phone by candlelight during load shedding"
      />

      <HowItWorks />
      <WhySection />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-12">
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">What learners can study</h2>
            <p className="mt-3 text-sm text-ink-soft sm:text-base">
              Every pack is built for a 3 to 5 minute session and works entirely on the device after the first sync.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {subjects.map(({ title, text, image, alt, icon: Icon, color }) => (
              <article key={title} className="flex gap-4 rounded-2xl border-2 border-ink bg-cream p-4">
                <img
                  src={image}
                  alt={alt}
                  className="h-24 w-24 shrink-0 rounded-xl border-2 border-ink object-cover"
                  loading="lazy"
                />
                <div>
                  <span className={`grid h-8 w-8 place-items-center rounded-lg border-2 border-ink ${color}`}>
                    <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold">{title}</h3>
                  <p className="mt-0.5 text-sm text-ink-soft">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Bring the pilot to your school"
        text="We are partnering with high schools in Idutywa for the first 2026 pilot. No data costs for learners."
      />
    </>
  );
}
