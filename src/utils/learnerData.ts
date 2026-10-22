import { useSyncExternalStore } from 'react';
import type { QuizProgress } from '../types/app';
import { accountScopedKey } from './auth';

const STORAGE_KEY = 'imfundo-learner-data-v1';

function storageKey() {
  return accountScopedKey(STORAGE_KEY);
}

export const DAILY_GOAL_TARGET = 5;
export const XP_PER_LEVEL = 500;

export type LearnerUpdate = {
  id: string;
  title: string;
  text: string;
  at: number;
};

export type LearnerData = {
  version: 1;
  streak: number;
  lastActiveDate: string | null;
  activityDates: string[];
  dailyQuestions: Record<string, number>;
  dailyLessons: Record<string, number>;
  completedLessonIds: string[];
  offlineLessonIds: string[];
  updates: LearnerUpdate[];
  lastLessonId: string | null;
  lastLessonTitle: string | null;
  lastLessonAt: number | null;
  seenEventIds: string[];
};

export type LearnerEvent =
  | {
      type: 'lesson-started';
      lessonId: string;
      lessonTitle: string;
    }
  | {
      type: 'answer-checked';
      lessonId: string;
      lessonTitle: string;
      correct: boolean;
    }
  | {
      type: 'lesson-completed';
      eventId: string;
      lessonId: string;
      lessonTitle: string;
      xp: number;
      correct: number;
      total: number;
    };

function emptyData(): LearnerData {
  return {
    version: 1,
    streak: 0,
    lastActiveDate: null,
    activityDates: [],
    dailyQuestions: {},
    dailyLessons: {},
    completedLessonIds: [],
    offlineLessonIds: [],
    updates: [],
    lastLessonId: null,
    lastLessonTitle: null,
    lastLessonAt: null,
    seenEventIds: []
  };
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function countRecord(value: unknown): Record<string, number> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, number] => typeof entry[1] === 'number' && Number.isFinite(entry[1]))
  );
}

function updatesList(value: unknown): LearnerUpdate[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const update = item as Record<string, unknown>;
    if (
      typeof update.id !== 'string' ||
      typeof update.title !== 'string' ||
      typeof update.text !== 'string' ||
      typeof update.at !== 'number' ||
      !Number.isFinite(update.at)
    ) {
      return [];
    }
    return [{ id: update.id, title: update.title, text: update.text, at: update.at }];
  });
}

function normalize(value: unknown): LearnerData {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return emptyData();
  const data = value as Record<string, unknown>;
  return {
    version: 1,
    streak: typeof data.streak === 'number' && Number.isFinite(data.streak) ? Math.max(0, Math.floor(data.streak)) : 0,
    lastActiveDate: typeof data.lastActiveDate === 'string' ? data.lastActiveDate : null,
    activityDates: stringList(data.activityDates).slice(-90),
    dailyQuestions: countRecord(data.dailyQuestions),
    dailyLessons: countRecord(data.dailyLessons),
    completedLessonIds: stringList(data.completedLessonIds),
    offlineLessonIds: stringList(data.offlineLessonIds),
    updates: updatesList(data.updates).slice(0, 6),
    lastLessonId: typeof data.lastLessonId === 'string' ? data.lastLessonId : null,
    lastLessonTitle: typeof data.lastLessonTitle === 'string' ? data.lastLessonTitle : null,
    lastLessonAt: typeof data.lastLessonAt === 'number' && Number.isFinite(data.lastLessonAt) ? data.lastLessonAt : null,
    seenEventIds: stringList(data.seenEventIds).slice(-50)
  };
}

export function localDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function readStoredData(): LearnerData {
  if (typeof window === 'undefined') return emptyData();
  try {
    const key = storageKey();
    let raw = window.localStorage.getItem(key);
    if (!raw && key !== STORAGE_KEY) {
      const legacy = window.localStorage.getItem(STORAGE_KEY);
      if (legacy) {
        window.localStorage.setItem(key, legacy);
        window.localStorage.removeItem(STORAGE_KEY);
        raw = legacy;
      }
    }
    return raw ? normalize(JSON.parse(raw)) : emptyData();
  } catch (error) {
    console.warn('Unable to read learner data.', error);
    return emptyData();
  }
}

