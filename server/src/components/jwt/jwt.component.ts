import { asAuthStrategy } from '@loopback/authentication';
import {
  Binding,
  Component,
  createBindingFromClass,
  config,
  ProviderMap,
  ContextTags,
  bind,
  BindingScope,
} from '@loopback/core';

import { TokenType } from './security.spec';
import {
  JWTService,
  JWTBasicStrategy,
  JWTBindings,
  BcryptHasher
} from '../jwt';
import { JWTRefreshStrategy } from './refresh.strategy';

export type ExpiresIn = {
  [key in TokenType]: string
}

export type JWTComponentConfig = {
  secret: string,
  expiresIn: ExpiresIn
};

@bind({ tags: { [ContextTags.KEY]: JWTBindings.COMPONENT } })
export class JWTComponent implements Component {
  providers: ProviderMap;
  bindings: Binding<unknown>[];

  constructor(
    @config() config: JWTComponentConfig,
  ) {
    this.setupBindings(config);
  }

  private setupBindings(config: JWTComponentConfig) {
    this.bindings = [
      Binding.bind(JWTBindings.TOKEN_SECRET).to(config.secret),
      Binding.bind(JWTBindings.TOKEN_EXPIRES_IN).to(config.expiresIn),
      Binding.bind(JWTBindings.TOKEN_SERVICE).toClass(JWTService)
        .inScope(BindingScope.SINGLETON),
      Binding.bind(JWTBindings.PASSWORD_HASHER).toClass(BcryptHasher)
        .inScope(BindingScope.SINGLETON),
      createBindingFromClass(JWTBasicStrategy).apply(asAuthStrategy)
        .inScope(BindingScope.SINGLETON),
      createBindingFromClass(JWTRefreshStrategy).apply(asAuthStrategy)
        .inScope(BindingScope.SINGLETON)
    ];
  }
}
