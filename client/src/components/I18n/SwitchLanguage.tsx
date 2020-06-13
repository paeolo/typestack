import React, { useContext } from 'react';
import { useRouter } from 'next/router'
import ms from 'ms';

import { I18nContext } from './I18nProvider';
import { cookieName } from '../../locales';

interface SwitchLanguageProps {
  locale: string;
  className?: string;
}

export const SwitchLanguage: React.FC<SwitchLanguageProps> = props => {

  const locale = useContext(I18nContext).locale();

  if (props.locale === locale) {
    return (
      <React.Fragment>
        <a className={props.className}>{props.locale}</a>
      </React.Fragment>
    );
  }

  const handleClick = async () => {
    var expires = new Date(Date.now() + ms('1 year')).toUTCString();
    document.cookie = `${cookieName}=${props.locale};expires=${expires};path=/`;
  }

  const router = useRouter();
  return (
    <React.Fragment>
      <a
        href={router.asPath.replace(locale, props.locale)}
        onClick={handleClick}
        className={props.className}>
        {props.locale}
      </a>
    </React.Fragment>
  );
}
