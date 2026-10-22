import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'imfundo-user-profile-v1';

export type UserProfile = {
  name: string;
  grade: string;
  school: string;
  joined: string;
};

const emptyProfile: UserProfile = {
  name: '',
  grade: '',
  school: '',
  joined: ''
};

function normalize(value: unknown): UserProfile {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return emptyProfile;
  const profile = value as Record<string, unknown>;
  return {
    name: typeof profile.name === 'string' ? profile.name : '',
    grade: typeof profile.grade === 'string' ? profile.grade : '',
    school: typeof profile.school === 'string' ? profile.school : '',
    joined: typeof profile.joined === 'string' ? profile.joined : ''
  };
}

function readProfile(): UserProfile {
  if (typeof window === 'undefined') return emptyProfile;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? normalize(JSON.parse(raw)) : emptyProfile;
  } catch (error) {
    console.warn('Unable to read user profile.', error);
    return emptyProfile;
  }
}

let cache: UserProfile | null = null;
const listeners = new Set<() => void>();

function getSnapshot() {
  if (!cache) cache = readProfile();
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function persist(next: UserProfile) {
  cache = next;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (error) {
      console.warn('Unable to save user profile.', error);
    }
  }
  listeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    cache = readProfile();
    listeners.forEach((listener) => listener());
  });
}

export function useUserProfile(): UserProfile {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function saveUserProfile(patch: Partial<UserProfile>) {
  const current = getSnapshot();
  const joined =
    patch.joined ||
    current.joined ||
    new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  persist({ ...current, ...patch, joined });
}

export function profileInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
  return initials || 'L';
}
