import {
  bind,
  ContextTags,
  Component,
  Binding,
  ProviderMap,
  config
} from '@loopback/core';
import { RestBindings } from '@loopback/rest';

import { createLogger } from 'winston';
import * as Transport from 'winston-transport';

import {
  LoggingBindings,
  LoggerInfoProvider,
  LoggerActionProvider,
  LoggerErrorProvider,
  LOGGER_LEVEL
} from '../logger';

export type LoggingComponentOptions = {
  level: LOGGER_LEVEL,
  directory: string,
  stack_trace: boolean
};

export type TransportFactory = (config: LoggingComponentOptions) => Transport;

export type LoggingComponentConfig = {
  options: LoggingComponentOptions,
  default_transports: TransportFactory[],
  invoke_transports: TransportFactory[]
};

@bind({ tags: { [ContextTags.KEY]: LoggingBindings.COMPONENT } })
export class LoggingComponent implements Component {
  providers: ProviderMap;
  bindings: Binding<unknown>[];

  constructor(
    @config() config: LoggingComponentConfig,
  ) {
    this.providers = {
      [LoggingBindings.INFO.key]: LoggerInfoProvider,
      [LoggingBindings.LOGGER_ACTION.key]: LoggerActionProvider,
      [RestBindings.SequenceActions.LOG_ERROR.key]: LoggerErrorProvider,
    };
    this.setupBindings(config);
  }

  private setupBindings(config: LoggingComponentConfig) {
    this.bindings = [
      Binding.bind(LoggingBindings.LOGGER).to(createLogger({
        transports: config.default_transports.map(value => value(config.options))
      })),
      Binding.bind(LoggingBindings.INVOKE_LOGGER).to(createLogger({
        transports: config.invoke_transports.map(value => value(config.options))
      }))
    ];
  }
}
