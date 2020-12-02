/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from 'typeorm';

import Agencie from '../database/entities/Agencie';

// Classe responsavel pela implementação de funções de acesso direto ao banco de dados
// via TYPEORM
@EntityRepository(Agencie)
class AgencieRepository extends Repository<Agencie> {
  public async findByNumber(num_agencia: string) {
    const agencie = await this.findOne({ where: { num_agencia } });

    return agencie;
  }
}

export default AgencieRepository;
