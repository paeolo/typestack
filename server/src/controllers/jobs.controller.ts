import { get, api } from '@loopback/rest';
import { inject } from '@loopback/context';
import { bind, BindingScope } from '@loopback/core';

import { WorkerType } from '../worker'
import { ReturnsWithType } from '../utils';
import { WorkersBindings, WorkerPool } from '../components';

@bind({ scope: BindingScope.SINGLETON })
@api({ basePath: '/jobs', paths: [] })
export class JobsController {
  constructor(@inject(WorkersBindings.POOL) private pool: WorkerPool) { }

  /**
  ** A simple endpoint to compute Fibonacci inside a worker
  **/
  @get('/fibonacci', ReturnsWithType('number', 'The 999 Fibonacci number'))
  async fibonacci() {
    return this.pool.queue(async (worker: WorkerType) => {
      return await worker.fibonacci(999);
    })
  }

  /**
  ** A simple endpoint that queue a sleep job
  **/
  @get('/sleep')
  async sleep() {
    this.pool.queue(async (worker: WorkerType) => {
      return await worker.sleep();
    })
  }
}
