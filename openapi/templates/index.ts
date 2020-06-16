/*
** OpenAPI Client - CONFIGURATION
*/

import superagent from 'superagent';

export * from './schemas';
export * from './routes';

export interface OpenAPIOptions {
  url: string;
}

export namespace OpenAPI {
  export const options: OpenAPIOptions = { url: '/api' }
}

export type BodyType<T> = T extends Request<infer U> ? U : T;
export type Request<T> = superagent.SuperAgentRequest & Promise<{body : T}>;

/**
 * Use this method to send a request.
 *
 * @param request The request you want to send.
 * @exemple `const body = await send(request);`
 *
 */
export const obtain = <T extends Request<unknown>>(request: T): Promise<BodyType<T>> =>
  request.then(response => response.body);

/**
 * Use this method to send a request with a given cookie.
 *
 * @param cookie A string containing cookie's values.
 * @param request The request you want to send.
 * @exemple `const body = await withCookie(cookie)(request);`
 *
 */
export const withCookie = (cookie: string) =>
  <T extends Request<unknown>>(request: T): Promise<BodyType<T>> =>
    request
      .set('Cookie', cookie.split(';'))
      .then(response => response.body);
