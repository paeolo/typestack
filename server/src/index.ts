import { LBApplication } from './application';
import { RestBindings } from '@loopback/rest';
import { LoggingBindings } from './components/logger';

export async function main() {

  const app = new LBApplication();

  await app.boot();
  await app.start();

  const port = await app.restServer.get(RestBindings.PORT);
  const host = await app.restServer.get(RestBindings.HOST);
  const logger = await app.get(LoggingBindings.LOGGER);

  logger.info(`Server is listening ${host} on port ${port}`);

  return app;
}
