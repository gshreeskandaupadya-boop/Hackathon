import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import kaTranslations from './locales/ka.json';
import hiTranslations from './locales/hi.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  ka: {
    translation: kaTranslations,
  },
  hi: {
    translation: hiTranslations,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
