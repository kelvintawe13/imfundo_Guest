import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../data/i18n';
import type { Lang } from '../types/app';

export type TKey = keyof typeof translations.en;

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_STORAGE_KEY = 'imfundo-language-v1';

function readSavedLanguage(): Lang {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'xh' ? 'xh' : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }: {children: React.ReactNode;}) {
  const [lang, setLang] = useState<Lang>(readSavedLanguage);

  useEffect(() => {
    document.documentElement.lang = lang === 'xh' ? 'xh' : 'en';
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.warn('Unable to save language.', error);
    }
  }, [lang]);

  const t = useCallback((key: TKey) => translations[lang][key] ?? translations.en[key], [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}