import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { initialSyncQueue, tutorModel } from '../data/syncQueue';
import type { AppRole, LessonSettings, LessonStats, ModalName, QuizProgress, SyncItem } from '../types/app';
import { getSessionAccount, isAppRole, useAuth } from '../utils/auth';
import { readLearningProgress, writeLearningProgress } from '../utils/learningProgress';

type AppContextValue = {
  role: AppRole;
  setRole: (role: AppRole) => void;
  online: boolean;
  setOnline: (v: boolean) => void;
  modal: ModalName;
  openModal: (m: Exclude<ModalName, null>) => void;
  closeModal: () => void;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
  settings: LessonSettings;
  setSettings: (s: LessonSettings) => void;
  queue: SyncItem[];
  lastSynced: string;
  lessonStats: LessonStats;
  setLessonStats: (s: LessonStats) => void;
  quizProgress: Record<string, QuizProgress>;
  saveQuizProgress: (lessonId: string, progress: QuizProgress) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const defaultSettings: LessonSettings = {
  explanationLanguage: 'en',
  difficulty: 'standard',
  sound: true,
  autoHints: false,
  timer: true,
  autoAdvance: false
};

const SETTINGS_STORAGE_KEY = 'imfundo-lesson-settings-v1';

function readSavedRole(): AppRole {
  const account = getSessionAccount();
  if (account) return account.role;
  try {
    const saved = window.localStorage.getItem('imfundo-account-role');
    return isAppRole(saved) ? saved : 'learner';
  } catch (error) {
    console.warn('Unable to read saved account role.', error);
    return 'learner';
  }
}

function readSavedSettings(): LessonSettings {
  try {
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!stored) return defaultSettings;
    const parsed = JSON.parse(stored) as Partial<LessonSettings>;
    return {
      explanationLanguage: parsed.explanationLanguage === 'xh' ? 'xh' : 'en',
      difficulty: parsed.difficulty === 'challenge' ? 'challenge' : 'standard',
      sound: typeof parsed.sound === 'boolean' ? parsed.sound : defaultSettings.sound,
      autoHints: typeof parsed.autoHints === 'boolean' ? parsed.autoHints : defaultSettings.autoHints,
      timer: typeof parsed.timer === 'boolean' ? parsed.timer : defaultSettings.timer,
      autoAdvance: typeof parsed.autoAdvance === 'boolean' ? parsed.autoAdvance : defaultSettings.autoAdvance
    };
  } catch (error) {
    console.warn('Unable to read lesson settings.', error);
    return defaultSettings;
  }
}

export function AppProvider({ children }: {children: React.ReactNode;}) {
  const account = useAuth();
  const accountId = account?.id ?? null;
  const accountRole = account?.role;
  const [role, setRole] = useState<AppRole>(readSavedRole);
  const [online, setOnline] = useState(false);
  const [modal, setModal] = useState<ModalName>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [settings, setSettings] = useState<LessonSettings>(readSavedSettings);
  const [queue, setQueue] = useState<SyncItem[]>(initialSyncQueue);
  const [lastSynced, setLastSynced] = useState(tutorModel.lastSynced);
  const [lessonStats, setLessonStats] = useState<LessonStats>({
    index: 0,
    total: 5,
    xp: 0,
    combo: 0,
    correct: 0,
    finished: false
  });
  const [quizProgress, setQuizProgress] = useState<Record<string, QuizProgress>>(readLearningProgress);

  useEffect(() => {
    if (!accountId || !accountRole) return;
    setRole(accountRole);
    setQuizProgress(readLearningProgress());
  }, [accountId, accountRole]);

  useEffect(() => {
    try {
      window.localStorage.setItem('imfundo-account-role', role);
    } catch (error) {
      console.warn('Unable to save account role.', error);
    }
  }, [role]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn('Unable to save lesson settings.', error);
    }
  }, [settings]);

  const saveQuizProgress = useCallback((lessonId: string, progress: QuizProgress) => {
    setQuizProgress((current) => ({ ...current, [lessonId]: progress }));
  }, []);

  useEffect(() => {
    writeLearningProgress(quizProgress);
  }, [quizProgress]);

  useEffect(() => {
    if (!online) return;
    const id = window.setInterval(() => {
      setQueue((prev) => {
        const idx = prev.findIndex((i) => i.progress < 100);
        if (idx === -1) return prev;
        return prev.map((it, i) => i === idx ? { ...it, progress: Math.min(100, it.progress + 25) } : it);
      });
    }, 400);
    return () => window.clearInterval(id);
  }, [online]);

  useEffect(() => {
    if (online && queue.length > 0 && queue.every((q) => q.progress >= 100)) setLastSynced('Just now');
  }, [online, queue]);

  const value = useMemo(
    () => ({
      role,
      setRole,
      online,
      setOnline,
      modal,
      openModal: (m: Exclude<ModalName, null>) => setModal(m),
      closeModal: () => setModal(null),
      chatOpen,
      setChatOpen,
      settings,
      setSettings,
      queue,
      lastSynced,
      lessonStats,
      setLessonStats,
      quizProgress,
      saveQuizProgress
    }),
    [role, online, modal, chatOpen, settings, queue, lastSynced, lessonStats, quizProgress, saveQuizProgress]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}