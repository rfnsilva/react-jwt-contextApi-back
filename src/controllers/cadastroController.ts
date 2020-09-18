import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { User } from "../entity/User";

//cadastrar usuario no banco de dados
export const cadastrar = async(req: Request, res: Response) => {
  try {
    const { user } = req.body;

    if(user.senha != user.confirmaSenha){
      return res.status(404).json({ message: 'senhas diferentes, tente de novo' })
    }

    const senhaHash = await bcrypt.hash(user.senha, 8);
    
    const userSave = await getRepository(User).save({
      nome: user.nome,
      sobrenome: user.sobrenome,
      telefone: user.telefone,
      email: user.email,
      senha: senhaHash
    });
    
    const token_register = jwt.sign({ senhaHash }, process.env.SECRET, {
        expiresIn: '1d'
    });

    const data = {
        id: userSave.id,
        nome: userSave.nome,
        sobrenome: userSave.sobrenome,
        telefone: userSave.telefone,
        email: userSave.email,
        token: token_register
    }
    
    return res.json(data);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao cadastrar usuario' })
  }
}