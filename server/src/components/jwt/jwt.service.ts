import { inject } from '@loopback/core';
import { HttpErrors, Response, Request } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { Repository, LessThan } from 'typeorm';
import { Logger } from 'winston';

import jwt from 'jsonwebtoken';
import ms from 'ms';

import { TokenType, UserRole } from './security.spec';
import { JWTBindings } from './keys';
import { ExpiresIn } from './jwt.component';
import { typeorm } from '../typeorm';
import { LoggingBindings } from '../logger';
import { Token } from '../../entity';

export interface TokenPayload {
  userId: number;
  role?: UserRole,
  tokenId?: number;
}

export class JWTService {
  constructor(
    @inject(JWTBindings.TOKEN_SECRET) private jwtSecret: string,
    @inject(JWTBindings.TOKEN_EXPIRES_IN) private jwtExpiresIn: ExpiresIn,
    @typeorm.repository(Token) private tokens: Repository<Token>,
    @inject(LoggingBindings.LOGGER) private logger: Logger
  ) { }

  public async verify(token: string): Promise<UserProfile> {

    let userProfile: UserProfile;
    if (!token)
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`
      );

    try {
      const decodedToken = jwt.verify(token, this.jwtSecret) as TokenPayload;
      userProfile = Object.assign(
        { [securityId]: '', name: '' },
        {
          [securityId]: decodedToken.userId,
          id: decodedToken.userId,
          role: decodedToken.role,
          tokenId: decodedToken.tokenId
        },
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`,
      );
    }
    return userProfile;
  }

  public generateAndPutInCookie(type: TokenType, payload: TokenPayload, response: Response) {
    let expiresIn: string = this.jwtExpiresIn[type];
    const token = this.generate(payload, expiresIn);
    response.cookie(type, token, {
      path: "/",
      maxAge: ms(expiresIn),
      sameSite: "lax",
      secure: process.env.COOKIE_SECURE !== undefined,
      domain: process.env.COOKIE_DOMAIN,
      httpOnly: true
    });
  }

  public async grant(type: TokenType, payload: TokenPayload, ) {
    let expiresIn: string = this.jwtExpiresIn[type];
    let data = await this.tokens.save({
      userId: payload.userId,
      type: type,
      expiresIn: new Date(Date.now() + ms(expiresIn))
    });
    payload.tokenId = data.id;

    this.tokens.delete({
      userId: payload.userId,
      expiresIn: LessThan(new Date(Date.now()))
    });

    return payload;
  }

  public async removeFromCookie(types: TokenType[], response: Response) {
    for (let type of types) {
      response.cookie(type, '', {
        path: "/",
        sameSite: "lax",
        secure: process.env.COOKIE_SECURE !== undefined,
        domain: process.env.COOKIE_DOMAIN,
        httpOnly: true
      });
    }
  }

  public async revokeFromCookie(type: TokenType, request: Request) {
    let token: string = request.cookies[type];
    if (token !== undefined && token.length > 0)
      await this.revoke(token);
  }

  public async revoke(token: string) {
    try {
      const decodedToken = jwt.verify(token, this.jwtSecret) as TokenPayload;
      let data = await this.tokens.findOne({ id: decodedToken.tokenId });
      if (data !== undefined)
        await this.tokens.remove(data);
    }
    catch (error) {
      this.logger.warn(`${error.name}: ${error.message}`);
    }
  }

  private generate(payload: TokenPayload, expiresIn: string) {
    let token: string;
    if (!payload)
      throw new HttpErrors.Unauthorized('Error generating token : info is null');

    try {
      token = jwt.sign(payload, this.jwtSecret, { expiresIn: expiresIn });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }
    return token;
  }
}
