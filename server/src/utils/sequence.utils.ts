/* -- SEQUENCE UTILS --
*  Provide the promise executeRequestHandler
*  This is meant to execute an Express middleware such as
*  cookieParser in the LB4 sequence.
*
*  Usage:
*  await executeRequestHandler(context, cookieParser());
*/

import { promisify } from "util";
import { RequestContext } from '@loopback/rest';

import { RequestHandler } from 'express';
import onFinished from 'on-finished';

const onFinishedAsync = promisify(onFinished);

/**
 * Execute an Express-style callback-based request handler.
 *
 * @param handler
 * @param request
 * @param response
 * @returns A promise resolved to:
 * - `true` when the request was handled
 * - `false` when the handler called `next()` to proceed to the next
 *    handler (middleware) in the chain.
 */
export function executeRequestHandler(
  context: RequestContext,
  handler: RequestHandler
): Promise<boolean> {
  const responseWritten = onFinishedAsync(context.response).then(() => true);
  const handlerFinished = new Promise<boolean>((resolve, reject) => {
    handler(context.request, context.response, (err: any) => {
      if (err) {
        reject(err);
      } else {
        // Express router called next, which means no route was matched
        resolve(false);
      }
    });
  });
  return Promise.race([handlerFinished, responseWritten]);
}
