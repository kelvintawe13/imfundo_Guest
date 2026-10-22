import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCapIcon, LoaderCircleIcon, PresentationIcon } from 'lucide-react';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { PasswordStrengthMeter } from '../../components/auth/PasswordStrengthMeter';
import { isValidEmail, scorePassword } from '../../utils/password';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

type Role = 'learner' | 'teacher';
type Errors = Partial<Record<'name' | 'email' | 'password' | 'terms', string>>;

const roles: { value: Role; label: string; text: string; icon: typeof GraduationCapIcon }[] = [
  { value: 'learner', label: 'Learner', text: 'Grades 10–12', icon: GraduationCapIcon },
  { value: 'teacher', label: 'Teacher', text: 'Class analytics', icon: PresentationIcon },
];

const formVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.045,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: 'easeOut' },
  },
};

export function Signup() {
  const { t } = useLanguage();
  const { setRole: setAccountRole } = useApp();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('learner');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = 'Enter your full name.';
    if (!isValidEmail(email)) next.email = 'Enter a valid email address.';
    if (scorePassword(password).score < 2) next.password = 'Choose a stronger password.';
    if (!terms) next.terms = 'Please accept the terms to continue.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSubmitting(true);
    setAccountRole(role === 'teacher' ? 'staff' : 'learner');
    window.setTimeout(() => navigate(role === 'teacher' ? '/teachers' : '/dashboard'), 900);
  }

  return (
    <>
      <h1 className="font-display text-3xl font-extrabold leading-tight">{t('auth.signupTitle')}</h1>
      <p className="mt-2 text-sm text-ink-soft">{t('auth.signupSub')}</p>

      <motion.form
        onSubmit={submit}
        noValidate
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-2"
      >
        <motion.fieldset variants={fieldVariants} className="min-w-0 sm:col-span-2">
          <legend className="field-label-pop">I am a</legend>
          <div className="mt-1 grid grid-cols-2 gap-2">
            {roles.map(({ value, label, text, icon: Icon }) => {
              const active = role === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRole(value)}
                  className={`flex items-center gap-2 rounded-xl border-2 border-ink p-3 text-left transition-colors duration-150 ${
                    active ? 'bg-sun shadow-pop-sm' : 'bg-white hover:bg-sun-light'
                  }`}
                >
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border-2 border-ink ${
                      active ? 'bg-white' : 'bg-cream'
                    }`}
                  >
                    <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-sm font-bold text-ink">{label}</span>
                    <span className="block text-xs text-ink-soft">{text}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.fieldset>

        <motion.div variants={fieldVariants} className="min-w-0">
          <label htmlFor="name" className="field-label-pop">
            Full name
          </label>
          <input
            id="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            className="field-pop"
            placeholder="Lwazi Ndlovu"
          />
          {errors.name && <p className="mt-1 text-xs font-semibold text-danger">{errors.name}</p>}
        </motion.div>

        <motion.div variants={fieldVariants} className="min-w-0">
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
        </motion.div>

        <motion.div variants={fieldVariants} className="min-w-0">
          <label htmlFor="grade" className="field-label-pop">
            {role === 'learner' ? 'Grade' : 'Subject you teach'}
          </label>
          {role === 'learner' ? (
            <select id="grade" className="field-pop" defaultValue="11">
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          ) : (
            <select id="grade" className="field-pop" defaultValue="maths">
              <option value="maths">Mathematics</option>
              <option value="science">Physical Sciences</option>
              <option value="cl">Computer Literacy</option>
              <option value="english">English</option>
            </select>
          )}
        </motion.div>

        <motion.div variants={fieldVariants} className="min-w-0">
          <PasswordInput
            name="password"
            label={t('auth.password')}
            value={password}
            onChange={setPassword}
            error={errors.password}
            autoComplete="new-password"
          />
          <PasswordStrengthMeter password={password} />
        </motion.div>

        <motion.div variants={fieldVariants} className="sm:col-span-2">
          <label className="flex items-start gap-2 text-xs text-ink-soft sm:text-sm">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-2 border-ink accent-ink"
            />
            I agree to the Terms and understand my progress is stored on my device.
          </label>
          {errors.terms && <p className="mt-1 text-xs font-semibold text-danger">{errors.terms}</p>}
        </motion.div>

        <motion.button variants={fieldVariants} type="submit" disabled={submitting} className="btn-pop w-full sm:col-span-2">
          {submitting && <LoaderCircleIcon className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {t('auth.signup')}
        </motion.button>
      </motion.form>

      <p className="mt-4 text-center text-sm text-ink-soft">
        {t('auth.haveAccount')}{' '}
        <Link to="/login" className="font-bold text-coral hover:underline">
          {t('auth.login')}
        </Link>
      </p>
    </>
  );
}
