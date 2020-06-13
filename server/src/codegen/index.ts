import { BootMixin } from '@loopback/boot';
import { RestApplication, OpenAPIObject } from '@loopback/rest';

import path from 'path';

import { generate } from './generator';
import { createEnumSpec } from '../utils';
import { customEnumArray } from './enum';

class LBApplication extends BootMixin(RestApplication) {
  constructor() {
    super();
    this.projectRoot = path.join(__dirname, '..');
  }
}

async function main() {
  const app = new LBApplication();
  await app.boot();

  let rootDir = path.join(app.projectRoot, '..', '..');
  let openAPI = await app.restServer.getApiSpec();
  addCustomEnum(openAPI);

  await generate({
    openAPI: openAPI,
    basePath: path.join(rootDir, 'openapi'),
    templatePath: path.join(rootDir, 'openapi', 'templates')
  });
  process.exit(0);
}

function addCustomEnum(openAPI: OpenAPIObject) {
  if (openAPI.components !== undefined && openAPI.components.schemas !== undefined) {
    for (const customEnum of customEnumArray) {
      openAPI.components.schemas[customEnum.title] = createEnumSpec(
        customEnum.title,
        customEnum.enum
      );
    }
  }
}

if (require.main === module) {
  main()
    .catch(err => {
      console.error('Cannot generate open-api client.', err);
      process.exit(1);
    });
}
