import { BindingKey } from '@loopback/core'
import { OperationArgs, Request } from '@loopback/rest'
import { Logger } from 'winston'

import { LoggingComponent } from './logger.component'
import { LoggerInfo } from './logger-info.provider'
import { LoggerMetadata } from './logger.decorator'

export namespace LoggingBindings {
  export const LOGGER = BindingKey.create<Logger>('logger.winston-default');
  export const INVOKE_LOGGER = BindingKey.create<Logger>('logger.winston-invoke');
  export const LOGGER_ACTION = BindingKey.create<LogFn>('logger.action');
  export const METADATA = BindingKey.create<LoggerMetadata | undefined>('logger.metadata');
  export const INFO = BindingKey.create<LoggerInfo | undefined>('logger.info');
  export const COMPONENT = BindingKey.create<LoggingComponent>('components.LoggingComponent');
}

export enum LOGGER_LEVEL {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface LogFn {
  (req: Request, args: OperationArgs, start: bigint): Promise<void>;
}
