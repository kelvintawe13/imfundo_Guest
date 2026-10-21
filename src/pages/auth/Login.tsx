import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoaderCircleIcon } from 'lucide-react';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { isValidEmail } from '../../utils/password';
import { useLanguage } from '../../contexts/LanguageContext';

type Errors = Partial<Record<'email' | 'password' | 'form', string>>;

export function Login() {
  const { t } = useLanguage();
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
    window.setTimeout(() => navigate(email.toLowerCase().includes('teacher') ? '/teachers' : '/dashboard'), 800);
  }

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">{t('auth.loginTitle')}</h1>
      <p className="mt-1 text-sm text-slate-400">{t('auth.loginSub')}</p>

      <form onSubmit={submit} noValidate className="mt-6 space-y-4">
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
        <button type="submit" disabled={submitting} className="btn-primary w-full !py-3">
          {submitting && <LoaderCircleIcon className="h-4 w-4 animate-spin" />}
          {t('auth.login')}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs text-slate-500">
        <span className="h-px flex-1 bg-slate-800" /> or <span className="h-px flex-1 bg-slate-800" />
      </div>
      <Link to="/dashboard" className="btn-secondary w-full">
        Explore the demo without an account
      </Link>

      <p className="mt-6 text-center text-sm text-slate-400">
        {t('auth.noAccount')}{' '}
        <Link to="/signup" className="font-medium text-primary-soft hover:underline">
          {t('auth.signup')}
        </Link>
      </p>
    </>);

}