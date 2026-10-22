import { AwardIcon, BrainIcon, FlameIcon, MedalIcon, TargetIcon, TrophyIcon, ZapIcon, type LucideIcon } from 'lucide-react';
import type { QuizProgress } from '../types/app';
import type { LearnerData } from './learnerData';
import { totalXpFromProgress } from './learnerData';

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  current: number;
  target: number;
  unit?: string;
  earned: boolean;
};

export function buildAchievements(
  data: LearnerData,
  progress: Record<string, QuizProgress>
): Achievement[] {
  const totalXp = totalXpFromProgress(progress);
  const finished = Object.values(progress).filter((saved) => saved.finished);
  const completedLessons = new Set([
    ...data.completedLessonIds,
    ...Object.entries(progress).filter(([, saved]) => saved.finished).map(([lessonId]) => lessonId)
  ]).size;
  const bestCombo = Object.values(progress).reduce((best, saved) => Math.max(best, saved.bestCombo), 0);
  const bestScore = finished.reduce((best, saved) => Math.max(best, saved.correctCount), 0);
  const answeredQuestions = Object.values(data.dailyQuestions).reduce((total, count) => total + count, 0);

  return [
    {
      id: 'first-lesson',
      name: 'First lesson',
      description: 'Finish your first micro-lesson',
      icon: TargetIcon,
      current: completedLessons,
      target: 1,
      earned: completedLessons >= 1
    },
    {
      id: 'perfect-quiz',
      name: 'Perfect quiz',
      description: 'Answer every question correctly',
      icon: TrophyIcon,
      current: Math.min(bestScore, 5),
      target: 5,
      earned: bestScore >= 5
    },
    {
      id: 'combo',
      name: 'Combo master',
      description: 'Get three correct answers in a row',
      icon: ZapIcon,
      current: Math.min(bestCombo, 3),
      target: 3,
      earned: bestCombo >= 3
    },
    {
      id: 'questions-10',
      name: 'Question explorer',
      description: 'Answer 10 questions',
      icon: BrainIcon,
      current: Math.min(answeredQuestions, 10),
      target: 10,
      earned: answeredQuestions >= 10
    },
    {
      id: 'streak-7',
      name: '7-day streak',
      description: 'Learn for seven days in a row',
      icon: FlameIcon,
      current: Math.min(data.streak, 7),
      target: 7,
      earned: data.streak >= 7
    },
    {
      id: 'streak-30',
      name: '30-day streak',
      description: 'Learn for thirty days in a row',
      icon: MedalIcon,
      current: Math.min(data.streak, 30),
      target: 30,
      earned: data.streak >= 30
    },
    {
      id: 'xp-500',
      name: '500 XP',
      description: 'Earn your first 500 XP',
      icon: ZapIcon,
      current: Math.min(totalXp, 500),
      target: 500,
      unit: 'XP',
      earned: totalXp >= 500
    },
    {
      id: 'xp-1000',
      name: '1,000 XP',
      description: 'Reach 1,000 XP',
      icon: AwardIcon,
      current: Math.min(totalXp, 1000),
      target: 1000,
      unit: 'XP',
      earned: totalXp >= 1000
    }
  ];
}
