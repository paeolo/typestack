import { UserController, withCookie, User, UserRole } from '@openapi/.';
import { AuthenticationProps } from './WithAuthentication';
import { IncomingMessage } from 'http';

export * from './WithAuthentication';

export async function getAuthenticationProps(
  request: IncomingMessage, authorizedRoles?: UserRole[]): Promise<AuthenticationProps> {

  let currentUser: User | null;
  try {
    currentUser = await withCookie(request.headers.cookie)(UserController.currentUser());
  } catch {
    currentUser = null;
  }

  return {
    currentUser: currentUser,
    authorizedRoles: authorizedRoles || null
  };
}
