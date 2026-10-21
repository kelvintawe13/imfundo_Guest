import { CheckIcon, XIcon, ZapIcon } from 'lucide-react';

const options = ['(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x − 2)(x − 3)', '(x + 5)(x + 1)'];

export function LessonScreen() {
  return (
    <div className="flex h-full flex-col px-4 pb-6 pt-2">
      <div className="flex items-center gap-2">
        <XIcon className="h-4 w-4 text-slate-500" />
        <div className="h-1.5 flex-1 rounded-full bg-slate-800">
          <div className="h-full w-3/5 rounded-full bg-success" />
        </div>
        <span className="flex items-center gap-0.5 text-[10px] font-bold text-success">
          <ZapIcon className="h-3 w-3 fill-success" />
          120
        </span>
      </div>
      <p className="mt-4 text-[10px] font-medium text-slate-500">Quadratics · Question 3 of 5</p>
      <p className="mt-1 text-[15px] font-semibold leading-snug text-slate-50">Factor x² + 5x + 6</p>
      <div className="mt-3 space-y-2">
        {options.map((o, i) =>
        <div
          key={o}
          className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-[12px] font-medium ${
          i === 0 ? 'border-success bg-success/10 text-slate-50' : 'border-slate-800 text-slate-300'}`
          }>
          
            {o}
            {i === 0 && <CheckIcon className="h-3.5 w-3.5 text-success" />}
          </div>
        )}
      </div>
      <div className="mt-auto rounded-xl border border-success/30 bg-success/10 p-3">
        <p className="text-[12px] font-semibold text-success-soft">Correct! +10 XP</p>
        <p className="mt-0.5 text-[10px] text-slate-300">2 × 3 = 6 and 2 + 3 = 5</p>
        <div className="mt-2.5 rounded-lg bg-success py-2 text-center text-[11px] font-semibold text-slate-950">Continue</div>
      </div>
    </div>);

}