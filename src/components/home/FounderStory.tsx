import React from 'react';
import { Link } from 'react-router-dom';
import { Illustration } from '../Illustration';
import { images } from '../../data/images';

export function FounderStory() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-12">
        <Illustration
          src={images.founder}
          alt="Cartoon of the founder, Siphelele, writing in a notebook at her desk"
          pop
        />
        <div>
          <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">I know this problem first-hand</h2>
          <p className="mt-4 text-sm text-ink-soft sm:text-base line-clamp-4">
            "In 2015, I travelled to the Eastern Cape for school holiday classes and found there was no internet to do my
            homework. Imfundo Quest is the tutor I wish I had."
          </p>
          <p className="mt-3 font-display text-base font-bold">Siphelele, Founder</p>
          <Link
            to="/about"
            className="mt-6 inline-block rounded-full border-2 border-ink bg-sun px-5 py-2.5 font-display text-sm font-bold shadow-pop-sm transition-transform duration-150 hover:-translate-y-0.5"
          >
            Read our story
          </Link>
        </div>
      </div>
    </section>
  );
}
