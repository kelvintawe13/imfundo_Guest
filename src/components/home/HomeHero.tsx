import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPinIcon, StarIcon, WifiOffIcon } from 'lucide-react';
import { HillsDivider } from '../HillsDivider';
import { images } from '../../data/images';

const ease = [0.23, 1, 0.32, 1] as const;

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-sky-light">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }}>
          <p className="inline-flex items-center gap-2 font-display text-sm font-bold text-sky-dark">
            <MapPinIcon className="h-4 w-4" aria-hidden="true" /> Offline learning for Idutywa
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Learning that works, even when <span className="marker">the internet doesn't.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-ink-soft sm:text-base line-clamp-3 sm:line-clamp-none">
            A game-like AI tutor app that helps rural Eastern Cape learners in Grades 10 to 12 access modern
            educational material, with no data or Wi-Fi needed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/programmes"
              className="rounded-full border-2 border-ink bg-sun px-5 py-2.5 font-display text-sm font-bold shadow-pop-sm transition-transform duration-150 hover:-translate-y-0.5"
            >
              See how it works
            </Link>
            <Link
              to="/teachers"
              className="rounded-full border-2 border-ink bg-white px-5 py-2.5 font-display text-sm font-bold transition-colors duration-150 hover:bg-sun-light"
            >
              For teachers
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease, delay: 0.08 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-pop">
            <img
              src={images.hero}
              alt="Cartoon Grade 11 learner in school uniform smiling at a learning game on her phone in an Eastern Cape schoolyard"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -left-2 top-4 flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-2 py-1.5 font-display text-xs font-bold shadow-pop-sm sm:-left-4">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-teal">
              <WifiOffIcon className="h-3 w-3 text-ink" aria-hidden="true" />
            </span>
            <span className="truncate">Offline mode</span>
          </div>
          <div className="absolute -right-2 bottom-8 flex items-center gap-2 rounded-xl border-2 border-ink bg-sun px-2 py-1.5 font-display text-xs font-bold shadow-pop-sm sm:-right-4">
            <StarIcon className="h-4 w-4 fill-coral text-ink" aria-hidden="true" />
            <span className="truncate">+50 XP · Level 4</span>
          </div>
          <img
            src={images.mascot}
            alt=""
            className="absolute -bottom-6 left-4 hidden h-16 w-16 rounded-full border-2 border-ink bg-white object-cover sm:block"
          />
        </motion.div>
      </div>
      <HillsDivider fill="#FFC93C" />
    </section>
  );
}
