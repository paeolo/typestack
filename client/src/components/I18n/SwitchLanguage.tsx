import React, { useContext } from 'react';
import { useRouter } from 'next/router'
import ms from 'ms';

import { I18nContext } from './I18nProvider';
import { cookieName } from '../../locales';

interface SwitchLanguageProps {
  locale: string;
  className?: string;
  children: JSX.Element;
}

export const SwitchLanguage: React.FC<SwitchLanguageProps> = props => {

  const router = useRouter();
  const locale = useContext(I18nContext).locale();

  const handleClick = async () => {
    var expires = new Date(Date.now() + ms('1 year')).toUTCString();
    document.cookie = `${cookieName}=${props.locale};expires=${expires};path=/`;
  }

  if (props.locale === locale) {
    return props.children;
  }

  return React.cloneElement(
    props.children,
    {
      href: router.asPath.replace(locale, props.locale),
      onClick: handleClick
    })
}
