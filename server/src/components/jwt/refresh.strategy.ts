import { AuthenticationStrategy } from '@loopback/authentication';
import { inject } from '@loopback/core';
import {
  HttpErrors,
  Request
} from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { Repository } from 'typeorm';

import { TokenType } from './security.spec';
import { JWTService } from './jwt.service';
import { typeorm } from '../typeorm';
import { JWTBindings } from './keys';
import { Token } from '../../entity';

export class JWTRefreshStrategy implements AuthenticationStrategy {
  name = 'refresh';

  constructor(
    @inject(JWTBindings.TOKEN_SERVICE) public tokenService: JWTService,
    @typeorm.repository(Token) private tokens: Repository<Token>
  ) { }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = request.cookies[TokenType.AUTH_REFRESH];
    if (token === undefined)
      throw new HttpErrors.Unauthorized(`Cookie ${TokenType.AUTH_REFRESH} not found`);

    let userProfile = await this.tokenService.verify(token);

    let count = await this.tokens.count({ id: userProfile.tokenId })
    if (!(count > 0))
      throw new HttpErrors.Unauthorized(`Cookie ${TokenType.AUTH_REFRESH} is revoked`);

    return userProfile;
  }
}
