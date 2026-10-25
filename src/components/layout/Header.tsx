import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { publicNav } from '../../data/nav';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

export function Header() {
  const { t } = useLanguage();
  const { setRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function prepareRoute(to: string) {
    if (to === '/teachers') setRole('staff');
    else if (to === '/parents') setRole('parent');
    else setRole('learner');
  }

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" aria-label="Imfundo Quest home" className="shrink-0" onClick={() => setRole('learner')}>
          <Logo tone="ink" />
        </Link>

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-1">
            {publicNav.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.to === '/'}
                  onClick={() => prepareRoute(n.to)}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-full border-2 px-3 py-1.5 font-display text-sm font-bold transition-colors duration-150 ${
                      isActive
                        ? 'border-ink bg-sun text-ink'
                        : 'border-transparent text-ink hover:border-ink hover:bg-sun-light'
                    }`
                  }
                >
                  {t(n.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            to="/login"
            className="hidden whitespace-nowrap px-3 py-1.5 font-display text-sm font-bold text-ink transition-colors duration-150 hover:text-coral sm:inline-block"
          >
            {t('auth.login')}
          </Link>
          <Link to="/signup" className="btn-pop hidden !px-4 !py-1.5 sm:inline-flex">
            {t('auth.signup')}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid h-9 w-9 place-items-center rounded-lg border-2 border-ink bg-white text-ink transition-colors hover:bg-sun-light lg:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t-2 border-ink bg-cream lg:hidden">
          <nav aria-label="Mobile menu">
            <ul className="flex flex-col gap-1 p-4">
              {publicNav.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    onClick={() => {
                      prepareRoute(n.to);
                      setMobileMenuOpen(false);
                    }}
                    className={({ isActive }) =>
                      `block rounded-xl border-2 px-3 py-2.5 font-display text-sm font-bold transition-colors duration-150 ${
                        isActive
                          ? 'border-ink bg-sun text-ink'
                          : 'border-transparent text-ink hover:border-ink hover:bg-sun-light'
                      }`
                    }
                  >
                    {t(n.key)}
                  </NavLink>
                </li>
              ))}
              <li className="mt-2 border-t-2 border-ink/15 pt-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2.5 font-display text-sm font-bold text-ink transition-colors hover:bg-sun-light"
                >
                  {t('auth.login')}
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-pop block w-full"
                >
                  {t('auth.signup')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
