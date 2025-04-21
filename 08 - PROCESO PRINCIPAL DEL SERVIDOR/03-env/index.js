import express from 'express';
import { initMongoDB } from './db.js';
import config from './config.js';

const app = express();

const PORT = config.PORT;

initMongoDB().then(() => {
  console.log('Base de datos conectada');
}).catch((error) => {
  console.error(`Error al conectar a la base de datos: ${error}`);
});

app.listen(PORT, ()=>console.log(`Server on port ${PORT}, env: ${config.ENV}`));