import React from 'react';
import { CircleCheckIcon, CloudDownloadIcon, CloudUploadIcon, WifiOffIcon } from 'lucide-react';
import { Skeleton } from '../ui/Skeleton';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSimulatedLoad } from '../../hooks/useSimulatedLoad';

export function SyncQueuePanel({ plain = false }: {plain?: boolean;}) {
  const { queue, online, openModal, lastSynced } = useApp();
  const { t } = useLanguage();
  const loading = useSimulatedLoad('sync', 550);
  const pending = queue.filter((q) => q.progress < 100).length;

  return (
    <section className={plain ? '' : 'glass-card p-4'} aria-labelledby="sync-title">
      <div className="flex items-center justify-between">
        <h2 id="sync-title" className="text-sm font-semibold">
          {t('dash.syncQueue')}
        </h2>
        <span className="text-xs tabular-nums text-slate-500">{pending} pending</span>
      </div>
      <p className={`mt-1 flex items-center gap-1.5 text-xs ${online ? 'text-success-soft' : 'text-slate-400'}`}>
        {online ?
        pending ? 'Connection found, syncing…' : `All synced · ${lastSynced}` :

        <>
            <WifiOffIcon className="h-3.5 w-3.5" /> Waiting for a connection. Learning continues offline.
          </>
        }
      </p>

      {loading ?
      <div className="mt-4 space-y-3" role="status" aria-label="Loading sync queue">
          {Array.from({ length: 4 }).map((_, i) =>
        <div key={i} className="space-y-2">
              <Skeleton className="h-3.5 w-3/4" />
              <Skeleton className="h-1.5 w-full" />
            </div>
        )}
        </div> :

      <ul className="mt-4 space-y-3.5">
          {queue.map((q) => {
          const done = q.progress >= 100;
          const Icon = done ? CircleCheckIcon : q.direction === 'up' ? CloudUploadIcon : CloudDownloadIcon;
          return (
            <li key={q.id}>
                <div className="flex items-start gap-2.5">
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${done ? 'text-success' : 'text-slate-400'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-slate-200">{q.label}</p>
                    <p className="truncate text-xs text-slate-500">{q.detail}</p>
                  </div>
                  <span className="text-xs tabular-nums text-slate-500">{q.size}</span>
                </div>
                <div className="ml-6 mt-2 h-1 rounded-full bg-slate-800">
                  <div
                  className={`h-full rounded-full transition-[width] duration-300 ease-out ${done ? 'bg-success' : 'bg-primary'}`}
                  style={{ width: `${q.progress}%` }} />
                
                </div>
              </li>);

        })}
        </ul>
      }
      <button type="button" onClick={() => openModal('sync')} className="btn-secondary mt-5 w-full">
        {t('dash.viewDetails')}
      </button>
    </section>);

}