import React from 'react';
import { Segmented } from '../ui/Segmented';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Lang } from '../../types/app';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <Segmented<Lang>
      label="Language"
      size="sm"
      value={lang}
      onChange={setLang}
      options={[
      { value: 'en', label: 'EN' },
      { value: 'xh', label: 'XH' }]
      } />);


}