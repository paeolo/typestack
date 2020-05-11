import {
  bind,
  BindingScope,
  Component,
  config,
  ContextTags,
  LifeCycleObserver,
  Binding,
  inject,
} from '@loopback/core';
import { Logger } from 'winston';
import { Pool } from 'threads';

import { WorkersBindings } from './keys';
import { WorkerPool, ArbitraryThreadType, PoolOptions, PoolEventType } from './types';
import { LoggingBindings } from '../logger';

export type WorkersConfig = {
  spawnWorker: () => Promise<ArbitraryThreadType>
  options: PoolOptions
}

@bind({
  tags: { [ContextTags.KEY]: WorkersBindings.COMPONENT },
  scope: BindingScope.SINGLETON,
})
export class WorkersComponent implements Component, LifeCycleObserver {

  readonly pool: WorkerPool;
  bindings: Binding<unknown>[];

  constructor(
    @config() readonly config: WorkersConfig,
    @inject(LoggingBindings.LOGGER) private logger: Logger
  ) {
    this.pool = Pool(config.spawnWorker, config.options);
    this.setupLogging();
    this.bindings = [
      Binding.bind(WorkersBindings.POOL).toDynamicValue(() => this.pool)
    ];
  }

  private setupLogging() {
    const infoEvents = [
      PoolEventType.initialized,
      PoolEventType.terminated,
      PoolEventType.taskQueueDrained
    ];
    this.pool.events()
      .filter(event => infoEvents.includes(event.type))
      .subscribe(event => { this.logger.info(`Pool event: ${event.type}`) })
  }

  async stop() {
    await this.pool.terminate();
  }
}
