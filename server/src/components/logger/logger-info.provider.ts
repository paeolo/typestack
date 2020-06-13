import { Constructor, inject, Provider } from '@loopback/context';
import { CoreBindings } from '@loopback/core';

import { LoggerMetadata, getLoggerMetadata } from '.';
import { UserProfile, SecurityBindings } from '@loopback/security';

export type LoggerInfo = {
  className: string,
  methodName: string,
  currentUser: UserProfile | undefined
  metadata: LoggerMetadata | undefined,
}

export class LoggerInfoProvider
  implements Provider<LoggerInfo | undefined> {
  constructor(
    @inject(CoreBindings.CONTROLLER_CLASS, { optional: true })
    private readonly controllerClass: Constructor<{}>,
    @inject(CoreBindings.CONTROLLER_METHOD_NAME, { optional: true })
    private readonly methodName: string,
    @inject(SecurityBindings.USER, { optional: true })
    private readonly currentUserProfile: UserProfile
  ) { }

  /**
   * @returns An object containing metadata about logging.
   */
  value(): LoggerInfo | undefined {
    if (!this.controllerClass || !this.methodName) return;
    let metadata = getLoggerMetadata(
      this.controllerClass,
      this.methodName,
    );
    return {
      className: this.controllerClass.name,
      methodName: this.methodName,
      currentUser: this.currentUserProfile,
      metadata: metadata
    }
  }
}
