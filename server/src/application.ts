import { AuthenticationComponent } from '@loopback/authentication';
import { BootMixin } from '@loopback/boot';
import { CoreBindings, createBindingFromClass } from '@loopback/core';
import {
  AuthorizationComponent,
  AuthorizationBindings,
  AuthorizationOptions,
  AuthorizationDecision
} from '@loopback/authorization';
import {
  RestApplication,
} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';

import path from 'path';
import { MainSequence } from './sequence';
import {
  TypeOrmConfig,
  TypeOrmBindings,
  TypeOrmComponent,
  LoggingBindings,
  LoggingComponent,
  LoggingComponentConfig,
  LOGGER_LEVEL,
  DefaultFactory,
  InvokeFactory,
  SECURITY_SCHEME_SPEC,
  JWTComponentConfig,
  JWTBindings,
  JWTComponent,
  AuthorizationPolicyComponent,
} from './components';
import { NodeENV, CustomEnhancer } from './utils';

export class LBApplication extends BootMixin(RestApplication) {

  constructor() {
    super();
    this.projectRoot = __dirname;

    this.setupConfig();
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

  private setupConfig() {
    const required = [
      'API_HOST', 'API_PORT', 'DB_HOST', 'DB_USER', 'DB_DATABASE', 'JWT_SECRET'
    ];
    for (let key of required) {
      if (process.env[key] === undefined)
        throw new Error(`Environment variable ${key} is undefined`);
    }
    this.bind(CoreBindings.APPLICATION_CONFIG).to({
      rest: {
        host: process.env.API_HOST,
        port: Number.parseInt(process.env.API_PORT || '8888'),
        openApiSpec: {
          disabled: process.env.NODE_ENV !== NodeENV.DEVELOPMENT || undefined,
        },
      },
    });
  }

  private setupComponents() {
    this.setupOpenAPI();
    this.setupTypeORM();
    this.setupLoggingComponent();
    this.setupJWTComponent();
    this.setupAuthorizationComponent();
  }

  private setupOpenAPI() {
    if (process.env.NODE_ENV === NodeENV.DEVELOPMENT) {
      this.bind(RestExplorerBindings.CONFIG).to({
        path: '/explorer'
      });
      this.add(createBindingFromClass(CustomEnhancer));
      this.component(RestExplorerComponent);
    }
  }

  private setupTypeORM() {
    this.configure<TypeOrmConfig[]>(TypeOrmBindings.COMPONENT).to([{
      connectionOptions: {
        type: 'postgres',
        synchronize: true,
        host: process.env.DB_HOST,
        port: Number.parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD
      },
      entities: ['entity/*.js']
    }
    ]);
    this.component(TypeOrmComponent);
  }

  private setupLoggingComponent() {
    this.configure<LoggingComponentConfig>(LoggingBindings.COMPONENT).to({
      options: {
        directory: process.env.LOG_DIRECTORY || path.join(__dirname, '../../logs'),
        level: process.env.LOG_LEVEL || LOGGER_LEVEL.INFO,
        stack_trace: process.env.NODE_ENV === NodeENV.DEVELOPMENT
      },
      invoke: [InvokeFactory.createConsole],
      default: [DefaultFactory.createConsole],
    });
    this.component(LoggingComponent);
  }

  private setupJWTComponent() {
    this.configure<JWTComponentConfig>(JWTBindings.COMPONENT)
      .to({
        secret: process.env.JWT_SECRET || 'MY_SECRET',
        expiresIn: {
          AUTH_ACCESS: process.env.AUTH_ACCESS_EXPIRES || '6 hours',
          AUTH_REFRESH: process.env.AUTH_REFRESH_EXPIRES || '90 days'
        }
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
