import { NavLink, useLocation } from 'react-router-dom';
import { appNav } from '../../data/nav';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * Fixed bottom navigation bar for mobile and tablet, shown only on app
 * routes (dashboard, lesson, teachers, profile) where the desktop sidebar
 * is relevant. Public landing and auth layouts opt out entirely; on lg+ the
 * sidebar replaces it.
 */
export function BottomNav() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const inApp = appNav.some(({ to }) => pathname.startsWith(to));
  if (!inApp) return null;

  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-slate-900/95 pb-[env(safe-area-inset-bottom)] pt-1 backdrop-blur-xl lg:hidden"
      style={{ boxShadow: '0 -10px 30px -18px rgb(2 6 23 / 0.9)' }}>
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 sm:px-4">
        {appNav.map(({ key, to, icon: Icon }) =>
        <li key={to} className="min-w-0 flex-1">
            <NavLink
            to={to}
            className={({ isActive }) =>
            `group flex flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-medium transition-colors duration-150 ${
            isActive ? 'text-primary-soft' : 'text-slate-400 hover:text-slate-200'}`
          }
          >
              {({ isActive }) =>
          <>
                <span
              className={`grid h-8 w-12 place-items-center rounded-full transition-colors duration-150 ${
              isActive ? 'bg-primary/20' : 'bg-transparent group-hover:bg-slate-800/70'}`}>
                  <Icon className={`h-4 w-4 ${isActive ? 'text-primary-soft' : ''}`} aria-hidden="true" />
                </span>
                <span className="max-w-full truncate leading-none">{t(key)}</span>
              </>
          }
            </NavLink>
          </li>
        )}
      </ul>
    </nav>);

}
