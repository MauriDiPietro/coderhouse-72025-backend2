import CustomError from "../utils/custom-error.js";
import factory from "../daos/factory.js";
const { productDao } = factory;

export default class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

  create = async (body) => {
    try {
      const response = await this.dao.create(body);
      if (!response) throw new CustomError("Product not created", 400);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  getAll = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const response = await this.dao.getById(id);
      if (!response) throw new CustomError("Product not found", 404);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, body) => {
    try {
      const response = await this.dao.update(id, body);
      if (!response) throw new CustomError("Error update", 400);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      const response = await this.dao.delete(id);
      if (!response) throw new CustomError("Product not found", 404);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const productService = new ProductService(productDao);
