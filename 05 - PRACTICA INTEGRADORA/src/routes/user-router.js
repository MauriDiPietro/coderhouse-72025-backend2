import { Router } from "express";
import { userControllers } from "../controllers/user-controllers.js";

const router = Router();

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);

export default router;
