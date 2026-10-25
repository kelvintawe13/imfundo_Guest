import type { AppRole } from './app';

export type CommunityAccent = 'sun' | 'teal' | 'sky' | 'coral';

export type CommunityRoom = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  accent: CommunityAccent;
};

export type CommunityAttachment = {
  name: string;
  size: number;
  mime: string;
  /** Data URL for files uploaded from this device. Sample papers do not carry one. */
  url?: string;
};

export type CommunityReply = {
  authorName: string;
  text: string;
};

export type CommunityMessage = {
  id: string;
  roomId: string;
  authorId: string;
  authorName: string;
  authorInitials: string;
  authorRole: AppRole;
  text: string;
  at: number;
  attachment?: CommunityAttachment;
  replyTo?: CommunityReply;
  supportedBy: string[];
};

export type PastPaperKind = 'Exam paper' | 'Memo' | 'Practice paper' | 'Study notes';

export type PastPaper = {
  id: string;
  title: string;
  subject: string;
  grade: string;
  year: string;
  kind: PastPaperKind;
  size: string;
  uploadedBy: string;
  uploadedAt: number;
  fileName?: string;
  fileUrl?: string;
  sampleQuestions?: string[];
};

export type StudySession = {
  id: string;
  title: string;
  roomId: string;
  dateLabel: string;
  timeLabel: string;
  host: string;
  attendees: number;
  joinedBy: string[];
};

export type CommunityState = {
  version: 1;
  messages: CommunityMessage[];
  papers: PastPaper[];
  sessions: StudySession[];
};
