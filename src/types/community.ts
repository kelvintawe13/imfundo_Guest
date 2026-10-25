import type { AppRole } from './app';

export type CommunityAccent = 'sun' | 'teal' | 'sky' | 'coral';

export type CommunityRoomKind = 'curated' | 'learner';

export type CommunityRoom = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  accent: CommunityAccent;
  /** Interest ids from the shared catalog, used to match learners to rooms. */
  interests: string[];
  kind: CommunityRoomKind;
  createdBy?: string;
  createdAt?: number;
  /** Sample members that keep curated rooms feeling lived-in. */
  memberCount: number;
  /** Local accounts that joined from this browser. */
  memberIds: string[];
  /** Local accounts that flagged a learner-created room for teacher review. */
  reportedBy: string[];
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
  version: 2;
  messages: CommunityMessage[];
  papers: PastPaper[];
  sessions: StudySession[];
  rooms: CommunityRoom[];
  /** accountId -> roomId -> timestamp of the last message the learner saw. */
  reads: Record<string, Record<string, number>>;
};
