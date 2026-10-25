import { DownloadIcon, FileTextIcon, HeartIcon, ReplyIcon, Trash2Icon } from 'lucide-react';
import type { CommunityMessage } from '../../types/community';
import { chatTimestamp } from '../../utils/community';
import { formatBytes } from '../../utils/localStorageStats';

type MessageBubbleProps = {
  message: CommunityMessage;
  isOwn: boolean;
  supportedByMe: boolean;
  canDelete: boolean;
  onSupport: () => void;
  onReply: () => void;
  onDelete: () => void;
};

function roleBadge(role: CommunityMessage['authorRole']): string | null {
  if (role === 'staff') return 'Teacher';
  if (role === 'parent') return 'Parent';
  return null;
}

export function MessageBubble({
  message,
  isOwn,
  supportedByMe,
  canDelete,
  onSupport,
  onReply,
  onDelete
}: MessageBubbleProps) {
  const badge = roleBadge(message.authorRole);
  const attachment = message.attachment;
  const isImage = Boolean(attachment?.url && attachment.mime.startsWith('image/'));

  return (
    <li className={`flex items-start gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
      <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink font-display text-[10px] font-extrabold text-ink ${
        isOwn ? 'bg-sun' : message.authorRole === 'staff' ? 'bg-sky' : message.authorRole === 'parent' ? 'bg-coral/60' : 'bg-teal-light'
      }`}>
        {message.authorInitials}
      </span>

      <div className={`min-w-0 max-w-[86%] sm:max-w-[76%] ${isOwn ? 'items-end text-right' : ''}`}>
        <div className={`flex flex-wrap items-center gap-1.5 text-[10px] ${isOwn ? 'justify-end' : ''}`}>
          <span className="font-display text-[11px] font-bold text-slate-300">{isOwn ? 'You' : message.authorName}</span>
          {badge && (
            <span className="rounded-full border border-ink/30 bg-sky/20 px-1.5 py-0.5 font-bold uppercase tracking-wide text-sky">
              {badge}
            </span>
          )}
          <span className="text-slate-500">{chatTimestamp(message.at)}</span>
        </div>

        <div className={`mt-1 rounded-xl border-2 px-3 py-2 text-left text-sm leading-relaxed ${
          isOwn ? 'rounded-tr-sm border-ink bg-sun-light text-ink' : 'rounded-tl-sm border-ink/15 bg-slate-800/60 text-slate-200'
        }`}>
          {message.replyTo && (
            <div className={`mb-1.5 rounded-lg border-l-2 pl-2 text-[11px] leading-snug ${isOwn ? 'border-ink/40 text-ink-soft' : 'border-teal/60 text-slate-400'}`}>
              <span className="block font-bold">{message.replyTo.authorName}</span>
              <span className="line-clamp-2">{message.replyTo.text}</span>
            </div>
          )}

          {message.text && <p className="whitespace-pre-wrap break-words">{message.text}</p>}

          {attachment && (
            <div className={message.text ? 'mt-2' : ''}>
              {isImage ? (
                <a href={attachment.url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-lg border-2 border-ink">
                  <img src={attachment.url} alt={`Attachment: ${attachment.name}`} className="max-h-56 w-full object-cover" loading="lazy" />
                  <span className="block bg-slate-950/70 px-2 py-1 text-[10px] font-semibold text-slate-200">{attachment.name}</span>
                </a>
              ) : (
                <div className={`flex items-center gap-2 rounded-lg border-2 p-2 ${isOwn ? 'border-ink/30 bg-white/50' : 'border-ink/20 bg-slate-950/40'}`}>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 ${isOwn ? 'border-ink bg-white text-ink' : 'border-ink/30 bg-slate-900 text-sky'}`}>
                    <FileTextIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block truncate text-xs font-bold ${isOwn ? 'text-ink' : 'text-slate-200'}`}>{attachment.name}</span>
                    <span className={`block text-[10px] ${isOwn ? 'text-ink-soft' : 'text-slate-500'}`}>{formatBytes(attachment.size)}</span>
                  </span>
                  {attachment.url && (
                    <a
                      href={attachment.url}
                      download={attachment.name}
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 ${isOwn ? 'border-ink bg-white text-ink hover:bg-sun' : 'border-ink/30 bg-slate-900 text-slate-300 hover:bg-sun hover:text-ink'}`}
                      aria-label={`Download ${attachment.name}`}>
                      <DownloadIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`mt-1 flex items-center gap-1 ${isOwn ? 'justify-end' : ''}`}>
          <button
            type="button"
            onClick={onSupport}
            aria-pressed={supportedByMe}
            aria-label={supportedByMe ? 'Remove support' : 'Support this message'}
            className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold transition-colors hover:bg-sun-light hover:text-ink ${
              supportedByMe ? 'text-coral' : 'text-slate-500'
            }`}>
            <HeartIcon className={`h-3 w-3 ${supportedByMe ? 'fill-current' : ''}`} />
            {message.supportedBy.length > 0 ? message.supportedBy.length : 'Support'}
          </button>
          <button
            type="button"
            onClick={onReply}
            className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold text-slate-500 transition-colors hover:bg-sun-light hover:text-ink"
            aria-label={`Reply to ${message.authorName}`}>
            <ReplyIcon className="h-3 w-3" /> Reply
          </button>
          {canDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold text-slate-500 transition-colors hover:bg-coral/20 hover:text-coral"
              aria-label="Delete your message">
              <Trash2Icon className="h-3 w-3" /> Delete
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
