/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from 'typeorm';

import SupplierContact from '../database/entities/SupplierContact';

@EntityRepository(SupplierContact)
class SupplierContactRepository extends Repository<SupplierContact> {
  public async findByCNPJ(cnpj: string) {
    const supplierContact = await this.findOne({ where: { cnpj } });

    return supplierContact;
  }
}

export default SupplierContactRepository;
