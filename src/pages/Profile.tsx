import { useState } from 'react';
import { HardDriveIcon, Settings2Icon } from 'lucide-react';
import { Toggle } from '../components/ui/Toggle';
import { LanguageSwitcher } from '../components/layout/LanguageSwitcher';
import { badges, learner, recentActivity } from '../data/profile';
import { learnerStats } from '../data/lessons';
import { storage, storageTotalMb } from '../data/syncQueue';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';

export function Profile() {
  const { t } = useLanguage();
  const { openModal } = useApp();
  const [prefs, setPrefs] = useState({ wifiOnly: true, dataSaver: true, reminder: false });
  const usedMb = storage.reduce((s, i) => s + i.mb, 0);
  const xpPct = Math.round(learnerStats.xp / learnerStats.xpForNext * 100);
  const earned = badges.filter((b) => b.earned).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      <h1 className="sr-only">{t('profile.title')}</h1>
      <div className="grid gap-3 2xl:grid-cols-[340px_1fr]">
        <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-1 2xl:content-start">
          <section className="glass-card p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-sun font-display text-lg font-extrabold text-ink">
                {learner.initials}
              </span>
              <div>
                <p className="font-display text-lg font-extrabold">{learner.name}</p>
                <p className="text-sm text-slate-400">
                  {learner.grade} · {learner.school}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-400">Level {learnerStats.level}</span>
                <span className="font-bold tabular-nums text-teal">{learnerStats.xp.toLocaleString()} XP</span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full border-2 border-ink bg-slate-950/40">
                <div className="h-full rounded-full bg-teal" style={{ width: `${xpPct}%` }} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">{learner.joined}</p>
          </section>

          <section className="glass-card p-4" aria-labelledby="storage-title">
            <h2 id="storage-title" className="flex items-center gap-2 font-display text-sm font-extrabold">
              <HardDriveIcon className="h-4 w-4 text-slate-400" /> On-device storage
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              {(usedMb / 1024).toFixed(2)} GB of {storageTotalMb / 1024} GB available to the app
            </p>
            <div className="mt-3 flex h-3 overflow-hidden rounded-full border-2 border-ink bg-slate-950/40">
              {storage.map((s) =>
              <div key={s.label} className={s.color} style={{ width: `${s.mb / storageTotalMb * 100}%` }} />
              )}
            </div>
            <ul className="mt-3 space-y-1.5 text-xs">
              {storage.map((s) =>
              <li key={s.label} className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-sm ${s.color}`} /> {s.label}
                  </span>
                  <span className="tabular-nums">{s.mb} MB</span>
                </li>
              )}
            </ul>
          </section>
        </div>

        <div className="space-y-3">
          <section className="glass-card p-4" aria-labelledby="badges-title">
            <div className="flex items-center justify-between">
              <h2 id="badges-title" className="font-display text-sm font-extrabold">
                {t('profile.badges')}
              </h2>
              <span className="text-xs text-slate-500">
                {earned} of {badges.length} earned
              </span>
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {badges.map(({ name, icon: Icon, earned: got }) =>
              <li
                key={name}
                className={`flex flex-col items-center rounded-xl border-2 p-3 text-center ${
                got ? 'border-ink bg-sun-light' : 'border-dashed border-ink/25 opacity-60'}`
                }>
                
                  <span className={`grid h-10 w-10 place-items-center rounded-full border-2 border-ink ${got ? 'bg-sun text-ink' : 'bg-slate-900 text-slate-500'}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-2 text-xs font-bold text-slate-200">{name}</p>
                  {!got && <p className="text-[11px] text-slate-500">Locked</p>}
                </li>
              )}
            </ul>
          </section>

          <div className="grid gap-3 md:grid-cols-2">
            <section className="glass-card p-4" aria-labelledby="prefs-title">
              <h2 id="prefs-title" className="font-display text-sm font-extrabold">
                {t('profile.preferences')}
              </h2>
              <div className="mt-2 flex items-center justify-between gap-3 py-2.5">
                <div>
                  <p className="font-display text-sm font-bold text-slate-100">App language</p>
                  <p className="mt-0.5 text-xs text-slate-400">English or isiXhosa</p>
                </div>
                <LanguageSwitcher />
              </div>
              <div className="divide-y-2 divide-ink/10 border-t-2 border-ink/10">
                <Toggle label="Download on Wi-Fi only" description="Protects your mobile data" checked={prefs.wifiOnly} onChange={(v) => setPrefs((p) => ({ ...p, wifiOnly: v }))} />
                <Toggle label="Data saver" description="Sync progress only, skip new lessons" checked={prefs.dataSaver} onChange={(v) => setPrefs((p) => ({ ...p, dataSaver: v }))} />
                <Toggle label="Daily reminder" description="A nudge at 16:00 to keep your streak" checked={prefs.reminder} onChange={(v) => setPrefs((p) => ({ ...p, reminder: v }))} />
              </div>
              <button type="button" onClick={() => openModal('settings')} className="btn-secondary mt-3 w-full">
                <Settings2Icon className="h-4 w-4" /> {t('lesson.settings')}
              </button>
            </section>

            <section className="glass-card p-4" aria-labelledby="activity-title">
              <h2 id="activity-title" className="font-display text-sm font-extrabold">
                Recent activity
              </h2>
              <ol className="mt-3 space-y-3 border-l-2 border-ink/15 pl-4">
                {recentActivity.map((a) =>
                <li key={a.title} className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full border border-ink bg-coral" />
                    <p className="font-display text-sm font-bold text-slate-100">{a.title}</p>
                    <p className="text-xs text-slate-500">
                      {a.meta} · {a.when}
                    </p>
                  </li>
                )}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>);

}