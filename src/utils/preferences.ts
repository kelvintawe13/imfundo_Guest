export type LearnerPreferences = {
  wifiOnly: boolean;
  dataSaver: boolean;
  reminder: boolean;
};

const STORAGE_KEY = 'imfundo-preferences-v1';

export const defaultPreferences: LearnerPreferences = {
  wifiOnly: true,
  dataSaver: true,
  reminder: false
};

export function readPreferences(): LearnerPreferences {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultPreferences;
    const parsed = JSON.parse(stored) as Partial<LearnerPreferences>;
    return {
      wifiOnly: typeof parsed.wifiOnly === 'boolean' ? parsed.wifiOnly : defaultPreferences.wifiOnly,
      dataSaver: typeof parsed.dataSaver === 'boolean' ? parsed.dataSaver : defaultPreferences.dataSaver,
      reminder: typeof parsed.reminder === 'boolean' ? parsed.reminder : defaultPreferences.reminder
    };
  } catch (error) {
    console.warn('Unable to read preferences.', error);
    return defaultPreferences;
  }
}

export function writePreferences(preferences: LearnerPreferences) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Unable to save preferences.', error);
  }
}
