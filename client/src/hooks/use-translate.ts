import { useContext } from 'react';
import { I18nContext } from '../components/I18n/I18nProvider';
import Polyglot from 'node-polyglot';

type I18n = {
  locale: string,
  t(phrase: string, options?: number | Polyglot.InterpolationOptions): string;
}

export function useTranslate(): I18n {
  const polyglot = useContext(I18nContext);
  const locale = polyglot.locale();
  polyglot.t
  const t = polyglot.t.bind(polyglot);
  return { locale, t };
}
