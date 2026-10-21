export type Subject = 'Mathematics' | 'Physical Sciences' | 'Computer Literacy' | 'English';

export type Lesson = {
  id: string;
  title: string;
  subject: Subject;
  minutes: number;
  xp: number;
  progress: number;
  downloaded: boolean;
  size: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  explanationXh: string;
};