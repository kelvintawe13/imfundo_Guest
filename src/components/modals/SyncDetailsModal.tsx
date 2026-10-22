import { CircleCheckIcon, CloudDownloadIcon, CloudUploadIcon, CpuIcon, RefreshCwIcon, ShieldCheckIcon } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { EmptyState } from '../ui/EmptyState';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { tutorModel } from '../../data/syncQueue';

export function SyncDetailsModal() {
  const { modal, closeModal, online, setOnline, queue, lastSynced } = useApp();
  const { t } = useLanguage();
  const pending = queue.filter((q) => q.progress < 100).length;

  return (
    <Modal
      open={modal === 'sync'}
      onClose={closeModal}
      title="AI Tutor Offline Sync Details"
      description={
        online
          ? pending > 0
            ? 'Connection found. Syncing in the background.'
            : 'Connected. Everything is saved on this device.'
          : 'Working fully offline on this device.'
      }
      icon={<RefreshCwIcon className="h-4 w-4" />}
      footer={
      <>
          <button type="button" onClick={closeModal} className="btn-secondary">
            {t('common.close')}
          </button>
          <button type="button" onClick={() => setOnline(!online)} className="btn-primary">
            {online ? 'Go offline' : 'Sync now'}
          </button>
        </>
      }>
      
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border-2 border-ink bg-ink/20 text-sm">
        {[
        ['Tutor model', `${tutorModel.name} ${tutorModel.version}`],
        ['Model size', `${tutorModel.size} · on-device`],
        ['Last synced', lastSynced],
        ['Pending items', pending === 0 ? 'None' : `${pending} queued`]].
        map(([k, v]) =>
        <div key={k} className="bg-slate-900 p-3">
            <dt className="text-xs text-slate-500">{k}</dt>
            <dd className="mt-0.5 font-semibold text-slate-100">{v}</dd>
          </div>
        )}
      </dl>

      <h3 className="mt-4 font-display text-sm font-extrabold text-slate-100">Queue</h3>
      {queue.length === 0 ?
      <div className="mt-2">
          <EmptyState
            compact
            icon={CircleCheckIcon}
            title={t('dash.noSyncTitle')}
            description={t('dash.noSyncText')} />
        </div> :

      <ul className="mt-2 space-y-2">
        {queue.map((q) => {
          const done = q.progress >= 100;
          const Icon = done ? CircleCheckIcon : q.direction === 'up' ? CloudUploadIcon : CloudDownloadIcon;
          return (
            <li key={q.id} className="flex items-center gap-3 rounded-xl border-2 border-ink/15 px-3 py-2.5">
              <Icon className={`h-4 w-4 shrink-0 ${done ? 'text-teal' : 'text-slate-400'}`} />
              <span className="flex-1 truncate text-sm text-slate-200">{q.label}</span>
              <span className="text-xs tabular-nums text-slate-500">{done ? 'Synced' : q.size}</span>
            </li>);

        })}
      </ul>
      }

      <div className="mt-4 space-y-3 text-sm text-slate-400">
        <p className="flex gap-2">
          <CpuIcon className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
          Quizzes, feedback and AI tutor answers are computed on the phone. No request ever waits for the internet.
        </p>
        <p className="flex gap-2">
          <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
          Only progress and anonymised topic summaries are uploaded, never full chat messages.
        </p>
      </div>
    </Modal>);

}