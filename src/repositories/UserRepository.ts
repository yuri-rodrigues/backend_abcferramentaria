/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from 'typeorm';

import User from '../database/entities/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByEmail(email: string) {
    const user = await this.findOne({ where: { email } });

    return user;
  }
}

export default UserRepository;
