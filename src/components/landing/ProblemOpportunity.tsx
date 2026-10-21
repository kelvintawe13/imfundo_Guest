import React from 'react';
import { opportunities, stakeholders } from '../../data/landing';
import { useLanguage } from '../../contexts/LanguageContext';
import { LearningPathIllustration } from '../illustrations/LearningPathIllustration';

export function ProblemOpportunity() {
  const { t } = useLanguage();
  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('problem.title')}</h2>
            <p className="mt-4 text-slate-400">
              While South Africa’s internet penetration has expanded in most high schools, Idutywa and the wider Eastern
              Cape still face severe exclusion from a multi-tiered digital divide. Systemic infrastructure failure separates
              three groups of stakeholders and denies rural students a fair chance at modern academic progression.
            </p>
            <ol className="mt-6 divide-y divide-slate-800 border-y border-slate-800">
              {stakeholders.map(({ tier, who, text, icon: Icon }) =>
              <li key={who} className="flex gap-4 py-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      {who} <span className="font-normal text-slate-500">· {tier} stakeholders</span>
                    </p>
                    <p className="mt-0.5 text-sm text-slate-400">{text}</p>
                  </div>
                </li>
              )}
            </ol>
          </div>

          <div className="glass-card relative overflow-hidden p-5 sm:p-6">
            <p className="text-sm font-medium text-primary-soft">Market opportunity</p>
            <h3 className="mt-2 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              Regional inequality is a vital business opportunity for a gamified, offline AI tutor.
            </h3>
            <ul className="mt-6 space-y-5">
              {opportunities.map(({ title, text, icon: Icon }) =>
              <li key={title} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary-soft">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{title}</p>
                    <p className="mt-0.5 text-sm text-slate-400">{text}</p>
                  </div>
                </li>
              )}
            </ul>
            <div className="mt-6 border-t border-slate-800 pt-6">
              <LearningPathIllustration />
              <p className="mt-2 text-xs text-slate-500">Every subject becomes a quest: short levels, instant feedback, real rewards.</p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}