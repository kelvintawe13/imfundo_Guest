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
    label: 'of Eastern Cape households have a fixed or in-home internet connection, the lowest of all nine provinces.',
    source: 'The State of the ICT Sector Report of South Africa, 2025',
    barMin: 8,
    barMax: 10.4
  },
  mobile: {
    value: '96.1%',
    label: 'of South African households own at least one mobile phone.',
    source: 'Statistics South Africa, 2024',
    bar: 96.1
  }
};

export const stakeholders = [
{
  tier: 'Primary',
  who: 'Learners',
  text: 'Cut off from online lessons, research and homework help.',
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
  text: 'Barely scraping by and unable to afford the high cost of data.',
  icon: HouseIcon
}];


export const opportunities = [
{
  title: 'Demand for data-free learning',
  text: 'Unreliable broadband and high data costs create clear demand for a local, offline solution.',
  icon: TargetIcon
},
{
  title: 'An unserved rural market',
  text: 'Current EdTech assumes connectivity. Rural learners in Idutywa are left out entirely.',
  icon: TrendingUpIcon
},
{
  title: 'Aligned with GCGO Education',
  text: 'Closing the rural learning gap creates a competitive edge rooted in a Grand Challenge.',
  icon: SparklesIcon
}];


export const surfaces = [
{
  title: 'Learner Dashboard',
  text: 'Offline status, a live sync queue and bite-sized lessons ready on the device.',
  to: '/dashboard',
  icon: LayoutDashboardIcon
},
{
  title: 'Teacher Corner',
  text: 'Class analytics that arrive when devices sync, plus printable resources.',
  to: '/teachers',
  icon: PresentationIcon
}];


export const offlineSteps = [
{
  title: 'Install once',
  text: 'Download the app and lesson packs at a school hotspot or shared device.',
  icon: DownloadIcon
},
{
  title: 'Learn fully offline',
  text: 'Quizzes, feedback and the AI tutor all run on the phone. Zero data used.',
  icon: WifiOffIcon
},
{
  title: 'Sync when possible',
  text: 'Progress queues locally and uploads the next time any connection appears.',
  icon: CloudUploadIcon
}];


export const lessonPlayerPreview = {
  title: 'Lesson Player',
  text: 'Gamified quizzes with instant, on-device feedback, XP, combos and explanations in English or isiXhosa.',
  to: '/lesson',
  icon: CirclePlayIcon
};