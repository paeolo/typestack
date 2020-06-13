import React, { useContext } from 'react';
import { NextPage } from 'next';
import Error from 'next/error';

import { InversifyContext, ApplicationBindings } from '../../container';
import { Locale } from '../I18n';
import I18nProvider from './I18nProvider';

export interface LocaleProps {
  locale?: Locale
  phrases?: any
}

export const WithLocale = (WrappedPage: NextPage<any>): NextPage<LocaleProps> => props => {

  const { locale, phrases, ...pageProps } = props;
  const container = useContext(InversifyContext);

  if (!locale) {
    return <Error statusCode={404} />
  }

  if (!container.isBound(ApplicationBindings.LOCALE))
    container.bind(ApplicationBindings.LOCALE).toConstantValue(locale);

  return (
    <I18nProvider locale={locale} phrases={phrases}>
      <WrappedPage {...pageProps} />
    </I18nProvider>
  );
}
