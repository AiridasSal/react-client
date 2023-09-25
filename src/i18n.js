import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './assets/locales/en/source.json';
import ltTranslation from './assets/locales/lt/translation.json';
import ruTranslation from './assets/locales/ru/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  lt: {
    translation: ltTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
