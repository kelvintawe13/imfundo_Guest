import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { images } from '../data/images';

type CtaBandProps = {
  title?: string;
  text?: string;
};

export function CtaBand({
  title = 'Want to bring Imfundo Quest to your school?',
  text = 'We are looking for partner schools in Idutywa for our first pilot.',
}: CtaBandProps) {
  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-2xl border-2 border-ink bg-coral px-5 py-8 shadow-pop sm:flex-row sm:px-8">
        <img
          src={images.mascot}
          alt="Imfundo Quest's robot tutor mascot waving"
          className="h-24 w-24 shrink-0 rounded-full border-2 border-ink bg-white object-cover sm:h-28 sm:w-28"
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-display text-xl font-extrabold leading-tight sm:text-2xl">{title}</h2>
          <p className="mt-2 text-sm font-semibold text-ink line-clamp-2">{text}</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-ink bg-ink px-5 py-2.5 font-display text-sm font-bold text-white transition-transform duration-150 hover:-translate-y-0.5"
        >
          Contact us <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
