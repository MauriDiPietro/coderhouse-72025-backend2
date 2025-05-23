import { userDao } from "../daos/mongodb/user-dao.js";
import CustomError from "../utils/custom-error.js";
import { createHash, isValidPassword } from "../utils/user-utils.js";

class UserService {
  constructor(dao) {
    this.dao = dao;
  }

  getById = async (id) => {
    try {
      return await this.dao.getById(id);
    } catch (error) {
      throw error;
    }
  }

  getByEmail = async (email) => {
    try {
      const user = await this.dao.getByEmail(email);
      console.log('dao', user)
      // if (!user) throw new CustomError("Usuario no encontrado", 404);
      return user;
    } catch (error) {
      throw error;
    }
  }

  register = async (body) => {
    try {
      const { email, password } = body;
      const existUser = await this.getByEmail(email);
      if (existUser) throw new CustomError("El usuario ya existe", 400);
      const response = await this.dao.create({
        ...body,
        password: createHash(password),
      });
      if (!response) throw new CustomError("Error al registrar usuario", 400);
      return response;
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {
    try {
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) throw new CustomError("Credenciales incorrectas", 400);
      const passValid = isValidPassword(password, userExist.password);
      if (!passValid) throw new CustomError("Credenciales incorrectas", 400);
      return userExist;
    } catch (error) {
      throw error;
    }
  };
}

export const userService = new UserService(userDao);
