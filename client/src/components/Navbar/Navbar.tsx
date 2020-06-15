import React from 'react';
import classNames from 'classnames';
import styles from './Navbar.module.scss';
import { useObserver } from 'mobx-react-lite';

import { Link, SwitchLanguage } from '@components/I18n';
import { Navbar } from '@components/Core';
import { locales } from '../../locales';
import { useTranslate, useInjection } from '../../hooks';
import { UserStore } from '../../stores';
import { StoresBindings } from '../../container';
import { NavbarSignout } from './NavbarSignout';

export default () => {

  const userStore = useInjection<UserStore>(StoresBindings.USER);
  const { locale, t } = useTranslate();

  return useObserver(() =>
    <Navbar fixed="top" className={classNames(styles.boxShadow)}>
      <Navbar.Menu>
        <Navbar.Segment align="end">
          {!userStore.isLogged &&
            <Link href='/register' passHref>
              <Navbar.Item>{t('navbar.register')}</Navbar.Item>
            </Link>
          }
          {!userStore.isLogged &&
            <Link href='/signin' passHref>
              <Navbar.Item>{t('navbar.signin')}</Navbar.Item>
            </Link>
          }
          {userStore.isLogged &&
            <NavbarSignout />
          }
          {userStore.isAdmin &&
            <Link href='/admin' passHref>
              <Navbar.Item>{t('navbar.admin')}</Navbar.Item>
            </Link>
          }
          <Navbar.Item dropdown hoverable>
            <Navbar.Link>{locale}</Navbar.Link>
            <Navbar.Dropdown>
              {
                locales.map(locale => {
                  return (
                    <SwitchLanguage
                      key={locale}
                      locale={locale}>
                      <Navbar.Item>
                        {locale}
                      </Navbar.Item>
                    </SwitchLanguage>
                  );
                })
              }
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Segment>
      </Navbar.Menu>
    </Navbar >
  );
}
