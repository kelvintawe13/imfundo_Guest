import type {
  CommunityMessage,
  CommunityRoom,
  PastPaper,
  StudySession
} from '../types/community';

export const communityRooms: CommunityRoom[] = [
  {
    id: 'general',
    name: 'General hangout',
    description: 'Say hello, share a win or plan a study meet-up.',
    emoji: '☀️',
    accent: 'sun',
    interests: [],
    kind: 'curated',
    memberCount: 34,
    memberIds: [],
    reportedBy: []
  },
  {
    id: 'maths',
    name: 'Maths help',
    description: 'Quadratics, trigonometry and homework support.',
    emoji: '➗',
    accent: 'teal',
    interests: ['mathematics', 'exam-prep'],
    kind: 'curated',
    memberCount: 28,
    memberIds: [],
    reportedBy: []
  },
  {
    id: 'science',
    name: 'Physical Sciences',
    description: "Newton's laws, equations and lab-free practicals.",
    emoji: '⚗️',
    accent: 'sky',
    interests: ['physical-sciences'],
    kind: 'curated',
    memberCount: 24,
    memberIds: [],
    reportedBy: []
  },
  {
    id: 'exam-prep',
    name: 'Exam prep',
    description: 'Past papers, memos and revision plans that work.',
    emoji: '📄',
    accent: 'coral',
    interests: ['exam-prep', 'mathematics', 'physical-sciences'],
    kind: 'curated',
    memberCount: 31,
    memberIds: [],
    reportedBy: []
  },
  {
    id: 'coding',
    name: 'Coding club',
    description: 'First programs, phone-friendly tools and problem solving.',
    emoji: '⌨️',
    accent: 'sky',
    interests: ['coding', 'computer-literacy'],
    kind: 'curated',
    memberCount: 19,
    memberIds: [],
    reportedBy: []
  },
  {
    id: 'robotics',
    name: 'Robotics lab',
    description: 'Sensors, simple machines and competition ideas.',
    emoji: '🤖',
    accent: 'teal',
    interests: ['robotics', 'physical-sciences'],
    kind: 'curated',
    memberCount: 12,
    memberIds: [],
    reportedBy: []
  },
  {
    id: 'debate',
    name: 'Debate society',
    description: 'Build an argument, practise a speech, compare notes.',
    emoji: '🎤',
    accent: 'sun',
    interests: ['debate', 'english'],
    kind: 'curated',
    memberCount: 15,
    memberIds: [],
    reportedBy: []
  },
  {
    id: 'entrepreneurs',
    name: 'Young entrepreneurs',
    description: 'Turn a small idea into a plan, a price and a pitch.',
    emoji: '💡',
    accent: 'coral',
    interests: ['entrepreneurship'],
    kind: 'curated',
    memberCount: 11,
    memberIds: [],
    reportedBy: []
  },
  {
    id: 'university',
    name: 'University & bursaries',
    description: 'Applications, funding and choosing what comes next.',
    emoji: '🎓',
    accent: 'sky',
    interests: ['university-applications', 'english'],
    kind: 'curated',
    memberCount: 23,
    memberIds: [],
    reportedBy: []
  },
  {
    id: 'arts',
    name: 'Arts & music',
    description: 'Share what you make and find people to make it with.',
    emoji: '🎨',
    accent: 'coral',
    interests: ['arts'],
    kind: 'curated',
    memberCount: 14,
    memberIds: [],
    reportedBy: []
  },
  {
    id: 'sport',
    name: 'Sport & fitness',
    description: 'Training, teamwork and staying active after school.',
    emoji: '⚽',
    accent: 'teal',
    interests: ['sport'],
    kind: 'curated',
    memberCount: 21,
    memberIds: [],
    reportedBy: []
  }
];

export const communityPeers = [
  { id: 'peer-thando', name: 'Thando M.', initials: 'TM', online: true },
  { id: 'peer-nolwazi', name: 'Nolwazi S.', initials: 'NS', online: true },
  { id: 'peer-bongani', name: 'Bongani D.', initials: 'BD', online: true },
  { id: 'peer-zanele', name: 'Zanele P.', initials: 'ZP', online: true },
  { id: 'peer-anele', name: 'Anele M.', initials: 'AM', online: false },
  { id: 'peer-ayanda', name: 'Ayanda K.', initials: 'AK', online: false },
  { id: 'peer-sipho', name: 'Sipho N.', initials: 'SN', online: false },
  { id: 'peer-lindiwe', name: 'Lindiwe T.', initials: 'LT', online: false }
];

