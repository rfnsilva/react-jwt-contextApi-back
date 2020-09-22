import { getRepository } from 'typeorm';
import { Request, Response } from 'express';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { User } from "../entity/User";

//cadastrar usuario no banco de dados
export const cadastrar = async(req: Request, res: Response) => {
  try {
    const { user } = req.body;


    //verificando se a senha e a confirmaSenha sao iguais
    if(user.senha != user.confirmaSenha)
      return res.status(401).json({ message: 'senhas diferentes, tente de novo' })

    const senhaHash = await bcrypt.hash(user.senha, 8);
    
    //usando typeorm para salvar o user no banco
    const userSave = await getRepository(User).save({
      nome: user.nome,
      sobrenome: user.sobrenome,
      telefone: user.telefone,
      email: user.email,
      senha: senhaHash
    });
    
    //gerando token ao cadastrar usuario, util quando se deseja direcionar o usuario
    //para a aplicação logo apos o cadastro, sem a necessidade de fazer login
    const token_register = jwt.sign({ senhaHash }, process.env.SECRET, {
        expiresIn: '1d'
    });

    //dados q serão retornado caso tudo estaja correto
    const data = {
        id: userSave.id,
        nome: userSave.nome,
        sobrenome: userSave.sobrenome,
        telefone: userSave.telefone,
        email: userSave.email,
        token: token_register
    }
    
    return res.status(200).json(data);
  } catch (error) {
      return res.status(404).json({ message: 'erro ao cadastrar usuario' })
  }
}