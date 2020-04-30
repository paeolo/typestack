/* -- ENUM UTILS --
*  Provide decorators to embed enums in the openAPI.
*  See https://github.com/strongloop/loopback-next/issues/2911
*  See https://github.com/strongloop/loopback-next/issues/3033
*
*  Limitation:
*  Use it only with enums that are string typed.
*/

import { model, property } from '@loopback/repository';

export interface EnumOptions {
  title: string,
  values: Object | string[],
  required?: boolean
};

export function Enum(options: EnumOptions) {
  let values: string[];
  if (Array.isArray(options.values))
    values = options.values;
  else
    values = Object.values(options.values);
  return property({
    type: ResolverForEnum({ enum: values, title: options.title }),
    required: options.required
  });
}

export function EnumArray(options: EnumOptions) {
  let values: string[];
  if (Array.isArray(options.values))
    values = options.values;
  else
    values = Object.values(options.values);
  return property.array({
    type: ResolverForEnum({ enum: values, title: options.title }),
    required: options.required
  });
}

interface ResolverOptions {
  enum: string[],
  title: string,
};

function ResolverForEnum(options: ResolverOptions): Function {
  let classEnum = { [options.title]: function () { } }
  model({
    jsonSchema: {
      type: 'string',
      enum: options.enum
    }
  })(classEnum[options.title]);
  return (() => classEnum[options.title]);
}
