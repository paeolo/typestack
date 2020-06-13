import {
  Binding,
  Component,
  ContextTags,
  bind,
  BindingScope,
  asGlobalInterceptor,
} from '@loopback/core';

import { SanitizerBindings } from './keys';
import { SanitizerInterceptorProvider } from './interceptor.provider';
import { SanitizerService } from './sanitizer.service';

@bind({
  tags: { [ContextTags.KEY]: SanitizerBindings.COMPONENT },
  scope: BindingScope.SINGLETON,
})
export class SanitizerComponent implements Component {
  bindings: Binding<unknown>[];

  constructor() {
    this.bindings = [
      Binding.bind(SanitizerBindings.SERVICE).toClass(SanitizerService)
        .inScope(BindingScope.SINGLETON),
      Binding.bind(SanitizerBindings.INTERCEPTOR).toProvider(SanitizerInterceptorProvider)
        .inScope(BindingScope.SINGLETON)
        .apply(asGlobalInterceptor())
    ];
  }
}
