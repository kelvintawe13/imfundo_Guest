import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, LoaderCircleIcon, MailCheckIcon } from 'lucide-react';
import { isValidEmail } from '../../utils/password';
import { useLanguage } from '../../contexts/LanguageContext';

export function ForgotPassword() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Enter the email you signed up with.');
      return;
    }
    setError('');
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 800);
  }

  if (status === 'sent') {
    return (
      <div role="status">
        <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-ink bg-teal-light">
          <MailCheckIcon className="h-5 w-5 text-ink" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight">Check your email</h1>
        <p className="mt-2 text-sm text-ink-soft">
          We sent a reset link to <span className="font-semibold text-ink">{email}</span>. It expires in 30 minutes.
        </p>
        <Link to="/reset-password" className="btn-pop mt-7 w-full">
          Open reset link (demo)
        </Link>
        <button type="button" onClick={() => setStatus('idle')} className="btn-pop-ghost mt-2 w-full">
          Use a different email
        </button>
        <Link
          to="/login"
          className="mt-5 flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-coral"
        >
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> {t('auth.backToLogin')}
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-3xl font-extrabold leading-tight">{t('auth.forgotTitle')}</h1>
      <p className="mt-2 text-sm text-ink-soft">{t('auth.forgotSub')}</p>

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
            aria-invalid={!!error}
            className="field-pop"
            placeholder="you@school.co.za"
          />
          {error && <p className="mt-1 text-xs font-semibold text-danger">{error}</p>}
        </div>
        <button type="submit" disabled={status === 'sending'} className="btn-pop w-full">
          {status === 'sending' && <LoaderCircleIcon className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {t('auth.sendLink')}
        </button>
      </form>

      <p className="mt-5 rounded-xl border-2 border-ink/15 bg-white/60 p-3 text-xs text-ink-soft">
        No email access? Ask your teacher to reset your password from Teacher Corner.
      </p>

      <Link
        to="/login"
        className="mt-5 flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-coral"
      >
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> {t('auth.backToLogin')}
      </Link>
    </>
  );
}
