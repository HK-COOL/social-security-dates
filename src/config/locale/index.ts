import { envConfigs } from '..';

export const localeNames: any = {
  en: 'English',
};

export const locales = ['en'];

export const defaultLocale = envConfigs.locale;

export const localePrefix = 'never';

export const localeDetection = false;

export const localeMessagesRootPath = '@/config/locale/messages';

export const localeMessagesPaths = [
  'common',
  'landing',
  'pages/index',
  'pages/social-security-payment-schedule-2026',
  'pages/when-will-i-get-my-social-security-check',
  'pages/ssi-payment-schedule',
  'pages/social-security-may-payments',
  'pages/late-social-security-payment',
];
