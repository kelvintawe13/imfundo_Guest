import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { publicNav } from '../../data/nav';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

export function Header() {
  const { t } = useLanguage();
  const { setRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
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
                onClick={() => {
                  if (n.to === '/teachers') setRole('staff');
                  else if (n.to !== '/') setRole('learner');
                }}
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
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-canvas/95 backdrop-blur-xl">
          <nav aria-label="Mobile menu">
            <ul className="flex flex-col p-4 space-y-1">
              {publicNav.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    onClick={() => {
                      setRole(n.to === '/teachers' ? 'staff' : 'learner');
                      setMobileMenuOpen(false);
                    }}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                        isActive ? 'bg-slate-800 text-slate-50' : 'text-slate-400 hover:text-slate-100'
                      }`
                    }>
                    {t(n.key)}
                  </NavLink>
                </li>
              ))}
              <li className="border-t border-slate-800 pt-3 mt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:text-slate-100">
                  {t('auth.login')}
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary block w-full text-center">
                  {t('auth.signup')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>);

}