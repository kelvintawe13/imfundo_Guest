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
    <section className={plain ? '' : 'glass-card p-3'} aria-labelledby="sync-title">
      <div className="flex items-center justify-between">
        <h2 id="sync-title" className={`font-display font-extrabold ${plain ? 'text-[13px]' : 'text-sm'}`}>
          {t('dash.syncQueue')}
        </h2>
        <span className="text-[11px] tabular-nums text-slate-500">{pending} pending</span>
      </div>
      <p className={`mt-0.5 flex items-center gap-1.5 ${plain ? 'text-[11px]' : 'mt-1 text-xs'} ${online ? 'text-teal' : 'text-slate-400'}`}>
        {online ?
        pending ? 'Connection found, syncing…' : `All synced · ${lastSynced}` :

        <>
            <WifiOffIcon className="h-3.5 w-3.5" /> {plain ? 'Offline · progress queued' : 'Waiting for a connection. Learning continues offline.'}
          </>
        }
      </p>

      {loading ?
      <div className="mt-3 space-y-3" role="status" aria-label="Loading sync queue">
          {Array.from({ length: 4 }).map((_, i) =>
        <div key={i} className="space-y-2">
              <Skeleton className="h-3.5 w-3/4" />
              <Skeleton className="h-1.5 w-full" />
            </div>
        )}
        </div> :

      <ul className={`${plain ? 'mt-2 space-y-2' : 'mt-3 space-y-3.5'}`}>
          {queue.map((q) => {
          const done = q.progress >= 100;
          const Icon = done ? CircleCheckIcon : q.direction === 'up' ? CloudUploadIcon : CloudDownloadIcon;
          return (
            <li key={q.id}>
                <div className="flex items-center gap-2">
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${done ? 'text-teal' : 'text-slate-400'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-slate-200">{q.label}</p>
                    {!plain && <p className="truncate text-xs text-slate-500">{q.detail}</p>}
                  </div>
                  <span className="text-[10px] tabular-nums text-slate-500">{done ? 'Synced' : q.size}</span>
                </div>
                <div className={`${plain ? 'ml-5 mt-1 h-1' : 'ml-6 mt-2 h-1.5'} rounded-full border border-ink/30 bg-slate-950/40`}>
                  <div
                  className={`h-full rounded-full transition-[width] duration-300 ease-out ${done ? 'bg-teal' : 'bg-sky'}`}
                  style={{ width: `${q.progress}%` }} />
                
                </div>
              </li>);

        })}
        </ul>
      }
      <button type="button" onClick={() => openModal('sync')} className={`btn-secondary w-full ${plain ? 'mt-2 !py-1.5 text-xs' : 'mt-4'}`}>
        {t('dash.viewDetails')}
      </button>
    </section>);

}