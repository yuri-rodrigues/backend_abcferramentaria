import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import './database';
import uploadConfig from './config/upload';

import router from './routes';
// INSTANCIO O EXPRESS
const app = express();
// HABILITO O JSON
app.use(express.json());
// HABILITO CORS PARA O ACESSO DO FRONTEND VIA AXIOS
app.use(cors());
// MIDDLEWARE PARA SERVIR ARQUIVOS ESTATICOS
app.use('/files', express.static(uploadConfig.directory));
// USANDO AS ROTAS DO ENDPOINT
app.use(router);
// ESCUTANDO A PORTA 3333 (SERVIDOR ONLINE)
app.listen(3333, () => {
  console.log('Back-end started on port 3333');
});
