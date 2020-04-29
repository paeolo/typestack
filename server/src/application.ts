import { AuthenticationComponent } from '@loopback/authentication';
import { BootMixin } from '@loopback/boot';
import { CoreBindings } from '@loopback/core';
import {
  AuthorizationComponent,
  AuthorizationBindings,
  AuthorizationOptions,
  AuthorizationDecision
} from '@loopback/authorization';
import {
  RestApplication,
  RestServerConfig
} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';

import path from 'path';
import { ConnectionOptions } from 'typeorm';
import { MainSequence } from './sequence';
import {
  TypeOrmConfig,
  TypeOrmBindings,
  TypeOrmComponent,
  LoggingBindings,
  LoggingComponent,
  LoggingComponentConfig,
  LoggingComponentOptions,
  LOGGER_LEVEL,
  DefaultFactory,
  InvokeFactory,
  SECURITY_SCHEME_SPEC,
  JWTComponentConfig,
  JWTBindings,
  JWTComponent,
  AuthorizationPolicyComponent,
} from './components';
import { NodeENV } from './utils';

export type LBApplicationConfig = {
  rest: RestServerConfig,
  database: ConnectionOptions,
  logger: LoggingComponentOptions,
  jwt: JWTComponentConfig
};

export class LBApplication extends BootMixin(RestApplication) {

  private config: LBApplicationConfig;

  constructor() {
    super();
    this.projectRoot = __dirname;
    this.setupConfig();
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

  private setupConfig() {
    this.config = {
      rest: {
        host: process.env.API_HOST || 'localhost',
        port: Number.parseInt(process.env.API_PORT || '8888'),
        openApiSpec: {
          disabled: process.env.NODE_ENV !== NodeENV.DEVELOPMENT || undefined,
        },
      },
      database: {
        type: 'postgres',
        synchronize: true,
        host: process.env.DB_HOST || 'localhost',
        port: Number.parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD
      },
      logger: {
        directory: process.env.LOG_DIRECTORY || path.join(__dirname, '../../logs'),
        level: process.env.LOG_LEVEL || LOGGER_LEVEL.INFO,
        stack_trace: process.env.NODE_ENV === NodeENV.DEVELOPMENT
      },
      jwt: {
        secret: process.env.JWT_SECRET || 'MY_SECRET',
        expiresIn: {
          AUTH_ACCESS: process.env.AUTH_ACCESS_EXPIRES || '6 hours',
          AUTH_REFRESH: process.env.AUTH_REFRESH_EXPIRES || '90 days'
        }
      }
    }
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
      options: this.config.logger,
      invoke: [InvokeFactory.createConsole],
      default: [DefaultFactory.createConsole],
    });
    this.component(LoggingComponent);
  }

  private setupJWTComponent() {
    this.configure<JWTComponentConfig>(JWTBindings.COMPONENT)
      .to(this.config.jwt);
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
