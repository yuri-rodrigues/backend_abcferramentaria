import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';

import SuppplierContactRepository from '../repositories/SupplierContactController';
// Classe para fazer o middleware entre o browser e o repository
class SuppplierContactController {
  // Funcao que recebe os dados cria um objeto e salva no banco
  async create(request: Request, response: Response) {
    try {
      const suppplierContactRepository = getCustomRepository(
        SuppplierContactRepository,
      );

      const { cnpj, nome, telefone, email } = request.body;

      const existsContact = await suppplierContactRepository.findByCNPJ(cnpj);

      if (existsContact) {
        return response.status(400).json({ message: 'Contact already exists' });
      }

      const contact = suppplierContactRepository.create({
        cnpj,
        nome,
        telefone,
        email,
      });
      console.log(contact);
      await suppplierContactRepository.save(contact);

      return response.status(201).json(classToClass(contact));
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  // Funcao que lista toda a tabela do banco
  async index(request: Request, response: Response) {
    const suppplierContactRepository = getCustomRepository(
      SuppplierContactRepository,
    );

    const allAgencies = await suppplierContactRepository.find();

    return response.status(200).json(classToClass(allAgencies));
  }

  // Funcao que retorna uma unica linha da tabela do banco
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const suppplierContactRepository = getCustomRepository(
      SuppplierContactRepository,
    );

    const suppplierContact = await suppplierContactRepository.findOne(id);

    if (!suppplierContact) {
      return response.status(404).json({ message: 'Contact not found!' });
    }

    return response.status(200).json(classToClass(suppplierContact));
  }

  // Funcao que atualiza uma unica linha da tabela do banco
  async update(request: Request, response: Response) {
    const { id } = request.params;

    const { cnpj, nome, telefone, email } = request.body;

    const suppplierContactRepository = getCustomRepository(
      SuppplierContactRepository,
    );

    const updateContact = await suppplierContactRepository.findOne(id);

    if (!updateContact) {
      return response.status(401).json({ message: 'User not found' });
    }

    updateContact.cnpj = cnpj || updateContact.cnpj;
    updateContact.nome = nome || updateContact.nome;
    updateContact.telefone = telefone || updateContact.telefone;
    updateContact.email = email || updateContact.email;

    const updatedContact = await suppplierContactRepository.save(updateContact);

    return response.status(201).json(classToClass(updatedContact));
  }

  // Funcao que remove uma unica linha da tabela do banco
  async remove(request: Request, response: Response) {
    const { id } = request.params;

    const suppplierContactRepository = getCustomRepository(
      SuppplierContactRepository,
    );

    const agencie = await suppplierContactRepository.findOne(id);

    if (!agencie) {
      return response.status(404).json({ message: 'Contact not found!' });
    }

    await suppplierContactRepository.remove(agencie);

    return response.status(200).json(classToClass(agencie));
  }
}

export default SuppplierContactController;
