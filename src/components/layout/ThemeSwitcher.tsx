import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme, type Theme } from '../../contexts/ThemeContext';

const options: {value: Theme;label: string;icon: typeof SunIcon;}[] = [
{ value: 'light', label: 'Light mode', icon: SunIcon },
{ value: 'dark', label: 'Dark mode', icon: MoonIcon }];


export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div role="group" aria-label="Theme" className="inline-flex rounded-full border-2 border-ink bg-slate-950/40 p-0.5">
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
            className={`grid h-6 w-7 place-items-center rounded-full transition-colors duration-150 ${
            active ? 'bg-sun text-ink shadow-pop-sm' : 'text-slate-400 hover:text-ink'}`
            }>
            
            <Icon className="h-3.5 w-3.5" />
          </button>);

      })}
    </div>);

}