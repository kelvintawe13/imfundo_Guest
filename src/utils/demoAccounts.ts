import { ensureSeededAccount } from './auth';
import {
  localDateKey,
  readLearnerDataForAccount,
  writeLearnerDataForAccount,
  type LearnerData
} from './learnerData';
import {
  readLearningProgressForAccount,
  writeLearningProgressForAccount
} from './learningProgress';
import type { QuizProgress } from '../types/app';

export type DemoRole = 'learner' | 'parent' | 'staff';

export type DemoAccountDefinition = {
  id: string;
  label: string;
  description: string;
  name: string;
  email: string;
  role: DemoRole;
  grade: string;
  school: string;
  childEmail: string;
  interests: string[];
};

export const DEMO_PASSWORD = 'Imfundo#2026';

export const DEMO_ACCOUNTS: Record<DemoRole, DemoAccountDefinition> = {
  learner: {
    id: 'demo-learner',
    label: 'Learner',
    description: 'Grade 11 · activity and XP',
    name: 'Lwazi Ndlovu',
    email: 'learner@demo.imfundoquest.co.za',
    role: 'learner',
    grade: 'Grade 11',
    school: 'Idutywa Secondary School',
    childEmail: '',
    interests: ['mathematics', 'physical-sciences', 'exam-prep', 'coding']
  },
  parent: {
    id: 'demo-parent',
    label: 'Parent',
    description: 'Linked to Lwazi',
    name: 'Nomsa Ndlovu',
    email: 'parent@demo.imfundoquest.co.za',
    role: 'parent',
    grade: 'Grade 11',
    school: 'Idutywa Secondary School',
    childEmail: 'learner@demo.imfundoquest.co.za',
    interests: []
  },
  staff: {
    id: 'demo-teacher',
    label: 'Teacher',
    description: 'Staff workspace',
    name: 'Ms N. Mbeki',
    email: 'teacher@demo.imfundoquest.co.za',
    role: 'staff',
    grade: '',
    school: 'Idutywa Secondary School',
    childEmail: '',
    interests: []
  }
};

export const DEMO_ROLES: DemoRole[] = ['learner', 'parent', 'staff'];

export type DemoPreparation = { ok: true } | { ok: false; error: string };

function dayKey(offset: number): string {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return localDateKey(date);
}

function demoLearnerData(): LearnerData {
  const now = Date.now();
  return {
    version: 1,
    streak: 4,
    lastActiveDate: dayKey(0),
    activityDates: [dayKey(3), dayKey(2), dayKey(1), dayKey(0)],
    dailyLessons: {
      [dayKey(6)]: 1,
      [dayKey(4)]: 2,
      [dayKey(3)]: 1,
      [dayKey(1)]: 2,
      [dayKey(0)]: 1
    },
    dailyQuestions: {
      [dayKey(6)]: 6,
      [dayKey(4)]: 14,
      [dayKey(3)]: 6,
      [dayKey(1)]: 10,
      [dayKey(0)]: 8
    },
    completedLessonIds: ['m1', 'm2', 'p1'],
    offlineLessonIds: ['m2', 'p1', 'c1'],
    updates: [
      {
        id: 'demo-update-1',
        title: 'Finished “Solving quadratic equations by factoring”',
        text: 'Scored 4 out of 5 and earned 55 XP. The quiz was completed offline.',
        at: now - 45 * 60_000
      },
      {
        id: 'demo-update-2',
        title: 'Practised four days in a row',
        text: 'Short sessions are adding up. The streak is now four days.',
        at: now - 26 * 60 * 60_000
      },
      {
        id: 'demo-update-3',
        title: 'Asked the tutor for help',
        text: 'Asked how to choose the right factor pair when factoring.',
        at: now - 2 * 24 * 60 * 60_000
      }
    ],
    lastLessonId: 'm1',
    lastLessonTitle: 'Solving quadratic equations by factoring',
    lastLessonAt: now - 45 * 60_000,
    seenEventIds: ['demo-lesson-complete']
  };
}

const demoProgress: Record<string, QuizProgress> = {
  m1: {
    index: 4,
    selected: 0,
    checked: true,
    xp: 55,
    lastGain: 20,
    correctCount: 4,
    combo: 2,
    bestCombo: 3,
    finished: true,
    hintShown: false,
    timeLeft: 3,
    earnedXp: 55,
    advanceIn: null
  }
};

function seedDemoLearnerData(accountId: string) {
  const learner = readLearnerDataForAccount(accountId);
  const hasActivity =
    learner.activityDates.length > 0 ||
    learner.completedLessonIds.length > 0 ||
    learner.updates.length > 0 ||
    learner.lastLessonAt !== null;

  if (!hasActivity) {
    writeLearnerDataForAccount(accountId, demoLearnerData());
  }

  if (Object.keys(readLearningProgressForAccount(accountId)).length === 0) {
    writeLearningProgressForAccount(accountId, demoProgress);
  }
}

async function seedAccounts(): Promise<DemoPreparation> {
  let learnerAccountId = DEMO_ACCOUNTS.learner.id;

  for (const role of DEMO_ROLES) {
    const definition = DEMO_ACCOUNTS[role];
    const result = await ensureSeededAccount({
      id: definition.id,
      name: definition.name,
      email: definition.email,
      password: DEMO_PASSWORD,
      role: definition.role,
      grade: definition.grade,
      school: definition.school,
      childEmail: definition.childEmail,
      interests: definition.interests
    });
    if (!result.ok) return { ok: false, error: result.error };
    if (role === 'learner') learnerAccountId = result.account.id;
  }

  seedDemoLearnerData(learnerAccountId);
  return { ok: true };
}

let preparation: Promise<DemoPreparation> | null = null;

/** Idempotently create the known learner, parent and teacher demo accounts. */
export function prepareDemoAccounts(): Promise<DemoPreparation> {
  if (!preparation) {
    preparation = seedAccounts().then(
      (result) => {
        if (!result.ok) preparation = null;
        return result;
      },
      (error) => {
        console.warn('Unable to prepare the demo accounts.', error);
        preparation = null;
        return { ok: false, error: 'Could not prepare the demo accounts on this device.' };
      }
    );
  }
  return preparation;
}
