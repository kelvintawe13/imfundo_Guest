import { fallbackReply, tutorReplies } from '../data/chat';
import type { Lang } from '../types/app';

export function getTutorReply(message: string, lang: Lang): string {
  const lower = message.toLowerCase();
  const match = tutorReplies.find((r) => r.keywords.some((k) => lower.includes(k)));
  return match ? match[lang] : fallbackReply[lang];
}