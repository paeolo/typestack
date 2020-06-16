import React, { useState } from 'react';
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
  const [active, setActive] = useState(false);

  return useObserver(() =>
    <Navbar fixed="top" className={classNames(styles.boxShadow)}>
      <Navbar.Brand>
        <Navbar.Item href="/">
          <img
            src="/alien.png"
            alt=""
            role="presentation"
            width="28"
            height="28"
          />
        </Navbar.Item>
        <Navbar.Burger
          active={active}
          onClick={() => setActive(!active)} />
      </Navbar.Brand>
      <Navbar.Menu active={active}>
        <Navbar.Segment align="end">
          {!userStore.isLogged &&
            <Link href='/register' passHref>
              <Navbar.Item tab>{t('navbar.register')}</Navbar.Item>
            </Link>
          }
          {!userStore.isLogged &&
            <Link href='/signin' passHref>
              <Navbar.Item tab>{t('navbar.signin')}</Navbar.Item>
            </Link>
          }
          {userStore.isLogged &&
            <Navbar.Item dropdown hoverable>
              <Navbar.Link arrowless>
                {userStore.currentUser.username}
              </Navbar.Link>
              <Navbar.Dropdown>
                <NavbarSignout />
              </Navbar.Dropdown>
            </Navbar.Item>

          }
          {userStore.isAdmin &&
            <Link href='/admin' passHref>
              <Navbar.Item tab>{t('navbar.admin')}</Navbar.Item>
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
