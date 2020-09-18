import { Router, Request, Response } from 'express';

import {
    cadastrar
} from './controllers/cadastroController';

import cors from 'cors'

const routes = Router();
routes.use(cors());

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: "PRONTO CARALHOOOOO !" })
});

//cadastrar usuario
routes.post('/cadastrar', cadastrar); // feito

export default routes;