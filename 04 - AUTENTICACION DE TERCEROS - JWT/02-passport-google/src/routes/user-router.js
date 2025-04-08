import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { passportCall } from "../middlewares/passport-call.js";

const router = Router();

//!     ---> |REGISTRARSE/LOGUEARSE CON GOOGLE|
router.get(
  "/oauth2/redirect/accounts.google.com",
  passportCall("google", { assignProperty: "user" }),
  userController.googleResponse
);

export default router;
