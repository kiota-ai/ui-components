/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'
export function configureI18n(options:any) {
  i18n.use(initReactI18next).init(options);
}

export { i18n };
