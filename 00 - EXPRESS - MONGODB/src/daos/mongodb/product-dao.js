import { ProductModel } from "./models/product-model.js";
import MongoDao from "./mongo-dao.js";

class ProductMongoDao extends MongoDao {
  constructor(model) {
    super(model);
  }
}

export const productDao = new ProductMongoDao(ProductModel);
