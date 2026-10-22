import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  BookOpenIcon,
  BotIcon,
  CheckIcon,
  Clock3Icon,
  CpuIcon,
  FlameIcon,
  LightbulbIcon,
  Settings2Icon,
  TimerIcon,
  WifiOffIcon,
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
  const { settings, openModal, setChatOpen, setLessonStats, quizProgress, saveQuizProgress } = useApp();
  const { t } = useLanguage();
  const quiz = useQuiz(
    quizQuestions,
    settings,
    quizMeta.xpPerQuestion,
    quizMeta.comboBonus,
    quizMeta.lessonId,
    quizProgress[quizMeta.lessonId],
    saveQuizProgress
  );

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
  const xpMultiplier = settings.difficulty === 'challenge' ? 2 : 1;
  const maximumXp = (quiz.total * quizMeta.xpPerQuestion + Math.max(0, quiz.total - 2) * quizMeta.comboBonus) * xpMultiplier;

  return (
    <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <Link
          to="/dashboard"
          className="group inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-ink"
          aria-label="Back to dashboard">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border-2 border-ink bg-slate-900 transition-colors group-hover:bg-sun-light">
            <ArrowLeftIcon className="h-4 w-4" />
          </span>
          <span className="truncate">My learning</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border-2 border-ink bg-teal-light px-3 py-1.5 text-xs font-bold text-ink sm:inline-flex">
            <WifiOffIcon className="h-3.5 w-3.5" /> Works offline
          </span>
          <button
            type="button"
            onClick={() => openModal('settings')}
            className="grid h-9 w-9 place-items-center rounded-xl border-2 border-ink bg-slate-900 text-slate-400 transition-colors hover:bg-sun-light hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            aria-label={t('lesson.settings')}>
            <Settings2Icon className="h-4 w-4" />
          </button>
        </div>
      </header>

      <section className="glass-card relative isolate overflow-hidden p-4 sm:p-5" aria-labelledby="lesson-title">
        <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-56 w-56 rounded-full bg-sun/25" />
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-sun px-2.5 py-1 text-xs font-bold text-ink">
            <BookOpenIcon className="h-3.5 w-3.5" /> {quizMeta.subject}
          </span>
          <span className="rounded-full border-2 border-ink bg-slate-900 px-2.5 py-1 text-xs font-semibold text-slate-300">
            {quizMeta.grade}
          </span>
          <span className="rounded-full border-2 border-ink bg-slate-900 px-2.5 py-1 font-mono text-[11px] text-slate-400">
            ID · {quizMeta.lessonId.toUpperCase()}
          </span>
        </div>
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="font-display text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{quizMeta.unit}</p>
            <h1 id="lesson-title" className="mt-1 font-display text-2xl font-extrabold leading-tight tracking-tight text-slate-50 sm:text-3xl">
              {quizMeta.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{quizMeta.objective}</p>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-2 sm:min-w-[212px]">
            <div className="rounded-xl border-2 border-ink bg-slate-950/30 px-3 py-2">
              <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Clock3Icon className="h-3.5 w-3.5" /> Approx. time
              </p>
              <p className="mt-1 font-display text-sm font-bold text-slate-200">{quizMeta.estimatedMinutes} min</p>
            </div>
            <div className="rounded-xl border-2 border-ink bg-slate-950/30 px-3 py-2">
              <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <ZapIcon className="h-3.5 w-3.5 text-coral" /> XP reward
              </p>
              <p className="mt-1 font-display text-sm font-bold text-teal">Up to {maximumXp} XP</p>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t-2 border-ink/15 pt-3">
          <div className="mb-2 flex items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-slate-300">
              {quiz.finished ? 'Lesson complete' : `Question ${quiz.index + 1} of ${quiz.total}`}
            </span>
            <span className="tabular-nums text-slate-500">{Math.round(quiz.finished ? 100 : progress)}% complete</span>
          </div>
          <div
            className="h-2.5 overflow-hidden rounded-full border-2 border-ink bg-slate-950/40"
            role="progressbar"
            aria-label="Lesson progress"
            aria-valuenow={Math.round(quiz.finished ? 100 : progress)}
            aria-valuemin={0}
            aria-valuemax={100}>
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky to-teal"
              animate={{ width: `${quiz.finished ? 100 : progress}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }} />
          </div>
          <div className="mt-2 flex gap-1.5" aria-hidden="true">
            {quizQuestions.map((item, i) => (
              <span
                key={item.id}
                className={`h-1.5 flex-1 rounded-full ${
                  i < quiz.index || (i === quiz.index && quiz.checked) || quiz.finished
                    ? 'bg-teal'
                    : i === quiz.index
                      ? 'bg-sun'
                      : 'bg-slate-800'
                }`} />
            ))}
          </div>
        </div>
      </section>

      {quiz.finished ? (
        <div className="py-4">
          <LessonComplete xp={quiz.xp} correct={quiz.correctCount} total={quiz.total} bestCombo={quiz.bestCombo} onRestart={quiz.restart} />
        </div>
      ) : (
        <div className="mt-4 grid gap-4">
          <section className="glass-card overflow-hidden" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg border-2 border-ink bg-sun font-display text-xs font-extrabold text-ink">
                  {String(quiz.index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-slate-100">Question {quiz.index + 1}</p>
                  <p className="text-[11px] text-slate-500">of {quiz.total} · {q.id.toUpperCase()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border-2 border-ink bg-slate-950/40 px-2.5 py-1 text-[11px] font-semibold text-slate-400">
                  Choose one answer
                </span>
                {settings.timer && !quiz.checked && (
                  <span className={`flex items-center gap-1.5 rounded-full border-2 border-ink px-2.5 py-1 text-xs font-bold tabular-nums ${
                    quiz.timeLeft <= 10
                      ? 'bg-coral/20 text-danger'
                      : 'bg-slate-950/40 text-slate-300'
                  }`}>
                    <TimerIcon className="h-3.5 w-3.5" /> 0:{String(quiz.timeLeft).padStart(2, '0')}
                  </span>
                )}
              </div>
            </div>

            {settings.timer && !quiz.checked && (
              <div
                className="h-1.5 overflow-hidden bg-slate-800"
                role="progressbar"
                aria-label={t('lesson.timeRemaining')}
                aria-valuemin={0}
                aria-valuemax={30}
                aria-valuenow={quiz.timeLeft}>
                <motion.div
                  className={`h-full ${quiz.timeLeft <= 10 ? 'bg-coral' : 'bg-sun'}`}
                  animate={{ width: `${quiz.timeLeft / 30 * 100}%` }}
                  transition={{ duration: 0.3, ease: 'linear' }} />
              </div>
            )}

            <div className="p-4 sm:p-5">
              <h2 className="max-w-3xl font-display text-xl font-extrabold leading-snug tracking-tight text-slate-50 sm:text-2xl">
                {q.prompt}
              </h2>

              {quiz.hintsAllowed && (
                <div className="mt-3 min-h-[30px]">
                  {quiz.hintShown ? (
                    <p className="flex items-start gap-2 rounded-xl border-2 border-ink bg-sun-light px-3 py-2 text-sm font-semibold text-ink">
                      <LightbulbIcon className="mt-0.5 h-4 w-4 shrink-0" /> {q.hint}
                    </p>
                  ) : !quiz.checked ? (
                    <button
                      type="button"
                      onClick={quiz.showHint}
                      className="inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-slate-400 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink">
                      <LightbulbIcon className="h-4 w-4" /> {t('lesson.hint')}
                    </button>
                  ) : null}
                </div>
              )}

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2" role="group" aria-label="Answer choices">
                {q.options.map((option, i) => {
                  const isAnswer = i === q.answer;
                  const isSelected = quiz.selected === i;
                  let tone = 'border-ink/20 bg-slate-950/20 hover:border-ink hover:bg-sun/10';
                  if (!quiz.checked && isSelected) tone = 'border-ink bg-sun-light shadow-pop-sm';
                  if (quiz.checked) {
                    if (isAnswer) tone = 'border-ink bg-teal-light';
                    else if (isSelected) tone = 'border-ink bg-coral/15';
                    else tone = 'border-ink/15 bg-slate-950/20 opacity-60';
                  }
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => quiz.setSelected(i)}
                      disabled={quiz.checked}
                      aria-pressed={isSelected}
                      className={`group flex min-h-[58px] items-center gap-3 rounded-xl border-2 px-3.5 py-3 text-left text-sm font-semibold text-slate-100 transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:cursor-default ${tone}`}>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 text-xs font-extrabold transition-colors ${
                        quiz.checked && isAnswer
                          ? 'border-ink bg-teal text-ink'
                          : quiz.checked && isSelected
                            ? 'border-ink bg-coral text-ink'
                            : isSelected
                              ? 'border-ink bg-sun text-ink'
                              : 'border-ink/30 bg-slate-900 text-slate-400 group-hover:border-ink'
                      }`}>
                        {letters[i]}
                      </span>
                      <span className="min-w-0 flex-1">{option}</span>
                      {quiz.checked && isAnswer && <CheckIcon className="h-4 w-4 shrink-0 text-teal" />}
                      {quiz.checked && isSelected && !isAnswer && <XIcon className="h-4 w-4 shrink-0 text-coral" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {quiz.checked && (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className={`mt-4 rounded-xl border-2 p-3.5 ${
                      quiz.isCorrect ? 'border-ink bg-teal-light text-ink' : 'border-ink bg-coral/10'
                    }`}>
                    <p className={`font-display text-sm font-extrabold ${quiz.isCorrect ? 'text-ink' : 'text-danger'}`}>
                      {quiz.isCorrect ? `${t('lesson.correct')} +${quiz.lastGain} XP` : quiz.selected === null ? 'Time’s up' : t('lesson.incorrect')}
                      {quiz.isCorrect && quiz.combo >= 3 && <span className="ml-2 text-xs font-bold text-ink-soft">Combo ×{quiz.combo}</span>}
                    </p>
                    {settings.explanationLanguage !== 'xh' && <p className={`mt-1.5 text-sm leading-relaxed ${quiz.isCorrect ? 'text-ink-soft' : 'text-slate-200'}`}>{q.explanation}</p>}
                    {settings.explanationLanguage !== 'en' && (
                      <p lang="xh" className={`mt-1.5 text-sm leading-relaxed ${quiz.isCorrect ? 'text-ink-soft' : 'text-slate-300'}`}>{q.explanationXh}</p>
                    )}
                    {quiz.advanceIn !== null && quiz.advanceIn > 0 && (
                      <p className={`mt-2 text-xs ${quiz.isCorrect ? 'text-ink-soft' : 'text-slate-400'}`}>{t('lesson.autoAdvanceIn')} {quiz.advanceIn}…</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 flex flex-col-reverse gap-3 border-t-2 border-ink/15 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  {settings.difficulty === 'challenge' ? 'Challenge mode · 2× XP' : 'Your progress saves automatically'}
                </p>
                {quiz.checked ? (
                  <button type="button" onClick={quiz.next} className="btn-primary w-full sm:w-auto">
                    {quiz.index === quiz.total - 1 ? t('lesson.finish') : t('lesson.next')}
                    {quiz.advanceIn !== null && quiz.advanceIn > 0 && ` · ${quiz.advanceIn}`}
                  </button>
                ) : (
                  <button type="button" onClick={quiz.check} disabled={quiz.selected === null} className="btn-primary w-full sm:w-auto">
                    {t('lesson.check')} <CheckIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </section>

          <aside className="grid gap-3 md:hidden">
            <div className="glass-card p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-xs font-bold text-sky-dark">{quizMeta.subject} · {quizMeta.grade}</p>
                  <p className="mt-1 font-display text-sm font-bold text-slate-100">{quizMeta.title}</p>
                  <p className="mt-1 font-mono text-[11px] text-slate-500">Lesson ID: {quizMeta.lessonId.toUpperCase()}</p>
                </div>
                <span className="rounded-lg border-2 border-ink bg-sun px-2.5 py-1.5 font-display text-xs font-extrabold text-ink">
                  {quiz.xp} XP
                </span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between rounded-lg border-2 border-ink/15 px-3 py-2">
                  <dt className="flex items-center gap-1.5 text-xs text-slate-400"><FlameIcon className="h-3.5 w-3.5 text-coral" /> Combo</dt>
                  <dd className="font-display text-sm font-extrabold">{quiz.combo}</dd>
                </div>
                <div className="flex items-center justify-between rounded-lg border-2 border-ink/15 px-3 py-2">
                  <dt className="text-xs text-slate-400">Correct</dt>
                  <dd className="font-display text-sm font-extrabold">{quiz.correctCount}/{quiz.total}</dd>
                </div>
              </dl>
            </div>
            <div className="glass-card flex flex-col gap-3 p-3.5 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-400">
                <CpuIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                Answers are checked on this device. Progress is saved locally, even when offline.
              </p>
              <button type="button" onClick={() => setChatOpen(true)} className="btn-secondary w-full shrink-0 sm:w-auto">
                <BotIcon className="h-4 w-4" /> {t('lesson.askTutor')}
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );

}