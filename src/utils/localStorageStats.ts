export type StorageEntry = {
  label: string;
  bytes: number;
  color: string;
};

export type StorageStats = {
  entries: StorageEntry[];
  totalBytes: number;
  itemCount: number;
};

const groups = [
  { match: ['learning-progress'], label: 'Learning progress', color: 'bg-teal' },
  { match: ['learner-data'], label: 'Activity & streaks', color: 'bg-sun' },
  { match: ['accounts', 'session', 'user-profile', 'account-role', 'password-reset'], label: 'Account', color: 'bg-sky' },
  { match: ['preferences', 'language', 'theme', 'settings'], label: 'Preferences', color: 'bg-coral' }
];

function bytesOf(key: string, value: string): number {
  return new TextEncoder().encode(`${key}${value}`).length;
}

export function readStorageStats(): StorageStats {
  const totals = new Map<string, { bytes: number; color: string }>();
  let totalBytes = 0;
  let itemCount = 0;

  try {
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (!key) continue;
      const value = window.localStorage.getItem(key) ?? '';
      const bytes = bytesOf(key, value);
      totalBytes += bytes;
      itemCount += 1;

      const group = groups.find((candidate) => candidate.match.some((part) => key.includes(part)));
      const label = group?.label ?? 'Other local data';
      const color = group?.color ?? 'bg-slate-500';
      const current = totals.get(label) ?? { bytes: 0, color };
      current.bytes += bytes;
      totals.set(label, current);
    }
  } catch (error) {
    console.warn('Unable to read local storage usage.', error);
  }

  return {
    entries: Array.from(totals, ([label, value]) => ({ label, bytes: value.bytes, color: value.color })).sort(
      (left, right) => right.bytes - left.bytes
    ),
    totalBytes,
    itemCount
  };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
