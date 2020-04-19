import { AuthenticationComponent } from '@loopback/authentication';
import {
  AuthorizationComponent,
  AuthorizationBindings,
  AuthorizationOptions,
  AuthorizationDecision
} from '@loopback/authorization';
import { BootMixin } from '@loopback/boot';
import { CoreBindings } from '@loopback/core';
import { RestApplication } from '@loopback/rest';

import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';

import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

import { MainSequence } from './sequence';

import {
  TypeOrmConfig,
  TypeOrmBindings,
  TypeOrmComponent,
} from './components/typeorm';

import {
  LoggingBindings,
  LoggingComponent,
  LoggingComponentConfig,
  DefaultFactory,
  InvokeFactory
} from './components/logger';

import {
  SECURITY_SCHEME_SPEC,
  JWTComponentConfig,
  JWTBindings,
  JWTComponent
} from './components/jwt';

import {
  AuthorizationConfig,
  AuthorizationPolicyComponent
} from './components/authorization';

export class LBApplication extends BootMixin(RestApplication) {

  private config: any;

  constructor() {
    super();
    this.projectRoot = __dirname;
    this.config = YAML.parse(
      fs.readFileSync(path.join(__dirname, '../../config.yaml')).toString()
    );

    this.bind(CoreBindings.APPLICATION_CONFIG).to(this.config);

    this.sequence(MainSequence);
    this.api({
      openapi: '3.0.0',
      components: { securitySchemes: SECURITY_SCHEME_SPEC },
      info: { title: "Typestack", version: "0.0.1" },
      servers: [{ url: '/' }],
      paths: {}
    });
    this.setupComponents();
  }

  private setupComponents() {
    this.setupOpenAPI();
    this.setupTypeORM();
    this.setupLoggingComponent();
    this.setupJWTComponent();
    this.setupAuthorizationComponent();
  }

  private setupOpenAPI() {
    if (!this.config.rest.openApiSpec.disabled) {
      this.bind(RestExplorerBindings.CONFIG).to({
        path: this.config.rest_explorer.path
      });
      this.component(RestExplorerComponent);
    }
  }

  private setupTypeORM() {
    this.configure<TypeOrmConfig[]>(TypeOrmBindings.COMPONENT).to([{
      connectionOptions: this.config.database,
      entities: ['entity/*.js']
    }
    ]);
    this.component(TypeOrmComponent);
  }

  private setupLoggingComponent() {
    this.configure<LoggingComponentConfig>(LoggingBindings.COMPONENT).to({
      options: {
        directory: path.join(__dirname, '../../logs'),
        level: this.config.logger.level,
        stack_trace: this.config.logger.stack_trace
      },
      invoke_transports: [InvokeFactory.createConsole],
      default_transports: [DefaultFactory.createConsole],
    });
    this.component(LoggingComponent);
  }

  private setupJWTComponent() {
    this.configure<JWTComponentConfig>(JWTBindings.COMPONENT)
      .to({
        secret: this.config.jwt.secret,
        expiresIn: this.config.jwt.expiresIn
      });
    this.component(AuthenticationComponent);
    this.component(JWTComponent);
  }

  private setupAuthorizationComponent() {
    this.configure<AuthorizationOptions>(AuthorizationBindings.COMPONENT)
      .to({
        defaultDecision: AuthorizationDecision.DENY,
        precedence: AuthorizationDecision.DENY
      });
    this.component(AuthorizationComponent);
    this.component(AuthorizationPolicyComponent);
  }
}
