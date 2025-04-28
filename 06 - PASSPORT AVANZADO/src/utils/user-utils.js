import bcrypt from "bcrypt";

/**
 * Metodo para encriptar la contraseña
 * @param {string} password 
 * @returns 
 * @example
 * import { createHash } from "../utils/user-utils.js";
 * const response = await this.dao.create({
        ...body,
        password: createHash(password),
      });
 */
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (passwordPlain, passwordHash) => {
  return bcrypt.compareSync(passwordPlain, passwordHash);
};

