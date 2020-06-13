/* -- OPENAPI UTILS --
*  Provide decorators to make openAPI exerience better
*  These functions are really nothing more than shortcuts
*/

import { property, PropertyDefinition } from '@loopback/repository';
import {
  getModelSchemaRef,
  OperationObject,
  param,
  ContentObject,
  ResponsesObject,
  SecurityRequirementObject,
} from '@loopback/rest';

import {
  TokenType,
  OPERATION_SECURITY_ACCESS,
  OPERATION_SECURITY_REFRESH
} from '../components/jwt/security.spec';

export function required(definition?: Partial<PropertyDefinition>) {
  return property({
    ...definition,
    required: true
  });
}

export function getSchema<T extends object>(modelCtor: Function & { prototype: T }) {
  return {
    'application/json': {
      schema: getModelSchemaRef(modelCtor)
    }
  }
}

export function getArraySchema<T extends object>(modelCtor: Function & { prototype: T }) {
  return {
    'application/json': {
      schema: {
        type: 'array',
        items: getModelSchemaRef(modelCtor)
      }
    }
  }
}

export function getTypeSchema(type: string) {
  return {
    'application/json': {
      schema: {
        type: type,
      }
    }
  }
}

export function getTypedArraySchema(type: string) {
  return {
    'application/json': {
      schema: {
        type: 'array',
        items: {
          type: type
        }
      }
    }
  }
}

export class OperationWrapper implements OperationObject {

  public responses: ResponsesObject = {};
  public description?: string;
  public security?: SecurityRequirementObject[];

  constructor(content?: ContentObject, description?: string) {
    if (content !== undefined) {
      this.responses['200'] = {
        content: content,
        description: description
      };
    }
  }

  public withSecurity(type?: TokenType): OperationWrapper {
    switch (type) {
      case TokenType.AUTH_REFRESH:
        this.security = OPERATION_SECURITY_REFRESH;
        break;
      default:
        this.security = OPERATION_SECURITY_ACCESS;
        break;
    }
    return this;
  }

  public withDescription(description: string): OperationWrapper {
    this.description = description;
    return this;
  }

  public withResponses(response: ResponsesObject) {
    this.responses = response;
    return this;
  }
}

export function Returns<T extends object>(modelCtor: Function & { prototype: T }, description?: string) {
  return new OperationWrapper(getSchema(modelCtor), description);
}

export function ReturnsWithType(type: string, description?: string) {
  return new OperationWrapper(getTypeSchema(type), description);
}

export function ReturnsWithCode(code: number, description?: string) {
  return new OperationWrapper()
    .withResponses({
      [code]: {
        description: description
      }
    })
}

export function ReturnsArray<T extends object>(modelCtor: Function & { prototype: T }, description?: string) {
  return new OperationWrapper(getArraySchema(modelCtor), description);
}

export function ReturnsTypedArray(type: string, description?: string) {
  return new OperationWrapper(getTypedArraySchema(type), description);
}

export function queryObject<T extends object>(
  name: string, modelCtor: Function & { prototype: T },
  options?: { required: boolean }
) {
  const schemaRef = getModelSchemaRef(modelCtor);
  delete schemaRef.definitions;
  return param({
    name: name,
    in: 'query',
    content: {
      'application/json': {
        schema: {
          ...schemaRef
        }
      }
    },
    required: options?.required,
  });
}
