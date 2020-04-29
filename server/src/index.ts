import { LBApplication } from './application';
import { RestBindings } from '@loopback/rest';
import { LoggingBindings } from './components/logger';

import dotenv from 'dotenv';
import path from 'path';

export async function main() {

  dotenv.config({ path: path.resolve(__dirname, '../../.env') });
  const app = new LBApplication();

  await app.boot();
  await app.start();

  const port = await app.restServer.get(RestBindings.PORT);
  const host = await app.restServer.get(RestBindings.HOST);
  const logger = await app.get(LoggingBindings.LOGGER);

  logger.info(`Server is listening ${host} on port ${port}`);

  return app;
}
