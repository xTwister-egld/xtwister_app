import React from 'react';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ReactDOM from 'react-dom/client';
import {I18nextProvider} from 'react-i18next';

import App from './App';
import './assets/sass/theme.scss';

import global_en from './translations/en/global.json';
import global_es from './translations/es/global.json';
import global_fr from './translations/fr/global.json';
import global_ro from './translations/ro/global.json';




i18next.use(LanguageDetector).init({
  interpolation: { escapeValue: false },
  react: {
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i']
  },
  supportedLngs: ['en', 'es', 'fr', 'ro'],
  fallbackLng: 'en',
  // Options for language detector
  detection: {
    order: ['path', 'cookie', 'htmlTag'],
    caches: ['cookie']
  },
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    },
    fr: {
      global: global_fr
    },
    ro: {
      global: global_ro
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.Fragment>
      <I18nextProvider i18n={i18next}>
      <App />
      </I18nextProvider>
  </React.Fragment>,
);