const minutesAgo = (minutes: number) => Date.now() - minutes * 60_000;
const daysAgo = (days: number) => Date.now() - days * 86_400_000;

export const seedMessages: CommunityMessage[] = [
  {
    id: 'seed-general-1',
    roomId: 'general',
    authorId: 'peer-nolwazi',
    authorName: 'Nolwazi S.',
    authorInitials: 'NS',
    authorRole: 'learner',
    text: "Morning team! Who's joining the maths cram session on Thursday? I'm bringing my trig notes.",
    at: minutesAgo(190),
    supportedBy: ['peer-thando', 'peer-zanele']
  },
  {
    id: 'seed-general-2',
    roomId: 'general',
    authorId: 'peer-thando',
    authorName: 'Thando M.',
    authorInitials: 'TM',
    authorRole: 'learner',
    text: "I'm in. I'll also share the November paper in the papers tab. Let's meet here at 16:00.",
    at: minutesAgo(174),
    supportedBy: ['peer-nolwazi', 'peer-bongani', 'peer-ayanda']
  },
  {
    id: 'seed-general-3',
    roomId: 'general',
    authorId: 'peer-bongani',
    authorName: 'Bongani D.',
    authorInitials: 'BD',
    authorRole: 'learner',
    text: 'New here 👋 I downloaded the app at school and it works without data. This room is a good idea.',
    at: minutesAgo(96),
    supportedBy: ['peer-nolwazi', 'peer-zanele']
  },
  {
    id: 'seed-maths-1',
    roomId: 'maths',
    authorId: 'peer-anele',
    authorName: 'Anele M.',
    authorInitials: 'AM',
    authorRole: 'learner',
    text: 'Can someone explain why x² − 9 has two answers? I get x = 3 but I keep missing the negative one.',
    at: minutesAgo(52),
    supportedBy: ['peer-ayanda']
  },
  {
    id: 'seed-maths-2',
    roomId: 'maths',
    authorId: 'peer-thando',
    authorName: 'Thando M.',
    authorInitials: 'TM',
    authorRole: 'learner',
    text: 'Because x² − 9 = (x − 3)(x + 3). If a product is zero, either bracket can be zero. So x = 3 or x = −3.',
    at: minutesAgo(47),
    replyTo: {
      authorName: 'Anele M.',
      text: 'Why does x² − 9 have two answers?'
    },
    supportedBy: ['peer-anele', 'peer-nolwazi', 'peer-zanele', 'peer-ayanda']
  },
  {
    id: 'seed-maths-3',
    roomId: 'maths',
    authorId: 'peer-ayanda',
    authorName: 'Ayanda K.',
    authorInitials: 'AK',
    authorRole: 'learner',
    text: 'I uploaded the memo that walks through each step. Check the exam prep room and the papers tab 📄',
    at: minutesAgo(43),
    supportedBy: ['peer-anele']
  },
  {
    id: 'seed-maths-4',
    roomId: 'maths',
    authorId: 'peer-zanele',
    authorName: 'Zanele P.',
    authorInitials: 'ZP',
    authorRole: 'learner',
    text: 'Small tip: always substitute both answers back into the original equation. It catches the sign mistakes.',
    at: minutesAgo(31),
    supportedBy: ['peer-thando', 'peer-anele']
  },
  {
    id: 'seed-science-1',
    roomId: 'science',
    authorId: 'peer-sipho',
    authorName: 'Sipho N.',
    authorInitials: 'SN',
    authorRole: 'learner',
    text: "Newton's third law feels backwards when I kick a ball. The ball moves, I don't. How?",
    at: minutesAgo(88),
    supportedBy: ['peer-bongani']
  },
  {
    id: 'seed-science-2',
    roomId: 'science',
    authorId: 'peer-zanele',
    authorName: 'Zanele P.',
    authorInitials: 'ZP',
    authorRole: 'learner',
    text: 'Your foot pushes the ball forward, and the ball pushes your foot back with the same size force. The ball has much less mass, so it accelerates more. Same force, different mass.',
    at: minutesAgo(74),
    replyTo: {
      authorName: 'Sipho N.',
      text: "Newton's third law feels backwards when I kick a ball."
    },
    supportedBy: ['peer-sipho', 'peer-thando', 'peer-nolwazi']
  },
  {
    id: 'seed-science-3',
    roomId: 'science',
    authorId: 'peer-bongani',
    authorName: 'Bongani D.',
    authorInitials: 'BD',
    authorRole: 'learner',
    text: "There's a lab-free practical in the Physics module. It uses a phone and a ruler to show the reaction force. I'll post my results later.",
    at: minutesAgo(60),
    supportedBy: ['peer-zanele']
  },
  {
    id: 'seed-exam-1',
    roomId: 'exam-prep',
    authorId: 'peer-lindiwe',
    authorName: 'Lindiwe T.',
    authorInitials: 'LT',
    authorRole: 'learner',
    text: 'Paper 1 memo is in the papers tab. Question 5 is the one everyone gets wrong — read the memo line by line.',
    at: minutesAgo(220),
    supportedBy: ['peer-thando', 'peer-anele', 'peer-ayanda']
  },
  {
    id: 'seed-exam-2',
    roomId: 'exam-prep',
    authorId: 'peer-thando',
    authorName: 'Thando M.',
    authorInitials: 'TM',
    authorRole: 'learner',
    text: 'My revision loop: 20 minutes on a past paper, 10 minutes checking the memo, 5 minutes rewriting only the mistakes. Three rounds a week is enough.',
    at: minutesAgo(150),
    supportedBy: ['peer-nolwazi', 'peer-lindiwe', 'peer-bongani', 'peer-zanele']
  },
  {
    id: 'seed-coding-1',
    roomId: 'coding',
    authorId: 'peer-bongani',
    authorName: 'Bongani D.',
    authorInitials: 'BD',
    authorRole: 'learner',
    text: 'I followed the spreadsheet lesson and built a small budget tracker for my aunt’s shop. It works offline on my phone.',
    at: minutesAgo(120),
    supportedBy: ['peer-ayanda', 'peer-thando']
  },
  {
    id: 'seed-coding-2',
    roomId: 'coding',
    authorId: 'peer-ayanda',
    authorName: 'Ayanda K.',
    authorInitials: 'AK',
    authorRole: 'learner',
    text: 'Nice! Next step is naming your columns clearly and checking one formula at a time. Small steps beat one big formula.',
    at: minutesAgo(102),
    replyTo: {
      authorName: 'Bongani D.',
      text: 'I built a small budget tracker for my aunt’s shop.'
    },
    supportedBy: ['peer-bongani']
  },
  {
    id: 'seed-university-1',
    roomId: 'university',
    authorId: 'peer-lindiwe',
    authorName: 'Lindiwe T.',
    authorInitials: 'LT',
    authorRole: 'learner',
    text: 'Does anyone know where to check bursary closing dates? I do not want to miss the next one.',
    at: minutesAgo(180),
    supportedBy: ['peer-nolwazi']
  },
  {
    id: 'seed-university-2',
    roomId: 'university',
    authorId: 'peer-nolwazi',
    authorName: 'Nolwazi S.',
    authorInitials: 'NS',
    authorRole: 'learner',
    text: 'Write every deadline in one place and add a reminder two weeks before. Also keep a copy of your ID and results ready.',
    at: minutesAgo(166),
    replyTo: {
      authorName: 'Lindiwe T.',
      text: 'Where can I check bursary closing dates?'
    },
    supportedBy: ['peer-lindiwe', 'peer-thando']
  },
  {
    id: 'seed-debate-1',
    roomId: 'debate',
    authorId: 'peer-zanele',
    authorName: 'Zanele P.',
    authorInitials: 'ZP',
    authorRole: 'learner',
    text: 'Our topic this week is “school uniforms should be optional”. I am on the opposing side and need one strong opening point.',
    at: minutesAgo(140),
    supportedBy: ['peer-thando']
  },
  {
    id: 'seed-debate-2',
    roomId: 'debate',
    authorId: 'peer-thando',
    authorName: 'Thando M.',
    authorInitials: 'TM',
    authorRole: 'learner',
    text: 'Start with cost and practicality, then give one example from your own school. A clear example lands better than three big claims.',
    at: minutesAgo(128),
    supportedBy: ['peer-zanele', 'peer-ayanda']
  }
];

