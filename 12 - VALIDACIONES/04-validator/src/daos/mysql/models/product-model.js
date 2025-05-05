import { DataTypes } from "sequelize";
import { db } from "../connection.js";

export const ProductModel = db.define(
  "products",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    paranoid: true, //cuando se utiliza el metodo para eliminar, se va a actualizar deletedAt
    timestamps: true,
  }
);
