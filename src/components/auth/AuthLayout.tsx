import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '../layout/Logo';
import { ThemeSwitcher } from '../layout/ThemeSwitcher';
import { LanguageSwitcher } from '../layout/LanguageSwitcher';
import { GridPattern } from '../ui/GridPattern';
import { SecureDeviceIllustration } from '../illustrations/SecureDeviceIllustration';

const points = ['Progress saved on your phone, synced when possible', 'Explanations in English and isiXhosa', 'No data needed after install'];

export function AuthLayout() {
  const { pathname } = useLocation();

  return (
    <div className="grid min-h-screen w-full bg-canvas text-slate-50 lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col px-4 py-4 sm:px-10">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="Imfundo Quest home">
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
        <main className="flex flex-1 items-center justify-center py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="w-full max-w-sm">
              
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <p className="text-xs text-slate-500">University project prototype · © 2026 Imfundo Quest</p>
      </div>

      <aside className="relative hidden overflow-hidden border-l border-slate-800 bg-slate-900/50 lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-10">
        <GridPattern className="text-slate-800/50" />
        <div className="relative flex max-w-md flex-col items-center text-center">
          <SecureDeviceIllustration />
          <h2 className="mt-6 text-2xl font-semibold tracking-tight">Your progress lives on your phone.</h2>
          <p className="mt-2 text-sm text-slate-400">
            Sign in once at school. After that, every lesson, quiz and AI tutor answer works offline.
          </p>
          <ul className="mt-6 space-y-2 text-left text-sm text-slate-300">
            {points.map((p) =>
            <li key={p} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> {p}
              </li>
            )}
          </ul>
        </div>
      </aside>
    </div>);

}