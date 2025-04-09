import jwt from "jsonwebtoken";
import "dotenv/config";
import CustomError from "../utils/custom-error.js";
import { userDao } from "../daos/mongodb/user-dao.js";
import { createHash, isValidPassword } from "../utils/user-utils.js";

class UserServices {
  constructor(dao) {
    this.dao = dao;
  }

  getByEmail = async (email) => {
    try {
      return await this.dao.getByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  register = async (body) => {
    try {
      const { email, password } = body;
      const existUser = await this.getByEmail(email);
      if (existUser) throw new CustomError("El usuario ya existe", 400);
      const newUser = await this.dao.create({
        ...body,
        password: createHash(password),
      });
      if (!newUser) throw new CustomError("Error al crear el usuario", 500);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {
    try {
      const userExist = await this.getByEmail(email);
      if (!userExist) throw new CustomError("Credenciales incorrectas", 400);
      const passValid = isValidPassword(password, userExist.password);
      if (!passValid) throw new CustomError("Credenciales incorrectas", 400);
      return userExist;
    } catch (error) {
      throw error;
    }
  };

  generateToken = (user) => {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m" });
  };
}

export const userServices = new UserServices(userDao);
