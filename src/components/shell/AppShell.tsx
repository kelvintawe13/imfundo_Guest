import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { AppSidebar } from './AppSidebar';
import { AppTopbar } from './AppTopbar';
import { RightRail } from './RightRail';
import { GlobalOverlays } from '../layout/GlobalOverlays';
import { PageSkeleton } from '../ui/Skeleton';
import { useRouteLoading } from '../../hooks/useRouteLoading';
import { useLanguage } from '../../contexts/LanguageContext';

export function AppShell() {
  const loading = useRouteLoading();
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const [railOpen, setRailOpen] = useState(false);

  useEffect(() => setRailOpen(false), [pathname]);

  return (
    <div className="flex min-h-screen w-full bg-canvas text-slate-50">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar onOpenRail={() => setRailOpen(true)} />
        <div className="flex flex-1">
          <main className="min-w-0 flex-1 pb-24 lg:pb-8">{loading ? <PageSkeleton /> : <Outlet />}</main>
          <aside
            className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 overflow-y-auto border-l border-slate-800 bg-slate-900/30 md:block xl:w-80"
            aria-label={t('shell.activity')}>
            
            <RightRail />
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {railOpen &&
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label={t('shell.activity')}>
            <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setRailOpen(false)} />
          
            <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-y-0 right-0 w-[min(340px,90vw)] overflow-y-auto border-l border-slate-800 bg-canvas">
            
              <div className="flex h-14 items-center justify-between border-b border-slate-800 px-5">
                <p className="text-sm font-semibold">{t('shell.activity')}</p>
                <button
                type="button"
                onClick={() => setRailOpen(false)}
                className="rounded-md p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                aria-label={t('common.close')}>
                
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              <RightRail />
            </motion.aside>
          </div>
        }
      </AnimatePresence>

      <GlobalOverlays />
    </div>);

}