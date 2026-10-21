import { Link, NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { publicNav } from '../../data/nav';
import { useLanguage } from '../../contexts/LanguageContext';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" aria-label="Imfundo Quest home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-0.5">
            {publicNav.map((n) =>
            <li key={n.to}>
                <NavLink
                to={n.to}
                end={n.to === '/'}
                className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                isActive ? 'bg-slate-800 text-slate-50' : 'text-slate-400 hover:text-slate-100'}`

                }>
                
                  {t(n.key)}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <Link
            to="/login"
            className="hidden whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors duration-150 hover:text-slate-50 sm:inline-block">
            
            {t('auth.login')}
          </Link>
          <Link to="/signup" className="btn-primary hidden !py-1.5 sm:inline-flex">
            {t('auth.signup')}
          </Link>
        </div>
      </div>
    </header>);

}