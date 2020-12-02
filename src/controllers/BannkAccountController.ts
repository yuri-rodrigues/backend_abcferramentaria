import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import BankAccountRepository from '../repositories/BankAccountRepository';
// Classe para fazer o middleware entre o browser e o repository
class BankAccountController {
  // Funcao que recebe os dados cria um objeto e salva no banco
  async create(request: Request, response: Response) {
    try {
      const bankAccountRepository = getCustomRepository(BankAccountRepository);

      const { num_account, balance, agencie_id } = request.body;

      const existisAccount = await bankAccountRepository.findByNum(num_account);

      if (existisAccount) {
        return response.status(400).json({ message: 'Account already exists' });
      }

      const account = bankAccountRepository.create({
        num_account,
        balance,
        agencie_id,
      });

      await bankAccountRepository.save(account);

      return response.status(201).json(classToClass(account));
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  // Funcao que lista toda a tabela do banco
  async index(request: Request, response: Response) {
    const bankAccountRepository = getCustomRepository(BankAccountRepository);

    const allBanks = await bankAccountRepository.find({
      relations: ['agencie_id'],
    });

    return response.status(200).json(classToClass(allBanks));
  }

  // Funcao que retorna uma unica linha da tabela do banco
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const bankAccountRepository = getCustomRepository(BankAccountRepository);

    const agencie = await bankAccountRepository.findOne(id);

    if (!agencie) {
      return response.status(404).json({ message: 'Accouint not found!' });
    }

    return response.status(200).json(classToClass(agencie));
  }

  // Funcao que atualiza uma unica linha da tabela do banco
  async update(request: Request, response: Response) {
    const { id } = request.params;

    const { num_account, balance } = request.body;

    const bankAccountRepository = getCustomRepository(BankAccountRepository);

    const updateBankAccount = await bankAccountRepository.findOne(id);

    if (!updateBankAccount) {
      return response.status(401).json({ message: 'User not found' });
    }

    updateBankAccount.num_account =
      num_account || updateBankAccount.num_account;
    updateBankAccount.balance = balance || updateBankAccount.balance;

    const updatedBankAccount = await bankAccountRepository.save(
      updateBankAccount,
    );

    return response.status(201).json(classToClass(updatedBankAccount));
  }

  // Funcao que remove uma unica linha da tabela do banco
  async remove(request: Request, response: Response) {
    const { id } = request.params;

    const bankAccountRepository = getCustomRepository(BankAccountRepository);

    const bankAccount = await bankAccountRepository.findOne(id);

    if (!bankAccount) {
      return response.status(404).json({ message: 'Account not found!' });
    }

    await bankAccountRepository.remove(bankAccount);

    return response.status(200).json(classToClass(bankAccount));
  }
}

export default BankAccountController;
