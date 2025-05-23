import express from "express";
import productRouter from "./routes/product-router.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);

app.use(errorHandler);

app.listen(8080, () => console.log("Server ok puerto 8080"));
