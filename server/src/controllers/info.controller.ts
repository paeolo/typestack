import { bind, BindingScope } from '@loopback/core';
import { inject } from '@loopback/context';
import { model } from '@loopback/repository';
import { get, Request, RestBindings } from '@loopback/rest';

import { Returns, required } from '../utils';
import { ExpiresIn, JWTBindings } from '../components';

/**
 * OpenAPI response for ping()
 */
@model()
class PingResponse {
  @required() greeting: string;
  @required() date: string;
  @required() url: string;
  @required() headers: object
}

/**
 * OpenAPI response for info()
 */
@model()
class InfoResponse {
  @required({ jsonSchema: { examples: ['6 hours'] } })
  AUTH_ACCESS_EXPIRES: string;
  @required({ jsonSchema: { examples: ['90 days'] } })
  AUTH_REFRESH_EXPIRES: string;
}

@bind({ scope: BindingScope.SINGLETON })
export class InfoController {

  /**
  ** A simple endpoint to bounce back http requests
  **/
  @get('/ping', Returns(PingResponse, 'Return ping response'))
  ping(
    @inject(RestBindings.Http.REQUEST) req: Request
  ) {
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: req.url,
      headers: Object.assign({}, req.headers),
    };
  }

  /**
  ** A simple endpoint to return publicy available information
  **/
  @get('/info', Returns(InfoResponse, 'Return info response'))
  info(
    @inject(JWTBindings.TOKEN_EXPIRES_IN) jwtExpiresIn: ExpiresIn,
  ) {
    return {
      AUTH_ACCESS_EXPIRES: jwtExpiresIn.AUTH_ACCESS,
      AUTH_REFRESH_EXPIRES: jwtExpiresIn.AUTH_REFRESH
    };
  }
}
