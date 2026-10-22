import type { Lesson } from '../types/learning';

export const continueLesson = {
  title: 'Solving quadratic equations by factoring',
  subject: 'Mathematics',
  xp: 50
};

export const learnerStats = {
  level: 7,
  xp: 1240,
  xpForNext: 1500,
  streak: 12,
  offlineReady: 18
};

export const lessons: Lesson[] = [
{ id: 'm1', title: 'Quadratic equations by factoring', subject: 'Mathematics', minutes: 4, xp: 50, progress: 0, downloaded: true, size: '2.1 MB' },
{ id: 'm2', title: 'Number patterns and sequences', subject: 'Mathematics', minutes: 3, xp: 40, progress: 100, downloaded: true, size: '1.8 MB' },
{ id: 'p1', title: 'Newton’s laws in everyday life', subject: 'Physical Sciences', minutes: 5, xp: 60, progress: 20, downloaded: true, size: '3.4 MB' },
{ id: 'p2', title: 'Balancing chemical equations', subject: 'Physical Sciences', minutes: 4, xp: 50, progress: 0, downloaded: false, size: '2.9 MB' },
{ id: 'c1', title: 'Writing a formal email', subject: 'Computer Literacy', minutes: 3, xp: 30, progress: 0, downloaded: true, size: '1.2 MB' },
{ id: 'c2', title: 'Spreadsheets: your first formula', subject: 'Computer Literacy', minutes: 4, xp: 40, progress: 0, downloaded: false, size: '2.4 MB' },
{ id: 'e1', title: 'Key science terms in isiXhosa', subject: 'English', minutes: 3, xp: 30, progress: 45, downloaded: true, size: '1.5 MB' }];


export const subjectFilters = ['All', 'Mathematics', 'Physical Sciences', 'Computer Literacy', 'English'] as const;