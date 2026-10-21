import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CircleCheckIcon, LoaderCircleIcon } from 'lucide-react';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { PasswordStrengthMeter } from '../../components/auth/PasswordStrengthMeter';
import { scorePassword } from '../../utils/password';
import { useLanguage } from '../../contexts/LanguageContext';

type Errors = Partial<Record<'password' | 'confirm', string>>;

export function ResetPassword() {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (scorePassword(password).score < 2) next.password = 'Choose a stronger password.';
    if (confirm !== password) next.confirm = 'Passwords don’t match.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('saving');
    window.setTimeout(() => setStatus('done'), 800);
  }

  if (status === 'done') {
    return (
      <div role="status">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-success/15 text-success-soft">
          <CircleCheckIcon className="h-5 w-5" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Password updated</h1>
        <p className="mt-1 text-sm text-slate-400">You can now log in with your new password on any device.</p>
        <Link to="/login" className="btn-primary mt-7 w-full !py-3">
          {t('auth.login')}
        </Link>
      </div>);

  }

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">{t('auth.resetTitle')}</h1>
      <p className="mt-1 text-sm text-slate-400">{t('auth.resetSub')}</p>
      <form onSubmit={submit} noValidate className="mt-6 space-y-4">
        <div>
          <PasswordInput name="new-password" label="New password" value={password} onChange={setPassword} error={errors.password} autoComplete="new-password" />
          <PasswordStrengthMeter password={password} />
        </div>
        <PasswordInput
          name="confirm-password"
          label="Confirm new password"
          value={confirm}
          onChange={setConfirm}
          error={errors.confirm}
          autoComplete="new-password" />
        
        <button type="submit" disabled={status === 'saving'} className="btn-primary w-full !py-3">
          {status === 'saving' && <LoaderCircleIcon className="h-4 w-4 animate-spin" />}
          {t('auth.updatePassword')}
        </button>
      </form>
      <Link to="/login" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-100">
        <ArrowLeftIcon className="h-4 w-4" /> {t('auth.backToLogin')}
      </Link>
    </>);

}