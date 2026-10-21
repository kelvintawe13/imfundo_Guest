import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { GridPattern } from '../ui/GridPattern';

export function FounderCta() {
  const { openModal } = useApp();
  const { t } = useLanguage();

  return (
    <section className="px-4 py-10 sm:px-6">
      <div className="relative mx-auto grid max-w-7xl gap-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <GridPattern className="text-slate-800/40" size={28} />
        <figure className="relative">
          <blockquote className="text-xl font-medium leading-relaxed text-slate-100 sm:text-2xl">
            “In 2015 I travelled to the Eastern Cape for holiday classes and found there was no internet to do my homework.
            Imfundo Quest is the tutor I wish I had.”
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/20 text-xs font-semibold text-primary-soft">S</span>
            <span className="text-sm">
              <span className="block font-semibold text-slate-100">Siphelele</span>
              <span className="text-slate-400">Founder · African Leadership University</span>
            </span>
          </figcaption>
        </figure>
        <div className="relative lg:justify-self-end">
          <p className="text-sm text-slate-400">The Idutywa pilot is open to Grade 10–12 schools.</p>
          <button type="button" onClick={() => openModal('partner')} className="btn-primary mt-3 !px-5 !py-3">
            {t('cta.partner')}
          </button>
        </div>
      </div>
    </section>);

}