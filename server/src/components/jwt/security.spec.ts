import { ReferenceObject, SecuritySchemeObject } from '@loopback/openapi-v3';

export const OPERATION_SECURITY_ACCESS = [{ cookieAuthAccess: [] }];
export const OPERATION_SECURITY_REFRESH = [{ cookieAuthRefresh: [] }];

export enum TokenType {
  AUTH_ACCESS = 'AUTH_ACCESS',
  AUTH_REFRESH = 'AUTH_REFRESH'
}

export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN'
}

export type SecuritySchemeObjects = {
  [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
};

export const SECURITY_SCHEME_SPEC: SecuritySchemeObjects = {
  cookieAuthAccess: {
    type: 'apiKey',
    in: 'cookie',
    name: TokenType.AUTH_ACCESS,
  },
  cookieAuthRefresh: {
    type: 'apiKey',
    in: 'cookie',
    name: TokenType.AUTH_REFRESH,
  },
};
