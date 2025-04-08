import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { passportCall } from "../middlewares/passport-call.js";

const router = Router();

//!     ---> |REGISTRARSE/LOGUEARSE CON GITHUB|
router.get(
  "/register-github",
  passportCall("github", { scope: ["user:email"] })
);

// router.post('/register', passport.authenticate('register'), userController.register);

//CALLBACK URL
router.get(
  "/profile-github",
  passportCall("github", { scope: ["user:email"] }),
  userController.githubResponse
);

export default router;
