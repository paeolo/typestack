import threads from 'threads';
import {
  FunctionThread,
  ModuleThread
} from 'threads/dist/types/master';

export * from 'threads/dist/master/pool';

export type ArbitraryThreadType = FunctionThread<any, any> & ModuleThread<any>;
export type WorkerPool = threads.Pool<ArbitraryThreadType>;
