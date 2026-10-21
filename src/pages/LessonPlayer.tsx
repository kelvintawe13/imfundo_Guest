import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  BotIcon,
  CheckIcon,
  CpuIcon,
  FlameIcon,
  LightbulbIcon,
  Settings2Icon,
  TimerIcon,
  XIcon,
  ZapIcon } from
'lucide-react';
import { LessonComplete } from '../components/lesson/LessonComplete';
import { quizMeta, quizQuestions } from '../data/quiz';
import { useQuiz } from '../hooks/useQuiz';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';

const letters = ['A', 'B', 'C', 'D'];

export function LessonPlayer() {
  const { settings, openModal, setChatOpen, setLessonStats } = useApp();
  const { t } = useLanguage();
  const quiz = useQuiz(quizQuestions, settings, quizMeta.xpPerQuestion, quizMeta.comboBonus);

  useEffect(() => {
    setLessonStats({
      index: quiz.index,
      total: quiz.total,
      xp: quiz.xp,
      combo: quiz.combo,
      correct: quiz.correctCount,
      finished: quiz.finished
    });
  }, [quiz.index, quiz.total, quiz.xp, quiz.combo, quiz.correctCount, quiz.finished, setLessonStats]);
  const { question: q } = quiz;
  const progress = (quiz.index + (quiz.checked ? 1 : 0)) / quiz.total * 100;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3 sm:gap-4">
        <Link to="/dashboard" className="rounded-md p-2 text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-slate-100" aria-label="Back to dashboard">
          <ArrowLeftIcon className="h-4 w-4" />
        </Link>
        <div className="h-2 flex-1 rounded-full bg-slate-800" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <motion.div className="h-full rounded-full bg-success" animate={{ width: `${quiz.finished ? 100 : progress}%` }} transition={{ duration: 0.25, ease: 'easeOut' }} />
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold tabular-nums text-success-soft">
          <ZapIcon className="h-4 w-4 fill-success" /> {quiz.xp}
        </span>
        <button
          type="button"
          onClick={() => openModal('settings')}
          className="rounded-md p-2 text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-slate-100"
          aria-label={t('lesson.settings')}>
          
          <Settings2Icon className="h-4 w-4" />
        </button>
      </div>

      {quiz.finished ?
      <div className="py-4">
          <LessonComplete xp={quiz.xp} correct={quiz.correctCount} total={quiz.total} bestCombo={quiz.bestCombo} onRestart={quiz.restart} />
        </div> :

      <div className="mt-4 grid gap-3">
          <section className="glass-card p-3 sm:p-3" aria-live="polite">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-slate-400">
                Question {quiz.index + 1} of {quiz.total}
              </p>
              {settings.timer && !quiz.checked &&
            <span className={`flex items-center gap-1 text-xs font-semibold tabular-nums ${quiz.timeLeft <= 10 ? 'text-danger' : 'text-slate-300'}`}>
                  <TimerIcon className="h-3.5 w-3.5" /> 0:{String(quiz.timeLeft).padStart(2, '0')}
                </span>
            }
            </div>
            <h1 className="mt-2 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{q.prompt}</h1>

            {quiz.hintsAllowed &&
          <div className="mt-3 min-h-[28px]">
                {quiz.hintShown ?
            <p className="flex items-start gap-2 text-sm text-warn">
                    <LightbulbIcon className="mt-0.5 h-4 w-4 shrink-0" /> {q.hint}
                  </p> :

            !quiz.checked &&
            <button type="button" onClick={quiz.showHint} className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors duration-150 hover:text-slate-200">
                      <LightbulbIcon className="h-4 w-4" /> {t('lesson.hint')}
                    </button>

            }
              </div>
          }

            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {q.options.map((opt, i) => {
              const isAnswer = i === q.answer;
              const isSelected = quiz.selected === i;
              let tone = 'border-slate-800 hover:border-slate-600 hover:bg-slate-800/40';
              if (!quiz.checked && isSelected) tone = 'border-primary bg-primary/10';
              if (quiz.checked) {
                if (isAnswer) tone = 'border-success bg-success/10';else
                if (isSelected) tone = 'border-danger/70 bg-danger/10';else
                tone = 'border-slate-800 opacity-50';
              }
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => quiz.setSelected(i)}
                  disabled={quiz.checked}
                  aria-pressed={isSelected}
                  className={`flex min-h-[52px] items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium text-slate-100 transition-colors duration-150 ${tone}`}>
                  
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-slate-700 text-[11px] font-semibold text-slate-400">
                      {letters[i]}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {quiz.checked && isAnswer && <CheckIcon className="h-4 w-4 text-success" />}
                    {quiz.checked && isSelected && !isAnswer && <XIcon className="h-4 w-4 text-danger" />}
                  </button>);

            })}
            </div>

            <AnimatePresence mode="wait">
              {quiz.checked &&
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className={`mt-4 rounded-lg border p-3 ${quiz.isCorrect ? 'border-success/30 bg-success/10' : 'border-danger/30 bg-danger/10'}`}>
              
                  <p className={`text-sm font-semibold ${quiz.isCorrect ? 'text-success-soft' : 'text-danger'}`}>
                    {quiz.isCorrect ? `${t('lesson.correct')} +${quiz.lastGain} XP` : quiz.selected === null ? 'Time’s up' : t('lesson.incorrect')}
                    {quiz.isCorrect && quiz.combo >= 3 && <span className="ml-2 text-xs font-medium text-slate-300">Combo ×{quiz.combo}</span>}
                  </p>
                  {settings.explanationLanguage !== 'xh' && <p className="mt-1 text-sm text-slate-200">{q.explanation}</p>}
                  {settings.explanationLanguage !== 'en' &&
              <p lang="xh" className="mt-1 text-sm text-slate-300">
                      {q.explanationXh}
                    </p>
              }
                </motion.div>
            }
            </AnimatePresence>

            <div className="mt-4 flex justify-end border-t border-slate-800 pt-5">
              {quiz.checked ?
            <button type="button" onClick={quiz.next} className="btn-primary w-full sm:w-auto">
                  {quiz.index === quiz.total - 1 ? t('lesson.finish') : t('lesson.next')}
                </button> :

            <button type="button" onClick={quiz.check} disabled={quiz.selected === null} className="btn-primary w-full sm:w-auto">
                  {t('lesson.check')}
                </button>
            }
            </div>
          </section>

          <aside className="space-y-3 xl:hidden">
            <div className="glass-card p-3">
              <p className="text-xs text-slate-500">{quizMeta.subject}</p>
              <p className="mt-1 font-semibold">{quizMeta.title}</p>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-slate-800/60 py-2.5">
                  <dd className="text-lg font-semibold text-success-soft">{quiz.xp}</dd>
                  <dt className="text-[11px] text-slate-500">XP</dt>
                </div>
                <div className="rounded-lg bg-slate-800/60 py-2.5">
                  <dd className="flex items-center justify-center gap-1 text-lg font-semibold">
                    <FlameIcon className="h-4 w-4 text-warn" />
                    {quiz.combo}
                  </dd>
                  <dt className="text-[11px] text-slate-500">Combo</dt>
                </div>
                <div className="rounded-lg bg-slate-800/60 py-2.5">
                  <dd className="text-lg font-semibold">{quiz.correctCount}</dd>
                  <dt className="text-[11px] text-slate-500">Correct</dt>
                </div>
              </dl>
              {settings.difficulty === 'challenge' && <p className="mt-3 text-xs text-primary-soft">Challenge mode · 2× XP, no hints</p>}
            </div>
            <div className="glass-card space-y-3 p-3">
              <p className="flex items-start gap-2 text-sm text-slate-400">
                <CpuIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                Answers are checked on this phone. Feedback is instant with no data used.
              </p>
              <button type="button" onClick={() => setChatOpen(true)} className="btn-secondary w-full">
                <BotIcon className="h-4 w-4" /> {t('lesson.askTutor')}
              </button>
            </div>
          </aside>
        </div>
      }
    </div>);

}