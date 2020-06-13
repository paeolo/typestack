import React from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useObserver } from 'mobx-react-lite';

import { UserController } from '@openapi/.';
import { Link, SwitchLanguage } from '@components/I18n';
import { locales } from '../../locales';
import { useTranslate, useInjection } from '../../hooks';
import { UserStore } from '../../stores';
import { StoresBindings } from '../../container';

interface NavBarItemProps {
  name: string;
  href: string;
}

const NavBarLinkItem = (props: NavBarItemProps) => {

  return (
    <Link href={props.href}>
      <a className={classNames('navbar-item')}>
        {props.name}
      </a>
    </Link>
  );
}

const NavBarSignoutItem = () => {

  const router = useRouter();
  const { t } = useTranslate();

  const onClick = async () => {
    await UserController.logout();
    router.replace('/');
  }

  return (
    <a
      className={`navbar-item`}
      onClick={onClick}>
      {t('navbar.signout')}
    </a>
  );
}

export const Navbar = () => {

  const userStore = useInjection<UserStore>(StoresBindings.USER);
  const { locale, t } = useTranslate();

  return useObserver(() =>
    <nav id='navbar' className={`navbar is-fixed-top`}>
      <div className={`navbar-menu`}>
        <div className='navbar-end'>
          {!userStore.isLogged &&
            <NavBarLinkItem name={t('navbar.register')} href='/register' />}
          {!userStore.isLogged &&
            <NavBarLinkItem name={t('navbar.connection')} href='/signin' />}
          {userStore.isLogged &&
            <NavBarSignoutItem />}
          {userStore.isAdmin &&
            <NavBarLinkItem name={t('navbar.admin')} href={`/admin`} />}

          <div className='navbar-item has-dropdown is-hoverable'>
            <a className={`navbar-link`}>
              {locale}
            </a>
            <div className={`navbar-dropdown`}>
              {
                locales.map((locale, index) => {
                  return (
                    <SwitchLanguage key={index} locale={locale} className='navbar-item' />
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </nav >
  );
}
