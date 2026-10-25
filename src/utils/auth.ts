import { useSyncExternalStore } from 'react';
import type { AppRole } from '../types/app';
import { saveUserProfile } from './userProfile';

const ACCOUNTS_KEY = 'imfundo-accounts-v1';
const SESSION_KEY = 'imfundo-session-v1';
const ROLE_KEY = 'imfundo-account-role';
const RESET_KEY = 'imfundo-password-reset-v1';

export type StoredAccount = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  grade: string;
  school: string;
  childEmail: string;
  salt: string;
  passwordHash: string;
  createdAt: string;
  lastLoginAt: string;
};

export type AuthResult =
  | { ok: true; account: StoredAccount }
  | { ok: false; error: string; field?: 'email' | 'password' | 'form' };

type Session = {
  accountId: string;
  startedAt: string;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: AppRole;
  grade: string;
  school: string;
  childEmail?: string;
};

export function isAppRole(value: unknown): value is AppRole {
  return value === 'learner' || value === 'staff' || value === 'parent';
}

/** Where each account role lands after login. */
export function homePathForRole(role: AppRole): string {
  if (role === 'staff') return '/teachers';
  if (role === 'parent') return '/parents';
  return '/dashboard';
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    console.warn(`Unable to read ${key}.`, error);
    return fallback;
  }
}

