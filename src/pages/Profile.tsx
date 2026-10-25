import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ActivityIcon, HardDriveIcon, HeartIcon, MessagesSquareIcon, Settings2Icon } from 'lucide-react';
import { Toggle } from '../components/ui/Toggle';
import { EmptyState } from '../components/ui/EmptyState';
import { LanguageSwitcher } from '../components/layout/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';
import { interestCatalog, MAX_INTERESTS } from '../data/interests';
import { buildAchievements } from '../utils/achievements';
import { updateInterests, useAuth } from '../utils/auth';
import { levelFromXp, relativeTime, totalXpFromProgress, useLearnerData } from '../utils/learnerData';
import { formatBytes, readStorageStats } from '../utils/localStorageStats';
import { readPreferences, writePreferences, type LearnerPreferences } from '../utils/preferences';
import { profileInitials, useUserProfile } from '../utils/userProfile';

export function Profile() {
  const { t } = useLanguage();
  const { openModal, quizProgress } = useApp();
  const profile = useUserProfile();
  const account = useAuth();
  const learnerData = useLearnerData();
  const [prefs, setPrefs] = useState<LearnerPreferences>(readPreferences);
  const [interests, setInterests] = useState<string[]>(account?.interests ?? []);
  const [interestError, setInterestError] = useState('');
  const totalXp = totalXpFromProgress(quizProgress);
  const { level, xpIntoLevel, xpForNext } = levelFromXp(totalXp);
  const xpPct = xpForNext > 0 ? Math.min(100, Math.round(xpIntoLevel / xpForNext * 100)) : 0;
  const achievements = buildAchievements(learnerData, quizProgress);
  const earned = achievements.filter((achievement) => achievement.earned).length;
  const storageStats = readStorageStats();
  const updates = learnerData.updates;

  const updatePreference = (key: keyof LearnerPreferences, value: boolean) => {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    writePreferences(next);
  };

  useEffect(() => {
    setInterests(account?.interests ?? []);
  }, [account]);

  const toggleInterest = (id: string) => {
    setInterestError('');
    const next = interests.includes(id)
      ? interests.filter((item) => item !== id)
      : interests.length >= MAX_INTERESTS
        ? interests
        : [...interests, id];
    if (next === interests) {
      setInterestError(`Pick up to ${MAX_INTERESTS} interests.`);
      return;
    }
    setInterests(next);
    const result = updateInterests(next);
    if (!result.ok) setInterestError(result.error);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
      <h1 className="sr-only">{t('profile.title')}</h1>
      <div className="grid gap-3 xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 xl:content-start">
          <section className="glass-card p-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-sun font-display text-base font-extrabold text-ink">
                {profileInitials(profile.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-base font-extrabold">{profile.name || 'Learner'}</p>
                <p className="truncate text-xs text-slate-400">
                  {[profile.grade, profile.school].filter(Boolean).join(' · ') || 'Your learning space'}
                </p>
                {account?.email && <p className="mt-0.5 truncate text-[10px] text-slate-500">{account.email}</p>}
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-400">Level {level}</span>
                <span className="font-bold tabular-nums text-teal">{totalXp.toLocaleString()} XP</span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full border-2 border-ink bg-slate-950/40">
                <div className="h-full rounded-full bg-teal" style={{ width: `${xpPct}%` }} />
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              {profile.joined ? `Joined ${profile.joined}` : 'Your progress is stored on this device'}
            </p>
          </section>

          <section className="glass-card p-3" aria-labelledby="storage-title">
            <h2 id="storage-title" className="flex items-center gap-2 font-display text-sm font-extrabold">
              <HardDriveIcon className="h-3.5 w-3.5 text-slate-400" /> On-device storage
            </h2>
            <p className="mt-0.5 text-[11px] text-slate-400">
              {formatBytes(storageStats.totalBytes)} across {storageStats.itemCount} saved {storageStats.itemCount === 1 ? 'item' : 'items'}
            </p>
            <div className="mt-2 flex h-2.5 overflow-hidden rounded-full border-2 border-ink bg-slate-950/40">
              {storageStats.entries.map((entry) =>
              <div
                key={entry.label}
                className={entry.color}
                style={{ width: `${storageStats.totalBytes > 0 ? entry.bytes / storageStats.totalBytes * 100 : 0}%` }} />
              )}
            </div>
            {storageStats.entries.length > 0 ?
            <ul className="mt-2 space-y-1 text-[11px]">
                {storageStats.entries.map((entry) =>
              <li key={entry.label} className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-sm ${entry.color}`} /> {entry.label}
                    </span>
                    <span className="tabular-nums">{formatBytes(entry.bytes)}</span>
                  </li>
                )}
              </ul> :

            <p className="mt-2 text-[11px] text-slate-500">No local app data saved yet.</p>
            }
          </section>
        </div>

        <div className="min-w-0 space-y-3">
          <section className="glass-card p-3" aria-labelledby="interests-title">
            <div className="flex items-center justify-between gap-2">
              <h2 id="interests-title" className="flex items-center gap-2 font-display text-sm font-extrabold">
                <HeartIcon className="h-3.5 w-3.5 text-coral" /> Your interests
              </h2>
              <span className="text-[11px] text-slate-400">
                {interests.length}/{MAX_INTERESTS}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
              We use these to put the most relevant study rooms first and to match you with learners who care about the
              same things.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {interestCatalog.map((interest) => {
                const active = interests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleInterest(interest.id)}
                    className={`inline-flex items-center gap-1 rounded-full border-2 px-2.5 py-1 text-[11px] font-bold transition-colors ${
                      active
                        ? 'border-ink bg-sun text-ink shadow-pop-sm'
                        : 'border-ink/25 bg-slate-900 text-slate-400 hover:border-ink hover:bg-sun-light hover:text-ink'
                    }`}>
                    <span aria-hidden="true">{interest.emoji}</span>
                    {interest.label}
                  </button>
                );
              })}
            </div>
            {interestError && (
              <p role="alert" className="mt-2 rounded-lg border-2 border-danger/40 bg-coral/10 px-2.5 py-1.5 text-[11px] font-semibold text-danger">
                {interestError}
              </p>
            )}
            <Link to="/community" className="btn-secondary mt-2 w-full !py-1.5 text-xs">
              <MessagesSquareIcon className="h-3.5 w-3.5" /> Find your study rooms
            </Link>
          </section>

          <section className="glass-card p-3" aria-labelledby="badges-title">
            <div className="flex items-center justify-between gap-2">
              <h2 id="badges-title" className="font-display text-sm font-extrabold">
                {t('profile.badges')}
              </h2>
              <span className="text-[11px] text-slate-400">
                {earned} of {achievements.length} earned
              </span>
            </div>
            <ul className="mt-2.5 grid grid-cols-2 gap-2">
              {achievements.map(({ id, name, icon: Icon, earned: got, current, target }) =>
              <li
                key={id}
                className={`flex min-h-12 items-center gap-2 rounded-lg border-2 p-2 ${
                got ? 'border-ink bg-sun-light' : 'border-dashed border-ink/25 opacity-60'}`
                }>
                
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink ${got ? 'bg-sun text-ink' : 'bg-slate-900 text-slate-500'}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="break-words text-[11px] font-bold leading-tight text-slate-200">{name}</p>
                    <p className="text-[10px] text-slate-500">{got ? 'Earned' : `${current}/${target}`}</p>
                  </div>
                </li>
              )}
            </ul>
          </section>

          <div className="grid items-start gap-3">
            <section className="glass-card p-3" aria-labelledby="prefs-title">
              <h2 id="prefs-title" className="font-display text-sm font-extrabold">
                {t('profile.preferences')}
              </h2>
              <div className="mt-1 flex items-center justify-between gap-2 border-b-2 border-ink/10 py-2">
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-slate-100">App language</p>
                  <p className="text-[11px] text-slate-400">English or isiXhosa</p>
                </div>
                <LanguageSwitcher />
              </div>
              <div className="divide-y-2 divide-ink/10">
                <Toggle compact label="Download on Wi-Fi only" description="Protects your mobile data" checked={prefs.wifiOnly} onChange={(value) => updatePreference('wifiOnly', value)} />
                <Toggle compact label="Data saver" description="Sync progress only, skip new lessons" checked={prefs.dataSaver} onChange={(value) => updatePreference('dataSaver', value)} />
                <Toggle compact label="Daily reminder" description="A nudge at 16:00 to keep your streak" checked={prefs.reminder} onChange={(value) => updatePreference('reminder', value)} />
              </div>
              <button type="button" onClick={() => openModal('settings')} className="btn-secondary mt-2 w-full !py-1.5 text-xs">
                <Settings2Icon className="h-3.5 w-3.5" /> {t('lesson.settings')}
              </button>
            </section>

            <section className="glass-card p-3" aria-labelledby="activity-title">
              <h2 id="activity-title" className="font-display text-sm font-extrabold">
                Recent activity
              </h2>
              {updates.length > 0 ?
              <ol className="mt-2 space-y-2 border-l-2 border-ink/15 pl-3.5">
                  {updates.map((update) =>
                <li key={update.id} className="relative">
                      <span className="absolute -left-[19px] top-1.5 h-1.5 w-1.5 rounded-full border border-ink bg-coral" />
                      <p className="font-display text-[13px] font-bold leading-tight text-slate-100">{update.title}</p>
                      <p className="text-[11px] text-slate-400">
                        {update.text} · {relativeTime(update.at)}
                      </p>
                    </li>
                  )}
                </ol> :

              <div className="mt-2">
                  <EmptyState
                    compact
                    icon={ActivityIcon}
                    title={t('dash.noUpdatesTitle')}
                    description={t('dash.noUpdatesText')} />
                </div>
              }
            </section>
          </div>
        </div>
      </div>
    </div>);

}