export const seedPapers: PastPaper[] = [
  {
    id: 'paper-maths-p1-2025',
    title: 'Mathematics Paper 1',
    subject: 'Mathematics',
    grade: 'Grade 11',
    year: 'November 2025',
    kind: 'Exam paper',
    size: '1.8 MB',
    uploadedBy: 'Thando M.',
    uploadedAt: daysAgo(3),
    sampleQuestions: [
      'Solve for x: x² − 7x + 12 = 0.',
      'A rectangle has length (x + 5) and width (x − 2). Write an expression for its area.',
      'Determine the value of k if the roots of x² + kx + 9 = 0 are equal.'
    ]
  },
  {
    id: 'paper-maths-memo-2025',
    title: 'Mathematics Paper 1 memo',
    subject: 'Mathematics',
    grade: 'Grade 11',
    year: 'November 2025',
    kind: 'Memo',
    size: '920 KB',
    uploadedBy: 'Ayanda K.',
    uploadedAt: daysAgo(3),
    sampleQuestions: [
      'Q1: (x − 3)(x − 4) = 0, so x = 3 or x = 4.',
      'Q2: Area = x² + 3x − 10.',
      'Q3: For equal roots, discriminant b² − 4ac = 0, so k = ±6.'
    ]
  },
  {
    id: 'paper-science-p2-2025',
    title: 'Physical Sciences Paper 2',
    subject: 'Physical Sciences',
    grade: 'Grade 11',
    year: 'November 2025',
    kind: 'Exam paper',
    size: '2.1 MB',
    uploadedBy: 'Zanele P.',
    uploadedAt: daysAgo(5),
    sampleQuestions: [
      "State Newton's third law in words.",
      'A 2 kg object accelerates at 3 m·s⁻². Calculate the net force.',
      'Explain why the reaction force does not cancel the action force.'
    ]
  },
  {
    id: 'paper-science-sn-2025',
    title: 'Newton’s laws study notes',
    subject: 'Physical Sciences',
    grade: 'Grade 11',
    year: 'Term 3 notes',
    kind: 'Study notes',
    size: '640 KB',
    uploadedBy: 'Bongani D.',
    uploadedAt: daysAgo(8),
    sampleQuestions: [
      'Inertia is an object’s resistance to a change in motion.',
      'Fnet = ma applies only when the forces are unbalanced.',
      'Action–reaction pairs act on different objects, never the same object.'
    ]
  },
  {
    id: 'paper-english-p2-2025',
    title: 'English Paper 2 practice',
    subject: 'English',
    grade: 'Grade 11',
    year: 'Practice set',
    kind: 'Practice paper',
    size: '780 KB',
    uploadedBy: 'Nolwazi S.',
    uploadedAt: daysAgo(11),
    sampleQuestions: [
      'Write a formal email requesting a meeting with your principal.',
      'Identify the main argument in the short passage and give two supporting details.',
      'Rewrite the sentence in the past tense: “The learners write a practice essay.”'
    ]
  }
];

export const seedSessions: StudySession[] = [
  {
    id: 'session-maths',
    title: 'Quadratics cram session',
    roomId: 'maths',
    dateLabel: 'Thu 29 Oct',
    timeLabel: '16:00 – 16:40',
    host: 'Thando M.',
    attendees: 12,
    joinedBy: []
  },
  {
    id: 'session-science',
    title: 'Paper 2 walkthrough',
    roomId: 'science',
    dateLabel: 'Sat 31 Oct',
    timeLabel: '10:00 – 10:45',
    host: 'Zanele P.',
    attendees: 8,
    joinedBy: []
  }
];

export const communityGuidelines = [
  'Be kind. Everyone is here to learn.',
  'Never share your phone number, address or photos.',
  'Credit the source when you share a past paper or memo.',
  'Report unsafe or hurtful posts to a teacher or guardian.'
];

export const studyPrompts = [
  'Can someone help me with…',
  'This worked for me:',
  'Who wants to study together?'
];
