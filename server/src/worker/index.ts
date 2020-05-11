import { expose } from "threads/worker";
import {
  ModuleThread
} from 'threads/dist/types/master';

import { fibonacci } from './fibonacci'
import { sleep } from './sleep'

export const worker = {
  fibonacci,
  sleep
}

expose(worker);

export type WorkerType = ModuleThread<typeof worker>
