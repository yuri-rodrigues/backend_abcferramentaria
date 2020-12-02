import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { classToClass } from 'class-transformer';

import UserRepository from '../repositories/UserRepository';

class UserController {
  async create(request: Request, response: Response) {
    try {
      const userRepository = getCustomRepository(UserRepository);

      const { matricula, funcao, nome, email, password } = request.body;

      const existsUser = await userRepository.findByEmail(email);

      if (existsUser) {
        return response.status(400).json({ message: 'User already exists' });
      }

      const passwordHashed = await hash(password, 8);

      const user = userRepository.create({
        matricula,
        funcao,
        nome,
        email,
        password: passwordHashed,
      });

      await userRepository.save(user);

      return response.status(201).json(classToClass(user));
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async index(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const allUsers = await userRepository.find();

    return response.status(200).json(classToClass(allUsers));
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      return response.status(404).json({ message: 'User not found!' });
    }

    return response.status(200).json(classToClass(user));
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { matricula, funcao, nome, email } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const updateUser = await userRepository.findOne(id);

    if (!updateUser) {
      return response.status(401).json({ message: 'User not found' });
    }

    updateUser.matricula = matricula || updateUser.matricula;
    updateUser.funcao = funcao || updateUser.funcao;
    updateUser.nome = nome || updateUser.nome;
    updateUser.email = email || updateUser.email;

    const updatedUser = await userRepository.save(updateUser);

    return response.status(201).json(classToClass(updatedUser));
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      return response.status(404).json({ message: 'User not found!' });
    }

    await userRepository.remove(user);

    return response.status(200).json(classToClass(user));
  }
}

export default UserController;
