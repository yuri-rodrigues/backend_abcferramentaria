import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import BankRepository from '../repositories/BankRepository';

class BankController {
  async create(request: Request, response: Response) {
    try {
      const bankRepository = getCustomRepository(BankRepository);

      const { nome } = request.body;

      const existBank = await bankRepository.findByEmail(nome);

      if (existBank) {
        return response.status(400).json({ message: 'Bank already exists' });
      }

      const bank = bankRepository.create({
        nome,
      });

      await bankRepository.save(bank);

      return response.status(201).json(classToClass(bank));
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async index(request: Request, response: Response) {
    const bankRepository = getCustomRepository(BankRepository);

    const allBanks = await bankRepository.find();

    return response.status(200).json(classToClass(allBanks));
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const bankRepository = getCustomRepository(BankRepository);

    const bank = await bankRepository.findOne(id);

    if (!bank) {
      return response.status(404).json({ message: 'Bank not found!' });
    }

    return response.status(200).json(classToClass(bank));
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome } = request.body;

    const bankRepository = getCustomRepository(BankRepository);

    const updateBank = await bankRepository.findOne(id);

    if (!updateBank) {
      return response.status(401).json({ message: 'Bank not found' });
    }

    updateBank.nome = nome || updateBank.nome;

    const updatedBank = await bankRepository.save(updateBank);

    return response.status(201).json(classToClass(updatedBank));
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    const bankRepository = getCustomRepository(BankRepository);

    const bank = await bankRepository.findOne(id);

    if (!bank) {
      return response.status(404).json({ message: 'Bank not found!' });
    }

    await bankRepository.remove(bank);

    return response.status(200).json(classToClass(bank));
  }
}

export default BankController;
