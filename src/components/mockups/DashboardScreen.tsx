import { AtomIcon, FlameIcon, MonitorIcon, SigmaIcon, WifiOffIcon, ZapIcon } from 'lucide-react';

const rows = [
{ icon: SigmaIcon, title: 'Number patterns', meta: '3 min · 40 XP' },
{ icon: AtomIcon, title: 'Newton’s laws', meta: '5 min · 60 XP' },
{ icon: MonitorIcon, title: 'Formal emails', meta: '3 min · 30 XP' }];


export function DashboardScreen() {
  return (
    <div className="flex h-full flex-col px-4 pt-2">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-slate-50">Molo, Lwazi</p>
        <span className="flex items-center gap-1 rounded-full border border-slate-700 px-2 py-0.5 text-[9px] font-medium text-slate-300">
          <WifiOffIcon className="h-2.5 w-2.5" /> Offline
        </span>
      </div>
      <div className="mt-3 flex gap-2 text-[10px] font-semibold">
        <span className="flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-1 text-slate-200">
          <FlameIcon className="h-3 w-3 text-orange-400" /> 12
        </span>
        <span className="flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-1 text-success-soft">
          <ZapIcon className="h-3 w-3" /> 1,240 XP
        </span>
        <span className="rounded-md bg-slate-800/80 px-2 py-1 text-primary-soft">Lv 7</span>
      </div>
      <div className="mt-3 rounded-xl border border-primary/30 bg-primary/15 p-3">
        <p className="text-[9px] font-medium text-primary-soft">Continue</p>
        <p className="mt-0.5 text-[12px] font-semibold text-slate-50">Quadratic equations</p>
        <div className="mt-2 h-1 rounded-full bg-slate-800">
          <div className="h-full w-3/5 rounded-full bg-primary" />
        </div>
      </div>
      <p className="mt-3 text-[10px] font-semibold text-slate-400">Ready offline</p>
      <div className="mt-2 space-y-1.5">
        {rows.map(({ icon: Icon, title, meta }) =>
        <div key={title} className="flex items-center gap-2 rounded-lg border border-slate-800 p-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-slate-800">
              <Icon className="h-3 w-3 text-slate-300" />
            </span>
            <div>
              <p className="text-[10px] font-semibold text-slate-100">{title}</p>
              <p className="text-[9px] text-slate-500">{meta}</p>
            </div>
          </div>
        )}
      </div>
    </div>);

}