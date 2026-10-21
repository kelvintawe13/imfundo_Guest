import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LayoutGridIcon, XIcon } from 'lucide-react';
import { navItems } from '../../data/nav';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

export function MobileNavFab() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const { chatOpen, setChatOpen, openModal } = useApp();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (chatOpen) setOpen(false);
  }, [chatOpen]);

  function toggle() {
    if (!open) setChatOpen(false);
    setOpen((o) => !o);
  }

  return (
    <div className="fixed bottom-5 right-[5.25rem] z-50 lg:hidden">
      <AnimatePresence>
        {open &&
        <motion.nav
          aria-label="Mobile"
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformOrigin: 'bottom right' }}
          className="absolute bottom-[4.25rem] right-0 w-60 rounded-xl border border-slate-800 bg-slate-900/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl">
          
            <ul>
              {navItems.map(({ key, to, icon: Icon }) =>
            <li key={to}>
                  <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                isActive ? 'bg-slate-800 text-slate-50' : 'text-slate-300 hover:bg-slate-800/60'}`

                }>
                
                    <Icon className="h-4 w-4 text-slate-400" />
                    {t(key)}
                  </NavLink>
                </li>
            )}
            </ul>
            {pathname === '/' ?
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                <Link to="/login" className="btn-secondary">
                  {t('auth.login')}
                </Link>
                <Link to="/signup" className="btn-primary">
                  {t('auth.signup')}
                </Link>
              </div> :

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openModal('partner');
            }}
            className="btn-primary mt-1.5 w-full">
            
                {t('cta.partner')}
              </button>
          }
          </motion.nav>
        }
      </AnimatePresence>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? t('common.close') : t('nav.menu')}
        className="grid h-14 w-14 place-items-center rounded-full border border-slate-700 bg-slate-900/90 text-slate-100 shadow-lg shadow-black/40 backdrop-blur-xl transition-transform duration-150 active:scale-95">
        
        {open ? <XIcon className="h-5 w-5" /> : <LayoutGridIcon className="h-5 w-5" />}
      </button>
    </div>);

}