import { Link } from 'react-router-dom';
import { CalendarDaysIcon, FileTextIcon, ShieldCheckIcon, UsersRoundIcon } from 'lucide-react';
import { RailSection } from '../RailSection';
import { communityGuidelines, communityPeers } from '../../../data/community';
import { interestById } from '../../../data/interests';
import { useLanguage } from '../../../contexts/LanguageContext';
import {
  isRoomMember,
  roomMatchScore,
  roomMemberCount,
  sessionAttendeeCount,
  toggleStudySession,
  useCommunity
} from '../../../utils/community';
import { useAuth } from '../../../utils/auth';

export function CommunityRail() {
  const { t } = useLanguage();
  const state = useCommunity();
  const account = useAuth();
  const online = communityPeers.filter((peer) => peer.online);
  const nextSession = state.sessions[0];
  const joined = nextSession && account ? nextSession.joinedBy.includes(account.id) : false;
  const interests = account?.interests ?? [];
  const rankedRooms = [...state.rooms]
    .sort((left, right) => {
      const scoreDiff = roomMatchScore(right, interests) - roomMatchScore(left, interests);
      if (scoreDiff !== 0) return scoreDiff;
      return Number(isRoomMember(right, account?.id ?? null)) - Number(isRoomMember(left, account?.id ?? null));
    })
    .slice(0, 5);

  return (
    <>
      <RailSection title="In the study room">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-slate-200">
          <UsersRoundIcon className="h-4 w-4 text-teal" />
          {online.length + 1} learners online
        </p>
        <p className="mt-1 text-[11px] text-slate-500">
          {state.messages.length} messages · {state.papers.length} shared papers
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {online.slice(0, 5).map((peer) => (
            <li
              key={peer.id}
              title={`${peer.name} is online`}
              className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-teal-light font-display text-[9px] font-extrabold text-ink">
              {peer.initials}
            </li>
          ))}
          {online.length > 5 && (
            <li className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-slate-900 font-display text-[9px] font-bold text-slate-400">
              +{online.length - 5}
            </li>
          )}
        </ul>
      </RailSection>

      <RailSection
        title={t('community.roomsForYou')}
        action={
          <Link to="/community?create=1" className="text-[10px] font-bold text-coral hover:underline">
            {t('community.newRoom')}
          </Link>
        }>
        {interests.length > 0 ? (
          <p className="mb-1.5 flex flex-wrap items-center gap-1">
            {interests.slice(0, 3).map((id) => {
              const interest = interestById(id);
              return interest ? (
                <span
                  key={id}
                  className="rounded-full border border-ink/20 px-1.5 py-0.5 text-[9px] font-semibold text-slate-400">
                  {interest.emoji} {interest.label}
                </span>
              ) : null;
            })}
            <Link to="/profile" className="text-[9px] font-bold text-coral hover:underline">
              Edit
            </Link>
          </p>
        ) : (
          <p className="mb-1.5 text-[10px] leading-snug text-slate-500">
            <Link to="/profile" className="font-bold text-coral hover:underline">
              Add your interests
            </Link>{' '}
            to see better room matches.
          </p>
        )}
        <ul className="space-y-1.5">
          {rankedRooms.map((room) => {
            const score = roomMatchScore(room, interests);
            const member = isRoomMember(room, account?.id ?? null);
            return (
              <li key={room.id}>
                <Link
                  to={`/community?room=${room.id}`}
                  className="flex items-center gap-2 rounded-lg border border-ink/15 px-2.5 py-1.5 transition-colors hover:border-ink hover:bg-sun/10">
                  <span aria-hidden="true">{room.emoji}</span>
                  <span className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-200">{room.name}</span>
                  {score > 0 && (
                    <span className="shrink-0 rounded-full border border-teal/40 px-1 py-0.5 text-[8px] font-bold uppercase text-teal">
                      {t('community.match')}
                    </span>
                  )}
                  {member && <span className="shrink-0 text-[9px] text-slate-500">{t('community.joined')}</span>}
                  <span className="shrink-0 text-[10px] text-slate-500">{roomMemberCount(room)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </RailSection>

      {nextSession && (
        <RailSection title="Next meet-up">
          <p className="flex items-start gap-2 text-[13px] font-bold leading-tight text-slate-100">
            <CalendarDaysIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral" />
            {nextSession.title}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            {nextSession.dateLabel} · {nextSession.timeLabel}
          </p>
          <p className="text-[10px] text-slate-500">
            Hosted by {nextSession.host} · {sessionAttendeeCount(nextSession)} going
          </p>
          <button
            type="button"
            onClick={() => toggleStudySession(nextSession.id)}
            className={joined ? 'btn-secondary mt-2 w-full !py-1.5 text-xs' : 'btn-primary mt-2 w-full !py-1.5 text-xs'}>
            {joined ? "You're in · leave" : "I'm in"}
          </button>
        </RailSection>
      )}

      <RailSection
        title="Past papers"
        action={
          <Link to="/community?tab=papers" className="text-[10px] font-bold text-coral hover:underline">
            Open
          </Link>
        }>
        <p className="flex items-center gap-2 text-[11px] text-slate-400">
          <FileTextIcon className="h-3.5 w-3.5 text-sky" />
          {state.papers.length} papers and memos shared
        </p>
        <ul className="mt-1.5 space-y-1">
          {state.papers.slice(0, 2).map((paper) => (
            <li key={paper.id} className="truncate text-[11px] text-slate-500">
              {paper.title}
            </li>
          ))}
        </ul>
      </RailSection>

      <RailSection title="House rules">
        <ul className="space-y-1.5">
          {communityGuidelines.slice(0, 2).map((rule) => (
            <li key={rule} className="flex gap-1.5 text-[11px] leading-snug text-slate-400">
              <ShieldCheckIcon className="mt-0.5 h-3 w-3 shrink-0 text-teal" />
              {rule}
            </li>
          ))}
        </ul>
      </RailSection>
    </>
  );
}
