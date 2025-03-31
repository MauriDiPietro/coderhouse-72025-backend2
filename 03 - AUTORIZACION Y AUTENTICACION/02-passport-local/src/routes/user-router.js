import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/user-controller.js";
import { isAuth } from "../middlewares/is-auth.js";
// import { passportCall } from "../middlewares/passport-call.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register"),
  // passportCall("register"),
  userController.register
);

router.post(
  "/login",
  passport.authenticate("login"),
  // passportCall("login"),
  userController.login
);

router.get("/private", isAuth, (req, res) => res.send("ruta privada"));

export default router;
