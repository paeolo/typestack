import {
  Interceptor,
  Provider,
  InvocationContext,
  ValueOrPromise,
  InvocationResult,
  inject,
} from '@loopback/core';
import { SanitizerBindings } from './keys';
import { SanitizerService } from './sanitizer.service';

export class SanitizerInterceptorProvider implements Provider<Interceptor> {

  constructor(
    @inject(SanitizerBindings.SERVICE) private sanitizer: SanitizerService,
  ) { }

  /**
  * @returns An interceptor function
  */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      const result = await next();
      return this.sanitizer.sanitize(result);
    } catch (err) {
      throw err;
    }
  }
}
