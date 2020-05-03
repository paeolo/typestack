import "reflect-metadata"; // Import only once
import { Container } from 'inversify';
import React from "react";

import { StoresBindings } from './keys';
import { UserStore } from '../stores';

export const createContainer = (): Container => {
  const container = new Container();

  container.bind<UserStore>(StoresBindings.USER)
    .to(UserStore)
    .inSingletonScope();

  return container;
}

export const InversifyContext = React.createContext({ container: createContainer() });
