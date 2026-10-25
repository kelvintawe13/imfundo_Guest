import type { QuizProgress } from '../types/app';
import { accountScopedKey } from './auth';

const STORAGE_KEY = 'imfundo-learning-progress-v1';

function storageKey() {
  return accountScopedKey(STORAGE_KEY);
}

function readStoredValue(): string | null {
  const key = storageKey();
  const value = window.localStorage.getItem(key);
  if (value || key === STORAGE_KEY) return value;

  const legacy = window.localStorage.getItem(STORAGE_KEY);
  if (!legacy) return null;
  window.localStorage.setItem(key, legacy);
  window.localStorage.removeItem(STORAGE_KEY);
  return legacy;
}

function isQuizProgress(value: unknown): value is QuizProgress {
  if (!value || typeof value !== 'object') return false;

  const progress = value as Record<string, unknown>;
  return Number.isInteger(progress.index) && Number(progress.index) >= 0 &&
    (progress.selected === null || Number.isInteger(progress.selected)) &&
    typeof progress.checked === 'boolean' &&
    typeof progress.xp === 'number' && Number.isFinite(progress.xp) && progress.xp >= 0 &&
    typeof progress.lastGain === 'number' && Number.isFinite(progress.lastGain) &&
    typeof progress.correctCount === 'number' && Number.isInteger(progress.correctCount) && progress.correctCount >= 0 &&
    typeof progress.combo === 'number' && Number.isInteger(progress.combo) && progress.combo >= 0 &&
    typeof progress.bestCombo === 'number' && Number.isInteger(progress.bestCombo) && progress.bestCombo >= 0 &&
    typeof progress.finished === 'boolean' &&
    typeof progress.hintShown === 'boolean' &&
    typeof progress.timeLeft === 'number' && Number.isFinite(progress.timeLeft) && progress.timeLeft >= 0 &&
    typeof progress.earnedXp === 'number' && Number.isFinite(progress.earnedXp) && progress.earnedXp >= 0 &&
    (progress.advanceIn === undefined || progress.advanceIn === null ||
      (Number.isInteger(progress.advanceIn) && Number(progress.advanceIn) >= 0));
}

export function readLearningProgress(): Record<string, QuizProgress> {
  try {
    return parseLearningProgress(readStoredValue());
  } catch (error) {
    console.warn('Unable to read saved learning progress.', error);
    return {};
  }
}

function parseLearningProgress(stored: string | null): Record<string, QuizProgress> {
  if (!stored) return {};

  const parsed: unknown = JSON.parse(stored);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    console.warn('Saved learning progress has an invalid format; starting with empty progress.');
    return {};
  }

  const entries = Object.entries(parsed);
  const validEntries = entries.filter((entry): entry is [string, QuizProgress] => isQuizProgress(entry[1]));
  if (validEntries.length !== entries.length) {
    console.warn('Some saved learning progress entries are invalid and were ignored.');
  }
  return Object.fromEntries(validEntries);
}

/** Read progress for another local account, used by the parent view. */
export function readLearningProgressForAccount(accountId: string): Record<string, QuizProgress> {
  if (typeof window === 'undefined' || !accountId) return {};
  try {
    return parseLearningProgress(window.localStorage.getItem(`${STORAGE_KEY}:${accountId}`));
  } catch (error) {
    console.warn('Unable to read the linked learner’s progress.', error);
    return {};
  }
}

/** Write quiz progress for a specific local account without changing the active session. */
export function writeLearningProgressForAccount(
  accountId: string,
  progress: Record<string, QuizProgress>
): boolean {
  if (typeof window === 'undefined' || !accountId) return false;
  try {
    window.localStorage.setItem(`${STORAGE_KEY}:${accountId}`, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.warn('Unable to save learning progress for this account.', error);
    return false;
  }
}

export function writeLearningProgress(progress: Record<string, QuizProgress>) {
  try {
    window.localStorage.setItem(storageKey(), JSON.stringify(progress));
  } catch (error) {
    console.warn('Unable to save learning progress.', error);
  }
}
