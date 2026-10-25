import { Link } from 'react-router-dom';
import {
  ArrowUpIcon,
  GraduationCapIcon,
  LanguagesIcon,
  MailIcon,
  MapPinIcon,
  SmartphoneIcon,
  WifiOffIcon,
} from 'lucide-react';
import { Logo } from './Logo';
import { publicNav } from '../../data/nav';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

const strip = [
  { icon: WifiOffIcon, label: 'Offline-first' },
  { icon: SmartphoneIcon, label: 'No data needed' },
  { icon: LanguagesIcon, label: 'isiXhosa + English' },
  { icon: GraduationCapIcon, label: 'Grades 10–12' },
];

export function Footer() {
  const { t } = useLanguage();
  const { setRole } = useApp();

  return (
    <footer className="relative overflow-hidden border-t-2 border-ink bg-ink text-white">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-10 h-48 w-48 rounded-full border border-white/10"
        aria-hidden="true"
      />

      {/* Brand promise strip */}
      <div className="relative border-b border-white/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-sun sm:px-6">
          {strip.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr]">
        <div className="max-w-md">
          <Logo tone="light" />
          <p className="mt-4 font-display text-xl font-extrabold leading-snug text-white">
            Learning that works, even when the internet doesn&apos;t.
          </p>
          <p className="mt-3 text-sm text-white/65">
            An offline AI tutor for secondary school learners in Idutywa, Eastern Cape. University project prototype,
            not yet available.
          </p>
          <ul className="mt-5 flex flex-col gap-2 text-sm text-white/80">
            <li>
              <a
                href="mailto:hello@imfundoquest.co.za"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 transition-colors hover:border-sun hover:text-sun"
              >
                <MailIcon className="h-4 w-4 text-sun" aria-hidden="true" />
                hello@imfundoquest.co.za
              </a>
            </li>
            <li>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5">
                <MapPinIcon className="h-4 w-4 text-sun" aria-hidden="true" />
                Idutywa, Eastern Cape
              </span>
            </li>
          </ul>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-sun px-3 py-1 font-display text-xs font-extrabold text-ink">
            2026 pilot · Partner schools wanted
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-sm font-bold text-sun">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {publicNav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => {
                    if (n.to === '/teachers') setRole('staff');
                    else if (n.to === '/parents') setRole('parent');
                    else setRole('learner');
                  }}
                  className="text-white/75 transition-colors duration-150 hover:text-sun"
                >
                  {t(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-bold text-sun">Get started</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/signup" className="text-white/75 transition-colors duration-150 hover:text-sun">
                Create an account
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-white/75 transition-colors duration-150 hover:text-sun">
                Sign in
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                onClick={() => setRole('learner')}
                className="text-white/75 transition-colors duration-150 hover:text-sun"
              >
                Try the learner demo
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/75 transition-colors duration-150 hover:text-sun">
                Partner with us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/55 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <p>© 2026 Imfundo Quest · Proposed initiative</p>
          <p className="max-w-xl lg:text-center">
            Sources: The State of the ICT Sector Report of South Africa, 2025 · Statistics South Africa, 2024.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 font-display text-xs font-bold text-white/80 transition-colors hover:border-sun hover:text-sun"
          >
            Back to top
            <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
