import { useId } from 'react';

type ToggleProps = {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
};

export function Toggle({ checked, onChange, label, description }: ToggleProps) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <div>
        <p id={id} className="text-sm font-medium text-slate-100">
          {label}
        </p>
        {description && <p className="mt-0.5 text-xs text-slate-400">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={id}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft ${
        checked ? 'bg-success' : 'bg-slate-700'}`
        }>
        
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-150 ${
          checked ? 'translate-x-5' : ''}`
          } />
        
      </button>
    </div>);

}