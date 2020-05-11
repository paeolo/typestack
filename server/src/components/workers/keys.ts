import { BindingKey } from '@loopback/core';

import { WorkerPool } from './types';
import { WorkersComponent } from './workers.component';

/**
 * Binding keys used by this component.
 */
export namespace WorkersBindings {
  export const COMPONENT = BindingKey.create<WorkersComponent>('components.WorkersComponent');
  export const POOL = BindingKey.create<WorkerPool>('workers.pool');
}
