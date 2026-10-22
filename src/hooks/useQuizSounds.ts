import { useEffect, useRef } from 'react';
import {
  playAnswerSound,
  playTimerTick,
  playTimerTimeout,
  playTimerWarning,
  unlockAudio
} from '../utils/sound';

type QuizSoundOptions = {
  timeLeft: number;
  checked: boolean;
  finished: boolean;
  isCorrect: boolean;
  timerEnabled: boolean;
  soundEnabled: boolean;
};

/**
 * Plays short Web Audio cues for the countdown and answer feedback.
 * Audio is unlocked on the first pointer or keyboard interaction so
 * the browser autoplay policy does not silence the countdown.
 */
export function useQuizSounds({
  timeLeft,
  checked,
  finished,
  isCorrect,
  timerEnabled,
  soundEnabled
}: QuizSoundOptions) {
  const previousTime = useRef(timeLeft);
  const previousChecked = useRef(checked);

  useEffect(() => {
    unlockAudio();
    const unlock = () => unlockAudio();
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  useEffect(() => {
    const previous = previousTime.current;
    previousTime.current = timeLeft;
    if (!timerEnabled || finished || !soundEnabled) return;

    if (timeLeft === 0 && previous > 0) {
      playTimerTimeout();
      return;
    }
    if (checked) return;
    if (timeLeft === 10 && previous > 10) {
      playTimerWarning();
      return;
    }
    if (timeLeft <= 5 && timeLeft > 0 && timeLeft < previous) {
      playTimerTick();
    }
  }, [timeLeft, checked, finished, timerEnabled, soundEnabled]);

  useEffect(() => {
    if (soundEnabled && checked && !previousChecked.current) {
      playAnswerSound(isCorrect);
    }
    previousChecked.current = checked;
  }, [checked, isCorrect, soundEnabled]);
}
