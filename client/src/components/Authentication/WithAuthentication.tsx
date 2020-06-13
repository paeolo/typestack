import React from 'react';
import Error from 'next/error';

import { NextPage } from 'next';
import { User, UserRole } from '@openapi/.';
import { useInjection } from '../../hooks';
import { UserStore } from '../../stores';
import { StoresBindings } from '../../container';

export interface AuthenticationProps {
  currentUser: User | null;
  authorizedRoles?: UserRole[];
}

export const WithAuthentication = (Page: NextPage<any>): NextPage<AuthenticationProps> => props => {

  const { currentUser, ...pageProps } = props;
  const userStore = useInjection<UserStore>(StoresBindings.USER);

  if (props.authorizedRoles) {
    if (currentUser === null || !props.authorizedRoles.includes(currentUser.role)) {
      return <Error
        title={'Unauthorized access'}
        statusCode={401} />
    }
  }

  if (currentUser !== null)
    userStore.currentUser = currentUser;

  return (
    <Page {...pageProps} />
  );
}
