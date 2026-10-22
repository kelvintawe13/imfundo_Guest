import {
  CirclePlayIcon,
  CloudUploadIcon,
  DownloadIcon,
  GraduationCapIcon,
  HouseIcon,
  LayoutDashboardIcon,
  PresentationIcon,
  SparklesIcon,
  TargetIcon,
  TrendingUpIcon,
  WifiOffIcon } from
'lucide-react';

export const insightStats = {
  fixed: {
    value: '8%–10.4%',
    label: 'Eastern Cape homes with in-home internet — the lowest of the nine provinces.',
    source: 'The State of the ICT Sector Report of South Africa, 2025',
    barMin: 8,
    barMax: 10.4
  },
  mobile: {
    value: '96.1%',
    label: 'South African households own at least one mobile phone.',
    source: 'Statistics South Africa, 2024',
    bar: 96.1
  }
};

export const stakeholders = [
{
  tier: 'Primary',
  who: 'Learners',
  text: 'Shut out of online lessons, research and homework help.',
  icon: GraduationCapIcon
},
{
  tier: 'Secondary',
  who: 'Teachers',
  text: 'Under-resourced, with little connectivity or ICT training.',
  icon: PresentationIcon
},
{
  tier: 'Tertiary',
  who: 'Households',
  text: 'Priced out of the data needed for schoolwork.',
  icon: HouseIcon
}];


export const opportunities = [
{
  title: 'Demand for data-free learning',
  text: 'Patchy broadband and high data costs create clear demand for an offline tutor.',
  icon: TargetIcon
},
{
  title: 'An unserved rural market',
  text: 'EdTech assumes connectivity. Rural learners in Idutywa are left out.',
  icon: TrendingUpIcon
},
{
  title: 'Aligned with GCGO Education',
  text: 'Closing the rural learning gap is a Grand Challenge education play.',
  icon: SparklesIcon
}];


export const surfaces = [
{
  title: 'Learner Dashboard',
  text: 'Offline status, a live sync queue and lessons ready on the device.',
  to: '/dashboard',
  icon: LayoutDashboardIcon
},
{
  title: 'Teacher Corner',
  text: 'Class analytics that arrive on sync, plus printable resources.',
  to: '/teachers',
  icon: PresentationIcon
}];


export const offlineSteps = [
{
  title: 'Install once',
  text: 'Pack the app and lesson bundles at a school hotspot.',
  icon: DownloadIcon
},
{
  title: 'Learn fully offline',
  text: 'Quizzes, feedback and the AI tutor run on the phone.',
  icon: WifiOffIcon
},
{
  title: 'Sync when possible',
  text: 'Progress queues locally, then uploads on the next signal.',
  icon: CloudUploadIcon
}];


export const lessonPlayerPreview = {
  title: 'Lesson Player',
  text: 'Gamified quizzes with instant feedback, XP and explanations in English or isiXhosa.',
  to: '/lesson',
  icon: CirclePlayIcon
};