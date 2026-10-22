import { NavLink, useLocation } from 'react-router-dom';
import { ClipboardListIcon, FileTextIcon, PresentationIcon, UserRoundCheckIcon } from 'lucide-react';
import { appNav } from '../../data/nav';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

/**
 * Fixed bottom navigation bar for mobile and tablet, shown only on app
 * routes for the active learner or staff workspace. Public landing and auth
 * layouts opt out entirely; on lg+ the role-specific sidebar replaces it.
 */
export function BottomNav() {
  const { t } = useLanguage();
  const { role } = useApp();
  const { pathname } = useLocation();
  const roleNav = role === 'staff'
    ? [
        { to: '/teachers', label: 'Teacher', icon: PresentationIcon },
        { to: '/teachers/classes', label: 'Classes', icon: ClipboardListIcon },
        { to: '/teachers/resources', label: 'Resources', icon: FileTextIcon },
        { to: '/teachers/support', label: 'Support', icon: UserRoundCheckIcon }
      ]
    : appNav.filter(({ to }) => to !== '/teachers').map((item) => ({ ...item, label: t(item.key) }));
  const inApp = roleNav.some(({ to }) => pathname.startsWith(to));
  if (!inApp) return null;

  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-ink bg-slate-900/95 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-xl lg:hidden"
      style={{ boxShadow: '0 -8px 24px -18px rgb(var(--ink) / 0.55)' }}>
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 sm:px-4">
        {roleNav.map(({ label, to, icon: Icon }) =>
        <li key={to} className="min-w-0 flex-1">
            <NavLink
            to={to}
            end={to === '/teachers'}
            className={({ isActive }) =>
            `group flex flex-col items-center gap-1 px-1 py-2 text-[11px] font-semibold transition-all duration-200 ${
            isActive ? 'text-ink' : 'text-slate-400 hover:text-ink'}`
          }
          >
              {({ isActive }) =>
          <>
                <span
              className={`grid h-10 w-14 place-items-center rounded-xl border-2 transition-all duration-200 ${
              isActive ? 'border-ink bg-sun shadow-pop-sm' : 'border-transparent bg-transparent group-hover:border-ink group-hover:bg-sun-light'}`}>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-ink' : ''}`} aria-hidden="true" />
                </span>
                <span className="max-w-full truncate leading-tight">{label}</span>
              </>
          }
            </NavLink>
          </li>
        )}
      </ul>
    </nav>);

}
