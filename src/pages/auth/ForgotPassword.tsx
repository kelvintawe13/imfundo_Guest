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
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-success/15 text-success-soft">
          <MailCheckIcon className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Check your email</h1>
        <p className="mt-1 text-sm text-slate-400">
          We sent a reset link to <span className="font-medium text-slate-200">{email}</span>. It expires in 30 minutes.
        </p>
        <Link to="/reset-password" className="btn-primary mt-7 w-full !py-2.5">
          Open reset link (demo)
        </Link>
        <button type="button" onClick={() => setStatus('idle')} className="btn-secondary mt-2 w-full">
          Use a different email
        </button>
        <Link to="/login" className="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-100">
          <ArrowLeftIcon className="h-4 w-4" /> {t('auth.backToLogin')}
        </Link>
      </div>);

  }

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">{t('auth.forgotTitle')}</h1>
      <p className="mt-1 text-sm text-slate-400">{t('auth.forgotSub')}</p>
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
            aria-invalid={!!error}
            className="field" />
          
          {error && <p className="mt-1 text-xs text-danger">{error}</p>}
        </div>
        <button type="submit" disabled={status === 'sending'} className="btn-primary w-full !py-2.5">
          {status === 'sending' && <LoaderCircleIcon className="h-4 w-4 animate-spin" />}
          {t('auth.sendLink')}
        </button>
      </form>
      <p className="mt-4 text-xs text-slate-500">No email access? Ask your teacher to reset your password from Teacher Corner.</p>
      <Link to="/login" className="mt-4 flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-100">
        <ArrowLeftIcon className="h-4 w-4" /> {t('auth.backToLogin')}
      </Link>
    </>);

}