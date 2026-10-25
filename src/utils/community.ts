import { useSyncExternalStore } from 'react';
import {
  communityRooms,
  seedMessages,
  seedPapers,
  seedSessions
} from '../data/community';
import { MAX_ROOM_INTERESTS, normalizeInterests } from '../data/interests';
import type {
  CommunityAccent,
  CommunityAttachment,
  CommunityMessage,
  CommunityReply,
  CommunityRoom,
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

function isAccent(value: unknown): value is CommunityAccent {
  return value === 'sun' || value === 'teal' || value === 'sky' || value === 'coral';
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

function normalizeRoom(value: unknown): CommunityRoom | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const room = value as Record<string, unknown>;
  if (
    typeof room.id !== 'string' ||
    typeof room.name !== 'string' ||
    typeof room.description !== 'string' ||
    typeof room.emoji !== 'string' ||
    !isAccent(room.accent)
  ) {
    return null;
  }
  return {
    id: room.id,
    name: room.name.slice(0, 60),
    description: room.description.slice(0, 160),
    emoji: room.emoji.slice(0, 8),
    accent: room.accent,
    interests: normalizeInterests(room.interests, MAX_ROOM_INTERESTS),
    kind: room.kind === 'learner' ? 'learner' : 'curated',
    createdBy: typeof room.createdBy === 'string' ? room.createdBy : undefined,
    createdAt:
      typeof room.createdAt === 'number' && Number.isFinite(room.createdAt) ? room.createdAt : undefined,
    memberCount:
      typeof room.memberCount === 'number' && Number.isFinite(room.memberCount)
        ? Math.max(0, Math.floor(room.memberCount))
        : 0,
    memberIds: stringList(room.memberIds),
    reportedBy: stringList(room.reportedBy)
  };
}

function normalizeReads(value: unknown): Record<string, Record<string, number>> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const result: Record<string, Record<string, number>> = {};
  for (const [accountId, rooms] of Object.entries(value)) {
    if (!rooms || typeof rooms !== 'object' || Array.isArray(rooms)) continue;
    const next: Record<string, number> = {};
    for (const [roomId, at] of Object.entries(rooms)) {
      if (typeof at === 'number' && Number.isFinite(at)) next[roomId] = at;
    }
    if (Object.keys(next).length > 0) result[accountId] = next;
  }
  return result;
}

function cloneRooms(): CommunityRoom[] {
  return communityRooms.map((room) => ({
    ...room,
    interests: [...room.interests],
    memberIds: [...room.memberIds],
    reportedBy: [...room.reportedBy]
  }));
}

function normalizeState(value: unknown): CommunityState | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const state = value as Record<string, unknown>;
  if (!Array.isArray(state.messages) || !Array.isArray(state.papers) || !Array.isArray(state.sessions)) {
    return null;
  }
  const rooms = Array.isArray(state.rooms)
    ? state.rooms.map(normalizeRoom).filter((room): room is CommunityRoom => room !== null)
    : [];
  return {
    version: 2,
    messages: state.messages.map(normalizeMessage).filter((message): message is CommunityMessage => message !== null),
    papers: state.papers.map(normalizePaper).filter((paper): paper is PastPaper => paper !== null),
    sessions: state.sessions.map(normalizeSession).filter((session): session is StudySession => session !== null),
    rooms: rooms.length > 0 ? rooms : cloneRooms(),
    reads: normalizeReads(state.reads)
  };
}

