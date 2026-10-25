import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCapIcon, HeartHandshakeIcon, LoaderCircleIcon, PresentationIcon } from 'lucide-react';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { PasswordStrengthMeter } from '../../components/auth/PasswordStrengthMeter';
import { interestCatalog, MAX_INTERESTS } from '../../data/interests';
import { isValidEmail, scorePassword } from '../../utils/password';
import { homePathForRole, registerAccount } from '../../utils/auth';
import { useLanguage } from '../../contexts/LanguageContext';
import { useApp } from '../../contexts/AppContext';

type Role = 'learner' | 'teacher' | 'parent';
type Errors = Partial<Record<'name' | 'email' | 'childEmail' | 'password' | 'terms' | 'form', string>>;

const roles: { value: Role; label: string; text: string; icon: typeof GraduationCapIcon }[] = [
  { value: 'learner', label: 'Learner', text: 'Grades 10–12', icon: GraduationCapIcon },
  { value: 'teacher', label: 'Teacher', text: 'Class analytics', icon: PresentationIcon },
  { value: 'parent', label: 'Parent', text: 'Family updates', icon: HeartHandshakeIcon },
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
  const [role, setRole] = useState<Role>('learner');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('11');
  const [subject, setSubject] = useState('maths');
  const [childEmail, setChildEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const toggleInterest = (id: string) => {
    setInterests((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= MAX_INTERESTS) return current;
      return [...current, id];
    });
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = 'Enter your full name.';
    if (!isValidEmail(email)) next.email = 'Enter a valid email address.';
    if (role === 'parent' && childEmail.trim() && !isValidEmail(childEmail)) {
      next.childEmail = 'Enter a valid learner email, or leave this blank to explore the demo.';
    }
    if (scorePassword(password).score < 2) next.password = 'Choose a stronger password.';
    if (!terms) next.terms = 'Please accept the terms to continue.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    const accountRole = role === 'teacher' ? 'staff' : role;
    const result = await registerAccount({
      name: name.trim(),
      email,
      password,
      role: accountRole,
      grade: role === 'learner' || role === 'parent' ? `Grade ${grade}` : '',
      school: school.trim(),
      childEmail: role === 'parent' ? childEmail : '',
      interests: role === 'learner' ? interests : []
    });

    if (!result.ok) {
      setErrors({
        [result.field === 'email' ? 'email' : 'form']: result.error
      });
      setSubmitting(false);
      return;
    }

    setAccountRole(result.account.role);
    window.setTimeout(() => {
      window.location.assign(homePathForRole(result.account.role));
    }, 700);
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
          <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {roles.map(({ value, label, text, icon: Icon }) => {
              const active = role === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRole(value)}
                  className={`flex flex-col items-start gap-1 rounded-xl border-2 border-ink p-2.5 text-left transition-colors duration-150 ${
                    active ? 'bg-sun shadow-pop-sm' : 'bg-white hover:bg-sun-light'
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 border-ink ${
                      active ? 'bg-white' : 'bg-cream'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-xs font-bold text-ink">{label}</span>
                    <span className="block text-[10px] leading-tight text-ink-soft">{text}</span>
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
          <label htmlFor="school" className="field-label-pop">
            School <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <input
            id="school"
            autoComplete="organization"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className="field-pop"
            placeholder="Idutywa Secondary School"
          />
        </motion.div>

        <motion.div variants={fieldVariants} className="min-w-0">
          <label htmlFor="grade" className="field-label-pop">
            {role === 'teacher' ? 'Subject you teach' : role === 'parent' ? "Child's grade" : 'Grade'}
          </label>
          {role === 'teacher' ? (
            <select id="grade" className="field-pop" value={subject} onChange={(event) => setSubject(event.target.value)}>
              <option value="maths">Mathematics</option>
              <option value="science">Physical Sciences</option>
              <option value="cl">Computer Literacy</option>
              <option value="english">English</option>
            </select>
          ) : (
            <select id="grade" className="field-pop" value={grade} onChange={(event) => setGrade(event.target.value)}>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          )}
        </motion.div>

        {role === 'learner' && (
          <motion.fieldset variants={fieldVariants} className="min-w-0 sm:col-span-2">
            <legend className="field-label-pop">
              Interests <span className="font-normal text-ink-soft">(pick up to {MAX_INTERESTS})</span>
            </legend>
            <p className="mt-0.5 text-[11px] leading-snug text-ink-soft">
              We use these to match you with study rooms and learners who care about the same things. You can change
              them later in Profile.
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {interestCatalog.map((interest) => {
                const active = interests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleInterest(interest.id)}
                    className={`inline-flex items-center gap-1 rounded-full border-2 border-ink px-2.5 py-1 text-[11px] font-bold transition-colors duration-150 ${
                      active
                        ? 'bg-sun text-ink shadow-pop-sm'
                        : 'bg-white text-ink-soft hover:bg-sun-light hover:text-ink'
                    }`}
                  >
                    <span aria-hidden="true">{interest.emoji}</span>
                    {interest.label}
                  </button>
                );
              })}
            </div>
          </motion.fieldset>
        )}

        {role === 'parent' && (
          <motion.div variants={fieldVariants} className="min-w-0 sm:col-span-2">
            <label htmlFor="child-email" className="field-label-pop">
              Child's learner email <span className="font-normal text-ink-soft">(optional)</span>
            </label>
            <input
              id="child-email"
              type="email"
              autoComplete="off"
              value={childEmail}
              onChange={(event) => setChildEmail(event.target.value)}
              aria-invalid={!!errors.childEmail}
              className="field-pop"
              placeholder="learner@example.com"
            />
            {errors.childEmail && <p className="mt-1 text-xs font-semibold text-danger">{errors.childEmail}</p>}
            <p className="mt-1 text-[11px] leading-snug text-ink-soft">
              Use the email your child signed up with on this device to see live progress. Without it, Parent Corner
              shows a demo learner. You can change this later in Parent Corner.
            </p>
          </motion.div>
        )}

        <motion.div variants={fieldVariants} className="min-w-0 sm:col-span-2">
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
            I agree to the Terms and understand my account and learning data are stored on this device.
          </label>
          {errors.terms && <p className="mt-1 text-xs font-semibold text-danger">{errors.terms}</p>}
        </motion.div>

        {errors.form && (
          <motion.p
            variants={fieldVariants}
            role="alert"
            className="rounded-xl border-2 border-danger/40 bg-coral/10 px-3 py-2 text-xs font-semibold text-danger sm:col-span-2"
          >
            {errors.form}
          </motion.p>
        )}

        <motion.button variants={fieldVariants} type="submit" disabled={submitting} className="btn-pop w-full sm:col-span-2">
          {submitting && <LoaderCircleIcon className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {submitting ? 'Creating account…' : t('auth.signup')}
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
