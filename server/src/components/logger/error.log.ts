import { Provider } from '@loopback/context';
import {
  LogError,
  Request
} from '@loopback/rest';
import { inject, Getter } from '@loopback/core';
import { Logger } from 'winston';

import {
  LoggingBindings,
  LoggerInfo,
  LOGGER_LEVEL
} from '.';

export class LoggerErrorProvider implements Provider<LogError> {

  constructor(
    @inject(LoggingBindings.INVOKE_LOGGER) private logger: Logger,
    @inject.getter(LoggingBindings.INFO) private info: Getter<LoggerInfo | undefined>
  ) { }

  value(): LogError {
    return this.action.bind(this);
  }

  private async action(error: Error, statusCode: number, req: Request) {
    if (statusCode < 500) {
      return;
    }

    let info = await this.info();
    let className = info ? info.className : undefined;
    let methodName = info ? info.methodName : undefined;

    this.logger.log({
      level: LOGGER_LEVEL.ERROR,
      message: 'INVOKE_ERROR',
      url: req.url,
      ip: req.ip,
      error: error.stack ?? error,
      statusCode: statusCode,
      className: className,
      methodName: methodName
    })
  }
}
