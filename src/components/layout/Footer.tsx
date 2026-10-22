import { Link } from 'react-router-dom';
import { MailIcon, MapPinIcon } from 'lucide-react';
import { Logo } from './Logo';
import { publicNav } from '../../data/nav';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

export function Footer() {
  const { t } = useLanguage();
  const { setRole } = useApp();

  return (
    <footer className="border-t-2 border-ink bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-3 max-w-md text-sm text-white/70">
            An offline AI tutor for secondary school learners in Idutywa, Eastern Cape. University project prototype,
            not yet available.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-sun" aria-hidden="true" />
              <a href="mailto:hello@imfundoquest.co.za" className="transition-colors hover:text-sun">
                hello@imfundoquest.co.za
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-sun" aria-hidden="true" />
              Idutywa, Eastern Cape
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-sm font-bold text-sun">Explore</p>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm">
            {publicNav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => {
                    if (n.to === '/teachers') setRole('staff');
                    else setRole('learner');
                  }}
                  className="text-white/80 transition-colors duration-150 hover:text-sun"
                >
                  {t(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-bold text-sun">Get started</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/signup" className="text-white/80 transition-colors duration-150 hover:text-sun">
                Create a learner account
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-white/80 transition-colors duration-150 hover:text-sun">
                Sign in
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/80 transition-colors duration-150 hover:text-sun">
                Partner with us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Imfundo Quest · Proposed initiative</p>
          <p>Sources: The State of the ICT Sector Report of South Africa, 2025 · Statistics South Africa, 2024.</p>
        </div>
      </div>
    </footer>
  );
}