function writeJson(key: string, value: unknown): boolean {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Unable to write ${key}.`, error);
    return false;
  }
}

function normalizeAccount(value: unknown): StoredAccount | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const account = value as Record<string, unknown>;
  if (
    typeof account.id !== 'string' ||
    typeof account.name !== 'string' ||
    typeof account.email !== 'string' ||
    !isAppRole(account.role) ||
    typeof account.salt !== 'string' ||
    typeof account.passwordHash !== 'string'
  ) {
    return null;
  }
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    grade: typeof account.grade === 'string' ? account.grade : '',
    school: typeof account.school === 'string' ? account.school : '',
    childEmail: typeof account.childEmail === 'string' ? account.childEmail : '',
    salt: account.salt,
    passwordHash: account.passwordHash,
    createdAt: typeof account.createdAt === 'string' ? account.createdAt : new Date().toISOString(),
    lastLoginAt: typeof account.lastLoginAt === 'string' ? account.lastLoginAt : new Date().toISOString()
  };
}

function readAccounts(): StoredAccount[] {
  const stored = readJson<unknown>(ACCOUNTS_KEY, []);
  if (!Array.isArray(stored)) return [];
  return stored.map(normalizeAccount).filter((account): account is StoredAccount => account !== null);
}

function readSession(): Session | null {
  const stored = readJson<unknown>(SESSION_KEY, null);
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return null;
  const session = stored as Record<string, unknown>;
  if (typeof session.accountId !== 'string' || typeof session.startedAt !== 'string') return null;
  return { accountId: session.accountId, startedAt: session.startedAt };
}

function readSessionAccount(): StoredAccount | null {
  const session = readSession();
  if (!session) return null;
  return readAccounts().find((account) => account.id === session.accountId) ?? null;
}

let cache: StoredAccount | null | undefined;
const listeners = new Set<() => void>();

function getSnapshot() {
  if (cache === undefined) cache = readSessionAccount();
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notify(account: StoredAccount | null) {
  cache = account;
  listeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== ACCOUNTS_KEY && event.key !== SESSION_KEY) return;
    cache = readSessionAccount();
    listeners.forEach((listener) => listener());
  });
}

export function useAuth(): StoredAccount | null {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function getSessionAccount(): StoredAccount | null {
  return readSessionAccount();
}

export function getActiveAccountId(): string | null {
  return readSession()?.accountId ?? null;
}

export function findAccountByEmail(emailInput: string): StoredAccount | null {
  const email = emailInput.trim().toLowerCase();
  if (!email) return null;
  return readAccounts().find((account) => account.email.toLowerCase() === email) ?? null;
}

export type ChildLinkResult = { ok: true } | { ok: false; error: string };

/** Link a parent account to a learner account on this device. */
export function updateChildEmail(emailInput: string): ChildLinkResult {
  const account = readSessionAccount();
  if (!account) return { ok: false, error: 'Sign in again to update your linked learner.' };
  if (account.role !== 'parent') return { ok: false, error: 'Only a parent account can link a learner.' };

  const childEmail = emailInput.trim().toLowerCase();
  if (!childEmail || !/^\S+@\S+\.\S+$/.test(childEmail)) {
    return { ok: false, error: 'Enter the email your child uses for their learner account.' };
  }
  if (childEmail === account.email.toLowerCase()) {
    return { ok: false, error: 'Use your child’s learner email, not your own parent email.' };
  }

  const accounts = readAccounts();
  const updated: StoredAccount = { ...account, childEmail };
  if (!writeJson(ACCOUNTS_KEY, accounts.map((candidate) => (candidate.id === account.id ? updated : candidate)))) {
    return { ok: false, error: 'Could not save the link on this device. Check your browser storage.' };
  }
  notify(updated);
  return { ok: true };
}

export function accountScopedKey(base: string): string {
  const accountId = getActiveAccountId();
  return accountId ? `${base}:${accountId}` : base;
}

function randomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function randomSalt(): string {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  return randomId();
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const input = `${salt}:${password}`;
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `fallback-${(hash >>> 0).toString(16)}`;
}

function saveRole(role: AppRole) {
  try {
    window.localStorage.setItem(ROLE_KEY, role);
  } catch (error) {
    console.warn('Unable to save account role.', error);
  }
}

function startSession(account: StoredAccount) {
  writeJson(SESSION_KEY, { accountId: account.id, startedAt: new Date().toISOString() } satisfies Session);
  saveRole(account.role);
  saveUserProfile({
    name: account.name,
    grade: account.grade,
    school: account.school,
    joined: new Date(account.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  });
  notify(account);
}

export type SeededAccountInput = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AppRole;
  grade: string;
  school: string;
  childEmail?: string;
};

export type SeededAccountResult =
  | { ok: true; account: StoredAccount; created: boolean }
  | { ok: false; error: string };

/** Create a known local account for demos without starting a session. */
export async function ensureSeededAccount(input: SeededAccountInput): Promise<SeededAccountResult> {
  const email = input.email.trim().toLowerCase();
  const accounts = readAccounts();
  const existing = accounts.find((account) => account.id === input.id);
  if (existing) return { ok: true, account: existing, created: false };
  if (accounts.some((account) => account.email.toLowerCase() === email)) {
    return { ok: false, error: `A local account already uses ${email}.` };
  }

  const salt = randomSalt();
  let passwordHash: string;
  try {
    passwordHash = await hashPassword(input.password, salt);
  } catch (error) {
    console.warn('Unable to secure the demo password.', error);
    return { ok: false, error: 'Could not prepare the demo account. Please try again.' };
  }

  const now = new Date().toISOString();
  const account: StoredAccount = {
    id: input.id,
    name: input.name,
    email,
    role: input.role,
    grade: input.grade,
    school: input.school,
    childEmail: input.childEmail?.trim().toLowerCase() ?? '',
    salt,
    passwordHash,
    createdAt: now,
    lastLoginAt: now
  };

  if (!writeJson(ACCOUNTS_KEY, [...accounts, account])) {
    return { ok: false, error: 'Could not save the demo account on this device.' };
  }
  return { ok: true, account, created: true };
}

export async function registerAccount(input: RegisterInput): Promise<AuthResult> {
  const email = input.email.trim().toLowerCase();
  const accounts = readAccounts();
  if (accounts.some((account) => account.email.toLowerCase() === email)) {
    return { ok: false, error: 'An account with this email already exists. Try logging in.', field: 'email' };
  }

  const salt = randomSalt();
  let passwordHash: string;
  try {
    passwordHash = await hashPassword(input.password, salt);
  } catch (error) {
    console.warn('Unable to secure the password.', error);
    return { ok: false, error: 'Could not create your account. Please try again.', field: 'form' };
  }

  const now = new Date().toISOString();
  const account: StoredAccount = {
    id: randomId(),
    name: input.name.trim(),
    email,
    role: input.role,
    grade: input.grade,
    school: input.school,
    childEmail: input.childEmail?.trim().toLowerCase() ?? '',
    salt,
    passwordHash,
    createdAt: now,
    lastLoginAt: now
  };

  if (!writeJson(ACCOUNTS_KEY, [...accounts, account])) {
    return { ok: false, error: 'Could not save your account on this device. Check your browser storage.', field: 'form' };
  }

  startSession(account);
  return { ok: true, account };
}

export async function loginAccount(emailInput: string, password: string): Promise<AuthResult> {
  const email = emailInput.trim().toLowerCase();
  const accounts = readAccounts();
  const account = accounts.find((candidate) => candidate.email.toLowerCase() === email);
  if (!account) return { ok: false, error: 'Email or password is incorrect.', field: 'form' };

  let passwordHash: string;
  try {
    passwordHash = await hashPassword(password, account.salt);
  } catch (error) {
    console.warn('Unable to check the password.', error);
    return { ok: false, error: 'Could not sign in. Please try again.', field: 'form' };
  }
  if (passwordHash !== account.passwordHash) {
    return { ok: false, error: 'Email or password is incorrect.', field: 'form' };
  }

  const updated = { ...account, lastLoginAt: new Date().toISOString() };
  writeJson(ACCOUNTS_KEY, accounts.map((candidate) => candidate.id === account.id ? updated : candidate));
  startSession(updated);
  return { ok: true, account: updated };
}

export function logoutAccount() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(ROLE_KEY);
  } catch (error) {
    console.warn('Unable to clear the session.', error);
  }
  notify(null);
}

type PasswordReset = {
  email: string;
  token: string;
  expiresAt: string;
};

function readPasswordReset(): PasswordReset | null {
  const stored = readJson<unknown>(RESET_KEY, null);
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return null;
  const reset = stored as Record<string, unknown>;
  if (typeof reset.email !== 'string' || typeof reset.token !== 'string' || typeof reset.expiresAt !== 'string') {
    return null;
  }
  if (Date.parse(reset.expiresAt) <= Date.now()) {
    try {
      window.localStorage.removeItem(RESET_KEY);
    } catch (error) {
      console.warn('Unable to clear the expired password reset.', error);
    }
    return null;
  }
  return { email: reset.email, token: reset.token, expiresAt: reset.expiresAt };
}

export function requestPasswordReset(emailInput: string): { ok: boolean; email: string } {
  const email = emailInput.trim().toLowerCase();
  const account = readAccounts().find((candidate) => candidate.email.toLowerCase() === email);
  if (account) {
    writeJson(RESET_KEY, {
      email: account.email,
      token: randomId(),
      expiresAt: new Date(Date.now() + 30 * 60_000).toISOString()
    } satisfies PasswordReset);
  } else {
    try {
      window.localStorage.removeItem(RESET_KEY);
    } catch (error) {
      console.warn('Unable to clear the password reset.', error);
    }
  }
  return { ok: true, email };
}

export function getPasswordReset(): PasswordReset | null {
  return readPasswordReset();
}

export async function resetPassword(password: string): Promise<AuthResult> {
  const reset = readPasswordReset();
  if (!reset) return { ok: false, error: 'This reset link has expired. Request a new one.', field: 'form' };

  const accounts = readAccounts();
  const account = accounts.find((candidate) => candidate.email.toLowerCase() === reset.email);
  if (!account) return { ok: false, error: 'No local account matches this reset link.', field: 'form' };

  const salt = randomSalt();
  let passwordHash: string;
  try {
    passwordHash = await hashPassword(password, salt);
  } catch (error) {
    console.warn('Unable to secure the new password.', error);
    return { ok: false, error: 'Could not update your password. Please try again.', field: 'form' };
  }

  const updated = { ...account, salt, passwordHash };
  writeJson(ACCOUNTS_KEY, accounts.map((candidate) => candidate.id === account.id ? updated : candidate));
  try {
    window.localStorage.removeItem(RESET_KEY);
  } catch (error) {
    console.warn('Unable to clear the password reset.', error);
  }
  return { ok: true, account: updated };
}
