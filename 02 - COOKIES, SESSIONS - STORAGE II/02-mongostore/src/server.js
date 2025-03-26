import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import mainRouter from "./routes/user.routes.js";
import MongoStore from "connect-mongo";
import { initMongoDB } from "./db.js";

const ttlSeconds = 180;

const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/coderhouse",
    ttl: ttlSeconds,
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(session(mongoStoreOptions));

app.use("/api", mainRouter);

initMongoDB()
  .then(() => console.log("conectado a mongo"))
  .catch((error) => console.log(error));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

export default app;
