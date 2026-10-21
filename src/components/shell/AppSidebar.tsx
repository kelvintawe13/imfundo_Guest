import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HouseIcon, LogOutIcon, SchoolIcon } from 'lucide-react';
import { Logo } from '../layout/Logo';
import { appNav } from '../../data/nav';
import { learner } from '../../data/profile';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

export function AppSidebar() {
  const { t } = useLanguage();
  const { openModal } = useApp();
  const navigate = useNavigate();

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-900/40 lg:flex">
      <Link to="/" className="flex h-14 items-center border-b border-slate-800 px-5" aria-label="Imfundo Quest home">
        <Logo />
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="App">
        <p className="px-3 pb-2 text-[11px] font-medium text-slate-500">Learn & teach</p>
        <ul className="space-y-0.5">
          {appNav.map(({ key, to, icon: Icon }) =>
          <li key={to}>
              <NavLink
              to={to}
              className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ${
              isActive ? 'bg-slate-800 text-slate-50' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'}`

              }>
              
                {({ isActive }) =>
              <>
                    <Icon className={`h-4 w-4 ${isActive ? 'text-primary-soft' : ''}`} />
                    {t(key)}
                  </>
              }
              </NavLink>
            </li>
          )}
        </ul>

        <p className="px-3 pb-2 pt-6 text-[11px] font-medium text-slate-500">More</p>
        <ul className="space-y-0.5">
          <li>
            <Link to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-150 hover:bg-slate-800/50 hover:text-slate-100">
              <HouseIcon className="h-4 w-4" /> {t('nav.home')}
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => openModal('partner')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-150 hover:bg-slate-800/50 hover:text-slate-100">
              
              <SchoolIcon className="h-4 w-4" /> Partner schools
            </button>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-3 border-t border-slate-800 p-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/20 text-xs font-semibold text-primary-soft">
          {learner.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-100">{learner.name}</p>
          <p className="truncate text-xs text-slate-500">{learner.grade}</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="rounded-md p-1.5 text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-slate-100"
          aria-label={t('auth.logout')}
          title={t('auth.logout')}>
          
          <LogOutIcon className="h-4 w-4" />
        </button>
      </div>
    </aside>);

}