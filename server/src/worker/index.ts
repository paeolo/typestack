import { expose } from "threads/worker"

import { fibonacci } from './fibonacci'

export const worker = {
  fibonacci
}

expose(worker);

export type Worker = typeof worker
