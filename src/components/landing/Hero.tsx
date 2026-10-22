import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, CloudUploadIcon, WifiOffIcon } from 'lucide-react';
import { GridPattern } from '../ui/GridPattern';
import { PhoneFrame } from '../ui/PhoneFrame';
import { LessonScreen } from '../mockups/LessonScreen';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

const ease = [0.23, 1, 0.32, 1] as const;

const heroStats = [
  ['0 MB', 'data per lesson'],
  ['< 4 min', 'per micro-lesson'],
  ['2', 'languages']
] as const;

export function Hero() {
  const { t } = useLanguage();
  const { openModal, setRole } = useApp();

  return (
    <section className="relative overflow-hidden border-b border-slate-800">
      <GridPattern className="text-slate-800/60" size={32} />
      <div className="pointer-events-none absolute -right-24 -top-32 h-[360px] w-[360px] rounded-full bg-primary/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-64 rounded-full bg-success/10 blur-[80px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28, ease }}>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success-soft">
            <WifiOffIcon className="h-3.5 w-3.5" /> {t('hero.kicker')}
          </p>
          <h1 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.08] tracking-tight text-slate-50 sm:text-4xl lg:text-[2.7rem]">
            {t('hero.titleLead')}{' '}
            <span className="bg-gradient-to-r from-success-soft to-primary-soft bg-clip-text text-transparent">
              {t('hero.titleAccent')}
            </span>
          </h1>
          <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">{t('hero.subtitle')}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/dashboard" onClick={() => setRole('learner')} className="btn-primary">
              {t('cta.openApp')} <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <button type="button" onClick={() => openModal('partner')} className="btn-secondary">
              {t('cta.partner')}
            </button>
          </div>

          <dl className="mt-6 flex flex-wrap gap-2">
            {heroStats.map(([value, label]) =>
            <div key={label} className="flex flex-col-reverse rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5">
                <dt className="text-[10px] text-slate-500">{label}</dt>
                <dd className="text-sm font-semibold text-slate-50">{value}</dd>
              </div>
            )}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease, delay: 0.06 }}
          className="relative mx-auto flex h-[420px] w-full max-w-[460px] items-center justify-center sm:h-[460px]">

          <div className="absolute h-56 w-56 translate-x-6 rounded-full border border-slate-800/70" aria-hidden="true" />
          <div className="absolute h-72 w-72 translate-x-6 rounded-full border border-slate-800/40" aria-hidden="true" />

          <PhoneFrame
            label="Lesson quiz with instant offline feedback"
            widthClass="w-[190px] sm:w-[212px]"
            className="relative z-10 rotate-[-4deg]">
            <LessonScreen />
          </PhoneFrame>

          <div className="glass-card absolute -left-12 top-12 z-0 hidden w-[156px] p-2.5 shadow-2xl shadow-black/40 sm:block">
            <p className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
              <WifiOffIcon className="h-3 w-3 text-success-soft" /> Offline pack
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-50">12 lessons ready</p>
            <p className="mt-0.5 text-[10px] text-slate-500">0 MB · on this device</p>
          </div>

          <div className="glass-card absolute -left-12 bottom-12 z-0 hidden w-[156px] p-2.5 shadow-2xl shadow-black/40 sm:block">
            <p className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
              <CloudUploadIcon className="h-3 w-3 text-primary-soft" /> Sync queue
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-50">3 items waiting</p>
            <div className="mt-1.5 h-1 rounded-full bg-slate-800">
              <div className="h-full w-2/3 rounded-full bg-success" />
            </div>
            <p className="mt-1 text-[10px] text-slate-500">Uploads on next signal</p>
          </div>
        </motion.div>
      </div>
    </section>);
}
