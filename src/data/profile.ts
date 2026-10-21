import { AwardIcon, BrainIcon, FlameIcon, MedalIcon, MoonIcon, TargetIcon, TrophyIcon, ZapIcon } from 'lucide-react';

export const learner = {
  name: 'Lwazi Mbeki',
  initials: 'LM',
  grade: 'Grade 11',
  school: 'Idutywa, Eastern Cape',
  joined: 'Joined February 2026'
};

export const badges = [
{ name: '7-day streak', icon: FlameIcon, earned: true },
{ name: 'Quadratics starter', icon: TargetIcon, earned: true },
{ name: 'Load-shedding learner', icon: MoonIcon, earned: true },
{ name: 'Perfect quiz', icon: TrophyIcon, earned: true },
{ name: '1,000 XP', icon: ZapIcon, earned: true },
{ name: '30-day streak', icon: MedalIcon, earned: false },
{ name: 'Science explorer', icon: BrainIcon, earned: false },
{ name: 'Top of class', icon: AwardIcon, earned: false }];


export const recentActivity = [
{ title: 'Number patterns and sequences', meta: 'Completed · +40 XP', when: 'Yesterday' },
{ title: 'Perfect quiz badge', meta: 'Badge earned', when: 'Yesterday' },
{ title: 'Newton’s laws in everyday life', meta: 'Started · 20%', when: '2 days ago' },
{ title: 'Key science terms in isiXhosa', meta: 'In progress · 45%', when: '3 days ago' }];