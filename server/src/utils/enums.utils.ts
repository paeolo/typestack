/* -- ENUM UTILS --
*  Provide decorators to embed enums in the openAPI
*  LB4 won't provide this due to Typescript limitations.
*  See https://github.com/strongloop/loopback-next/issues/2911
*  And https://github.com/strongloop/loopback-next/issues/3033
*
*  Usage:
*  @propertyEnum('MyEnum', MyEnum)
*  myProperty: MyEnum
*
*  Limitation:
*  Use it only with enums that are string typed.
*  ie. whose values are string.
*/

import { model, property } from '@loopback/repository';

export function propertyEnum(enumName: string, enumType: Object) {
  return property({
    type: ResolverForEnum(enumName, enumType)
  });
}

export function arrayEnum(enumName: string, enumType: Object) {
  return property.array({
    type: ResolverForEnum(enumName, enumType)
  });
}

export function requiredEnum(enumName: string, enumType: Object) {
  return property({
    type: ResolverForEnum(enumName, enumType),
    required: true
  });
}

export function requiredArrayEnum(enumName: string, enumType: Object) {
  return property.array({
    type: ResolverForEnum(enumName, enumType),
    required: true
  });
}

function ResolverForEnum(enumName: string, enumType: Object): Function {
  let classEnum = { [enumName]: function () { } }
  model({
    jsonSchema: {
      type: 'string',
      enum: Object.values(enumType)
    }
  })(classEnum[enumName]);
  return (() => classEnum[enumName]);
}
