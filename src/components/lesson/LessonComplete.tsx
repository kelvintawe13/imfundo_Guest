import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcwIcon, TrophyIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

type LessonCompleteProps = {
  xp: number;
  correct: number;
  total: number;
  bestCombo: number;
  onRestart: () => void;
};

export function LessonComplete({ xp, correct, total, bestCombo, onRestart }: LessonCompleteProps) {
  const { t } = useLanguage();
  const accuracy = Math.round(correct / total * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="glass-card mx-auto max-w-lg p-4 text-center">
      
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
        <TrophyIcon className="h-7 w-7" />
      </span>
      <h1 className="mt-3 text-xl font-semibold">{t('lesson.complete')}</h1>
      <p className="mt-1 text-sm text-slate-400">Results are saved on your phone and will sync when you’re next online.</p>
      <dl className="mt-4 grid grid-cols-3 divide-x divide-slate-800 rounded-lg border border-slate-800 py-3">
        <div>
          <dd className="text-xl font-semibold text-success-soft">+{xp}</dd>
          <dt className="text-xs text-slate-500">XP earned</dt>
        </div>
        <div>
          <dd className="text-xl font-semibold">{accuracy}%</dd>
          <dt className="text-xs text-slate-500">Accuracy</dt>
        </div>
        <div>
          <dd className="text-xl font-semibold">×{bestCombo}</dd>
          <dt className="text-xs text-slate-500">Best combo</dt>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <button type="button" onClick={onRestart} className="btn-secondary">
          <RotateCcwIcon className="h-4 w-4" /> {t('lesson.retry')}
        </button>
        <Link to="/dashboard" className="btn-primary">
          {t('nav.dashboard')}
        </Link>
      </div>
    </motion.div>);

}