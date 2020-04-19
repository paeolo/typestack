import { BindingKey } from '@loopback/core'
import {
  AuthorizationPolicyComponent
} from '../authorization';
import { Authorizer } from '@loopback/authorization';

export namespace AuthorizationPolicyBindings {
  export const PROVIDER = BindingKey.create<Authorizer>('authorization-policy.provider');
  export const COMPONENT = BindingKey
    .create<AuthorizationPolicyComponent>('components.AuthorizationPolicyComponent');
}
