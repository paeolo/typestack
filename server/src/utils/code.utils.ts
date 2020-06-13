/* -- CODE UTILS --
*  This is the place where you can reference any code.
*  Use it if the code you need is not in the types, prefer this
*  to magic strings.
*
*/

export namespace PGErrorCode {
  export const UNIQUE_VIOLATION = '23505';
}

export namespace TypeOrmError {
  export const ENTITY_NOT_FOUND = 'EntityNotFound';
}

export namespace NodeENV {
  export const DEVELOPMENT = 'development'
}
