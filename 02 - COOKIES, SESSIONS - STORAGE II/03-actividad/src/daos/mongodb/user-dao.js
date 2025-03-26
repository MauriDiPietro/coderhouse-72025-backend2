import { UserModel } from "./models/user-model.js";
import MongoDao from "./mongo-dao.js";

class UserDao extends MongoDao {
  constructor(model) {
    super(model);
  }

  login = async (email, password) => {
    try {
      return await this.model.findOne({ email, password });
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const userDao = new UserDao(UserModel);