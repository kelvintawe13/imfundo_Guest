import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CircleCheckIcon, LoaderCircleIcon } from 'lucide-react';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { PasswordStrengthMeter } from '../../components/auth/PasswordStrengthMeter';
import { scorePassword } from '../../utils/password';
import { getPasswordReset, resetPassword } from '../../utils/auth';
import { useLanguage } from '../../contexts/LanguageContext';

type Errors = Partial<Record<'password' | 'confirm' | 'form', string>>;

export function ResetPassword() {
  const { t } = useLanguage();
  const [reset] = useState(getPasswordReset);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (scorePassword(password).score < 2) next.password = 'Choose a stronger password.';
    if (confirm !== password) next.confirm = 'Passwords don’t match.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('saving');
    const result = await resetPassword(password);
    if (!result.ok) {
      setErrors({ form: result.error });
      setStatus('idle');
      return;
    }
    setStatus('done');
  }

  if (!reset) {
    return (
      <>
        <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-ink bg-coral-light">
          <ArrowLeftIcon className="h-5 w-5 text-ink" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight">Reset link expired</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Request a new local reset link, then open it from this device.
        </p>
        <Link to="/forgot-password" className="btn-pop mt-7 w-full">
          Request a new link
        </Link>
        <Link
          to="/login"
          className="mt-5 flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-coral"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> {t('auth.backToLogin')}
        </Link>
      </>
    );
  }

  if (status === 'done') {
    return (
      <div role="status">
        <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-ink bg-teal-light">
          <CircleCheckIcon className="h-5 w-5 text-ink" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight">Password updated</h1>
        <p className="mt-2 text-sm text-ink-soft">
          You can now log in with your new password on this device.
        </p>
        <Link to="/login" className="btn-pop mt-7 w-full">
          {t('auth.login')}
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-3xl font-extrabold leading-tight">{t('auth.resetTitle')}</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Choose a new password for <span className="font-semibold text-ink">{reset.email}</span>.
      </p>

      <form onSubmit={submit} noValidate className="mt-6 space-y-4">
        <div>
          <PasswordInput
            name="new-password"
            label="New password"
            value={password}
            onChange={setPassword}
            error={errors.password}
            autoComplete="new-password"
          />
          <PasswordStrengthMeter password={password} />
        </div>
        <PasswordInput
          name="confirm-password"
          label="Confirm new password"
          value={confirm}
          onChange={setConfirm}
          error={errors.confirm}
          autoComplete="new-password"
        />

        {errors.form && (
          <p role="alert" className="rounded-xl border-2 border-danger/40 bg-coral/10 px-3 py-2 text-xs font-semibold text-danger">
            {errors.form}
          </p>
        )}

        <button type="submit" disabled={status === 'saving'} className="btn-pop w-full">
          {status === 'saving' && <LoaderCircleIcon className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {t('auth.updatePassword')}
        </button>
      </form>

      <Link
        to="/login"
        className="mt-5 flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-coral"
      >
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> {t('auth.backToLogin')}
      </Link>
    </>
  );
}
