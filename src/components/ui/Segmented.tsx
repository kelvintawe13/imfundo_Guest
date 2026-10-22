
type SegmentedProps<T extends string> = {
  value: T;
  onChange: (v: T) => void;
  options: {value: T;label: string;}[];
  label: string;
  size?: 'sm' | 'md';
};

export function Segmented<T extends string>({ value, onChange, options, label, size = 'md' }: SegmentedProps<T>) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full border-2 border-ink bg-slate-950/40 p-0.5">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={`whitespace-nowrap rounded-full font-bold transition-colors duration-150 ${
            size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'} ${
            active ? 'bg-sun text-ink shadow-pop-sm' : 'text-slate-400 hover:text-ink'}`}>
            
            {o.label}
          </button>);

      })}
    </div>);

}