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
    icon: GraduationCapIcon
  },
  {
    role: 'staff',
    label: 'Teacher demo',
    email: 'teacher@imfundo.demo',
    password: 'Teacher123!',
    icon: PresentationIcon
  }
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
      <h1 className="text-2xl font-semibold tracking-tight">{t('auth.loginTitle')}</h1>
      <p className="mt-1 text-sm text-slate-400">{t('auth.loginSub')}</p>

      <form onSubmit={submit} noValidate className="mt-4 space-y-3">
        <div>
          <label htmlFor="email" className="field-label">
            {t('auth.email')}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            className="field"
            placeholder="you@school.co.za" />
          
          {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
        </div>
        <PasswordInput
          name="password"
          label={t('auth.password')}
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="current-password"
          aside={
          <Link to="/forgot-password" className="text-xs font-medium text-primary-soft hover:underline">
              {t('auth.forgotLink')}
            </Link>
          } />
        
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-slate-600 accent-primary" />
          
          Keep me signed in on this device
        </label>
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting && <LoaderCircleIcon className="h-4 w-4 animate-spin" />}
          {t('auth.login')}
        </button>
      </form>

      <section className="mt-4 rounded-xl border border-slate-800 bg-slate-900/50 p-3" aria-labelledby="demo-accounts-title">
        <div className="mb-2">
          <h2 id="demo-accounts-title" className="text-xs font-semibold text-slate-200">Try a demo account</h2>
          <p className="mt-0.5 text-[11px] text-slate-500">Prototype only · select an account to fill the form</p>
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
              className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-2 text-left transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary/10 text-primary-soft">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold text-slate-200">{label}</span>
                <span className="block truncate text-[10px] text-slate-500">{demoEmail}</span>
                <span className="block truncate font-mono text-[10px] text-slate-500">{demoPassword}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="my-6 flex items-center gap-3 text-xs text-slate-500">
        <span className="h-px flex-1 bg-slate-800" /> or <span className="h-px flex-1 bg-slate-800" />
      </div>
      <Link
        to="/dashboard"
        onClick={() => setRole('learner')}
        className="btn-secondary w-full">
        Explore the demo without an account
      </Link>

      <p className="mt-4 text-center text-sm text-slate-400">
        {t('auth.noAccount')}{' '}
        <Link to="/signup" className="font-medium text-primary-soft hover:underline">
          {t('auth.signup')}
        </Link>
      </p>
    </>);

}