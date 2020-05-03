import { useContext } from 'react';
import { interfaces } from 'inversify';

import { InversifyContext } from '../contexts';

export function useInjection<T>(identifier: interfaces.ServiceIdentifier<T>) {
  const { container } = useContext(InversifyContext);
  if (!container) throw new Error();
  return container.get<T>(identifier);
};
