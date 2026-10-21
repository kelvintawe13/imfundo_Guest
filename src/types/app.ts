export type Lang = 'en' | 'xh';

export type ModalName = 'partner' | 'settings' | 'sync' | null;

export type LessonSettings = {
  explanationLanguage: 'en' | 'xh' | 'both';
  difficulty: 'standard' | 'challenge';
  sound: boolean;
  autoHints: boolean;
  timer: boolean;
};

export type SyncItem = {
  id: string;
  label: string;
  detail: string;
  direction: 'up' | 'down';
  size: string;
  progress: number;
};

export type LessonStats = {
  index: number;
  total: number;
  xp: number;
  combo: number;
  correct: number;
  finished: boolean;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'tutor';
  text: string;
};