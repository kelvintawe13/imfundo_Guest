import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ActivityIcon, MenuIcon, MoreVerticalIcon, WifiIcon, WifiOffIcon } from 'lucide-react';
import { Logo } from '../layout/Logo';
import { LanguageSwitcher } from '../layout/LanguageSwitcher';
import { ThemeSwitcher } from '../layout/ThemeSwitcher';
import { appNav } from '../../data/nav';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';

type AppTopbarProps = {
  onOpenRail: () => void;
  onOpenSidebar?: () => void;
};

export function AppTopbar({ onOpenRail, onOpenSidebar }: AppTopbarProps) {
  const { pathname } = useLocation();
  const { online, openModal } = useApp();
  const { t } = useLanguage();
  const current = appNav.find((n) => pathname.startsWith(n.to));
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="relative z-30 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-800 bg-canvas px-3 sm:px-4 md:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        {onOpenSidebar && (
          <button
            type="button"
            onClick={onOpenSidebar}
            className="rounded-lg border border-slate-700 p-1.5 text-slate-300 transition-colors duration-150 hover:bg-slate-800 lg:hidden"
            aria-label="Open navigation">
            <MenuIcon className="h-5 w-5" />
          </button>
        )}
        <Link to="/" className="min-w-0 shrink lg:hidden" aria-label="Imfundo Quest home">
          <Logo compactOnMobile />
        </Link>
        {current && <p className="hidden truncate text-sm font-medium text-slate-300 sm:block lg:block">{t(current.key)}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 md:gap-2">
        <button
          type="button"
          onClick={() => openModal('sync')}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-1 text-xs font-medium transition-colors duration-150 sm:px-2.5 sm:py-1 ${
          online ? 'border-success/40 bg-success/10 text-success-soft hover:bg-success/20' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`
          }
          aria-label={`${online ? t('status.online') : t('status.offline')}. Open sync details`}>

          {online ? <WifiIcon className="h-3.5 w-3.5" /> : <WifiOffIcon className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline md:inline">{online ? t('status.online') : t('status.offline')}</span>
        </button>
        <div className="hidden sm:flex items-center gap-1 sm:gap-1.5">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
        <div className="relative sm:hidden" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-slate-700 p-1.5 text-slate-300 transition-colors duration-150 hover:bg-slate-800"
            aria-label="Settings"
            aria-expanded={menuOpen}>
            <MoreVerticalIcon className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-slate-800 bg-slate-900/95 p-3 shadow-xl backdrop-blur-xl">
              <div className="flex flex-col gap-3">
                <ThemeSwitcher />
                <LanguageSwitcher />
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onOpenRail}
          className="rounded-lg border border-slate-700 p-1.5 text-slate-300 transition-colors duration-150 hover:bg-slate-800 md:hidden"
          aria-label={t('shell.activity')}>

          <ActivityIcon className="h-4 w-4" />
        </button>
      </div>
    </header>);

}