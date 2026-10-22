import { images } from './images';

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Programmes', to: '/programmes' },
  { label: "Teachers' Corner", to: '/teachers' },
  { label: 'Contact', to: '/contact' },
];

export const featuredStat = {
  value: '8%–10.4%',
  label: 'of Eastern Cape households have a fixed or in-home internet connection.',
  source: 'The State of the ICT Sector Report of South Africa, 2025',
};

export const stats = [
  {
    value: '96.1%',
    label: 'of South African households own at least one mobile phone.',
    source: 'Statistics South Africa, 2024',
  },
];

export const stakeholders = [
  {
    tier: 'Primary',
    who: 'Learners',
    text: 'High school learners in Idutywa who are cut off from online lessons, research and homework help.',
  },
  {
    tier: 'Secondary',
    who: 'Teachers',
    text: 'Under-resourced teachers working without reliable devices, connectivity or ICT training.',
  },
  {
    tier: 'Tertiary',
    who: 'Households',
    text: 'Families who are barely scraping by and cannot afford the high cost of mobile data.',
  },
];

export const opportunities = [
  {
    title: 'Clear demand for data-free learning',
    text: 'Unreliable broadband and high data costs create real demand for a local, offline educational solution.',
  },
  {
    title: 'An unserved rural market',
    text: 'A gamified, offline AI tutor reaches a rural student demographic that current EdTech products overlook.',
  },
  {
    title: 'Aligned with GCGO Education',
    text: 'Closing the rural learning gap gives Imfundo Quest a competitive edge rooted in a Grand Challenge.',
  },
];

export const features = [
  {
    title: 'Works offline',
    text: 'Lessons and the AI tutor run on the phone itself, so learning continues during load shedding and in low-signal areas.',
    image: images.offline,
    alt: 'Cartoon learner studying on a phone by candlelight during load shedding',
  },
  {
    title: 'Learn through play',
    text: 'Short, game-like lessons with points and levels keep learners motivated, a few minutes at a time.',
    image: images.play,
    alt: 'Cartoon phone showing a points bar, level badge and trophy',
  },
  {
    title: 'Support in your language',
    text: 'Explanations that help learners who switch between isiXhosa and English.',
    image: images.language,
    alt: 'Two cartoon learners explaining a problem to each other over a textbook',
  },
];

export const homeSteps = [
  { title: 'Get the app', text: 'Install it once, from a school hotspot or shared device, then use it without data.' },
  { title: 'Learn in short bursts', text: "Pick a subject, play a micro-lesson and ask the AI tutor when you're stuck." },
  { title: 'Level up', text: 'Earn points, unlock new levels and see your progress grow.' },
];
