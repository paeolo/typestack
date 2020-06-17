import {
  authenticate
} from '@loopback/authentication';
import { inject, bind, BindingScope } from '@loopback/core';
import {
  post,
  requestBody,
  RestBindings,
  Response,
  HttpErrors,
  param,
  Request,
  api,
  put,
  get
} from '@loopback/rest';
import { model } from '@loopback/repository';
import { SecurityBindings, UserProfile } from '@loopback/security';
import { Repository } from 'typeorm';
import { validate } from 'class-validator'

import {
  typeorm,
  logger,
  LOGGER_LEVEL,
  JWTBindings,
  JWTService,
  PasswordHasher,
  TokenPayload,
} from '../components';
import { TokenType, UserRole } from '../components/jwt';
import { User, UserCredentials } from '../entity';
import { required, Returns, ReturnsWithCode, PGErrorCode, ReturnsWithType, ReturnsArray } from '../utils';
import { authorize } from '@loopback/authorization';

@model()
export class NewUser {
  @required({ jsonSchema: { examples: ['john.smith'] } })
  username: string;
  @required({ jsonSchema: { minLength: 6 } })
  password: string;
}

@model()
class LoginCredentials {
  @required({ jsonSchema: { examples: ['john.smith'] } })
  username: string;
  @required()
  password: string;
}

@bind({ scope: BindingScope.SINGLETON })
@api({ basePath: '/user', paths: [] })
export class UserController {
  constructor(
    @typeorm.repository(User) private users: Repository<User>,
    @typeorm.repository(UserCredentials) private credentials: Repository<UserCredentials>,
    @inject(JWTBindings.TOKEN_SERVICE) private jwt: JWTService,
    @inject(JWTBindings.PASSWORD_HASHER) private hasher: PasswordHasher
  ) { }

  /**
  ** Register
  **/
  @put(
    '/register',
    Returns(User, 'Saved user')
  )
  @logger(LOGGER_LEVEL.INFO)
  async register(
    @requestBody() newUser: NewUser
  ) {
    const password = await this.hasher.hash(newUser.password);
    let credentials = this.credentials.create({ password: password });
    try {
      let user = this.users.create({
        username: newUser.username,
        credentials: credentials,
      });

      const errors = await validate(user);
      if (errors.length > 0)
        throw new HttpErrors.UnprocessableEntity();

      const savedUser = await this.users.save(user);
      delete savedUser.credentials;
      return savedUser;
    }
    catch (error) {
      if (error.code === PGErrorCode.UNIQUE_VIOLATION) {
        throw new HttpErrors.Conflict();
      } else {
        throw error;
      }
    }
  }

  /**
  ** Login
  **/
  @post(
    '/login',
    ReturnsWithCode(204, 'Grant a token cookie')
  )
  @logger(LOGGER_LEVEL.INFO)
  async login(
    @requestBody() credentials: LoginCredentials,
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @param.query.boolean('remember') remember?: boolean,
  ) {
    const foundUser = await this.users.findOne({
      where: { username: credentials.username },
      relations: ['credentials']
    });
    if (!foundUser || !foundUser.credentials) {
      throw new HttpErrors.Unauthorized();
    }

    const passwordMatched = await this.hasher.compare(
      credentials.password,
      foundUser.credentials.password,
    );
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized();
    }

    let payload: TokenPayload = { userId: foundUser.id, role: foundUser.role };
    this.jwt.generateAndPutInCookie(TokenType.AUTH_ACCESS, payload, response);

    if (remember) {
      let payload = await this.jwt.grant(
        TokenType.AUTH_REFRESH,
        { userId: foundUser.id }
      );
      this.jwt.generateAndPutInCookie(TokenType.AUTH_REFRESH, payload, response);
    }
  }

  /**
  ** Automatically login
  **/
  @post(
    '/autologin',
    ReturnsWithCode(204, 'Grant a token cookie').withSecurity(TokenType.AUTH_REFRESH)
  )
  @authenticate('refresh')
  @logger(LOGGER_LEVEL.INFO)
  async autologin(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const foundUser = await this.users.findOne({
      where: { id: currentUserProfile.id }
    });
    if (!foundUser) {
      throw new HttpErrors.Unauthorized();
    }

    this.jwt.generateAndPutInCookie(
      TokenType.AUTH_ACCESS,
      { userId: foundUser.id, role: foundUser.role },
      response
    );
  }

  /**
  ** Returns current user
  **/
  @get(
    '/me',
    Returns(User, 'Current User').withSecurity()
  )
  @authenticate('basic')
  @logger(LOGGER_LEVEL.DEBUG)
  async currentUser(
    @inject(SecurityBindings.USER) currentUserProfile: UserProfile
  ) {
    let userId: number = currentUserProfile.id;
    const foundUser = await this.users.findOne({
      where: { id: userId },
    });
    return foundUser;
  }

  /**
  ** Logout
  **/
  @post(
    '/logout',
    ReturnsWithCode(204, 'Expire the token cookie')
  )
  @logger(LOGGER_LEVEL.DEBUG)
  async logout(
    @inject(RestBindings.Http.REQUEST) request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response
  ) {
    this.jwt.removeFromCookie(
      [TokenType.AUTH_ACCESS, TokenType.AUTH_REFRESH], response);
    await this.jwt.revokeFromCookie(TokenType.AUTH_REFRESH, request);
  }

  /**
  ** Count number of users
  **/
  @get(
    '/count',
    ReturnsWithType('number', 'Total count of users.').withSecurity()
  )
  @logger(LOGGER_LEVEL.INFO)
  @authenticate('basic')
  @authorize({ allowedRoles: [UserRole.ADMIN] })
  async count(
  ) {
    return await this.users.count();
  }

  /**
  ** Returns all users from database.
  **/
  @get(
    '/find',
    ReturnsArray(User, 'Returns an array of jobs').withSecurity()
  )
  @logger(LOGGER_LEVEL.INFO)
  @authenticate('basic')
  @authorize({ allowedRoles: [UserRole.ADMIN] })
  async find(
  ) {
    return await this.users.find();
  }

  /**
  ** Find one User from the database.
  **/
  @get(
    '/findOne',
    Returns(User, 'Returns one user').withSecurity()
  )
  @logger(LOGGER_LEVEL.INFO)
  @authenticate('basic')
  @authorize({ allowedRoles: [UserRole.ADMIN] })
  async findOne(
    @param.query.number('id', { required: true }) id: number
  ) {
    return await this.users.findOneOrFail({
      where: {
        id: id
      }
    });
  }

  /**
  ** Save one user to the database.
  **/
  @post(
    '/saveOne',
    Returns(User, 'Returns saved user').withSecurity()
  )
  @logger(LOGGER_LEVEL.INFO)
  @authenticate('basic')
  @authorize({ allowedRoles: [UserRole.ADMIN] })
  async saveOne(
    @requestBody() user: User
  ) {
    return await this.users.save(user);
  }
}
