import { LBApplication } from './application';
import { RestBindings } from '@loopback/rest';
import { LoggingBindings } from './components/logger';

export async function main() {

  const envRequired = [
    'DATABASE_URL',
    'JWT_SECRET'
  ];
  for (let key of envRequired) {
    if (process.env[key] === undefined)
      throw new Error(`Environment variable ${key} is undefined`);
  }

  const app = new LBApplication();

  await app.boot();
  await app.start();

  const port = await app.restServer.get(RestBindings.PORT);
  const host = await app.restServer.get(RestBindings.HOST);
  const logger = await app.get(LoggingBindings.LOGGER);

  if (!process.env.MONOLITHIC)
    logger.info(`Server is listening ${host} on port ${port}`);

  return app;
}
