import { genSalt, hash, compare } from 'bcrypt';

export interface PasswordHasher {
  hash(password: string): Promise<string>;
  compare(providedPass: string, storedPass: string): Promise<boolean>;
}

export class BcryptHasher implements PasswordHasher {

  async hash(password: string) {
    const salt = await genSalt();
    return hash(password, salt);
  }

  async compare(providedPass: string, storedPass: string) {
    return await compare(providedPass, storedPass);
  }
}
