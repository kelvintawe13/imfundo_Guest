import { useId } from 'react';

type ToggleProps = {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  compact?: boolean;
};

export function Toggle({ checked, onChange, label, description, compact = false }: ToggleProps) {
  const id = useId();
  return (
    <div className={`flex items-center justify-between gap-3 ${compact ? 'py-2' : 'py-2.5'}`}>
      <div>
        <p id={id} className="font-display text-sm font-bold text-slate-100">
          {label}
        </p>
        {description && <p className={`${compact ? 'mt-0 text-[11px]' : 'mt-0.5 text-xs'} text-slate-400`}>{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full border-2 border-ink transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
        checked ? 'bg-teal' : 'bg-slate-800'}`
        }>
        
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full border border-ink bg-white shadow transition-transform duration-150 ${
          checked ? 'translate-x-5' : ''}`
          } />
        
      </button>
    </div>);

}
