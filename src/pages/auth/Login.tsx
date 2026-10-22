import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoaderCircleIcon } from 'lucide-react';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { isValidEmail } from '../../utils/password';
import { loginAccount } from '../../utils/auth';
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
      window.location.assign(result.account.role === 'staff' ? '/teachers' : '/dashboard');
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

      <p className="mt-5 rounded-xl border-2 border-ink/15 bg-white/60 p-3 text-xs leading-relaxed text-ink-soft">
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
