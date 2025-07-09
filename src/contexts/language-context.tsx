"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { translateBatch } from '@/ai/flows/translate-flow';
import { i18nKeys } from '@/lib/i18n-keys';

type Language = 'en' | 'hi' | 'mr' | 'ur';
type Translations = Record<string, string>;

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languageMap: Record<Language, string> = {
    en: 'English',
    hi: 'Hindi',
    mr: 'Marathi',
    ur: 'Urdu',
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [loading, setLoading] = useState(false);

  const handleSetLanguage = useCallback(async (lang: Language) => {
    setLanguage(lang);
    if (lang === 'en') {
      setTranslations({});
      return;
    }

    setLoading(true);
    try {
      const response = await translateBatch({ 
        texts: i18nKeys,
        targetLanguage: languageMap[lang]
      });
      setTranslations(response);
    } catch (error) {
      console.error("Translation failed:", error);
      // Fallback to English
      setTranslations({});
    } finally {
      setLoading(false);
    }
  }, []);

  const t = useCallback((key: string, fallback?: string): string => {
    if (language === 'en') {
      return fallback || i18nKeys[key as keyof typeof i18nKeys] || key;
    }
    return translations[key] || fallback || i18nKeys[key as keyof typeof i18nKeys] || key;
  }, [language, translations]);

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage: handleSetLanguage, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
