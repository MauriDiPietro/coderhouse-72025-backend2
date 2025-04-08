import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { checkAuth } from "../middlewares/check-auth.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/private", checkAuth, (req, res) => res.send(req.user));

export default router;
