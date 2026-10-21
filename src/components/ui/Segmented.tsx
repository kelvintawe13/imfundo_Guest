
type SegmentedProps<T extends string> = {
  value: T;
  onChange: (v: T) => void;
  options: {value: T;label: string;}[];
  label: string;
  size?: 'sm' | 'md';
};

export function Segmented<T extends string>({ value, onChange, options, label, size = 'md' }: SegmentedProps<T>) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-lg border border-slate-700 bg-slate-950/60 p-0.5">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`whitespace-nowrap rounded-md font-semibold transition-colors duration-150 ${
            size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'} ${
            active ? 'bg-slate-700 text-slate-50' : 'text-slate-400 hover:text-slate-200'}`}>
            
            {o.label}
          </button>);

      })}
    </div>);

}