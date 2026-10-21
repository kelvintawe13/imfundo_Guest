import type { SyncItem } from '../types/app';

export const initialSyncQueue: SyncItem[] = [
{ id: 's1', label: 'Quiz results · Quadratics', detail: '3 of 5 answers, 30 XP', direction: 'up', size: '4 KB', progress: 0 },
{ id: 's2', label: 'Streak & badge progress', detail: '12-day streak, 1 new badge', direction: 'up', size: '1 KB', progress: 0 },
{ id: 's3', label: 'AI tutor chat summary', detail: 'Anonymised topics for your teacher', direction: 'up', size: '2 KB', progress: 0 },
{ id: 's4', label: 'Lesson pack · Chemical equations', detail: 'New Physical Sciences content', direction: 'down', size: '2.9 MB', progress: 0 }];


export const tutorModel = {
  name: 'Imfundo Tutor Lite',
  version: 'v1.4',
  size: '380 MB',
  lastSynced: '3 days ago'
};

export const storage = [
{ label: 'AI tutor model', mb: 380, color: 'bg-primary' },
{ label: 'Lesson packs', mb: 640, color: 'bg-success' },
{ label: 'Progress & cache', mb: 48, color: 'bg-slate-400' }];


export const storageTotalMb = 4096;