import { useCallback, useEffect, useState } from 'react';
import type { QuizQuestion } from '../types/learning';
import type { LessonSettings } from '../types/app';

const TIME_PER_QUESTION = 30;

export function useQuiz(questions: QuizQuestion[], settings: LessonSettings, baseXp: number, comboBonus: number) {
  const hintsAllowed = settings.difficulty !== 'challenge';
  const multiplier = settings.difficulty === 'challenge' ? 2 : 1;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [xp, setXp] = useState(0);
  const [lastGain, setLastGain] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [finished, setFinished] = useState(false);
  const [hintShown, setHintShown] = useState(settings.autoHints && hintsAllowed);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

  const question = questions[index];
  const isCorrect = checked && selected === question.answer;

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
  }, [checked, selected, question.answer, combo, baseXp, comboBonus, multiplier]);

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
  }, [index, questions.length, settings.autoHints, hintsAllowed]);

  const restart = useCallback(() => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setXp(0);
    setCorrectCount(0);
    setCombo(0);
    setBestCombo(0);
    setFinished(false);
    setHintShown(settings.autoHints && hintsAllowed);
    setTimeLeft(TIME_PER_QUESTION);
  }, [settings.autoHints, hintsAllowed]);

  useEffect(() => {
    if (!settings.timer || checked || finished) return;
    if (timeLeft <= 0) {
      setChecked(true);
      setCombo(0);
      setLastGain(0);
      return;
    }
    const t = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [settings.timer, checked, finished, timeLeft]);

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
    check,
    next,
    restart
  };
}