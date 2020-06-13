import { BootMixin } from '@loopback/boot';
import { Constructor, instantiateClass, Application } from '@loopback/core';

import path from 'path';
import dotenv from 'dotenv';
import inquirer from 'inquirer';

import {
  TypeOrmConfig,
  TypeOrmBindings,
  TypeOrmComponent
} from '../components';

export abstract class Script {
  abstract async run(options: Object): Promise<void>;
}

class LBApplication extends BootMixin(Application) {
  constructor() {
    super();
    this.projectRoot = path.join(__dirname, '..');
    this.configure<TypeOrmConfig[]>(TypeOrmBindings.COMPONENT).to([{
      connectionOptions: {
        type: 'postgres',
        synchronize: true,
        url: process.env.DATABASE_URL,
      },
      entities: ['entity/**/*.js']
    }]);
    this.component(TypeOrmComponent);
  }
}

export async function runner(cls: Constructor<Script>, options: Object = {}) {

  dotenv.config({
    path: path.resolve(__dirname, '../../../server.env')
  });

  if (process.env['DATABASE_URL'] === undefined)
    throw new Error(`Environment variable DATABASE_URL is undefined`);

  const questions = [];
  const url = new URL(process.env['DATABASE_URL']);

  const app = new LBApplication();
  await app.boot();
  await app.start();
  const script = await instantiateClass(cls, app);

  questions.push({
    type: 'confirm',
    name: 'confirm',
    message: `Run the script with DB_HOST=${url.hostname} ?`,
    default: true,
  });

  const answers = await inquirer.prompt(questions);
  if (answers.confirm) {
    try {
      await script.run(options);
    } catch (error) {
      console.error(`> Error: ${error.message}`);
    }
  }

  await app.stop();
}
