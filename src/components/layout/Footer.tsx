import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { navItems } from '../../data/nav';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

export function Footer() {
  const { t } = useLanguage();
  const { setRole } = useApp();
  return (
    <footer className="border-t border-slate-800 bg-slate-950/40">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 pb-6 pt-6 sm:px-6 md:grid-cols-[1.5fr_1fr] lg:pb-8">
        <div>
          <Logo />
          <p className="mt-2 max-w-md text-sm text-slate-400">
            An offline AI tutor for secondary school learners in Idutywa, Eastern Cape. University project prototype,
            not yet available.
          </p>
          <p className="mt-2 text-[11px] text-slate-500">
            Sources: The State of the ICT Sector Report of South Africa, 2025 · Statistics South Africa, 2024.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-1.5 text-sm">
            {navItems.map((n) =>
            <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => {
                    if (n.to === '/teachers') setRole('staff');
                    else if (n.to !== '/') setRole('learner');
                  }}
                  className="text-slate-400 transition-colors duration-150 hover:text-slate-100">
                  {t(n.key)}
                </Link>
              </li>
            )}
          </ul>
          <p className="mt-3 text-[11px] text-slate-500">© 2026 Imfundo Quest · Proposed initiative</p>
        </nav>
      </div>
    </footer>);

}
