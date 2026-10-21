import { useState } from 'react';
import { CircleCheckIcon, DownloadIcon, FileTextIcon, LoaderCircleIcon, PrinterIcon } from 'lucide-react';
import { resources } from '../../data/teacher';

type DlState = 'idle' | 'loading' | 'done';

export function ResourcesTab() {
  const [state, setState] = useState<Record<string, DlState>>({});

  function download(id: string) {
    setState((s) => ({ ...s, [id]: 'loading' }));
    window.setTimeout(() => setState((s) => ({ ...s, [id]: 'done' })), 900);
  }

  return (
    <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
      <section className="glass-card overflow-hidden" aria-labelledby="res-title">
        <h3 id="res-title" className="px-4 pt-5 text-sm font-semibold">
          Lesson guides & worksheets
        </h3>
        <ul className="mt-3 divide-y divide-slate-800 border-t border-slate-800">
          {resources.map((r) => {
            const s = state[r.id] ?? 'idle';
            return (
              <li key={r.id} className="flex items-center gap-3 px-4 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-800 text-slate-300">
                  <FileTextIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-100">{r.title}</p>
                  <p className="text-xs text-slate-500">
                    {r.type} · {r.topic} · PDF {r.size}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => download(r.id)}
                  disabled={s !== 'idle'}
                  className={`btn-secondary !px-3 !py-1.5 text-xs ${s === 'done' ? '!border-success/40 !text-success-soft' : ''}`}
                  aria-label={`Download ${r.title}`}>
                  
                  {s === 'loading' && <LoaderCircleIcon className="h-3.5 w-3.5 animate-spin" />}
                  {s === 'done' && <CircleCheckIcon className="h-3.5 w-3.5" />}
                  {s === 'idle' && <DownloadIcon className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline">{s === 'done' ? 'Saved' : s === 'loading' ? 'Saving' : 'Download'}</span>
                </button>
              </li>);

          })}
        </ul>
      </section>

      <aside className="glass-card p-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary-soft">
          <PrinterIcon className="h-5 w-5" />
        </span>
        <h3 className="mt-3 font-semibold">Built for classrooms without enough devices</h3>
        <p className="mt-2 text-sm text-slate-400">
          Many teachers want to use digital tools but have had little ICT training. Every guide is step-by-step, every
          worksheet prints in black and white, and nothing requires a projector or Wi-Fi.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          <li>• One-lesson getting-started plan</li>
          <li>• Matches the CAPS topic order</li>
          <li>• Bilingual key-term glossaries</li>
        </ul>
      </aside>
    </div>);

}