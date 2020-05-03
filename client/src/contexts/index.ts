import React from 'react';
import { createContainer } from './ioc';

export * from './keys';

export const InversifyContext = React.createContext({
  container: createContainer()
});
