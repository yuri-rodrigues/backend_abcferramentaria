/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from 'typeorm';

import BankAccount from '../database/entities/BankAccount';

@EntityRepository(BankAccount)
class BankAccountRepository extends Repository<BankAccount> {
  public async findByNum(num_account: number) {
    const bankAccount = await this.findOne({ where: { num_account } });

    return bankAccount;
  }
}

export default BankAccountRepository;
