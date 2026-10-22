import { useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRightIcon, ClipboardListIcon, FileTextIcon, LogOutIcon, SearchIcon, SchoolIcon, UserRoundCheckIcon, XIcon } from 'lucide-react';
import { Logo } from '../layout/Logo';
import { appNav } from '../../data/nav';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';
import { logoutAccount } from '../../utils/auth';
import { profileInitials, useUserProfile } from '../../utils/userProfile';

type AppSidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export function AppSidebar({ isOpen = false, onClose }: AppSidebarProps) {
  const { t } = useLanguage();
  const { role, openModal } = useApp();
  const profile = useUserProfile();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const learnerRoutes = useMemo(() => appNav.filter((item) => item.to !== '/teachers'), []);
  const staffRoutes = useMemo(() => appNav.filter((item) => item.to === '/teachers'), []);
  const routes = role === 'staff' ? staffRoutes : learnerRoutes;
  const visibleRoutes = routes.filter((item) => t(item.key).toLocaleLowerCase().includes(normalizedQuery));
  const staffTools = [
    { label: 'Class management', to: '/teachers/classes', icon: ClipboardListIcon },
    { label: 'Teaching resources', to: '/teachers/resources', icon: FileTextIcon },
    { label: 'Learner support', to: '/teachers/support', icon: UserRoundCheckIcon },
  ].filter((item) => item.label.toLocaleLowerCase().includes(normalizedQuery));
  const hasSearchResults = visibleRoutes.length > 0 || (role === 'staff' && staffTools.length > 0);
  const roleLabel = role === 'staff' ? 'Staff workspace' : 'Learner space';

  const handleNavClick = (to: string) => {
    navigate(to);
    if (onClose) onClose();
  };

  const navItemClass = (active: boolean) =>
    `group flex items-center gap-3 rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-colors duration-150 ${
      active
        ? 'border-ink bg-sun text-ink shadow-pop-sm'
        : 'border-transparent text-slate-400 hover:border-ink hover:bg-sun-light hover:text-ink'
    }`;

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between border-b-2 border-ink px-4 py-3">
        <Link to="/" className="flex items-center gap-2" aria-label="Imfundo Quest home" onClick={() => onClose?.()}>
          <Logo />
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg border-2 border-ink bg-slate-900 text-slate-400 transition-colors hover:bg-sun-light hover:text-ink lg:hidden"
            aria-label="Close sidebar"
          >
            <XIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="border-b-2 border-ink px-3 py-3">
        <div className="mb-3 flex items-center gap-2 rounded-xl border-2 border-ink bg-slate-900 px-2.5 py-2">
          <span className={`h-2.5 w-2.5 rounded-full border border-ink ${role === 'staff' ? 'bg-coral' : 'bg-teal'}`} />
          <div className="min-w-0">
            <p className="font-display text-xs font-bold text-slate-100">{roleLabel}</p>
            <p className="text-[10px] text-slate-500">{role === 'staff' ? 'Teaching tools' : profile.grade || 'Your learning space'}</p>
          </div>
        </div>
        <label htmlFor="sidebar-search" className="sr-only">Search navigation</label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <input
            id="sidebar-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${role === 'staff' ? 'staff' : 'learner'} routes`}
            className="w-full rounded-xl border-2 border-ink bg-slate-900 py-2 pl-8 pr-8 text-xs font-semibold text-slate-100 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-sky"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-500 hover:text-slate-100"
              aria-label="Clear navigation search"
            >
              <XIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <nav className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-3 py-4" aria-label={`${roleLabel} navigation`}>
        <p className="px-3 pb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
          {role === 'staff' ? 'Staff' : 'For learners'}
        </p>
        <ul className="space-y-1.5">
          {visibleRoutes.map(({ key, to, icon: Icon }) => {
            const active = pathname === to || (to !== '/dashboard' && pathname.startsWith(to));
            return (
              <li key={to}>
                <NavLink to={to} onClick={() => handleNavClick(to)} className={({ isActive }) => navItemClass(isActive || active)}>
                  {({ isActive }) => (
                    <>
                      <Icon className={`h-4 w-4 ${isActive || active ? 'text-ink' : 'text-slate-500 group-hover:text-ink'}`} />
                      <span className="flex-1">{t(key)}</span>
                      {(isActive || active) && <span className="h-1.5 w-1.5 rounded-full bg-coral" />}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {role === 'staff' && (
          <section className="mt-6" aria-labelledby="staff-tools-title">
            <h2 id="staff-tools-title" className="px-3 pb-2 font-display text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
              Staff tools
            </h2>
            <ul className="space-y-1.5">
              {staffTools.map(({ label, to, icon: Icon }) => (
                <li key={label}>
                  <NavLink to={to} onClick={() => handleNavClick(to)} className={({ isActive }) => navItemClass(isActive)}>
                    {({ isActive }) => (
                      <>
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-ink' : 'text-slate-500 group-hover:text-ink'}`} />
                        <span className="min-w-0 flex-1 truncate">{label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!hasSearchResults && (
          <p className="px-3 py-4 text-xs leading-relaxed text-slate-500">No matching {role === 'staff' ? 'staff' : 'learner'} pages.</p>
        )}

        <div className="mt-6 border-t-2 border-ink/15 pt-3">
          <button
            type="button"
            onClick={() => openModal('partner')}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition-colors hover:bg-sun-light hover:text-ink"
          >
            <SchoolIcon className="h-4 w-4" /> Partner schools
            <ArrowUpRightIcon className="ml-auto h-3.5 w-3.5 text-slate-500" />
          </button>
        </div>
      </nav>

      <div className="flex items-center gap-3 border-t-2 border-ink p-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-sun font-display text-xs font-extrabold text-ink">
          {profileInitials(profile.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-bold text-slate-100">
            {profile.name || (role === 'staff' ? 'Staff account' : 'Learner')}
          </p>
          <p className="truncate text-xs text-slate-500">
            {role === 'staff' ? profile.school || 'Teaching tools' : profile.grade || 'Learner account'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            logoutAccount();
            onClose?.();
            window.location.assign('/login');
          }}
          className="grid h-8 w-8 place-items-center rounded-lg border-2 border-transparent text-slate-400 transition-colors duration-150 hover:border-ink hover:bg-sun-light hover:text-ink"
          aria-label={t('auth.logout')}
          title={t('auth.logout')}
        >
          <LogOutIcon className="h-4 w-4" />
        </button>
      </div>
    </>
  );

  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <aside className="absolute inset-y-0 left-0 h-full w-72 flex-col border-r-2 border-ink bg-slate-950">
          {sidebarContent}
        </aside>
      </div>
    );
  }

  return (
    <aside className="hidden h-screen w-60 shrink-0 flex-col border-r-2 border-ink bg-slate-950/40 lg:flex">
      {sidebarContent}
    </aside>
  );
}
