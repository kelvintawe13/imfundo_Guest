export type PasswordStrength = {score: 0 | 1 | 2 | 3 | 4;label: string;};

const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];

export function scorePassword(pw: string): PasswordStrength {
  if (pw.length < 8) return { score: 0, label: labels[0] };
  let score = 1;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw) || pw.length >= 12) score++;
  const s = Math.min(score, 4) as PasswordStrength['score'];
  return { score: s, label: labels[s] };
}

export function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email.trim());
}