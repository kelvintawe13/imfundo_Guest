import { Link, useLocation } from 'react-router-dom';
import { ActivityIcon, WifiIcon, WifiOffIcon } from 'lucide-react';
import { Logo } from '../layout/Logo';
import { LanguageSwitcher } from '../layout/LanguageSwitcher';
import { ThemeSwitcher } from '../layout/ThemeSwitcher';
import { appNav } from '../../data/nav';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';

type AppTopbarProps = {onOpenRail: () => void;};

export function AppTopbar({ onOpenRail }: AppTopbarProps) {
  const { pathname } = useLocation();
  const { online, openModal } = useApp();
  const { t } = useLanguage();
  const current = appNav.find((n) => pathname.startsWith(n.to));

  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between gap-3 border-b border-slate-800 bg-canvas/80 px-4 backdrop-blur-xl sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <Link to="/" className="lg:hidden" aria-label="Imfundo Quest home">
          <Logo />
        </Link>
        {current && <p className="hidden truncate text-sm font-medium text-slate-300 lg:block">{t(current.key)}</p>}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => openModal('sync')}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-150 ${
          online ? 'border-success/40 bg-success/10 text-success-soft hover:bg-success/20' : 'border-slate-700 text-slate-300 hover:bg-slate-800'}`
          }
          aria-label={`${online ? t('status.online') : t('status.offline')}. Open sync details`}>
          
          {online ? <WifiIcon className="h-3.5 w-3.5" /> : <WifiOffIcon className="h-3.5 w-3.5" />}
          <span className="hidden md:inline">{online ? t('status.online') : t('status.offline')}</span>
        </button>
        <ThemeSwitcher />
        <LanguageSwitcher />
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