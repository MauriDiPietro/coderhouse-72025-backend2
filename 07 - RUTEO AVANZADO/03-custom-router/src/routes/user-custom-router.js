import { userController } from "../controllers/user-controller.js";
import Router from "./custom-router.js";

class UserCustomRouter extends Router {
  init() {
    this.get("/", ["PUBLIC"], (req, res) => res.send("ruta publica"));
    this.post("/register", ["PUBLIC"], userController.register);
    this.post("/login", ['PUBLIC'], userController.login);
    this.get("/private-cookies", ["USER", "ADMIN"], userController.profile);
    this.get("/private-cookies-admin", ["ADMIN"], userController.profile);
  }
}

export const userCustomRouter = new UserCustomRouter();
