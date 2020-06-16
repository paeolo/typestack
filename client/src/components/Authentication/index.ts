import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { UserController, withCookie, User, UserRole } from '@openapi/.';
import { AuthenticationProps } from './WithAuthentication';
import { getCookieFromResponse } from './utils';

export * from './WithAuthentication';

export async function getAuthenticationProps(
  context: GetServerSidePropsContext<ParsedUrlQuery>, authorizedRoles?: UserRole[]): Promise<AuthenticationProps> {

  let currentUser: User | null;
  let cookie = context.req.headers.cookie;

  try {
    currentUser = await withCookie(cookie)(UserController.currentUser());
  } catch {
    try {
      const response = await UserController.autologin().set('Cookie', cookie.split(';'));
      cookie = getCookieFromResponse(response);
      currentUser = await withCookie(cookie)(UserController.currentUser());
      context.res.setHeader('Set-Cookie', response.get('Set-Cookie'));
    } catch {
      currentUser = null;
    }
  }

  return {
    currentUser: currentUser,
    authorizedRoles: authorizedRoles || null
  };
}
