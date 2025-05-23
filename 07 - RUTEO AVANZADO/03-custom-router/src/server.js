import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { initMongoDB } from "./config/db.js";
import MongoStore from "connect-mongo";
import { errorHandler } from "./middlewares/error-handler.js";
import passport from "passport";
import './config/passport/jwt-strategy-headers.js';
import './config/passport/jwt-strategy-cookies.js';
import { userCustomRouter } from "./routes/user-custom-router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/coderhouse",
    ttl: 180,
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 180000,
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

/* ---------------- despues de la inicializacion de passport van las rutas ---------------- */

app.use('/users', userCustomRouter.getRouter());

app.use(errorHandler);

initMongoDB()
  .then(() => console.log("conectado a mongo"))
  .catch((error) => console.log(error));

app.listen(8080, () => console.log("server ok, puerto 8080"));
