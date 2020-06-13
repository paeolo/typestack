import { Repository } from 'typeorm';
import { Script } from '..';

import { UserRole, typeorm } from '../../components';
import { User } from '../../entity';
import { bind } from '@loopback/core';

interface Options {
  username: string;
  role: UserRole;
}

@bind()
export class SetUserRole implements Script {
  constructor(
    @typeorm.repository(User) private users: Repository<User>,
  ) { }

  async run(options: Options) {
    let user = await this.users.findOne({
      username: options.username
    })
    if (user !== undefined) {
      user.role = options.role;
      await this.users.save(user);
    }
    else
      throw new Error('User not found.');
  }
}