function seedState(): CommunityState {
  return {
    version: 2,
    messages: seedMessages.map((message) => ({ ...message, supportedBy: [...message.supportedBy] })),
    papers: seedPapers.map((paper) => ({ ...paper })),
    sessions: seedSessions.map((session) => ({ ...session, joinedBy: [...session.joinedBy] })),
    rooms: cloneRooms(),
    reads: {}
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

export function getRoom(roomId: string): CommunityRoom | null {
  return getSnapshot().rooms.find((room) => room.id === roomId) ?? null;
}

export function isCommunityRoom(roomId: string): boolean {
  return getSnapshot().rooms.some((room) => room.id === roomId);
}

export function roomMemberCount(room: CommunityRoom): number {
  return room.memberCount + room.memberIds.length;
}

export function isRoomMember(room: CommunityRoom, accountId: string | null): boolean {
  return Boolean(accountId && room.memberIds.includes(accountId));
}

export function roomMatchScore(room: CommunityRoom, interests: string[]): number {
  if (interests.length === 0 || room.interests.length === 0) return 0;
  const wanted = new Set(interests);
  return room.interests.reduce((score, id) => score + (wanted.has(id) ? 1 : 0), 0);
}

export function roomLastMessageAt(state: CommunityState, roomId: string): number {
  return state.messages.reduce(
    (latest, message) => (message.roomId === roomId ? Math.max(latest, message.at) : latest),
    0
  );
}

export function unreadRoomCount(state: CommunityState, roomId: string, accountId: string | null): number {
  if (!accountId) return 0;
  const readAt = state.reads[accountId]?.[roomId] ?? 0;
  return state.messages.filter(
    (message) => message.roomId === roomId && message.authorId !== accountId && message.at > readAt
  ).length;
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
  const room = state.rooms.find((item) => item.id === input.roomId);
  if (!room) return false;

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

  // Sending a message is also a way of joining a room.
  const rooms = room.memberIds.includes(account.id)
    ? state.rooms
    : state.rooms.map((item) =>
        item.id === room.id ? { ...item, memberIds: [...item.memberIds, account.id] } : item
      );

  persist({
    ...state,
    rooms,
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

export type CreateRoomInput = {
  name: string;
  description: string;
  interests: string[];
  emoji?: string;
  accent?: CommunityAccent;
};

export type CreateRoomResult =
  | { ok: true; room: CommunityRoom }
  | { ok: false; error: string };

export function createCommunityRoom(input: CreateRoomInput): CreateRoomResult {
  const account = getSessionAccount();
  if (!account) return { ok: false, error: 'Sign in to create a room.' };
  if (account.role !== 'learner') return { ok: false, error: 'Only learner accounts can create study rooms.' };

  const name = input.name.trim().replace(/\s+/g, ' ').slice(0, 48);
  if (name.length < 3) return { ok: false, error: 'Give the room a name with at least 3 characters.' };

  const interests = normalizeInterests(input.interests, MAX_ROOM_INTERESTS);
  if (interests.length === 0) return { ok: false, error: 'Pick at least one interest so learners can find the room.' };

  const state = getSnapshot();
  if (state.rooms.some((room) => room.name.toLowerCase() === name.toLowerCase())) {
    return { ok: false, error: 'A room with that name already exists. Try a more specific name.' };
  }

  const room: CommunityRoom = {
    id: `room-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    description: input.description.trim().replace(/\s+/g, ' ').slice(0, 160) || 'A learner-created study room.',
    emoji: input.emoji?.slice(0, 8) || '💬',
    accent: input.accent ?? 'teal',
    interests,
    kind: 'learner',
    createdBy: account.id,
    createdAt: Date.now(),
    memberCount: 0,
    memberIds: [account.id],
    reportedBy: []
  };

  persist({ ...state, rooms: [...state.rooms, room] });
  return { ok: true, room };
}

export function toggleRoomMembership(roomId: string) {
  const account = getSessionAccount();
  if (!account) return;
  const state = getSnapshot();
  persist({
    ...state,
    rooms: state.rooms.map((room) => {
      if (room.id !== roomId) return room;
      const joined = room.memberIds.includes(account.id);
      return {
        ...room,
        memberIds: joined
          ? room.memberIds.filter((id) => id !== account.id)
          : [...room.memberIds, account.id]
      };
    })
  });
}

export function markRoomRead(roomId: string) {
  const account = getSessionAccount();
  if (!account) return;
  const state = getSnapshot();
  const latest = roomLastMessageAt(state, roomId);
  const current = state.reads[account.id]?.[roomId] ?? 0;
  if (latest <= current) return;
  persist({
    ...state,
    reads: {
      ...state.reads,
      [account.id]: { ...(state.reads[account.id] ?? {}), [roomId]: latest }
    }
  });
}

export function reportCommunityRoom(roomId: string): { ok: boolean; error?: string } {
  const account = getSessionAccount();
  if (!account) return { ok: false, error: 'Sign in to report a room.' };
  const state = getSnapshot();
  const room = state.rooms.find((item) => item.id === roomId);
  if (!room) return { ok: false, error: 'That room no longer exists.' };
  if (room.kind !== 'learner') return { ok: false, error: 'Curated rooms are already reviewed by the Imfundo team.' };
  if (room.reportedBy.includes(account.id)) return { ok: true };

  persist({
    ...state,
    rooms: state.rooms.map((item) =>
      item.id === roomId ? { ...item, reportedBy: [...item.reportedBy, account.id] } : item
    )
  });
  return { ok: true };
}

export function deleteCommunityRoom(roomId: string): { ok: boolean; error?: string } {
  const account = getSessionAccount();
  if (!account) return { ok: false, error: 'Sign in to manage this room.' };
  const state = getSnapshot();
  const room = state.rooms.find((item) => item.id === roomId);
  if (!room) return { ok: false, error: 'That room no longer exists.' };
  if (room.kind !== 'learner' || room.createdBy !== account.id) {
    return { ok: false, error: 'Only the learner who created this room can delete it.' };
  }

  persist({
    ...state,
    rooms: state.rooms.filter((item) => item.id !== roomId),
    messages: state.messages.filter((message) => message.roomId !== roomId),
    reads: Object.fromEntries(
      Object.entries(state.reads).map(([accountId, rooms]) => {
        const next = { ...rooms };
        delete next[roomId];
        return [accountId, next];
      })
    )
  });
  return { ok: true };
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
