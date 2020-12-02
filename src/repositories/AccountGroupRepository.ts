/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from 'typeorm';

import AccountGroup from '../database/entities/AccountGroup';

// Classe responsavel pela implementação de funções de acesso direto ao banco de dados
// via TYPEORM
@EntityRepository(AccountGroup)
class AccountGroupRepository extends Repository<AccountGroup> {
  public async findByName(nome: string) {
    const accountGroup = await this.findOne({ where: { nome } });

    return accountGroup;
  }
}

export default AccountGroupRepository;
