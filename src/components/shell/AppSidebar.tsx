import { useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRightIcon, ClipboardListIcon, FileTextIcon, LogOutIcon, SearchIcon, SchoolIcon, UserRoundCheckIcon, XIcon } from 'lucide-react';
import { Logo } from '../layout/Logo';
import { appNav } from '../../data/nav';
import { learner } from '../../data/profile';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

export function AppSidebar() {
  const { t } = useLanguage();
  const { role, openModal, setRole } = useApp();
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
    { label: 'Learner support', to: '/teachers/support', icon: UserRoundCheckIcon }
  ].filter((item) => item.label.toLocaleLowerCase().includes(normalizedQuery));
  const hasSearchResults = visibleRoutes.length > 0 || (role === 'staff' && staffTools.length > 0);
  const roleLabel = role === 'staff' ? 'Staff workspace' : 'Learner space';

  return (
    <aside className="hidden h-screen w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-900/40 lg:flex">
      <Link to="/" className="flex h-12 items-center border-b border-slate-800 px-4" aria-label="Imfundo Quest home">
        <Logo />
      </Link>

      <div className="border-b border-slate-800 px-3 py-3">
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 px-2.5 py-2">
          <span className={`h-2 w-2 rounded-full ${role === 'staff' ? 'bg-primary-soft' : 'bg-success'}`} />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-200">{roleLabel}</p>
            <p className="text-[10px] text-slate-500">{role === 'staff' ? 'Teaching tools' : learner.grade}</p>
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
            className="w-full rounded-lg border border-slate-800 bg-slate-950/50 py-2 pl-8 pr-8 text-xs text-slate-200 outline-none placeholder:text-slate-500 focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-500 hover:text-slate-200"
              aria-label="Clear navigation search">
              <XIcon className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <nav className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-3 py-4" aria-label={`${roleLabel} navigation`}>
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          {role === 'staff' ? 'Staff' : 'For learners'}
        </p>
        <ul className="space-y-1">
          {visibleRoutes.map(({ key, to, icon: Icon }) => {
            const active = pathname === to || (to !== '/dashboard' && pathname.startsWith(to));
            return (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                      isActive || active
                        ? 'border-primary/20 bg-primary/10 text-slate-50'
                        : 'border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                    }`
                  }>
                  {({ isActive }) => (
                    <>
                      <Icon className={`h-4 w-4 ${isActive || active ? 'text-primary-soft' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      <span className="flex-1">{t(key)}</span>
                      {(isActive || active) && <span className="h-1.5 w-1.5 rounded-full bg-primary-soft" />}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {role === 'staff' && (
          <section className="mt-6" aria-labelledby="staff-tools-title">
            <h2 id="staff-tools-title" className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Staff tools
            </h2>
            <ul className="space-y-1">
              {staffTools.map(({ label, to, icon: Icon }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? 'border-primary/20 bg-primary/10 text-slate-50'
                          : 'border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                      }`
                    }>
                    {({ isActive }) => (
                      <>
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-primary-soft' : 'text-slate-500 group-hover:text-slate-300'}`} />
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

        <div className="mt-6 border-t border-slate-800 pt-3">
          <button
            type="button"
            onClick={() => openModal('partner')}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/50 hover:text-slate-100">
            <SchoolIcon className="h-4 w-4" /> Partner schools
            <ArrowUpRightIcon className="ml-auto h-3.5 w-3.5 text-slate-600" />
          </button>
        </div>
      </nav>

      <div className="flex items-center gap-3 border-t border-slate-800 p-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/20 text-xs font-semibold text-primary-soft">
          {role === 'staff' ? 'ST' : learner.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-100">{role === 'staff' ? 'Staff demo' : learner.name}</p>
          <p className="truncate text-xs text-slate-500">{role === 'staff' ? 'Staff account' : learner.grade}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setRole('learner');
            navigate('/login');
          }}
          className="rounded-md p-1.5 text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-slate-100"
          aria-label={t('auth.logout')}
          title={t('auth.logout')}>
          
          <LogOutIcon className="h-4 w-4" />
        </button>
      </div>
    </aside>);

}