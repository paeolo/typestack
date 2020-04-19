import { inject, Provider } from '@loopback/context';
import { OperationArgs, Request } from '@loopback/rest';
import { Getter } from '@loopback/core';
import { Logger } from 'winston';

import {
  LogFn,
  LoggingBindings,
  LoggerInfo,
  LOGGER_LEVEL
} from '.';

export class LoggerActionProvider implements Provider<LogFn> {

  constructor(
    @inject(LoggingBindings.INVOKE_LOGGER) private logger: Logger,
    @inject.getter(LoggingBindings.INFO) private info: Getter<LoggerInfo | undefined>
  ) { }

  value(): LogFn {
    return this.action.bind(this);
  }

  private async action(req: Request, args: OperationArgs, start: bigint) {

    let time: bigint = (process.hrtime.bigint() - start) / BigInt(1e+6);
    let info = await this.info();

    if (info == undefined) return;

    const level = info.metadata ? info.metadata.level : LOGGER_LEVEL.DEBUG;
    const showArgs = info.metadata ? info.metadata.showArgs : false;

    this.logger.log({
      level: level,
      message: 'INVOKE_ACTION',
      ip: req.ip,
      time: time.toString(),
      methodName: info.methodName,
      className: info.className,
      args: showArgs ? args : undefined
    });
  }
}
