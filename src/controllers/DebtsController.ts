/* eslint-disable no-multi-assign */
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import DebtsRepository from '../repositories/DebtsRepository';

// Classe para fazer o middleware entre o browser e o repository
class DebtsController {
  // Funcao que recebe os dados cria um objeto e salva no banco
  async create(request: Request, response: Response) {
    try {
      const debtsRepository = getCustomRepository(DebtsRepository);

      const {
        supplier_id,
        account_group_id,
        bank_account_id,
        value,
        juros,
        parcela,
        data_emissao,
        data_vencimento,
        data_quitacao,
        status,
        obs,
      } = request.body;

      const debt = debtsRepository.create({
        supplier_id,
        account_group_id,
        bank_account_id,
        value,
        juros,
        parcela,
        data_emissao,
        data_vencimento,
        data_quitacao,
        status,
        obs,
      });

      await debtsRepository.save(debt);

      return response.status(201).json(classToClass(debt));
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  // Funcao que lista toda a tabela do banco
  async index(request: Request, response: Response) {
    // const { today } = request.params;

    const debtsRepository = getCustomRepository(DebtsRepository);

    const allDebts = await debtsRepository.find({
      relations: ['supplier_id', 'account_group_id', 'bank_account_id'],
    });

    const todayDebts = await debtsRepository.findAndCount({
      where: {
        data_vencimento: '2020-11-22',
      },
    });

    const result = {
      allDebts,
      todayDebts,
    };

    return response.status(200).json(result);
  }

  // Funcao que retorna uma unica linha da tabela do banco
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const debtsRepository = getCustomRepository(DebtsRepository);

    const debt = await debtsRepository.findOne(id);

    if (!debt) {
      return response.status(404).json({ message: 'Debt not found!' });
    }

    return response.status(200).json(classToClass(debt));
  }

  // Funcao que atualiza uma unica linha da tabela do banco
  async update(request: Request, response: Response) {
    const { id } = request.params;

    const {
      account_group_id,
      bank_account_id,
      value,
      juros,
      parcela,
      data_emissao,
      data_vencimento,
      data_quitacao,
      status,
      obs,
    } = request.body;

    const debtsRepository = getCustomRepository(DebtsRepository);

    const updateDebt = await debtsRepository.findOne(id);

    if (!updateDebt) {
      return response.status(401).json({ message: 'User not found' });
    }

    updateDebt.account_group_id =
      account_group_id || updateDebt.account_group_id;

    updateDebt.bank_account_id = bank_account_id || updateDebt.bank_account_id;
    updateDebt.value = value || updateDebt.value;
    updateDebt.juros = juros || updateDebt.juros;
    updateDebt.parcela = parcela || updateDebt.parcela;
    updateDebt.data_emissao = data_emissao || updateDebt.data_emissao;
    updateDebt.data_vencimento = data_vencimento || updateDebt.data_vencimento;
    updateDebt.data_quitacao = data_quitacao || updateDebt.data_quitacao;
    updateDebt.status = status || updateDebt.status;
    updateDebt.obs = obs || updateDebt.obs;

    const updatedDebt = await debtsRepository.save(updateDebt);

    return response.status(201).json(classToClass(updatedDebt));
  }

  // Funcao que remove uma unica linha da tabela do banco
  async remove(request: Request, response: Response) {
    const { id } = request.params;

    const debtsRepository = getCustomRepository(DebtsRepository);

    const debt = await debtsRepository.findOne(id);

    if (!debt) {
      return response.status(404).json({ message: 'Agencie not found!' });
    }

    await debtsRepository.remove(debt);

    return response.status(200).json(classToClass(debt));
  }

  async today(request: Request, response: Response) {
    try {
      const debtsRepository = getCustomRepository(DebtsRepository);

      const { today } = request.body;

      const totalDebts = await debtsRepository.HouMuchDebtsTotday(today);

      return response.status(201).json(classToClass(totalDebts));
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async baixa(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const debtsRepository = getCustomRepository(DebtsRepository);
      const updateDebt = await debtsRepository.findOne(id);

      if (!updateDebt) {
        return response.status(401).json({ message: 'Debt not found' });
      }

      updateDebt.status = 'paga';

      const updatedDebt = await debtsRepository.save(updateDebt);

      return response.status(201).json(updatedDebt);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}

export default DebtsController;
