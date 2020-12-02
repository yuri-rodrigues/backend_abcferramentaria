/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from 'typeorm';

import Supplier from '../database/entities/Supplier';

@EntityRepository(Supplier)
class SupplierRepository extends Repository<Supplier> {
  public async findByCNPJ(cnpj: string) {
    const supplier = await this.findOne({ where: { cnpj } });

    return supplier;
  }
}

export default SupplierRepository;
