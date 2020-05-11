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
import {
  PoolOptions,
  Thread
} from 'threads/dist/master/pool';

import { WorkersBindings } from './keys';
import { WorkerPool } from './types';
import { LoggingBindings } from '../logger';

export type WorkersConfig = {
  spawnWorker: () => Promise<Thread>
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
    this.pool.events().subscribe(event => {
      this.logger.info(
        `Pool event:${Object.entries(event).map(([key, value]) => ` ${key}=${value}`)}`
      )
    });
    this.bindings = [
      Binding.bind(WorkersBindings.POOL).toDynamicValue(() => this.pool)
    ];
  }

  async stop() {
    await this.pool.terminate();
  }
}
