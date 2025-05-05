import { ProductModel } from "./models/product-model.js";
import MySQLDao from "./mysql-dao.js";

class ProductMySQLDao extends MySQLDao {
  constructor(model) {
    super(model);
  }
}

export const productDaoMySQL = new ProductMySQLDao(ProductModel);
