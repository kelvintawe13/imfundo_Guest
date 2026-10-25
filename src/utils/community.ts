import { useSyncExternalStore } from 'react';
import {
  seedMessages,
  seedPapers,
  seedSessions
} from '../data/community';
import type {
  CommunityAttachment,
  CommunityMessage,
  CommunityReply,
  CommunityState,
  PastPaper,
  PastPaperKind,
  StudySession
} from '../types/community';
import type { AppRole } from '../types/app';
import { getSessionAccount } from './auth';

const STORAGE_KEY = 'imfundo-community-v1';
const MAX_MESSAGES = 400;
const MAX_PAPERS = 100;

function isRole(value: unknown): value is AppRole {
  return value === 'learner' || value === 'staff' || value === 'parent';
}

function stringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

function normalizeAttachment(value: unknown): CommunityAttachment | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const attachment = value as Record<string, unknown>;
  if (typeof attachment.name !== 'string' || typeof attachment.size !== 'number' || !Number.isFinite(attachment.size)) {
    return undefined;
  }
  return {
    name: attachment.name,
    size: Math.max(0, attachment.size),
    mime: typeof attachment.mime === 'string' ? attachment.mime : 'application/octet-stream',
    url: typeof attachment.url === 'string' ? attachment.url : undefined
  };
}

function normalizeReply(value: unknown): CommunityReply | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const reply = value as Record<string, unknown>;
  if (typeof reply.authorName !== 'string' || typeof reply.text !== 'string') return undefined;
  return { authorName: reply.authorName, text: reply.text };
}

function normalizeMessage(value: unknown): CommunityMessage | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const message = value as Record<string, unknown>;
  if (
    typeof message.id !== 'string' ||
    typeof message.roomId !== 'string' ||
    typeof message.authorId !== 'string' ||
    typeof message.authorName !== 'string' ||
    typeof message.authorInitials !== 'string' ||
    !isRole(message.authorRole) ||
    typeof message.text !== 'string' ||
    typeof message.at !== 'number' ||
    !Number.isFinite(message.at)
  ) {
    return null;
  }
  return {
    id: message.id,
    roomId: message.roomId,
    authorId: message.authorId,
    authorName: message.authorName,
    authorInitials: message.authorInitials,
    authorRole: message.authorRole,
    text: message.text.slice(0, 1200),
    at: message.at,
    attachment: normalizeAttachment(message.attachment),
    replyTo: normalizeReply(message.replyTo),
    supportedBy: stringList(message.supportedBy)
  };
}

function isPaperKind(value: unknown): value is PastPaperKind {
  return value === 'Exam paper' || value === 'Memo' || value === 'Practice paper' || value === 'Study notes';
}

function normalizePaper(value: unknown): PastPaper | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const paper = value as Record<string, unknown>;
  if (
    typeof paper.id !== 'string' ||
    typeof paper.title !== 'string' ||
    typeof paper.subject !== 'string' ||
    typeof paper.grade !== 'string' ||
    typeof paper.year !== 'string' ||
    !isPaperKind(paper.kind) ||
    typeof paper.size !== 'string' ||
    typeof paper.uploadedBy !== 'string' ||
    typeof paper.uploadedAt !== 'number' ||
    !Number.isFinite(paper.uploadedAt)
  ) {
    return null;
  }
  return {
    id: paper.id,
    title: paper.title,
    subject: paper.subject,
    grade: paper.grade,
    year: paper.year,
    kind: paper.kind,
    size: paper.size,
    uploadedBy: paper.uploadedBy,
    uploadedAt: paper.uploadedAt,
    fileName: typeof paper.fileName === 'string' ? paper.fileName : undefined,
    fileUrl: typeof paper.fileUrl === 'string' ? paper.fileUrl : undefined,
    sampleQuestions: stringList(paper.sampleQuestions)
  };
}

function normalizeSession(value: unknown): StudySession | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const session = value as Record<string, unknown>;
  if (
    typeof session.id !== 'string' ||
    typeof session.title !== 'string' ||
    typeof session.roomId !== 'string' ||
    typeof session.dateLabel !== 'string' ||
    typeof session.timeLabel !== 'string' ||
    typeof session.host !== 'string' ||
    typeof session.attendees !== 'number' ||
    !Number.isFinite(session.attendees)
  ) {
    return null;
  }
  return {
    id: session.id,
    title: session.title,
    roomId: session.roomId,
    dateLabel: session.dateLabel,
    timeLabel: session.timeLabel,
    host: session.host,
    attendees: Math.max(0, Math.floor(session.attendees)),
    joinedBy: stringList(session.joinedBy)
  };
}

