import express from "express";
import productRouter from "./routes/product-router.js";
import { errorHandler } from "./middlewares/error-handler.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);

app.use(errorHandler);

app.listen(8080, () => console.log("Server ok puerto 8080"));
