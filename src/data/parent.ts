export type StoryAccent = 'sun' | 'teal' | 'sky' | 'coral';

export type LearningStorySection = {
  heading: string;
  paragraphs: string[];
};

export type LearningStory = {
  id: string;
  title: string;
  category: string;
  summary: string;
  readMins: number;
  author: string;
  accent: StoryAccent;
  featured?: boolean;
  sections: LearningStorySection[];
  tips: string[];
};

export const storyCategories = [
  'All stories',
  'How learning works',
  'Maths at home',
  'Reading & language',
  'Everyday science',
  'Exam support',
  'Digital habits'
];

export const learningStories: LearningStory[] = [
  {
    id: 'five-minute-learning',
    title: 'Why five-minute lessons beat one long cram',
    category: 'How learning works',
    summary:
      'Short, repeated practice helps children remember more than a single long study session. Here is the science behind the micro-lesson, and how to use it at home.',
    readMins: 4,
    author: 'The Imfundo learning team',
    accent: 'sun',
    featured: true,
    sections: [
      {
        heading: 'The forgetting curve is real',
        paragraphs: [
          'When we learn something once, our memory of it drops quickly over the next few days. Revisiting the same idea in short bursts interrupts that drop. Five focused minutes on Monday, Wednesday and Friday usually beats one 45-minute session on Sunday night.',
          'This is why Imfundo Quest uses three- to five-minute lessons. Each lesson ends with a small quiz so the learner has to pull the idea back out of memory, not just read it again.'
        ]
      },
      {
        heading: 'Small wins keep learners going',
        paragraphs: [
          'A long study session feels endless when a child is already tired or worried about a subject. A five-minute lesson has a clear finish line. Finishing it gives a small dose of confidence, and confidence makes the next session easier to start.',
          'The XP and streak in the app are not there to replace real praise. They are a nudge. Your job is to notice the effort: “You came back to maths three times this week.”'
        ]
      },
      {
        heading: 'How to build the habit at home',
        paragraphs: [
          'Pick a time that already exists in the day — after supper, before the taxi, or while waiting for a sibling. Attach the lesson to that moment instead of creating a new routine from scratch.',
          'Do not turn it into a punishment. If your child misses a day, restart the next day without a lecture. Consistency matters more than a perfect record.'
        ]
      }
    ],
    tips: [
      'Choose one fixed five-minute slot and protect it for a week.',
      'Ask “What did you learn?” instead of “What did you get?”',
      'Let your child teach you one thing from the lesson.'
    ]
  },
  {
    id: 'help-with-maths',
    title: 'Helping with maths without doing the maths',
    category: 'Maths at home',
    summary:
      'You do not need to remember quadratic formulas to support a Grade 11 learner. These questions help them think without taking the pencil out of their hand.',
    readMins: 5,
    author: 'Nolitha M., maths teacher',
    accent: 'teal',
    sections: [
      {
        heading: 'Start with what the question is asking',
        paragraphs: [
          'Many learners lose marks before they calculate anything. Ask them to read the question aloud and say what it wants in their own words. “This one wants me to find x” is already useful thinking.',
          'If they are stuck, ask them to point to the part that does not make sense. That is usually more helpful than explaining the whole method again.'
        ]
      },
      {
        heading: 'Use questions instead of answers',
        paragraphs: [
          'Try: “What do you already know?”, “What would you try first?”, and “How could you check whether that is right?” These keep the thinking with the learner. When you give the answer too early, the lesson disappears as soon as the page is closed.',
          'For factoring, for example, they need two numbers that multiply to the last term and add to the middle term. You can ask them to list factor pairs out loud while they work. You do not need to know the answer yourself.'
        ]
      },
      {
        heading: 'When you genuinely cannot help',
        paragraphs: [
          'Say so. “I do not remember this, but let us find out together” protects your child from feeling stupid and models how to learn. They can ask the AI tutor or bring the question to the study room.',
          'If a topic keeps coming back, send a short note to the teacher. A specific message like “Ayanda is stuck on solving by factoring” is easier to act on than “maths is hard”.'
        ]
      }
    ],
    tips: [
      'Ask “What is the question asking?” before touching the calculator.',
      'Give a hint, wait 30 seconds, then give another hint.',
      'Celebrate the attempt, even when the final answer is wrong.'
    ]
  },
  {
    id: 'reading-together',
    title: 'Reading together when everyone is tired',
    category: 'Reading & language',
    summary:
      'Ten minutes of shared reading can build vocabulary, confidence and a stronger bond — even if you are not a confident reader yourself.',
    readMins: 4,
    author: 'The Imfundo learning team',
    accent: 'sky',
    sections: [
      {
        heading: 'You do not need to be fluent',
        paragraphs: [
          'Children benefit from seeing adults read, even slowly. Read a paragraph each. If an English word is difficult, switch to isiXhosa to explain it, then return to the sentence. Bilingual thinking is a strength, not a detour.',
          'The goal is not a perfect accent. The goal is a calm, regular moment where reading feels normal instead of stressful.'
        ]
      },
      {
        heading: 'Talk about the text',
        paragraphs: [
          'Stop after a paragraph and ask one question: “What do you think happens next?” or “Why did that character do that?” This builds comprehension, which matters more than reading speed.',
          'For older learners, use short news articles or the learning stories in this corner. Ask them to tell you the main idea in one sentence. That is the same skill they need in an exam.'
        ]
      }
    ],
    tips: [
      'Read the same short text twice: once for meaning, once for difficult words.',
      'Let your child choose the text sometimes.',
      'Keep a small notebook of new words and revisit five each week.'
    ]
  },
  {
    id: 'science-in-everyday-life',
    title: 'Turn the taxi rank into a science lab',
    category: 'Everyday science',
    summary:
      'Kitchens, taxis and cellphones are full of physics and chemistry. Simple questions turn ordinary moments into science practice without a laboratory.',
    readMins: 5,
    author: 'Sipho N., science teacher',
    accent: 'coral',
    sections: [
      {
        heading: 'Forces are everywhere',
        paragraphs: [
          'When a taxi brakes, ask why passengers lean forward. When a door is pushed, ask where the reaction force is. These questions connect Newton’s laws to the body, not just a textbook diagram.',
          'You do not need to know the formal answer. Ask your child to explain it to you, then check the lesson together. Explaining is one of the strongest ways to learn.'
        ]
      },
      {
        heading: 'Chemistry in the kitchen',
        paragraphs: [
          'Boiling water, dissolving sugar and rusting tins are all chemistry. Ask what changed, what stayed the same, and whether the change can be reversed. That is the beginning of particle thinking.',
          'Safety first: keep experiments to safe household observations. Do not mix cleaning products or heat sealed containers.'
        ]
      },
      {
        heading: 'Use the phone as a tool',
        paragraphs: [
          'A phone can measure time, take a photo of a shadow each hour, or record a slow-motion video of a bouncing ball. Ask your child to describe the pattern they see before looking up an explanation.',
          'This also models healthy screen use: the phone is a measuring instrument, not only entertainment.'
        ]
      }
    ],
    tips: [
      'Ask one “why” question on the way home from school.',
      'Let your child explain the answer, even if it is incomplete.',
      'Connect the observation to a lesson in the app afterwards.'
    ]
  },
  {
    id: 'exam-season-calm',
    title: 'Exam season without the panic',
    category: 'Exam support',
    summary:
      'A steady revision plan, sleep and small practice sessions do more for results than last-minute cramming. A practical guide for the weeks before exams.',
    readMins: 5,
    author: 'The Imfundo learning team',
    accent: 'sun',
    sections: [
      {
        heading: 'Make the plan visible',
        paragraphs: [
          'Write the exam dates on a calendar and work backwards. Give each subject two or three short slots a week instead of one long block. A plan on the wall is easier to trust than a plan in your head.',
          'Keep sessions small enough to start. “20 minutes of Paper 1” is more likely to happen than “study maths” on a tired evening.'
        ]
      },
      {
        heading: 'Practise, then check, then rewrite',
        paragraphs: [
          'Past papers are most useful when learners mark them. After a paper, spend ten minutes with the memo and five minutes rewriting only the questions that went wrong. That final step is where the learning happens.',
          'The study room has a past papers tab where learners can share papers and memos. Encourage your child to ask for help on a specific question rather than saying “I do not understand everything”.'
        ]
      },
      {
        heading: 'Protect sleep and food',
        paragraphs: [
          'A learner who sleeps six hours and studies two extra hours is not necessarily ahead. Memory is consolidated during sleep. Keep bedtime stable during exam week and make sure there is water and something to eat before a paper.',
          'Watch for panic: headaches, skipping meals, or saying “I will fail anyway”. Listen first, then speak to the school if it continues.'
        ]
      }
    ],
    tips: [
      'Plan short sessions and tick them off visibly.',
      'Use one past paper, then mark it with the memo.',
      'Set a consistent bedtime during exam week.'
    ]
  },
  {
    id: 'screen-time-that-counts',
    title: 'Screen time that actually counts',
    category: 'Digital habits',
    summary:
      'Not all screen time is the same. A few simple family rules can make the phone a learning tool without turning every conversation into a fight.',
    readMins: 4,
    author: 'The Imfundo learning team',
    accent: 'teal',
    sections: [
      {
        heading: 'Agree on the purpose',
        paragraphs: [
          'Ask what the phone is for in that moment: finishing a lesson, chatting with the study room, or switching off. None of these is automatically bad. Naming the purpose makes it easier to end the session.',
          'A simple family rule works better than a surprise switch-off: “Lessons first, then free time.” Write it down and apply it to adults too.'
        ]
      },
      {
        heading: 'Keep learning sessions short',
        paragraphs: [
          'The app is designed for short bursts. Encourage one or two lessons, then a break. Long passive scrolling is different from active practice, even when both happen on the same screen.',
          'If data is expensive, download lessons at school or a hotspot. The offline queue shows what is waiting to sync when a connection returns.'
        ]
      },
      {
        heading: 'Talk about safety',
        paragraphs: [
          'The study room is for learning support, not for sharing phone numbers, photos or home addresses. Read the house rules together and agree on what your child should do if a message feels unsafe: screenshot it, tell an adult, and report it.',
          'Keep the door open for questions. Children are more likely to tell you about a strange message if they are not afraid of losing the phone.'
        ]
      }
    ],
    tips: [
      'Agree on “lessons first, free time after”.',
      'Download lessons on Wi-Fi where possible.',
      'Read the study room house rules together once a term.'
    ]
  }
];

