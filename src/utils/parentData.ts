import { useMemo } from 'react';
import { demoChild } from '../data/parent';
import { quizQuestions } from '../data/quiz';
import { useAuth } from './auth';
import { findAccountByEmail } from './auth';
import { readLearnerDataForAccount, localDateKey, relativeTime, type LearnerData } from './learnerData';
import { readLearningProgressForAccount } from './learningProgress';
import type { QuizProgress } from '../types/app';

export type ParentMode = 'demo' | 'linked' | 'idle';

export type ParentUpdate = {
  id: string;
  title: string;
  text: string;
  when: string;
};

export type ParentWeeklyPoint = {
  label: string;
  lessons: number;
  questions: number;
  minutes: number;
};

export type ParentSubject = {
  subject: string;
  mastery: number;
  detail: string;
  color: string;
};

export type ParentSnapshot = {
  mode: ParentMode;
  childName: string;
  grade: string;
  school: string;
  linkedEmail: string | null;
  lastSynced: string;
  streak: number;
  lessonsThisWeek: number;
  questionsAnswered: number;
  accuracy: number;
  weekly: ParentWeeklyPoint[];
  subjects: ParentSubject[];
  updates: ParentUpdate[];
  teacherNote: string;
  teacherName: string;
};

const SUBJECT_COLORS = ['bg-sun', 'bg-teal', 'bg-coral', 'bg-sky'];

function emptyWeek(): ParentWeeklyPoint[] {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return {
      label: date.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 3),
      lessons: 0,
      questions: 0,
      minutes: 0
    };
  });
}

function liveWeek(learner: LearnerData): ParentWeeklyPoint[] {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = localDateKey(date);
    const lessons = learner.dailyLessons[key] ?? 0;
    const questions = learner.dailyQuestions[key] ?? 0;
    return {
      label: date.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 3),
      lessons,
      questions,
      minutes: lessons * 4 + Math.round(questions * 0.4)
    };
  });
}

function answeredIn(progress: Record<string, QuizProgress>): { answered: number; correct: number; completed: number } {
  return Object.values(progress).reduce(
    (total, saved) => {
      const answered = saved.finished
        ? quizQuestions.length
        : Math.min(quizQuestions.length, saved.index + (saved.checked ? 1 : 0));
      return {
        answered: total.answered + answered,
        correct: total.correct + saved.correctCount,
        completed: total.completed + (saved.finished ? 1 : 0)
      };
    },
    { answered: 0, correct: 0, completed: 0 }
  );
}

function initialsName(name: string): string {
  const first = name.trim().split(/\s+/)[0];
  return first || 'your child';
}

function baseSnapshot(): Omit<ParentSnapshot, 'mode'> {
  return {
    childName: demoChild.name,
    grade: demoChild.grade,
    school: demoChild.school,
    linkedEmail: null,
    lastSynced: demoChild.lastSynced,
    streak: demoChild.streak,
    lessonsThisWeek: demoChild.lessonsThisWeek,
    questionsAnswered: demoChild.questionsAnswered,
    accuracy: demoChild.accuracy,
    weekly: demoChild.weekly,
    subjects: demoChild.subjects,
    updates: demoChild.updates,
    teacherNote: demoChild.teacherNote,
    teacherName: demoChild.teacherName
  };
}

export function useParentSnapshot(): ParentSnapshot {
  const account = useAuth();
  const childEmail = account?.childEmail ?? '';

  return useMemo(() => {
    if (account?.role !== 'parent' || !childEmail) {
      return { mode: 'demo', ...baseSnapshot() } satisfies ParentSnapshot;
    }

    const child = findAccountByEmail(childEmail);
    if (!child || child.role !== 'learner') {
      return {
        ...baseSnapshot(),
        mode: 'demo',
        linkedEmail: childEmail
      } satisfies ParentSnapshot;
    }

    const progress = readLearningProgressForAccount(child.id);
    const learner = readLearnerDataForAccount(child.id);
    const computed = answeredIn(progress);
    const completedIds = new Set([
      ...learner.completedLessonIds,
      ...Object.entries(progress)
        .filter(([, saved]) => saved.finished)
        .map(([lessonId]) => lessonId)
    ]);
    const weekly = liveWeek(learner);
    const lessonsThisWeek = weekly.reduce((total, day) => total + day.lessons, 0);
    const questionsAnswered = Object.values(learner.dailyQuestions).reduce((total, count) => total + count, 0) || computed.answered;
    const accuracy = computed.answered > 0 ? Math.round(computed.correct / computed.answered * 100) : 0;
    const hasActivity =
      Object.keys(progress).length > 0 ||
      learner.activityDates.length > 0 ||
      learner.updates.length > 0 ||
      Boolean(learner.lastLessonTitle);

    const childFirst = initialsName(child.name);
    const updates: ParentUpdate[] = learner.updates.map((update) => ({
      id: update.id,
      title: update.title,
      text: update.text,
      when: relativeTime(update.at)
    }));

    if (!updates.length && learner.lastLessonTitle) {
      updates.push({
        id: `last-${learner.lastLessonId ?? 'lesson'}`,
        title: `Opened “${learner.lastLessonTitle}”`,
        text: 'This lesson was opened on the device. Progress appears here after a sync.',
        when: learner.lastLessonAt ? relativeTime(learner.lastLessonAt) : 'Recently'
      });
    }

    if (!hasActivity) {
      return {
        mode: 'idle',
        childName: child.name,
        grade: child.grade || 'Grade 11',
        school: child.school || 'Your school',
        linkedEmail: child.email,
        lastSynced: 'Not synced yet',
        streak: 0,
        lessonsThisWeek: 0,
        questionsAnswered: 0,
        accuracy: 0,
        weekly: emptyWeek(),
        subjects: ['Mathematics', 'Physical Sciences', 'English', 'Computer Literacy'].map((subject, index) => ({
          subject,
          mastery: 0,
          detail: 'No activity yet',
          color: SUBJECT_COLORS[index]
        })),
        updates: [],
        teacherNote: `“${childFirst} has not started a lesson on this device yet. A five-minute lesson is a good place to begin.”`,
        teacherName: 'Sample teacher note'
      } satisfies ParentSnapshot;
    }

    const mathsMastery = accuracy;
    return {
      mode: 'linked',
      childName: child.name,
      grade: child.grade || 'Grade 11',
      school: child.school || 'Your school',
      linkedEmail: child.email,
      lastSynced: learner.lastLessonAt ? relativeTime(learner.lastLessonAt) : 'Recently',
      streak: learner.streak,
      lessonsThisWeek,
      questionsAnswered,
      accuracy,
      weekly,
      subjects: [
        {
          subject: 'Mathematics',
          mastery: mathsMastery,
          detail: `${completedIds.size} ${completedIds.size === 1 ? 'lesson' : 'lessons'} completed`,
          color: 'bg-sun'
        },
        ...['Physical Sciences', 'English', 'Computer Literacy'].map((subject, index) => ({
          subject,
          mastery: 0,
          detail: 'No activity yet',
          color: SUBJECT_COLORS[index + 1]
        }))
      ],
      updates,
      teacherNote: demoChild.teacherNote.replace('Lwazi', childFirst),
      teacherName: demoChild.teacherName
    } satisfies ParentSnapshot;
  }, [account, childEmail]);
}
