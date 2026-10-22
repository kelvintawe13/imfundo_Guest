import type { Lesson } from '../types/learning';

export const lessons: Lesson[] = [
{ id: 'm1', title: 'Quadratic equations by factoring', subject: 'Mathematics', minutes: 4, xp: 50 },
{ id: 'm2', title: 'Number patterns and sequences', subject: 'Mathematics', minutes: 3, xp: 40 },
{ id: 'p1', title: 'Newton’s laws in everyday life', subject: 'Physical Sciences', minutes: 5, xp: 60 },
{ id: 'p2', title: 'Balancing chemical equations', subject: 'Physical Sciences', minutes: 4, xp: 50 },
{ id: 'c1', title: 'Writing a formal email', subject: 'Computer Literacy', minutes: 3, xp: 30 },
{ id: 'c2', title: 'Spreadsheets: your first formula', subject: 'Computer Literacy', minutes: 4, xp: 40 },
{ id: 'e1', title: 'Key science terms in isiXhosa', subject: 'English', minutes: 3, xp: 30 }];

export const subjectFilters = ['All', 'Mathematics', 'Physical Sciences', 'Computer Literacy', 'English'] as const;
