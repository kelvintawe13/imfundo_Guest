import { TrophyIcon } from 'lucide-react';
import { RailSection, UpdateList } from '../RailSection';
import { EmptyState } from '../../ui/EmptyState';
import { useApp } from '../../../contexts/AppContext';
import { useLanguage } from '../../../contexts/LanguageContext';
import { buildAchievements } from '../../../utils/achievements';
import { useAuth } from '../../../utils/auth';
import { relativeTime, useLearnerData } from '../../../utils/learnerData';

export function ProfileRail() {
  const { t } = useLanguage();
  const { quizProgress } = useApp();
  const learnerData = useLearnerData();
  const account = useAuth();
  const achievements = buildAchievements(learnerData, quizProgress);
  const nextBadges = achievements
    .filter((achievement) => !achievement.earned)
    .sort((left, right) => right.current / right.target - left.current / left.target)
    .slice(0, 3);
  const accountUpdates = account ?
  [
    {
      id: 'signed-in',
      title: 'Signed in',
      text: account.email,
      when: relativeTime(Date.parse(account.lastLoginAt))
    },
    {
      id: 'account-created',
      title: 'Account created',
      text: 'Saved on this device',
      when: relativeTime(Date.parse(account.createdAt))
    }
  ] :
  [];

  return (
    <>
      <RailSection title="Next badges">
        {nextBadges.length > 0 ?
        <ul className="space-y-2.5">
            {nextBadges.map((badge) => {
            const pct = Math.min(100, Math.round(badge.current / badge.target * 100));
            return (
              <li key={badge.id}>
                  <div className="flex justify-between gap-2 text-xs">
                    <span className="truncate text-slate-200">{badge.name}</span>
                    <span className="shrink-0 text-[10px] tabular-nums text-slate-400">
                      {badge.current}/{badge.target}{badge.unit ? ` ${badge.unit}` : ''}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full border border-ink/30 bg-slate-950/40">
                    <div className="h-full rounded-full bg-teal" style={{ width: `${pct}%` }} />
                  </div>
                </li>);

          })}
          </ul> :

        <EmptyState compact icon={TrophyIcon} title="All badges earned" description="You have unlocked every badge available." />
        }
      </RailSection>
      <RailSection title={t('shell.updates')}>
        {accountUpdates.length > 0 ?
        <UpdateList items={accountUpdates} /> :

        <EmptyState compact icon={TrophyIcon} title="No account activity" description="Sign in to see account activity here." />
        }
      </RailSection>
    </>);

}
