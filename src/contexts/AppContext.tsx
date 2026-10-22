import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { initialSyncQueue, tutorModel } from '../data/syncQueue';
import type { AppRole, LessonSettings, LessonStats, ModalName, QuizProgress, SyncItem } from '../types/app';
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

function readSavedRole(): AppRole {
  try {
    return window.localStorage.getItem('imfundo-account-role') === 'staff' ? 'staff' : 'learner';
  } catch (error) {
    console.warn('Unable to read saved account role.', error);
    return 'learner';
  }
}

export function AppProvider({ children }: {children: React.ReactNode;}) {
  const [role, setRole] = useState<AppRole>(readSavedRole);
  const [online, setOnline] = useState(false);
  const [modal, setModal] = useState<ModalName>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [settings, setSettings] = useState<LessonSettings>(defaultSettings);
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
    try {
      window.localStorage.setItem('imfundo-account-role', role);
    } catch (error) {
      console.warn('Unable to save account role.', error);
    }
  }, [role]);

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
    if (online && queue.every((q) => q.progress >= 100)) setLastSynced('Just now');
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