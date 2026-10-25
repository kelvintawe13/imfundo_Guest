import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CalendarDaysIcon,
  CheckIcon,
  CircleHelpIcon,
  FileTextIcon,
  FlagIcon,
  MessagesSquareIcon,
  PaperclipIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  ShieldCheckIcon,
  SparklesIcon,
  Trash2Icon,
  UploadIcon,
  UsersRoundIcon,
  XIcon
} from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';
import { CreateRoomModal } from '../components/community/CreateRoomModal';
import { MessageBubble } from '../components/community/MessageBubble';
import { PaperCard } from '../components/community/PaperCard';
import { PaperPreviewModal } from '../components/community/PaperPreviewModal';
import { UploadPaperModal } from '../components/community/UploadPaperModal';
import { communityPeers, communityRooms, studyPrompts } from '../data/community';
import { interestById, interestLabels } from '../data/interests';
import { useLanguage } from '../contexts/LanguageContext';
import {
  deleteCommunityMessage,
  deleteCommunityRoom,
  isRoomMember,
  markRoomRead,
  reportCommunityRoom,
  roomMemberCount,
  roomMatchScore,
  sendCommunityMessage,
  sessionAttendeeCount,
  toggleCommunitySupport,
  toggleRoomMembership,
  toggleStudySession,
  unreadRoomCount,
  useCommunity
} from '../utils/community';
import { useAuth } from '../utils/auth';
import { fileToDataUrl, validateCommunityFile } from '../utils/fileAttachment';
import { formatBytes } from '../utils/localStorageStats';
import type { CommunityAttachment, CommunityMessage, CommunityRoom, PastPaper } from '../types/community';

type Tab = 'chat' | 'papers';

