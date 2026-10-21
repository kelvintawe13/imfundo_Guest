import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { navItems } from '../../data/nav';
import { useLanguage } from '../../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-slate-800 bg-slate-950/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 pt-8 sm:px-6 md:grid-cols-[1.5fr_1fr] lg:pb-10">
        <div>
          <Logo />
          <p className="mt-3 max-w-md text-sm text-slate-400">
            An offline AI tutor for secondary school learners in Idutywa, Eastern Cape. University project prototype,
            not yet available.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Sources: The State of the ICT Sector Report of South Africa, 2025 · Statistics South Africa, 2024.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navItems.map((n) =>
            <li key={n.to}>
                <Link to={n.to} className="text-slate-400 transition-colors duration-150 hover:text-slate-100">
                  {t(n.key)}
                </Link>
              </li>
            )}
          </ul>
          <p className="mt-4 text-xs text-slate-500">© 2026 Imfundo Quest · Proposed initiative</p>
        </nav>
      </div>
    </footer>);

}