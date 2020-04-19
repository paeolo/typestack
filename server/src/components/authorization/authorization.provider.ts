import { Provider } from "@loopback/core";
import {
  Authorizer,
  AuthorizationContext,
  AuthorizationMetadata,
  AuthorizationDecision
} from '@loopback/authorization';

export class AuthorizationProvider implements Provider<Authorizer> {
  /**
   * @returns an authorizer function
   *
   */
  value(): Authorizer {
    return this.authorize.bind(this);
  }

  async authorize(
    context: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ) {
    const role: string | undefined = context.principals[0].role;
    const allowedRoles = metadata.allowedRoles;

    if (allowedRoles === undefined)
      return AuthorizationDecision.ALLOW;
    else if (role === undefined)
      return AuthorizationDecision.DENY;
    else if (allowedRoles.includes(role))
      return AuthorizationDecision.ALLOW;

    return AuthorizationDecision.DENY;
  }
}
