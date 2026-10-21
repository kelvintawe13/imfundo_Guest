import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, WifiOffIcon } from 'lucide-react';
import { GridPattern } from '../ui/GridPattern';
import { PhoneFrame } from '../ui/PhoneFrame';
import { LessonScreen } from '../mockups/LessonScreen';
import { DashboardScreen } from '../mockups/DashboardScreen';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

const ease = [0.23, 1, 0.32, 1] as const;

export function Hero() {
  const { t } = useLanguage();
  const { openModal } = useApp();

  return (
    <section className="relative overflow-hidden border-b border-slate-800">
      <GridPattern className="text-slate-800/50" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, ease }}>
          <p className="flex items-center gap-2 text-sm font-medium text-success-soft">
            <WifiOffIcon className="h-4 w-4" /> {t('hero.kicker')}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-slate-50 sm:text-5xl lg:text-[3.5rem]">
            {t('hero.title')}
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-400 sm:text-lg">{t('hero.subtitle')}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/dashboard" className="btn-primary !px-5 !py-3">
              {t('cta.openApp')} <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <button type="button" onClick={() => openModal('partner')} className="btn-secondary !px-5 !py-3">
              {t('cta.partner')}
            </button>
          </div>
          <dl className="mt-8 grid max-w-md grid-cols-3 divide-x divide-slate-800 border-t border-slate-800 pt-5">
            {[
            ['0 MB', 'data per lesson'],
            ['< 4 min', 'per micro-lesson'],
            ['2', 'languages']].
            map(([v, l]) =>
            <div key={l} className="px-4 first:pl-0">
                <dt className="sr-only">{l}</dt>
                <dd className="text-lg font-semibold text-slate-50">{v}</dd>
                <dd className="text-xs text-slate-500">{l}</dd>
              </div>
            )}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease, delay: 0.06 }}
          className="relative mx-auto h-[560px] w-full max-w-[460px]">
          
          <PhoneFrame label="Learner dashboard on a phone" className="absolute left-0 top-0 hidden scale-[0.92] opacity-90 sm:block">
            <DashboardScreen />
          </PhoneFrame>
          <PhoneFrame
            label="Lesson quiz with instant offline feedback"
            className="absolute left-1/2 top-4 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0">
            
            <LessonScreen />
          </PhoneFrame>
        </motion.div>
      </div>
    </section>);

}