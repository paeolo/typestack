import React from 'react'
import { container } from './ioc'
import { StoresBindings } from './keys';
import { UserStore } from '../stores';

export const InversifyContext = React.createContext({ container: container });

export const StoresContext = React.createContext({
  userStore: container.get<UserStore>(StoresBindings.USER),
});
