import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCapIcon, LoaderCircleIcon, PresentationIcon } from 'lucide-react';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { isValidEmail } from '../../utils/password';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

type Errors = Partial<Record<'email' | 'password' | 'form', string>>;

const demoAccounts = [
  {
    role: 'learner',
    label: 'Student demo',
    email: 'student@imfundo.demo',
    password: 'Student123!',
    icon: GraduationCapIcon,
  },
  {
    role: 'staff',
    label: 'Teacher demo',
    email: 'teacher@imfundo.demo',
    password: 'Teacher123!',
    icon: PresentationIcon,
  },
] as const;

export function Login() {
  const { t } = useLanguage();
  const { setRole } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!isValidEmail(email)) next.email = 'Enter a valid email address.';
    if (password.length < 6) next.password = 'Password must be at least 6 characters.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    const isStaff = email.toLowerCase() === 'teacher@imfundo.demo' || email.toLowerCase().includes('teacher');
    setRole(isStaff ? 'staff' : 'learner');
    window.setTimeout(() => navigate(isStaff ? '/teachers' : '/dashboard'), 800);
  }

  return (
    <>
      <h1 className="font-display text-3xl font-extrabold leading-tight">{t('auth.loginTitle')}</h1>
      <p className="mt-2 text-sm text-ink-soft">{t('auth.loginSub')}</p>

      <form onSubmit={submit} noValidate className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="field-label-pop">
            {t('auth.email')}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            className="field-pop"
            placeholder="you@school.co.za"
          />
          {errors.email && <p className="mt-1 text-xs font-semibold text-danger">{errors.email}</p>}
        </div>

        <PasswordInput
          name="password"
          label={t('auth.password')}
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="current-password"
          aside={
            <Link to="/forgot-password" className="text-xs font-bold text-sky-dark hover:underline">
              {t('auth.forgotLink')}
            </Link>
          }
        />

        <label className="flex items-center gap-2 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-2 border-ink accent-ink"
          />
          Keep me signed in on this device
        </label>

        <button type="submit" disabled={submitting} className="btn-pop w-full">
          {submitting && <LoaderCircleIcon className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {t('auth.login')}
        </button>
      </form>

      <section className="mt-6 rounded-2xl border-2 border-ink bg-white p-4" aria-labelledby="demo-accounts-title">
        <div className="mb-3">
          <h2 id="demo-accounts-title" className="font-display text-sm font-bold">
            Try a demo account
          </h2>
          <p className="mt-0.5 text-xs text-ink-soft">Prototype only · select an account to fill the form</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {demoAccounts.map(({ role, label, email: demoEmail, password: demoPassword, icon: Icon }) => (
            <button
              key={role}
              type="button"
              onClick={() => {
                setEmail(demoEmail);
                setPassword(demoPassword);
                setErrors({});
              }}
              className="flex min-w-0 items-center gap-2 rounded-xl border-2 border-ink bg-cream p-2.5 text-left transition-colors hover:bg-sun-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-ink ${
                  role === 'learner' ? 'bg-sun' : 'bg-teal'
                }`}
              >
                <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-xs font-bold">{label}</span>
                <span className="block truncate text-[10px] text-ink-soft">{demoEmail}</span>
                <span className="block truncate font-mono text-[10px] text-ink-soft">{demoPassword}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="my-6 flex items-center gap-3 text-xs font-semibold text-ink-soft">
        <span className="h-px flex-1 bg-ink/15" /> or <span className="h-px flex-1 bg-ink/15" />
      </div>

      <Link to="/dashboard" onClick={() => setRole('learner')} className="btn-pop-ghost w-full">
        Explore the demo without an account
      </Link>

      <p className="mt-5 text-center text-sm text-ink-soft">
        {t('auth.noAccount')}{' '}
        <Link to="/signup" className="font-bold text-coral hover:underline">
          {t('auth.signup')}
        </Link>
      </p>
    </>
  );
}
