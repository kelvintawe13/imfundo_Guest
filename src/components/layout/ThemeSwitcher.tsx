import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme, type Theme } from '../../contexts/ThemeContext';

const options: {value: Theme;label: string;icon: typeof SunIcon;}[] = [
{ value: 'light', label: 'Light mode', icon: SunIcon },
{ value: 'dark', label: 'Dark mode', icon: MoonIcon }];


export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div role="group" aria-label="Theme" className="inline-flex rounded-lg border border-slate-700 bg-slate-950/60 p-0.5">
      {options.map(({ value, label, icon: Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={`grid h-6 w-7 place-items-center rounded-md transition-colors duration-150 ${
            active ? 'bg-slate-700 text-slate-50' : 'text-slate-400 hover:text-slate-200'}`
            }>
            
            <Icon className="h-3.5 w-3.5" />
          </button>);

      })}
    </div>);

}