import { useState } from 'react';
import { CircleCheckIcon, LoaderCircleIcon, SchoolIcon } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';

type Errors = Partial<Record<'school' | 'contact' | 'email', string>>;

export function PartnerModal() {
  const { modal, closeModal } = useApp();
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<Errors>({});

  function close() {
    closeModal();
    window.setTimeout(() => {
      setStatus('idle');
      setErrors({});
    }, 250);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!String(d.get('school') || '').trim()) next.school = 'School name is required.';
    if (!String(d.get('contact') || '').trim()) next.contact = 'Contact name is required.';
    if (!/^\S+@\S+\.\S+$/.test(String(d.get('email') || ''))) next.email = 'Enter a valid email address.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('submitting');
    window.setTimeout(() => setStatus('success'), 900);
  }

  return (
    <Modal
      open={modal === 'partner'}
      onClose={close}
      title="Partner Schools Application"
      description="Join the Idutywa pilot. Free for partner schools."
      icon={<SchoolIcon className="h-4 w-4" />}>
      
      {status === 'success' ?
      <div className="flex flex-col items-center py-4 text-center" role="status">
          <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-teal-light text-ink">
            <CircleCheckIcon className="h-6 w-6" />
          </span>
          <p className="mt-3 font-display text-base font-extrabold">Application received</p>
          <p className="mt-1 max-w-xs text-sm text-slate-400">We’ll contact you within five school days to arrange a visit.</p>
          <button type="button" onClick={close} className="btn-secondary mt-4">
            {t('common.close')}
          </button>
        </div> :

      <form onSubmit={submit} noValidate className="grid gap-3 sm:grid-cols-2">
          <label className="field-label sm:col-span-2">
            School name
            <input name="school" className="field" placeholder="e.g. Idutywa Senior Secondary" aria-invalid={!!errors.school} />
            {errors.school && <span className="mt-1 block text-xs text-danger">{errors.school}</span>}
          </label>
          <label className="field-label">
            Contact person
            <input name="contact" className="field" aria-invalid={!!errors.contact} />
            {errors.contact && <span className="mt-1 block text-xs text-danger">{errors.contact}</span>}
          </label>
          <label className="field-label">
            Email
            <input name="email" type="email" className="field" aria-invalid={!!errors.email} />
            {errors.email && <span className="mt-1 block text-xs text-danger">{errors.email}</span>}
          </label>
          <label className="field-label">
            Grade 10–12 learners
            <select name="learners" className="field" defaultValue="100-300">
              <option value="<100">Fewer than 100</option>
              <option value="100-300">100 – 300</option>
              <option value="300-600">300 – 600</option>
              <option value="600+">More than 600</option>
            </select>
          </label>
          <label className="field-label">
            Device access
            <select name="devices" className="field" defaultValue="own">
              <option value="own">Learners own phones</option>
              <option value="shared">Shared school devices</option>
              <option value="mixed">A mix of both</option>
            </select>
          </label>
          <label className="field-label sm:col-span-2">
            Anything we should know? <span className="text-slate-500">(optional)</span>
            <textarea name="notes" rows={3} className="field resize-none" />
          </label>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <button type="button" onClick={close} className="btn-secondary">
              {t('common.cancel')}
            </button>
            <button type="submit" disabled={status === 'submitting'} className="btn-primary">
              {status === 'submitting' && <LoaderCircleIcon className="h-4 w-4 animate-spin" />}
              {t('common.submit')}
            </button>
          </div>
        </form>
      }
    </Modal>);

}