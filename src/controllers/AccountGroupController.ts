import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import AccountGroupRepository from '../repositories/AccountGroupRepository';
// Classe para fazer o middleware entre o browser e o repository
class AccountGroupController {
  // Funcao que recebe os dados cria um objeto e salva no banco
  async create(request: Request, response: Response) {
    try {
      const accountGroupRepository = getCustomRepository(
        AccountGroupRepository,
      );

      const { nome, descricao, obs } = request.body;

      const existsGroup = await accountGroupRepository.findByName(nome);

      if (existsGroup) {
        return response.status(400).json({ message: 'Group already exists' });
      }

      const group = accountGroupRepository.create({
        nome,
        descricao,
        obs,
      });

      await accountGroupRepository.save(group);

      return response.status(201).json(classToClass(group));
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  // Funcao que lista toda a tabela do banco
  async index(request: Request, response: Response) {
    const accountGroupRepository = getCustomRepository(AccountGroupRepository);

    const allGroup = await accountGroupRepository.find();

    return response.status(200).json(classToClass(allGroup));
  }

  // Funcao que retorna uma unica linha da tabela do banco
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const accountGroupRepository = getCustomRepository(AccountGroupRepository);

    const group = await accountGroupRepository.findOne(id);

    if (!group) {
      return response.status(404).json({ message: 'Group not found!' });
    }

    return response.status(200).json(classToClass(group));
  }

  // Funcao que atualiza uma unica linha da tabela do banco
  async update(request: Request, response: Response) {
    const { id } = request.params;

    const { nome, descricao, obs } = request.body;

    const accountGroupRepository = getCustomRepository(AccountGroupRepository);

    const updateGroup = await accountGroupRepository.findOne(id);

    if (!updateGroup) {
      return response.status(401).json({ message: 'User not found' });
    }

    updateGroup.nome = nome || updateGroup.nome;
    updateGroup.descricao = descricao || updateGroup.descricao;
    updateGroup.obs = obs || updateGroup.obs;

    const updatedGroup = await accountGroupRepository.save(updateGroup);

    return response.status(201).json(classToClass(updatedGroup));
  }

  // Funcao que remove uma unica linha da tabela do banco
  async remove(request: Request, response: Response) {
    const { id } = request.params;

    const accountGroupRepository = getCustomRepository(AccountGroupRepository);

    const group = await accountGroupRepository.findOne(id);

    if (!group) {
      return response.status(404).json({ message: 'Group not found!' });
    }

    await accountGroupRepository.remove(group);

    return response.status(200).json(classToClass(group));
  }
}

export default AccountGroupController;
