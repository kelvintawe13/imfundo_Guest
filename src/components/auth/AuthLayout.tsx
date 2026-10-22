import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, HouseIcon } from 'lucide-react';
import { GridPattern } from '../ui/GridPattern';
import { SecureDeviceIllustration } from '../illustrations/SecureDeviceIllustration';
import { useLanguage } from '../../contexts/LanguageContext';

const points = ['Progress saved on your phone, synced when possible', 'Explanations in English and isiXhosa', 'No data needed after install'];

export function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { t } = useLanguage();

  return (
    <div className="grid min-h-screen w-full bg-canvas text-slate-50 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <div className="flex min-w-0 flex-col px-4 py-3 pb-3 sm:px-5 md:px-8">
        <nav className="flex items-center justify-between" aria-label="Authentication navigation">
          <button
            type="button"
            onClick={() => {
              if (location.key === 'default') {
                navigate('/');
                return;
              }
              navigate(-1);
            }}
            className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            {t('common.back')}
          </button>
          <Link
            to="/"
            aria-label={t('nav.home')}
            className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
          >
            <HouseIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
        <main className="flex flex-1 items-center justify-center py-4 sm:py-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, scale: 0.99 }}
              transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-sm">
              
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <p className="text-xs text-slate-500">University project prototype · © 2026 Imfundo Quest</p>
      </div>

      <aside className="relative hidden min-w-0 overflow-hidden border-l border-slate-800 bg-slate-900/50 sm:flex sm:flex-col sm:items-center sm:justify-center sm:p-5 md:p-8 lg:p-10">
        <GridPattern className="text-slate-800/50" />
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="relative flex max-w-md flex-col items-center text-center">
          <SecureDeviceIllustration />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">Your progress lives on your phone.</h2>
          <p className="mt-2 text-sm text-slate-400">
            Sign in once at school. After that, every lesson, quiz and AI tutor answer works offline.
          </p>
          <ul className="mt-4 space-y-2 text-left text-sm text-slate-300">
            {points.map((p) =>
            <li key={p} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> {p}
              </li>
            )}
          </ul>
        </motion.div>
      </aside>
    </div>);

}