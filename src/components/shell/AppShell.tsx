import { useEffect, useState } from 'react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setRailOpen(false);
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-canvas text-slate-50">
      <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-w-0 min-h-0 flex-1 flex-col">
        <AppTopbar onOpenRail={() => setRailOpen(true)} onOpenSidebar={() => setSidebarOpen(true)} />
        <div className="flex min-h-0 flex-1">
          <main className="min-w-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="min-h-full pb-[4.5rem] lg:pb-5">
              {loading ? <PageSkeleton /> : <Outlet />}
            </div>
          </main>
          <aside
            className="hidden h-full w-72 shrink-0 overscroll-contain overflow-y-auto overflow-x-hidden border-l-2 border-ink bg-slate-950/40 md:block xl:w-80"
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
            className="absolute inset-y-0 right-0 w-[min(340px,90vw)] overflow-y-auto border-l-2 border-ink bg-canvas">

              <div className="flex h-12 items-center justify-between border-b-2 border-ink px-4">
                <p className="font-display text-sm font-bold">{t('shell.activity')}</p>
                <button
                type="button"
                onClick={() => setRailOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg border-2 border-ink bg-slate-900 text-slate-400 transition-colors hover:bg-sun-light hover:text-ink"
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