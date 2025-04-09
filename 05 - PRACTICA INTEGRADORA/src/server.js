import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import usersRouter from "./routes/user-router.js";
import viewsRouter from "./routes/view-router.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { initMongoDB } from "./config/db-connection.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(`${process.cwd()}/src/public`)));
app.use(cookieParser(process.env.SECRET_KEY_COOKIE));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${process.cwd()}/src/views`));
app.set("view engine", "handlebars");

app.use("/api/users", usersRouter);
app.use("/users", viewsRouter);

app.use(errorHandler);

initMongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(8080, () => console.log("Server running on port 8080"));
