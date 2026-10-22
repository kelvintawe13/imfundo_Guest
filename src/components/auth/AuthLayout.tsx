import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeftIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, HouseIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Logo } from '../layout/Logo';
import { useLanguage } from '../../contexts/LanguageContext';
import { images } from '../../data/images';

const points = [
  'Progress saved on your phone, synced when possible',
  'Explanations in English and isiXhosa',
  'No data needed after install',
];

const authImages = [
  {
    src: images.hero,
    alt: 'Learner using a learning game on her phone',
    title: 'Learning that fits in your pocket.',
    description: 'Explore lessons and get help from your phone, wherever you are.',
  },
  {
    src: images.offline,
    alt: 'Learner studying offline on a phone',
    title: 'Keep learning offline.',
    description: 'Your lessons and tutor stay ready, even when the internet is not.',
  },
  {
    src: images.play,
    alt: 'A gamified learning lesson on a phone',
    title: 'Make progress one level at a time.',
    description: 'Short, game-like activities make it easier to stay motivated.',
  },
  {
    src: images.language,
    alt: 'Learners helping each other with a lesson',
    title: 'Learn in the language that helps.',
    description: 'Get explanations in English and isiXhosa when you need them.',
  },
  {
    src: images.teacher,
    alt: 'Teacher supporting learners in the classroom',
    title: 'Learning works better together.',
    description: 'Teachers can support learning with resources made for the classroom.',
  },
  {
    src: images.group,
    alt: 'Learners studying together',
    title: 'Grow your confidence together.',
    description: 'Build understanding with lessons you can revisit at your own pace.',
  },
];

export function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeImage, setActiveImage] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const moveImage = (direction: -1 | 1) => {
    setSlideDirection(direction);
    setActiveImage((current) => (current + direction + authImages.length) % authImages.length);
  };

  useEffect(() => {
    if (shouldReduceMotion) return;

    const intervalId = window.setInterval(() => {
      moveImage(1);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

  return (
    <div className="theme-light grid min-h-screen w-full bg-cream text-ink lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex min-w-0 flex-col px-4 py-4 sm:px-6 lg:px-10">
        <nav className="flex items-center justify-between gap-3" aria-label="Authentication navigation">
          <Link to="/" aria-label="Imfundo Quest home" className="shrink-0">
            <Logo tone="ink" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (location.key === 'default') {
                  navigate('/');
                  return;
                }
                navigate(-1);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-white px-3 py-1.5 font-display text-xs font-bold transition-colors hover:bg-sun-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {t('common.back')}
            </button>
            <Link
              to="/"
              aria-label={t('nav.home')}
              className="grid h-8 w-8 place-items-center rounded-full border-2 border-ink bg-white transition-colors hover:bg-sun-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              <HouseIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </nav>

        <main className="flex flex-1 items-center justify-center py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, scale: 0.99 }}
              transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-md"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        <p className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-soft">
          <span>University project prototype · © 2026 Imfundo Quest</span>
          <Link to="/contact" className="font-semibold transition-colors hover:text-coral">
            Need help?
          </Link>
        </p>
      </div>

      <aside className="relative hidden min-w-0 overflow-hidden border-l-2 border-ink bg-sky-light lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border-2 border-ink bg-sun/70" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-2 border-ink bg-teal/50" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="relative flex max-w-md flex-col items-center text-center"
        >
          <div
            className="w-full overflow-hidden rounded-2xl border-2 border-ink bg-white p-3 shadow-pop"
            role="group"
            aria-roledescription="carousel"
            aria-label="Imfundo Quest learning images"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.img
                  key={authImages[activeImage].src}
                  src={authImages[activeImage].src}
                  alt={authImages[activeImage].alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  custom={slideDirection}
                  variants={{
                    enter: (direction: number) => ({
                      opacity: 0,
                      x: shouldReduceMotion ? 0 : direction * 80,
                    }),
                    center: { opacity: 1, x: 0 },
                    exit: (direction: number) => ({
                      opacity: 0,
                      x: shouldReduceMotion ? 0 : direction * -80,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => moveImage(-1)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-white transition-colors hover:bg-sun focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="flex justify-center gap-2" role="group" aria-label="Choose an image">
                {authImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    aria-label={`Show image ${index + 1}: ${image.alt}`}
                    aria-current={index === activeImage ? 'true' : undefined}
                    onClick={() => {
                      setSlideDirection(index >= activeImage ? 1 : -1);
                      setActiveImage(index);
                    }}
                    className={`h-2.5 w-2.5 rounded-full border border-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
                      index === activeImage ? 'bg-coral' : 'bg-white hover:bg-sun'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => moveImage(1)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-white transition-colors hover:bg-sun focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 min-h-32">
            <AnimatePresence mode="wait" custom={slideDirection}>
              <motion.div
                key={authImages[activeImage].src}
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : slideDirection * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : slideDirection * -24 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-display text-3xl font-extrabold leading-tight">
                  {authImages[activeImage].title}
                </h2>
                <p className="mt-3 text-sm text-ink-soft">{authImages[activeImage].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <ul className="mt-5 space-y-3 text-left">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm font-semibold">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-ink bg-sun">
                  <CheckIcon className="h-3 w-3 text-ink" aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      </aside>
    </div>
  );
}
