import threads, { Thread } from 'threads';

export type WorkerPool = threads.Pool<Thread>;
