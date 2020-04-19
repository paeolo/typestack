import { AuthenticationStrategy } from '@loopback/authentication';
import { inject } from '@loopback/core';
import {
  HttpErrors,
  Request
} from '@loopback/rest';
import { UserProfile } from '@loopback/security';

import { JWTService } from './jwt.service';
import { JWTBindings } from './keys';
import { TokenType } from './security.spec';

export class JWTBasicStrategy implements AuthenticationStrategy {
  name = 'basic';

  constructor(
    @inject(JWTBindings.TOKEN_SERVICE) public tokenService: JWTService,
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    if (request.cookies[TokenType.AUTH_ACCESS] === undefined)
      throw new HttpErrors.Unauthorized(`Cookie ${TokenType.AUTH_ACCESS} not found`);

    const token = request.cookies[TokenType.AUTH_ACCESS];
    return await this.tokenService.verify(token);
  }
}
