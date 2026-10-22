import { useEffect, useRef, useState } from 'react';
import { CheckIcon, ChevronDownIcon, LanguagesIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Lang } from '../../types/app';

const options: { value: Lang; shortLabel: string; label: string }[] = [
  { value: 'en', shortLabel: 'EN', label: 'English' },
  { value: 'xh', shortLabel: 'XH', label: 'isiXhosa' }
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === lang) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <div ref={rootRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border-2 border-ink bg-slate-950/40 px-2 text-xs font-bold text-slate-200 transition-colors hover:bg-sun-light hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          aria-label={`Language: ${selected.label}`}
          aria-haspopup="menu"
          aria-expanded={open}>
          <LanguagesIcon className="h-4 w-4 text-slate-400" aria-hidden="true" />
          <span>{selected.shortLabel}</span>
          <ChevronDownIcon className={`h-3 w-3 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        {open && (
          <div
            role="menu"
            aria-label="Choose language"
            className="absolute right-0 top-full z-[80] mt-2 w-48 overflow-hidden rounded-xl border-2 border-ink bg-slate-900 p-1.5 shadow-pop">
            <p className="px-2.5 pb-1 pt-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Display language</p>
            {options.map((option) => {
              const active = option.value === lang;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setLang(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
                    active ? 'bg-sun text-ink' : 'text-slate-300 hover:bg-sun-light hover:text-ink'
                  }`}>
                  <span className={`grid h-7 w-8 place-items-center rounded-md border-2 border-ink text-[10px] font-bold ${
                    active ? 'bg-sun-light text-ink' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {option.shortLabel}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{option.label}</span>
                  </span>
                  {active && <CheckIcon className="h-4 w-4 text-ink" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}