import React from 'react';
import { createContainer } from './ioc';

export const InversifyContext = React.createContext(createContainer());