export const demoChild = {
  name: 'Lwazi Ndlovu',
  grade: 'Grade 11',
  school: 'Idutywa Secondary School',
  lastSynced: 'Today, 09:12',
  streak: 4,
  lessonsThisWeek: 7,
  questionsAnswered: 46,
  accuracy: 72,
  weekly: [
    { label: 'Mon', lessons: 2, questions: 12, minutes: 18 },
    { label: 'Tue', lessons: 1, questions: 8, minutes: 12 },
    { label: 'Wed', lessons: 2, questions: 14, minutes: 22 },
    { label: 'Thu', lessons: 0, questions: 0, minutes: 0 },
    { label: 'Fri', lessons: 1, questions: 6, minutes: 9 },
    { label: 'Sat', lessons: 1, questions: 6, minutes: 11 },
    { label: 'Sun', lessons: 0, questions: 0, minutes: 0 }
  ],
  subjects: [
    { subject: 'Mathematics', mastery: 68, detail: '4 lessons this week', color: 'bg-sun' },
    { subject: 'Physical Sciences', mastery: 54, detail: '2 lessons this week', color: 'bg-teal' },
    { subject: 'English', mastery: 73, detail: '1 lesson this week', color: 'bg-coral' },
    { subject: 'Computer Literacy', mastery: 61, detail: 'Not started this week', color: 'bg-sky' }
  ],
  updates: [
    {
      id: 'demo-update-1',
      title: 'Finished “Solving by factoring”',
      text: 'Scored 4 out of 5 and earned 55 XP. The quiz was completed offline.',
      when: 'Today, 09:12'
    },
    {
      id: 'demo-update-2',
      title: 'Practised three days in a row',
      text: 'A four-day streak is now active. Short sessions are adding up.',
      when: 'Yesterday'
    },
    {
      id: 'demo-update-3',
      title: 'Asked the tutor for help',
      text: 'Asked how to choose numbers when factoring. The tutor suggested a practice question.',
      when: '2 days ago'
    },
    {
      id: 'demo-update-4',
      title: 'Teacher note added',
      text: '“Lwazi is asking better questions in class. Keep encouraging the short maths sessions.”',
      when: 'Mon'
    }
  ],
  teacherNote:
    '“Lwazi is asking better questions in class and is more willing to try a second method when the first one does not work. Keep encouraging the short maths sessions at home.”',
  teacherName: 'Ms N. Mbeki · Mathematics'
};

export const parentSupportTips = [
  'Ask what your child learned, not only what they scored.',
  'Protect one five-minute learning slot on a busy day.',
  'Use the stories here to start a conversation, not to lecture.'
];
