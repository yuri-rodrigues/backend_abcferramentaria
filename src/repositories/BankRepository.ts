/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from 'typeorm';

import Bank from '../database/entities/Bank';

@EntityRepository(Bank)
class BankRepository extends Repository<Bank> {
  public async findByEmail(nome: string) {
    const user = await this.findOne({ where: { nome } });

    return user;
  }
}

export default BankRepository;
