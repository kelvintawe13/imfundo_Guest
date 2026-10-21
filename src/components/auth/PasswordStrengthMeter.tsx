import { scorePassword } from '../../utils/password';

const tones = ['bg-danger', 'bg-danger', 'bg-warn', 'bg-primary', 'bg-success'];

export function PasswordStrengthMeter({ password }: {password: string;}) {
  if (!password) return null;
  const { score, label } = scorePassword(password);
  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3, 4].map((i) =>
        <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-150 ${i <= score ? tones[score] : 'bg-slate-800'}`} />
        )}
      </div>
      <p className="mt-1 text-xs text-slate-400">
        Strength: <span className="font-medium text-slate-200">{label}</span>
        {score < 3 && ' · use 8+ characters with a number and a capital'}
      </p>
    </div>);

}