import { useCallback, useEffect, useState } from 'react';
import type { QuizQuestion } from '../types/learning';
import type { LessonSettings, QuizProgress } from '../types/app';

const TIME_PER_QUESTION = 30;

export function useQuiz(
  questions: QuizQuestion[],
  settings: LessonSettings,
  baseXp: number,
  comboBonus: number,
  lessonId: string,
  savedProgress: QuizProgress | undefined,
  saveProgress: (lessonId: string, progress: QuizProgress) => void
) {
  const hintsAllowed = settings.difficulty !== 'challenge';
  const multiplier = settings.difficulty === 'challenge' ? 2 : 1;

  const [index, setIndex] = useState(() => Math.max(0, Math.min(savedProgress?.index ?? 0, questions.length - 1)));
  const [selected, setSelected] = useState<number | null>(() => {
    const saved = savedProgress?.selected;
    return saved !== null && saved !== undefined && saved >= 0 && saved < questions[0].options.length ? saved : null;
  });
  const [checked, setChecked] = useState(() => savedProgress?.checked ?? false);
  const [xp, setXp] = useState(() => savedProgress?.xp ?? 0);
  const [lastGain, setLastGain] = useState(() => savedProgress?.lastGain ?? 0);
  const [correctCount, setCorrectCount] = useState(() => savedProgress?.correctCount ?? 0);
  const [combo, setCombo] = useState(() => savedProgress?.combo ?? 0);
  const [bestCombo, setBestCombo] = useState(() => savedProgress?.bestCombo ?? 0);
  const [finished, setFinished] = useState(() => savedProgress?.finished ?? false);
  const [hintShown, setHintShown] = useState(() => savedProgress?.hintShown ?? (settings.autoHints && hintsAllowed));
  const [timeLeft, setTimeLeft] = useState(() => savedProgress?.timeLeft ?? TIME_PER_QUESTION);
  const [earnedXp] = useState(() => savedProgress?.earnedXp ?? 0);
  const [advanceIn, setAdvanceIn] = useState<number | null>(() =>
    savedProgress?.advanceIn ?? (savedProgress?.checked && savedProgress.selected === null ? 3 : null)
  );

  const question = questions[index];
  const isCorrect = checked && selected === question.answer;

  useEffect(() => {
    saveProgress(lessonId, {
      index,
      selected,
      checked,
      xp,
      lastGain,
      correctCount,
      combo,
      bestCombo,
      finished,
      hintShown,
      timeLeft,
      earnedXp: Math.max(earnedXp, finished ? xp : 0),
      advanceIn
    });
  }, [
    lessonId,
    index,
    selected,
    checked,
    xp,
    lastGain,
    correctCount,
    combo,
    bestCombo,
    finished,
    hintShown,
    timeLeft,
    earnedXp,
    advanceIn,
    saveProgress
  ]);

  const check = useCallback(() => {
    if (checked) return;
    setChecked(true);
    if (selected === question.answer) {
      const nextCombo = combo + 1;
      const gain = (baseXp + (nextCombo >= 3 ? comboBonus : 0)) * multiplier;
      setCombo(nextCombo);
      setBestCombo((b) => Math.max(b, nextCombo));
      setXp((x) => x + gain);
      setLastGain(gain);
      setCorrectCount((c) => c + 1);
    } else {
      setCombo(0);
      setLastGain(0);
    }
    if (settings.autoAdvance) setAdvanceIn(4);
  }, [checked, selected, question.answer, combo, baseXp, comboBonus, multiplier, settings.autoAdvance]);

  const next = useCallback(() => {
    if (index === questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setChecked(false);
    setHintShown(settings.autoHints && hintsAllowed);
    setTimeLeft(TIME_PER_QUESTION);
    setAdvanceIn(null);
  }, [index, questions.length, settings.autoHints, hintsAllowed]);

  const restart = useCallback(() => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setLastGain(0);
    setXp(0);
    setCorrectCount(0);
    setCombo(0);
    setBestCombo(0);
    setFinished(false);
    setHintShown(settings.autoHints && hintsAllowed);
    setTimeLeft(TIME_PER_QUESTION);
    setAdvanceIn(null);
  }, [settings.autoHints, hintsAllowed]);

  useEffect(() => {
    if (!settings.timer || checked || finished) return;
    if (timeLeft <= 0) {
      setSelected(null);
      setChecked(true);
      setCombo(0);
      setLastGain(0);
      setAdvanceIn(3);
      return;
    }
    const t = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [settings.timer, checked, finished, timeLeft]);

  useEffect(() => {
    if (advanceIn === null || finished) return;
    if (advanceIn <= 0) {
      next();
      return;
    }
    const timeout = window.setTimeout(() => {
      setAdvanceIn((remaining) => remaining === null ? null : remaining - 1);
    }, 1000);
    return () => window.clearTimeout(timeout);
  }, [advanceIn, finished, next]);

  return {
    index,
    question,
    total: questions.length,
    selected,
    setSelected: (i: number) => !checked && setSelected(i),
    checked,
    isCorrect,
    xp,
    lastGain,
    correctCount,
    combo,
    bestCombo,
    finished,
    hintShown,
    showHint: () => setHintShown(true),
    hintsAllowed,
    timeLeft,
    advanceIn,
    check,
    next,
    restart
  };
}