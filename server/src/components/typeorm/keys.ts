import { BindingKey } from '@loopback/core';
import { TypeOrmComponent } from './typeorm.component';

/**
 * Binding keys used by this component.
 */
export namespace TypeOrmBindings {
  export const COMPONENT = BindingKey.create<TypeOrmComponent>(
    'components.TypeOrmComponent',
  );
}
