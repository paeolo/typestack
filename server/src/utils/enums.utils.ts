/* -- ENUM UTILS --
*  Provide decorators to embed enums in the openAPI.
*  See https://github.com/strongloop/loopback-next/issues/2911
*  See https://github.com/strongloop/loopback-next/issues/3033
*
*  Limitation:
*  Use it only with enums that are string typed.
*/

import { model, property } from '@loopback/repository';
import { OASEnhancer, OpenApiSpec, SchemaObject, asSpecEnhancer } from '@loopback/rest';
import { bind } from '@loopback/core';

export interface EnumOptions {
  title: string,
  values: Object | string[],
  required?: boolean
};

export function enumProperty(options: EnumOptions) {
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

export function enumArray(options: EnumOptions) {
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

@bind(asSpecEnhancer)
export class CustomEnhancer implements OASEnhancer {
  name = 'custom';

  modifySpec(spec: OpenApiSpec): OpenApiSpec {
    if (spec.components && spec.components.schemas) {
      Object.entries(spec.components.schemas).map(([key, value]: [string, SchemaObject]) => {
        if (value.enum) {
          delete value.title;
          delete value.additionalProperties;
        }
      })
    }
    return spec;
  }
}

export function createEnumSpec(title: string, values: Object | string[]) {
  let enumValues: string[];
  if (Array.isArray(values))
    enumValues = values;
  else
    enumValues = Object.values(values);

  return {
    title: title,
    additionalProperties: false,
    type: 'string',
    enum: enumValues
  }
}
