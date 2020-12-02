import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import SupplierRepository from '../repositories/SupplierRepository';

class SupplierController {
  async create(request: Request, response: Response) {
    try {
      const supplierRepository = getCustomRepository(SupplierRepository);

      const {
        cnpj,
        razaosocial,
        nome_fantasia,
        inscr_estadual,
        nome,
        obs,
      } = request.body;

      const existisSupplier = await supplierRepository.findByCNPJ(cnpj);

      if (existisSupplier) {
        return response.status(400).json({ message: 'User already exists' });
      }

      const supplier = supplierRepository.create({
        cnpj,
        razaosocial,
        nome_fantasia,
        inscr_estadual,
        nome,
        obs,
      });

      await supplierRepository.save(supplier);

      return response.status(201).json(classToClass(supplier));
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async index(request: Request, response: Response) {
    const supplierRepository = getCustomRepository(SupplierRepository);

    const allSuppliers = await supplierRepository.find();

    return response.status(200).json(classToClass(allSuppliers));
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const supplierRepository = getCustomRepository(SupplierRepository);

    const supplier = await supplierRepository.findOne(id);

    if (!supplier) {
      return response.status(404).json({ message: 'Supplier not found!' });
    }

    return response.status(200).json(classToClass(supplier));
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {
      cnpj,
      razaosocial,
      nome_fantasia,
      inscr_estadual,
      nome,
      obs,
    } = request.body;

    const supplierRepository = getCustomRepository(SupplierRepository);

    const updateSupplier = await supplierRepository.findOne(id);

    if (!updateSupplier) {
      return response.status(401).json({ message: 'User not found' });
    }

    updateSupplier.cnpj = cnpj || updateSupplier.cnpj;

    updateSupplier.razaosocial = razaosocial || updateSupplier.razaosocial;

    updateSupplier.nome_fantasia =
      nome_fantasia || updateSupplier.nome_fantasia;

    updateSupplier.inscr_estadual =
      inscr_estadual || updateSupplier.inscr_estadual;

    updateSupplier.nome = nome || updateSupplier.nome;

    updateSupplier.obs = obs || updateSupplier.obs;

    const updatedSupplier = await supplierRepository.save(updateSupplier);

    return response.status(201).json(classToClass(updatedSupplier));
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    const supplierRepository = getCustomRepository(SupplierRepository);

    const supplier = await supplierRepository.findOne(id);

    if (!supplier) {
      return response.status(404).json({ message: 'Supplier not found!' });
    }

    await supplierRepository.remove(supplier);

    return response.status(200).json(classToClass(supplier));
  }
}

export default SupplierController;
