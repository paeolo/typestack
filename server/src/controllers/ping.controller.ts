import { Request, RestBindings, get } from '@loopback/rest';
import { model, property } from '@loopback/repository';
import { inject } from '@loopback/context';
import { Returns } from '../utils';

/**
 * OpenAPI response for ping()
 */
@model()
class PingResponse {
  @property() greeting: string;
  @property() date: string;
  @property() url: string;
  @property() headers: object
}

export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

  /**
  ** A simple endpoint to bounce back http requests
  **/
  @get('/ping', Returns(PingResponse))
  ping() {
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
