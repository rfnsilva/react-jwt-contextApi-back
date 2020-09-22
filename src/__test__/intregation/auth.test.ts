import req from "supertest";
import app from "../../index";

import { getRepository } from 'typeorm';
import { User } from '../../entity/User'

describe('Sign Up', () => {
  let id: string = '';

  it('teste cadastro de usuario', async () => {
    //model que será enviado para teste
    const user: any = {
      nome: 'teste1',
      sobrenome: 'teste1',
      telefone: 'teste1',
      email: 'teste1',
      senha: 'teste1',
      confirmaSenha: 'teste1'
    }

    const res = await req(app).post("/cadastrar").send({ user });

    id = res.body.id;

    expect(res.status).toBe(200);
  });

  afterEach(async () => {
    await reset(id)
  })
});


//função que limpa o bd após o teste
async function reset(id: string){
  await getRepository(User).delete(id);
}