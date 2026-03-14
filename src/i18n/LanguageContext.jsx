import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  // Detect browser language on mount
  useEffect(() => {
    const browserLang = navigator.language || navigator.userLanguage;
    const shortLang = (browserLang || 'en').split('-')[0].toLowerCase();

    // Check if the exact browser language exists
    if (translations[browserLang]) {
      setLang(browserLang);
    } 
    // Otherwise check if the 2-letter base language exists (e.g. 'en-US' -> 'en')
    else if (translations[shortLang]) {
      setLang(shortLang);
    }
  }, []);

  // Set HTML lang attribute for accessibility/SEO
  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === 'ar') document.documentElement.dir = 'rtl';
    else document.documentElement.dir = 'ltr';
  }, [lang]);

  // Translation function
  const t = (key) => {
    const translationSet = translations[lang] || translations['en'];
    return translationSet[key] || key; // fallback to key directly if undefined
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
