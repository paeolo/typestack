import { BindingKey, Interceptor } from '@loopback/core'
import { SanitizerComponent } from './sanitizer.component';
import { SanitizerService } from './sanitizer.service';

export namespace SanitizerBindings {
  export const INTERCEPTOR = BindingKey.create<Interceptor>('sanitizer.interceptor');
  export const SERVICE = BindingKey.create<SanitizerService>('sanitizer.service');
  export const COMPONENT = BindingKey.create<SanitizerComponent>('components.SanitizerComponent');
}
