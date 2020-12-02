/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from 'typeorm';

import Debts from '../database/entities/Debts';

// Classe responsavel pela implementação de funções de acesso direto ao banco de dados
// via TYPEORM
@EntityRepository(Debts)
class DebtsRepository extends Repository<Debts> {
  public async findByID(id: string) {
    const debts = await this.findOne({ where: { id } });

    return debts;
  }

  public async findBySupplier(id: string) {
    const debts = await this.find({ where: { supplier_id: id } });

    return debts;
  }

  public async HouMuchDebtsTotday(date: Date) {
    const debts = await this.findAndCount({ where: { data_vencimento: date } });

    return debts;
  }
}

export default DebtsRepository;
