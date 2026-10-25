import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoaderCircleIcon, SparklesIcon } from 'lucide-react';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { isValidEmail } from '../../utils/password';
import { homePathForRole, loginAccount } from '../../utils/auth';
import {
  DEMO_ACCOUNTS,
  DEMO_PASSWORD,
  DEMO_ROLES,
  prepareDemoAccounts,
  type DemoRole
} from '../../utils/demoAccounts';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

type Errors = Partial<Record<'email' | 'password' | 'form', string>>;

export function Login() {
  const { t } = useLanguage();
  const { setRole } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [demoState, setDemoState] = useState<'preparing' | 'ready' | 'error'>('preparing');
  const [demoError, setDemoError] = useState('');
  const [demoBusy, setDemoBusy] = useState<DemoRole | null>(null);

  useEffect(() => {
    let active = true;
    void prepareDemoAccounts().then((result) => {
      if (!active) return;
      if (result.ok) {
        setDemoState('ready');
      } else {
        setDemoState('error');
        setDemoError(result.error);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  async function signInWithDemo(role: DemoRole) {
    if (demoBusy) return;
    setDemoBusy(role);
    setErrors({});
    setDemoError('');

    const prepared = await prepareDemoAccounts();
    if (!prepared.ok) {
      setDemoState('error');
      setDemoError(prepared.error);
      setDemoBusy(null);
      return;
    }

    const result = await loginAccount(DEMO_ACCOUNTS[role].email, DEMO_PASSWORD);
    if (!result.ok) {
      setErrors({ form: result.error });
      setDemoBusy(null);
      return;
    }

    setDemoState('ready');
    setRole(result.account.role);
    window.setTimeout(() => {
      window.location.assign(homePathForRole(result.account.role));
    }, 400);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!isValidEmail(email)) next.email = 'Enter a valid email address.';
    if (password.length < 6) next.password = 'Password must be at least 6 characters.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    const result = await loginAccount(email, password);
    if (!result.ok) {
      setErrors({ form: result.error });
      setSubmitting(false);
      return;
    }

    setRole(result.account.role);
    window.setTimeout(() => {
      window.location.assign(homePathForRole(result.account.role));
    }, 500);
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

        {errors.form && (
          <p role="alert" className="rounded-xl border-2 border-danger/40 bg-coral/10 px-3 py-2 text-xs font-semibold text-danger">
            {errors.form}
          </p>
        )}

        <button type="submit" disabled={submitting} className="btn-pop w-full">
          {submitting && <LoaderCircleIcon className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {submitting ? 'Signing in…' : t('auth.login')}
        </button>
      </form>

      <section className="mt-4 rounded-2xl border-2 border-ink bg-sun-light/80 p-3.5" aria-labelledby="demo-heading">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="demo-heading" className="flex items-center gap-1.5 font-display text-sm font-extrabold">
              <SparklesIcon className="h-4 w-4" aria-hidden="true" />
              Demo testing access
            </h2>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
              Pre-loaded local accounts for quick testing. Select a role to sign in, or type the details below.
            </p>
          </div>
          <span
            aria-live="polite"
            className={`shrink-0 rounded-full border-2 border-ink px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${
              demoState === 'ready' ? 'bg-teal' : demoState === 'error' ? 'bg-coral' : 'bg-white'
            }`}
          >
            {demoState === 'ready' ? 'Ready' : demoState === 'error' ? 'Error' : 'Preparing'}
          </span>
        </div>

        {demoState === 'error' && (
          <p role="alert" className="mt-2 rounded-lg border border-danger/30 bg-white/70 px-2.5 py-1.5 text-[10px] font-semibold text-danger">
            {demoError}
          </p>
        )}

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {DEMO_ROLES.map((role) => {
            const account = DEMO_ACCOUNTS[role];
            return (
              <button
                key={role}
                type="button"
                disabled={demoState === 'preparing' || demoBusy !== null}
                onClick={() => void signInWithDemo(role)}
                className="rounded-xl border-2 border-ink bg-white px-2 py-2 text-left transition-colors hover:bg-sky-light disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                <span className="flex items-center gap-1.5 text-xs font-extrabold">
                  {demoBusy === role && <LoaderCircleIcon className="h-3 w-3 animate-spin" aria-hidden="true" />}
                  {account.label}
                </span>
                <span className="mt-0.5 block text-[9px] font-semibold leading-tight text-ink-soft">
                  {demoBusy === role ? 'Opening…' : account.description}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-2.5 rounded-xl border-2 border-ink/15 bg-white/70 p-2.5">
          <p className="text-[9px] font-extrabold uppercase tracking-wide text-ink-soft">Sign-in details</p>
          <ul className="mt-1 space-y-1">
            {DEMO_ROLES.map((role) => (
              <li key={role} className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                <span className="text-[10px] font-bold">{DEMO_ACCOUNTS[role].label}</span>
                <code className="break-all font-mono text-[9px] text-ink-soft">{DEMO_ACCOUNTS[role].email}</code>
              </li>
            ))}
          </ul>
          <p className="mt-1.5 border-t-2 border-ink/10 pt-1.5 text-[10px]">
            <span className="font-bold">Password for all:</span>{' '}
            <code className="font-mono font-extrabold">{DEMO_PASSWORD}</code>
          </p>
        </div>
      </section>

      <p className="mt-4 rounded-xl border-2 border-ink/15 bg-white/60 p-3 text-xs leading-relaxed text-ink-soft">
        Your account and learning progress are saved locally on this device. Use the same browser to keep your data.
      </p>

      <p className="mt-5 text-center text-sm text-ink-soft">
        {t('auth.noAccount')}{' '}
        <Link to="/signup" className="font-bold text-coral hover:underline">
          {t('auth.signup')}
        </Link>
      </p>
    </>
  );
}