let cache: LearnerData | null = null;
const listeners = new Set<() => void>();

function getSnapshot() {
  if (!cache) cache = readStoredData();
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function persist(next: LearnerData) {
  cache = next;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(storageKey(), JSON.stringify(next));
    } catch (error) {
      console.warn('Unable to save learner data.', error);
    }
  }
  listeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== storageKey() && event.key !== STORAGE_KEY) return;
    cache = readStoredData();
    listeners.forEach((listener) => listener());
  });
}

export function useLearnerData(): LearnerData {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

function touchActivity(data: LearnerData, now: Date) {
  const today = localDateKey(now);
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const yesterdayKey = localDateKey(yesterday);

  if (data.lastActiveDate !== today) {
    data.streak = data.lastActiveDate === yesterdayKey ? data.streak + 1 : 1;
    data.lastActiveDate = today;
  }

  if (!data.activityDates.includes(today)) {
    data.activityDates = [...data.activityDates, today].slice(-90);
  }
}

export function recordLearnerEvent(event: LearnerEvent) {
  const current = getSnapshot();
  if (event.type === 'lesson-completed' && current.seenEventIds.includes(event.eventId)) return;

  const now = new Date();
  const today = localDateKey(now);
  const next: LearnerData = {
    ...current,
    activityDates: [...current.activityDates],
    dailyQuestions: { ...current.dailyQuestions },
    dailyLessons: { ...current.dailyLessons },
    completedLessonIds: [...current.completedLessonIds],
    offlineLessonIds: [...current.offlineLessonIds],
    updates: [...current.updates],
    seenEventIds: [...current.seenEventIds]
  };

  touchActivity(next, now);

  if (event.type === 'lesson-started') {
    next.lastLessonId = event.lessonId;
    next.lastLessonTitle = event.lessonTitle;
    next.lastLessonAt = now.getTime();
  }

  if (event.type === 'answer-checked') {
    next.dailyQuestions[today] = (next.dailyQuestions[today] ?? 0) + 1;
  }

  if (event.type === 'lesson-completed') {
    next.lastLessonId = event.lessonId;
    next.lastLessonTitle = event.lessonTitle;
    next.lastLessonAt = now.getTime();
    next.dailyLessons[today] = (next.dailyLessons[today] ?? 0) + 1;
    if (!next.completedLessonIds.includes(event.lessonId)) next.completedLessonIds.push(event.lessonId);
    next.updates = [
      {
        id: event.eventId,
        title: 'Lesson completed',
        text: `${event.lessonTitle} · ${event.xp} XP earned`,
        at: now.getTime()
      },
      ...next.updates
    ].slice(0, 6);
    next.seenEventIds = [...next.seenEventIds, event.eventId].slice(-50);
  }

  persist(next);
}

export function totalXpFromProgress(progress: Record<string, QuizProgress>): number {
  return Object.values(progress).reduce((total, saved) => {
    const xp = saved.finished ? Math.max(saved.earnedXp, saved.xp) : saved.xp;
    return total + Math.max(0, xp);
  }, 0);
}

export function levelFromXp(xp: number) {
  const safeXp = Math.max(0, Math.floor(xp));
  const level = Math.floor(safeXp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = safeXp % XP_PER_LEVEL;
  return {
    level,
    xpIntoLevel,
    xpForNext: XP_PER_LEVEL,
    xpToNext: XP_PER_LEVEL - xpIntoLevel
  };
}

export function dailyQuestionCount(data: LearnerData): number {
  return data.dailyQuestions[localDateKey()] ?? 0;
}

export function weeklyActivity(data: LearnerData) {
  const now = new Date();
  const mondayOffset = (now.getDay() + 6) % 7;
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - mondayOffset);
  const labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return labels.map((day, index) => {
    const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index);
    const key = localDateKey(date);
    return {
      day,
      done: data.activityDates.includes(key),
      today: key === localDateKey(now)
    };
  });
}

export function relativeTime(at: number, now = Date.now()): string {
  const diff = Math.max(0, now - at);
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return new Date(at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}
