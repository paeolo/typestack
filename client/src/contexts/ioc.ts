import { Container } from 'inversify';
import "reflect-metadata";

import { StoresBindings } from './keys';
import { UserStore } from '../stores';

export const createContainer = (): Container => {
  const container = new Container();

  container.bind<UserStore>(StoresBindings.USER)
    .to(UserStore)
    .inSingletonScope();

  return container;
}

export const container = createContainer();
