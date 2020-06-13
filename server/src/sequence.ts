import { inject } from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
} from '@loopback/rest';
import {
  AUTHENTICATION_STRATEGY_NOT_FOUND,
  USER_PROFILE_NOT_FOUND,
  AuthenticationBindings,
  AuthenticateFn
} from '@loopback/authentication';

import cookieParser from 'cookie-parser';

import { executeRequestHandler, TypeOrmError } from './utils';
import { LoggingBindings, LogFn } from './components/logger';

const SequenceActions = RestBindings.SequenceActions;

export class MainSequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION) protected authenticateRequest: AuthenticateFn,
    @inject(LoggingBindings.LOGGER_ACTION) protected logRequest: LogFn,
  ) { }

  async handle(context: RequestContext) {
    const { request, response } = context;
    const time: bigint = process.hrtime.bigint();
    try {
      await executeRequestHandler(context, cookieParser());
      const route = this.findRoute(request);
      await this.authenticateRequest(request);
      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);
      this.logRequest(request, args, time);
      this.send(response, result);
    } catch (err) {
      if (err.code === AUTHENTICATION_STRATEGY_NOT_FOUND || err.code === USER_PROFILE_NOT_FOUND) {
        Object.assign(err, { statusCode: 401 });
      }
      if (err.name === TypeOrmError.ENTITY_NOT_FOUND) {
        Object.assign(err, { statusCode: 404 });
      }
      this.reject(context, err);
    }
  }
}
