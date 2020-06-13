import { locales } from '../../locales';
import { LocaleProps } from './WithLocale';

export * from './WithLocale';
export * from './Link';
export * from './SwitchLanguage';

export type Locale = typeof locales[number]

export async function getLocaleProps(locale: string): Promise<LocaleProps> {

  if (!locales.includes(locale)) {
    return {
      locale: null,
      phrases: null
    }
  }

  const phrases = await import(`../../locales/${locale}.json`)
    .then(m => m.default)
  return {
    locale: locale,
    phrases: phrases
  }
}

export async function getLocalePaths() {
  return {
    paths: locales.map(value => ({ params: { lang: value } })),
    fallback: false,
  }
}
