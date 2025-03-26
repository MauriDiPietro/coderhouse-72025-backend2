import { userDao } from "../daos/mongodb/user-dao.js";
import CustomError from "../utils/custom-error.js";

class UserService {
  constructor(dao) {
    this.dao = dao;
  }

  register = async (body) => {
    try {
      const response = await this.dao.create(body);
      if (!response) throw new CustomError("Error al registrar usuario", 400);
      return response;
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {
    try {
      const response = await this.dao.login(email, password);
      if (!response) throw new CustomError("Credenciales incorrectas", 400);
      return response;
    } catch (error) {}
  };
}

export const userService = new UserService(userDao);
