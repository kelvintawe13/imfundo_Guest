import type { CommunityAccent } from '../types/community';

export type InterestCategory = 'Subject' | 'Skills' | 'Life' | 'Culture';

export type Interest = {
  id: string;
  label: string;
  emoji: string;
  accent: CommunityAccent;
  category: InterestCategory;
  /** Lesson subject this interest connects to, when relevant. */
  subject?: string;
};

/**
 * Canonical interest list. Learners pick from this list at signup or in
 * Profile, and every community room is tagged with the same ids so matching
 * stays predictable across devices.
 */
export const interestCatalog: Interest[] = [
  { id: 'mathematics', label: 'Mathematics', emoji: '➗', accent: 'teal', category: 'Subject', subject: 'Mathematics' },
  {
    id: 'physical-sciences',
    label: 'Physical Sciences',
    emoji: '⚗️',
    accent: 'sky',
    category: 'Subject',
    subject: 'Physical Sciences'
  },
  {
    id: 'computer-literacy',
    label: 'Computer Literacy',
    emoji: '💻',
    accent: 'sun',
    category: 'Subject',
    subject: 'Computer Literacy'
  },
  { id: 'english', label: 'English', emoji: '📖', accent: 'coral', category: 'Subject', subject: 'English' },
  { id: 'exam-prep', label: 'Exam prep', emoji: '📄', accent: 'coral', category: 'Skills' },
  { id: 'coding', label: 'Coding', emoji: '⌨️', accent: 'sky', category: 'Skills' },
  { id: 'robotics', label: 'Robotics', emoji: '🤖', accent: 'teal', category: 'Skills' },
  { id: 'debate', label: 'Debate', emoji: '🎤', accent: 'sun', category: 'Skills' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', emoji: '💡', accent: 'coral', category: 'Life' },
  {
    id: 'university-applications',
    label: 'University applications',
    emoji: '🎓',
    accent: 'sky',
    category: 'Life'
  },
  { id: 'sport', label: 'Sport', emoji: '⚽', accent: 'teal', category: 'Life' },
  { id: 'arts', label: 'Arts & music', emoji: '🎨', accent: 'coral', category: 'Culture' }
];

/** How many interests a learner can choose on their profile. */
export const MAX_INTERESTS = 6;

/** How many interests can be attached to a single room. */
export const MAX_ROOM_INTERESTS = 3;

const interestIndex = new Map(interestCatalog.map((interest) => [interest.id, interest]));

export function interestById(id: string): Interest | undefined {
  return interestIndex.get(id);
}

export function isInterestId(value: unknown): value is string {
  return typeof value === 'string' && interestIndex.has(value);
}

export function interestLabel(id: string): string {
  return interestIndex.get(id)?.label ?? id;
}

export function interestLabels(ids: string[]): string[] {
  return ids.map(interestLabel);
}

/**
 * Keep only known ids, remove duplicates and cap the list. Used by both the
 * account store and the community store so stored data cannot drift from the
 * catalog.
 */
export function normalizeInterests(values: unknown, max = MAX_INTERESTS): string[] {
  if (!Array.isArray(values)) return [];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    if (!isInterestId(value) || seen.has(value)) continue;
    seen.add(value);
    result.push(value);
    if (result.length >= max) break;
  }
  return result;
}
