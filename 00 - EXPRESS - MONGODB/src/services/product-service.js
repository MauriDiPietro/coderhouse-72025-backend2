import { productDao } from "../daos/mongodb/product-dao.js";
import CustomError from "../utils/custom-error.js";

class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const product = await this.dao.getById(id);
      if (!product) throw new CustomError("Product Not Found", 404);
      return product;
    } catch (error) {
      throw error;
    }
  };

  create = async (body) => {
    try {
      const newProd = await this.dao.create(body);
      if (!newProd) throw new CustomError("Error creating product", 400);
      return newProd;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, body) => {
    try {
      const prodUpd = await this.dao.update(id, body);
      if (!prodUpd) throw new CustomError("Error updating product", 400);
      return prodUpd;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const prodDel = await this.dao.delete(id);
      if (!prodDel) throw new CustomError("Error deleted product", 400);
      return prodDel;
    } catch (error) {
      throw error;
    }
  };
}

export const productService = new ProductService(productDao);