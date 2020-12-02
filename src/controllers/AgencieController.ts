import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import AgencieRepository from '../repositories/AgencieRepository';
// Classe para fazer o middleware entre o browser e o repository
class AgencieController {
  // Funcao que recebe os dados cria um objeto e salva no banco
  async create(request: Request, response: Response) {
    try {
      const agencieRepository = getCustomRepository(AgencieRepository);

      const {
        num_agencia,
        gerente,
        telefone1,
        telefone2,
        email,
        bank_id,
      } = request.body;

      const existsAgencie = await agencieRepository.findByNumber(num_agencia);

      if (existsAgencie) {
        return response.status(400).json({ message: 'Agencie already exists' });
      }

      const agencie = agencieRepository.create({
        num_agencia,
        gerente,
        telefone1,
        telefone2,
        email,
        bank_id,
      });

      await agencieRepository.save(agencie);

      return response.status(201).json(classToClass(agencie));
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  // Funcao que lista toda a tabela do banco
  async index(request: Request, response: Response) {
    const agencieRepository = getCustomRepository(AgencieRepository);

    const allAgencies = await agencieRepository.find({
      relations: ['bank_id'],
    });

    return response.status(200).json(classToClass(allAgencies));
  }

  // Funcao que retorna uma unica linha da tabela do banco
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const agencieRepository = getCustomRepository(AgencieRepository);

    const agencie = await agencieRepository.findOne(id);

    if (!agencie) {
      return response.status(404).json({ message: 'Agencie not found!' });
    }

    return response.status(200).json(classToClass(agencie));
  }

  // Funcao que atualiza uma unica linha da tabela do banco
  async update(request: Request, response: Response) {
    const { id } = request.params;

    const { num_agencia, gerente, telefone1, telefone2, email } = request.body;

    const agencieRepository = getCustomRepository(AgencieRepository);

    const updateAgencie = await agencieRepository.findOne(id);

    if (!updateAgencie) {
      return response.status(401).json({ message: 'User not found' });
    }

    updateAgencie.num_agencia = num_agencia || updateAgencie.num_agencia;
    updateAgencie.num_agencia = gerente || updateAgencie.gerente;
    updateAgencie.telefone1 = telefone1 || updateAgencie.telefone1;
    updateAgencie.telefone2 = telefone2 || updateAgencie.telefone2;
    updateAgencie.email = email || updateAgencie.email;

    const updatedAgencie = await agencieRepository.save(updateAgencie);

    return response.status(201).json(classToClass(updatedAgencie));
  }

  // Funcao que remove uma unica linha da tabela do banco
  async remove(request: Request, response: Response) {
    const { id } = request.params;

    const agencieRepository = getCustomRepository(AgencieRepository);

    const agencie = await agencieRepository.findOne(id);

    if (!agencie) {
      return response.status(404).json({ message: 'Agencie not found!' });
    }

    await agencieRepository.remove(agencie);

    return response.status(200).json(classToClass(agencie));
  }
}

export default AgencieController;
