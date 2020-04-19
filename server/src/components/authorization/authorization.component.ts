import {
  Binding,
  Component,
  config,
  ProviderMap,
  ContextTags,
  bind,
} from '@loopback/core';
import {
  AuthorizationPolicyBindings,
  AuthorizationProvider
} from '../authorization';
import { AuthorizationTags } from '@loopback/authorization';

export type AuthorizationConfig = {
};

@bind({ tags: { [ContextTags.KEY]: AuthorizationPolicyBindings.COMPONENT } })
export class AuthorizationPolicyComponent implements Component {
  providers: ProviderMap;
  bindings: Binding<unknown>[];

  constructor(
    @config() config: AuthorizationConfig,
  ) {
    this.setupBindings(config);
  }

  private setupBindings(config: AuthorizationConfig) {
    this.bindings = [
      Binding.bind(AuthorizationPolicyBindings.PROVIDER)
        .toProvider(AuthorizationProvider)
        .tag(AuthorizationTags.AUTHORIZER)
    ];
  }
}