function normalizeState(value: unknown): CommunityState | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const state = value as Record<string, unknown>;
  if (!Array.isArray(state.messages) || !Array.isArray(state.papers) || !Array.isArray(state.sessions)) {
    return null;
  }
  return {
    version: 1,
    messages: state.messages.map(normalizeMessage).filter((message): message is CommunityMessage => message !== null),
    papers: state.papers.map(normalizePaper).filter((paper): paper is PastPaper => paper !== null),
    sessions: state.sessions.map(normalizeSession).filter((session): session is StudySession => session !== null)
  };
}

function seedState(): CommunityState {
  return {
    version: 1,
    messages: seedMessages.map((message) => ({ ...message, supportedBy: [...message.supportedBy] })),
    papers: seedPapers.map((paper) => ({ ...paper })),
    sessions: seedSessions.map((session) => ({ ...session, joinedBy: [...session.joinedBy] }))
  };
}

function readState(): CommunityState {
  if (typeof window === 'undefined') return seedState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState();
    const parsed = normalizeState(JSON.parse(raw));
    return parsed ?? seedState();
  } catch (error) {
    console.warn('Unable to read the study room. Starting with sample conversations.', error);
    return seedState();
  }
}

let cache: CommunityState | null = null;
const listeners = new Set<() => void>();

function getSnapshot() {
  if (!cache) cache = readState();
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function persist(next: CommunityState) {
  cache = next;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      console.warn('Unable to save all study room data on this device. The conversation is kept for this session.', error);
    }
  }
  listeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    cache = readState();
    listeners.forEach((listener) => listener());
  });
}

export function useCommunity(): CommunityState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function isCommunityRoom(roomId: string): boolean {
  return getSnapshot().messages.some((message) => message.roomId === roomId);
}

export function sendCommunityMessage(input: {
  roomId: string;
  text: string;
  attachment?: CommunityAttachment;
  replyTo?: CommunityReply;
}): boolean {
  const account = getSessionAccount();
  const text = input.text.trim();
  if (!account || (!text && !input.attachment)) return false;

  const state = getSnapshot();
  const message: CommunityMessage = {
    id: `message-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    roomId: input.roomId,
    authorId: account.id,
    authorName: account.name,
    authorInitials: account.name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || 'L',
    authorRole: account.role,
    text: text.slice(0, 1200),
    at: Date.now(),
    attachment: input.attachment,
    replyTo: input.replyTo,
    supportedBy: []
  };

  persist({
    ...state,
    messages: [...state.messages, message].slice(-MAX_MESSAGES)
  });
  return true;
}

export function toggleCommunitySupport(messageId: string) {
  const account = getSessionAccount();
  if (!account) return;
  const state = getSnapshot();
  persist({
    ...state,
    messages: state.messages.map((message) => {
      if (message.id !== messageId) return message;
      const supported = message.supportedBy.includes(account.id);
      return {
        ...message,
        supportedBy: supported
          ? message.supportedBy.filter((id) => id !== account.id)
          : [...message.supportedBy, account.id]
      };
    })
  });
}

export function deleteCommunityMessage(messageId: string) {
  const account = getSessionAccount();
  if (!account) return;
  const state = getSnapshot();
  persist({
    ...state,
    messages: state.messages.filter((message) => message.id !== messageId || message.authorId !== account.id)
  });
}

export function addCommunityPaper(input: {
  title: string;
  subject: string;
  grade: string;
  year: string;
  kind: PastPaperKind;
  size: string;
  fileName?: string;
  fileUrl?: string;
  sampleQuestions?: string[];
}): PastPaper | null {
  const account = getSessionAccount();
  if (!account) return null;
  const state = getSnapshot();
  const paper: PastPaper = {
    id: `paper-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: input.title.trim().slice(0, 120),
    subject: input.subject,
    grade: input.grade,
    year: input.year.trim().slice(0, 40),
    kind: input.kind,
    size: input.size,
    uploadedBy: account.name,
    uploadedAt: Date.now(),
    fileName: input.fileName,
    fileUrl: input.fileUrl,
    sampleQuestions: input.sampleQuestions?.slice(0, 10)
  };
  if (!paper.title) return null;
  persist({
    ...state,
    papers: [paper, ...state.papers].slice(0, MAX_PAPERS)
  });
  return paper;
}

export function toggleStudySession(sessionId: string) {
  const account = getSessionAccount();
  if (!account) return;
  const state = getSnapshot();
  persist({
    ...state,
    sessions: state.sessions.map((session) => {
      if (session.id !== sessionId) return session;
      const joined = session.joinedBy.includes(account.id);
      return {
        ...session,
        joinedBy: joined
          ? session.joinedBy.filter((id) => id !== account.id)
          : [...session.joinedBy, account.id]
      };
    })
  });
}

export function sessionAttendeeCount(session: StudySession): number {
  return session.attendees + session.joinedBy.length;
}

export function chatTimestamp(at: number): string {
  const date = new Date(at);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (left: Date, right: Date) =>
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate();

  const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  if (sameDay(date, today)) return time;
  if (sameDay(date, yesterday)) return `Yesterday ${time}`;
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}
