import express from "express";
import { errorHandler } from "./middewares/error-handler.js";
import { initMongoDB } from "./daos/mongodb/connection/db.js";
import productRouter from './routes/product-router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter);

app.use(errorHandler);

initMongoDB()
  .then(() => console.log("conectado a la base de datos"))
  .catch((error) => console.log(error));

app.listen(8080, () => console.log("Server ok"));