export function Community() {
  const { t } = useLanguage();
  const account = useAuth();
  const state = useCommunity();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab: Tab = searchParams.get('tab') === 'papers' ? 'papers' : 'chat';
  const requestedRoom = searchParams.get('room');

  const [query, setQuery] = useState('');
  const [roomQuery, setRoomQuery] = useState('');
  const [paperQuery, setPaperQuery] = useState('');
  const [paperSubject, setPaperSubject] = useState('All');
  const [input, setInput] = useState('');
  const [replyTo, setReplyTo] = useState<{ authorName: string; text: string } | null>(null);
  const [pendingAttachment, setPendingAttachment] = useState<CommunityAttachment | null>(null);
  const [composerError, setComposerError] = useState('');
  const [preparing, setPreparing] = useState(false);
  const [previewPaper, setPreviewPaper] = useState<PastPaper | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [roomNotice, setRoomNotice] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const accountId = account?.id ?? null;
  const interests = useMemo(() => account?.interests ?? [], [account]);
  const onlinePeers = communityPeers.filter((peer) => peer.online);

  const roomScores = useMemo(
    () => new Map(state.rooms.map((item) => [item.id, roomMatchScore(item, interests)])),
    [state.rooms, interests]
  );

  const roomActivity = useMemo(() => {
    const activity = new Map<string, number>();
    for (const message of state.messages) {
      activity.set(message.roomId, Math.max(activity.get(message.roomId) ?? 0, message.at));
    }
    return activity;
  }, [state.messages]);

  const sortedRooms = useMemo(
    () =>
      [...state.rooms].sort((left, right) => {
        const scoreDiff = (roomScores.get(right.id) ?? 0) - (roomScores.get(left.id) ?? 0);
        if (scoreDiff !== 0) return scoreDiff;
        const joinedDiff = Number(isRoomMember(right, accountId)) - Number(isRoomMember(left, accountId));
        if (joinedDiff !== 0) return joinedDiff;
        const activityDiff = (roomActivity.get(right.id) ?? 0) - (roomActivity.get(left.id) ?? 0);
        if (activityDiff !== 0) return activityDiff;
        return left.name.localeCompare(right.name);
      }),
    [state.rooms, roomScores, roomActivity, accountId]
  );

  const visibleRooms = useMemo(() => {
    const search = roomQuery.trim().toLowerCase();
    if (!search) return sortedRooms;
    return sortedRooms.filter((item) =>
      `${item.name} ${item.description} ${interestLabels(item.interests).join(' ')}`.toLowerCase().includes(search)
    );
  }, [sortedRooms, roomQuery]);

  const room = state.rooms.find((item) => item.id === requestedRoom) ?? sortedRooms[0] ?? communityRooms[0];
  const joined = isRoomMember(room, accountId);
  const roomInterests = room.interests.flatMap((id) => {
    const interest = interestById(id);
    return interest ? [interest] : [];
  });

  const messages = useMemo(() => {
    const search = query.trim().toLowerCase();
    return state.messages
      .filter((message) => message.roomId === room.id)
      .filter((message) => !search || `${message.authorName} ${message.text}`.toLowerCase().includes(search))
      .sort((left, right) => left.at - right.at);
  }, [state.messages, room.id, query]);

  const paperSubjects = useMemo(
    () => ['All', ...Array.from(new Set(state.papers.map((paper) => paper.subject)))],
    [state.papers]
  );

  const papers = useMemo(() => {
    const search = paperQuery.trim().toLowerCase();
    return state.papers
      .filter((paper) => paperSubject === 'All' || paper.subject === paperSubject)
      .filter((paper) =>
        !search || `${paper.title} ${paper.subject} ${paper.year} ${paper.uploadedBy}`.toLowerCase().includes(search)
      )
      .sort((left, right) => right.uploadedAt - left.uploadedAt);
  }, [state.papers, paperSubject, paperQuery]);

  useEffect(() => {
    if (tab !== 'chat') return;
    markRoomRead(room.id);
  }, [tab, room.id, state.messages.length]);

  useEffect(() => {
    if (tab !== 'chat') return;
    bottomRef.current?.scrollIntoView({ block: 'nearest' });
  }, [tab, room.id, state.messages.length]);

  useEffect(() => {
    if (searchParams.get('create') === '1') setCreateOpen(true);
  }, [searchParams]);

  const updateParams = (next: { tab?: Tab; room?: string; create?: boolean }) => {
    const params = new URLSearchParams(searchParams);
    if (next.tab === 'papers') params.set('tab', 'papers');
    else if (next.tab === 'chat') params.delete('tab');
    if (next.room) params.set('room', next.room);
    if (next.create === true) params.set('create', '1');
    else if (next.create === false) params.delete('create');
    setSearchParams(params, { replace: true });
  };

  const openPapers = () => updateParams({ tab: 'papers' });
  const openChat = () => updateParams({ tab: 'chat' });

  const selectRoom = (roomId: string) => {
    setQuery('');
    setComposerError('');
    setReplyTo(null);
    setRoomNotice('');
    updateParams({ tab: 'chat', room: roomId, create: false });
    markRoomRead(roomId);
  };

  const openCreate = () => {
    setCreateOpen(true);
    updateParams({ create: true });
  };

  const closeCreate = () => {
    setCreateOpen(false);
    updateParams({ create: false });
  };

  const handleRoomCreated = (created: CommunityRoom) => {
    setCreateOpen(false);
    updateParams({ tab: 'chat', room: created.id, create: false });
    markRoomRead(created.id);
    setRoomNotice(`“${created.name}” is ready. Share what the room is for so the right learners find it.`);
  };

  const handleReport = () => {
    if (!window.confirm('Report this room to a teacher for review?')) return;
    const result = reportCommunityRoom(room.id);
    if (!result.ok) {
      setComposerError(result.error ?? 'Could not report this room.');
      return;
    }
    setRoomNotice('Thanks. This room is flagged for teacher review.');
  };

  const handleDeleteRoom = () => {
    if (!window.confirm('Delete this room and its messages? This cannot be undone.')) return;
    const result = deleteCommunityRoom(room.id);
    if (!result.ok) {
      setComposerError(result.error ?? 'Could not delete this room.');
      return;
    }
    const fallback = state.rooms.find((item) => item.id !== room.id) ?? communityRooms[0];
    updateParams({ tab: 'chat', room: fallback.id, create: false });
    setRoomNotice('Room deleted.');
  };

  const onFile = async (selected: File | null) => {
    if (!selected) return;
    const problem = validateCommunityFile(selected);
    if (problem) {
      setComposerError(problem);
      return;
    }
    setPreparing(true);
    setComposerError('');
    try {
      const url = await fileToDataUrl(selected);
      setPendingAttachment({
        name: selected.name,
        size: selected.size,
        mime: selected.type || 'application/octet-stream',
        url
      });
    } catch (error) {
      console.warn('Unable to read the attachment.', error);
      setComposerError('That file could not be read on this device.');
    } finally {
      setPreparing(false);
    }
  };

  const send = (event?: React.FormEvent) => {
    event?.preventDefault();
    if (preparing) return;
    const text = input.trim();
    if (!text && !pendingAttachment) return;
    const sent = sendCommunityMessage({
      roomId: room.id,
      text,
      attachment: pendingAttachment ?? undefined,
      replyTo: replyTo ?? undefined
    });
    if (!sent) {
      setComposerError('Could not send that message. Check that you are signed in and try again.');
      return;
    }
    setInput('');
    setPendingAttachment(null);
    setReplyTo(null);
    setComposerError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const startReply = (message: CommunityMessage) => {
    setReplyTo({
      authorName: message.authorName,
      text: message.text || message.attachment?.name || 'Attachment'
    });
    composerRef.current?.focus();
  };

  const insertPrompt = (prompt: string) => {
    setInput(`${prompt} `);
    composerRef.current?.focus();
  };

  const handleUploaded = (paper: PastPaper) => {
    setNotice(`“${paper.title}” was added to the shared library.`);
    updateParams({ tab: 'papers', create: false });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-display text-sm font-bold text-sky-dark">
            <UsersRoundIcon className="h-3.5 w-3.5" /> Learner community · {onlinePeers.length + 1} online
          </p>
          <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{t('nav.community')}</h1>
          <p className="mt-0.5 max-w-2xl text-xs leading-relaxed text-slate-400">
            Meet other learners, work through questions together and share past papers. Keep it kind and keep it useful.
          </p>
        </div>
        <button type="button" onClick={() => setUploadOpen(true)} className="btn-primary shrink-0 self-start sm:self-auto">
          <UploadIcon className="h-4 w-4" /> Share a paper
        </button>
      </header>

      <div role="tablist" aria-label="Study room views" className="mt-3 flex gap-1 border-b-2 border-ink/15">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'chat'}
          onClick={openChat}
          className={`-mb-0.5 flex items-center gap-2 rounded-t-xl border-2 border-b-0 px-3 py-2 font-display text-sm font-bold transition-colors duration-150 ${
            tab === 'chat' ? 'border-ink bg-sun text-ink' : 'border-transparent text-slate-400 hover:text-ink'
          }`}>
          <MessagesSquareIcon className="h-4 w-4" /> Chat rooms
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'papers'}
          onClick={openPapers}
          className={`-mb-0.5 flex items-center gap-2 rounded-t-xl border-2 border-b-0 px-3 py-2 font-display text-sm font-bold transition-colors duration-150 ${
            tab === 'papers' ? 'border-ink bg-sun text-ink' : 'border-transparent text-slate-400 hover:text-ink'
          }`}>
          <FileTextIcon className="h-4 w-4" /> Past papers
          <span className="rounded-full border border-ink/30 bg-slate-900 px-1.5 text-[10px] font-bold text-slate-400">
            {state.papers.length}
          </span>
        </button>
      </div>

      {tab === 'chat' ? (
        <>
          {roomNotice && (
            <div className="mx-auto mt-3 flex max-w-6xl items-center gap-2 rounded-xl border-2 border-ink bg-teal-light px-3 py-2 text-xs font-semibold text-ink">
              <CheckIcon className="h-4 w-4" />
              <span className="min-w-0 flex-1">{roomNotice}</span>
              <button
                type="button"
                onClick={() => setRoomNotice('')}
                aria-label="Dismiss message"
                className="grid h-6 w-6 place-items-center rounded-md hover:bg-white/50">
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <div className="mx-auto mt-3 grid max-w-6xl gap-3 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside
              className="glass-card flex max-h-80 flex-col overflow-hidden lg:max-h-none lg:h-[min(660px,calc(100vh-10rem))]"
              aria-label="Study rooms">
              <header className="border-b-2 border-ink/15 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="font-display text-sm font-extrabold text-slate-100">
                      {t('community.roomsForYou')}
                    </h2>
                    <p className="mt-0.5 text-[11px] leading-snug text-slate-500">
                      {interests.length > 0
                        ? `Your interests: ${interestLabels(interests).slice(0, 2).join(' · ')}${
                            interests.length > 2 ? ' +' : ''
                          }`
                        : 'Add interests in Profile to improve your matches.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={openCreate}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-ink bg-sun text-ink shadow-pop-sm"
                    aria-label="Create a study room"
                    title="Create a study room">
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <label className="relative mt-2 block">
                  <span className="sr-only">Search rooms</span>
                  <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                  <input
                    type="search"
                    value={roomQuery}
                    onChange={(event) => setRoomQuery(event.target.value)}
                    placeholder={t('community.searchRooms')}
                    className="w-full rounded-xl border-2 border-ink bg-slate-950/40 py-1.5 pl-8 pr-2.5 text-[11px] font-semibold text-slate-100 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-sky"
                  />
                </label>
              </header>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
                {visibleRooms.length > 0 ? (
                  <ul className="space-y-1">
                    {visibleRooms.map((item) => {
                      const active = item.id === room.id;
                      const score = roomScores.get(item.id) ?? 0;
                      const unread = unreadRoomCount(state, item.id, accountId);
                      const member = isRoomMember(item, accountId);
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => selectRoom(item.id)}
                            aria-current={active ? 'page' : undefined}
                            className={`flex w-full items-start gap-2 rounded-xl border-2 px-2.5 py-2 text-left transition-colors ${
                              active
                                ? 'border-ink bg-sun text-ink shadow-pop-sm'
                                : 'border-transparent text-slate-300 hover:border-ink hover:bg-sun-light hover:text-ink'
                            }`}>
                            <span
                              className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 text-sm ${
                                active ? 'border-ink bg-white' : 'border-ink/20 bg-slate-950/40'
                              }`}
                              aria-hidden="true">
                              {item.emoji}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-1">
                                <span className="truncate font-display text-[12px] font-bold">{item.name}</span>
                                {score > 0 && (
                                  <span
                                    className={`shrink-0 rounded-full border px-1 py-0.5 text-[8px] font-bold uppercase ${
                                      active ? 'border-ink/40 text-ink' : 'border-teal/40 text-teal'
                                    }`}>
                                    {t('community.match')}
                                  </span>
                                )}
                              </span>
                              <span
                                className={`mt-0.5 flex flex-wrap items-center gap-1 text-[10px] ${
                                  active ? 'text-ink-soft' : 'text-slate-500'
                                }`}>
                                <span>
                                  {roomMemberCount(item)} {t('community.members')}
                                </span>
                                {member && <span>· {t('community.joined')}</span>}
                                {item.kind === 'learner' && <span>· {t('community.learnerRoom')}</span>}
                              </span>
                            </span>
                            {unread > 0 && (
                              <span
                                className={`mt-0.5 grid h-5 min-w-5 shrink-0 place-items-center rounded-full border px-1 text-[9px] font-extrabold ${
                                  active ? 'border-ink bg-ink text-sun' : 'border-ink bg-coral text-ink'
                                }`}>
                                {unread > 9 ? '9+' : unread}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="px-2 py-4 text-[11px] text-slate-500">No rooms match that search.</p>
                )}
              </div>

              <div className="border-t-2 border-ink/15 p-2">
                <button type="button" onClick={openCreate} className="btn-primary w-full !py-1.5 text-xs">
                  <PlusIcon className="h-3.5 w-3.5" /> {t('community.createRoom')}
                </button>
              </div>
            </aside>

            <section
              className="glass-card flex h-[min(660px,calc(100vh-10rem))] min-h-[440px] flex-col overflow-hidden"
              aria-label="Study room chat">
              <header className="flex flex-col gap-2 border-b-2 border-ink/15 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border-2 border-ink bg-sun text-lg"
                    aria-hidden="true">
                    {room.emoji}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h2 className="truncate font-display text-base font-extrabold text-slate-100">{room.name}</h2>
                      {(roomScores.get(room.id) ?? 0) > 0 && (
                        <span className="rounded-full border border-teal/40 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-teal">
                          {t('community.match')}
                        </span>
                      )}
                      {room.kind === 'learner' && (
                        <span className="rounded-full border border-ink/30 bg-sky/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-sky">
                          {t('community.learnerRoom')}
                        </span>
                      )}
                      {room.reportedBy.length > 0 && (
                        <span className="rounded-full border border-ink/30 bg-coral/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-coral">
                          {t('community.underReview')}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[11px] text-slate-500">{room.description}</p>
                    {roomInterests.length > 0 && (
                      <ul className="mt-1 flex flex-wrap gap-1" aria-label="Room interests">
                        {roomInterests.map((interest) => (
                          <li
                            key={interest.id}
                            className="inline-flex items-center gap-0.5 rounded-full border border-ink/20 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400">
                            <span aria-hidden="true">{interest.emoji}</span> {interest.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-teal">
                    {roomMemberCount(room)} {t('community.members')}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleRoomMembership(room.id)}
                    aria-pressed={joined}
                    className={joined ? 'btn-secondary !px-2.5 !py-1 text-[10px]' : 'btn-primary !px-2.5 !py-1 text-[10px]'}>
                    {joined ? t('community.joinedLeave') : t('community.joinRoom')}
                  </button>
                  {room.kind === 'learner' && room.createdBy === accountId ? (
                    <button
                      type="button"
                      onClick={handleDeleteRoom}
                      className="grid h-7 w-7 place-items-center rounded-lg border-2 border-transparent text-slate-500 transition-colors hover:border-ink hover:bg-coral/20 hover:text-coral"
                      aria-label="Delete this room"
                      title="Delete this room">
                      <Trash2Icon className="h-3.5 w-3.5" />
                    </button>
                  ) : room.kind === 'learner' ? (
                    <button
                      type="button"
                      onClick={handleReport}
                      className="inline-flex items-center gap-1 rounded-lg border-2 border-transparent px-1.5 py-1 text-[10px] font-bold text-slate-500 transition-colors hover:border-ink hover:bg-coral/20 hover:text-coral"
                      aria-label="Report this room"
                      title="Report this room">
                      <FlagIcon className="h-3 w-3" />
                      {room.reportedBy.includes(accountId ?? '')
                        ? t('community.reported')
                        : t('community.report')}
                    </button>
                  ) : null}
                </div>
              </header>

              <div className="flex items-start gap-1.5 border-b-2 border-ink/10 bg-sky/5 px-3 py-1.5 text-[10px] leading-snug text-slate-500">
                <ShieldCheckIcon className="mt-0.5 h-3 w-3 shrink-0 text-teal" />
                Be kind, protect your privacy and never share phone numbers or photos. A teacher can review reported
                rooms.
              </div>

              <div
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3"
                role="log"
                aria-live="polite"
                aria-label={`${room.name} messages`}>
                {messages.length > 0 ? (
                  <ul className="space-y-3">
                    {messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                        isOwn={message.authorId === account?.id}
                        supportedByMe={Boolean(account && message.supportedBy.includes(account.id))}
                        canDelete={message.authorId === account?.id}
                        onSupport={() => toggleCommunitySupport(message.id)}
                        onReply={() => startReply(message)}
                        onDelete={() => {
                          if (window.confirm('Delete this message?')) deleteCommunityMessage(message.id);
                        }}
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <EmptyState
                      compact
                      icon={MessagesSquareIcon}
                      title={query ? 'No messages match that search' : 'Start the conversation'}
                      description={
                        query
                          ? 'Try a different word or clear the search.'
                          : 'Ask a question, share a win or offer to help someone.'
                      }
                    />
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="border-t-2 border-ink/15 p-2.5">
                <div className="mb-2 flex gap-1.5 overflow-x-auto">
                  {studyPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => insertPrompt(prompt)}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full border-2 border-ink/25 px-2.5 py-1 text-[10px] font-semibold text-slate-400 transition-colors hover:border-ink hover:bg-sun-light hover:text-ink">
                      {prompt.startsWith('Can someone') ? (
                        <CircleHelpIcon className="h-3 w-3" />
                      ) : (
                        <SparklesIcon className="h-3 w-3" />
                      )}
                      {prompt}
                    </button>
                  ))}
                </div>

                {replyTo && (
                  <div className="mb-2 flex items-start gap-2 rounded-lg border-2 border-ink/20 bg-sun/10 px-2.5 py-1.5">
                    <div className="min-w-0 flex-1 border-l-2 border-coral pl-2 text-[11px]">
                      <p className="font-bold text-slate-200">Replying to {replyTo.authorName}</p>
                      <p className="line-clamp-1 text-slate-400">{replyTo.text}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReplyTo(null)}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                      aria-label="Cancel reply">
                      <XIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                {pendingAttachment && (
                  <div className="mb-2 flex items-center gap-2 rounded-lg border-2 border-ink/20 bg-slate-950/40 px-2.5 py-1.5">
                    <FileTextIcon className="h-4 w-4 shrink-0 text-sky" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[11px] font-bold text-slate-200">
                        {pendingAttachment.name}
                      </span>
                      <span className="block text-[10px] text-slate-500">{formatBytes(pendingAttachment.size)}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setPendingAttachment(null)}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-slate-500 hover:bg-slate-800 hover:text-slate-200"
                      aria-label="Remove attachment">
                      <XIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}

                {composerError && (
                  <p
                    role="alert"
                    className="mb-2 rounded-lg border-2 border-danger/40 bg-coral/10 px-2.5 py-1.5 text-[11px] font-semibold text-danger">
                    {composerError}
                  </p>
                )}

                <form onSubmit={send} className="flex items-end gap-1.5">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,image/*"
                    onChange={(event) => {
                      void onFile(event.target.files?.[0] ?? null);
                      event.target.value = '';
                    }}
                    className="sr-only"
                    aria-label="Attach a file"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={preparing}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border-2 border-ink bg-slate-900 text-slate-300 transition-colors hover:bg-sun-light hover:text-ink disabled:opacity-50"
                    aria-label="Attach a past paper or photo">
                    <PaperclipIcon className="h-4 w-4" />
                  </button>
                  <label className="sr-only" htmlFor="community-message">
                    Message {room.name}
                  </label>
                  <textarea
                    id="community-message"
                    ref={composerRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        send();
                      }
                    }}
                    rows={2}
                    maxLength={1200}
                    placeholder={preparing ? 'Preparing attachment…' : `Message ${room.name}…  (Enter to send)`}
                    className="field !mt-0 min-h-[2.6rem] flex-1 resize-none !py-2"
                  />
                  <button
                    type="submit"
                    disabled={preparing || (!input.trim() && !pendingAttachment)}
                    className="btn-primary h-9 shrink-0 !px-3"
                    aria-label="Send message">
                    <SendIcon className="h-4 w-4" />
                  </button>
                </form>
                <p className="mt-1 text-right text-[9px] text-slate-600">
                  Shift + Enter for a new line · files under 1.2 MB
                </p>
              </div>
            </section>
          </div>

          <section className="mx-auto mt-3 max-w-6xl" aria-labelledby="meetups-title">
            <div className="flex items-end justify-between gap-2">
              <div>
                <h2 id="meetups-title" className="font-display text-base font-extrabold text-slate-100">
                  Meet-ups this week
                </h2>
                <p className="text-[11px] text-slate-500">
                  Study together at a set time. Add your name so others know who is coming.
                </p>
              </div>
              <CalendarDaysIcon className="h-4 w-4 shrink-0 text-coral" />
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {state.sessions.map((session) => {
                const attending = account ? session.joinedBy.includes(account.id) : false;
                return (
                  <article key={session.id} className="glass-card flex flex-col gap-2 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-display text-sm font-bold text-slate-100">{session.title}</p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                          {session.dateLabel} · {session.timeLabel}
                        </p>
                        <p className="text-[10px] text-slate-500">Hosted by {session.host}</p>
                      </div>
                      <span className="shrink-0 rounded-full border-2 border-ink bg-teal-light px-2 py-0.5 text-[10px] font-bold text-ink">
                        {sessionAttendeeCount(session)} going
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleStudySession(session.id)}
                      aria-pressed={attending}
                      className={attending ? 'btn-secondary w-full !py-1.5 text-xs' : 'btn-primary w-full !py-1.5 text-xs'}>
                      {attending ? "You're in · leave" : "I'm in"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      ) : (
        <section className="mt-3 space-y-3" aria-label="Past papers library">
          {notice && (
            <div className="flex items-center gap-2 rounded-xl border-2 border-ink bg-teal-light px-3 py-2 text-xs font-semibold text-ink">
              <CheckIcon className="h-4 w-4" />
              <span className="min-w-0 flex-1">{notice}</span>
              <button
                type="button"
                onClick={() => setNotice('')}
                aria-label="Dismiss message"
                className="grid h-6 w-6 place-items-center rounded-md hover:bg-white/50">
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          <div className="glass-card p-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-base font-extrabold text-slate-100">Shared past papers</h2>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  Papers, memos and study notes shared by learners in this study room.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUploadOpen(true)}
                className="btn-primary self-start !py-1.5 text-xs sm:self-auto">
                <PlusIcon className="h-3.5 w-3.5" /> Share a paper
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <label className="relative block w-full lg:max-w-xs">
                <span className="sr-only">Search past papers</span>
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="search"
                  value={paperQuery}
                  onChange={(event) => setPaperQuery(event.target.value)}
                  placeholder="Search title, subject or year"
                  className="field !mt-0 !py-2 !pl-9"
                />
              </label>
              <div className="flex gap-1 overflow-x-auto" role="tablist" aria-label="Filter papers by subject">
                {paperSubjects.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    role="tab"
                    aria-selected={paperSubject === subject}
                    onClick={() => setPaperSubject(subject)}
                    className={`whitespace-nowrap rounded-full border-2 px-2.5 py-1 text-[11px] font-bold transition-colors ${
                      paperSubject === subject
                        ? 'border-ink bg-sun text-ink shadow-pop-sm'
                        : 'border-transparent text-slate-400 hover:border-ink hover:bg-sun-light hover:text-ink'
                    }`}>
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {papers.length > 0 ? (
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {papers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} onPreview={() => setPreviewPaper(paper)} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={FileTextIcon}
              title="No papers match that search"
              description="Try another subject or share the paper you are looking for."
              action={
                <button type="button" onClick={() => setUploadOpen(true)} className="btn-primary !py-1.5 text-xs">
                  <UploadIcon className="h-3.5 w-3.5" /> Share a paper
                </button>
              }
            />
          )}

          <p className="rounded-xl border-2 border-dashed border-ink/15 px-3 py-2 text-[11px] leading-snug text-slate-500">
            Past papers are shared for revision. Credit the school or teacher who created them, and never share a paper
            you are not allowed to circulate. Seed entries are samples.
          </p>
        </section>
      )}

      <p className="mx-auto mt-3 max-w-6xl rounded-xl border-2 border-dashed border-ink/15 px-3 py-2 text-[11px] leading-snug text-slate-500">
        This study room is stored on this device for the prototype. Online peers, seed conversations and meet-up hosts
        are sample data; messages, rooms and papers you add stay in this browser.
      </p>

      <UploadPaperModal open={uploadOpen} onClose={() => setUploadOpen(false)} onUploaded={handleUploaded} />
      <PaperPreviewModal paper={previewPaper} onClose={() => setPreviewPaper(null)} />
      <CreateRoomModal open={createOpen} onClose={closeCreate} onCreated={handleRoomCreated} />
    </div>
  );
}
