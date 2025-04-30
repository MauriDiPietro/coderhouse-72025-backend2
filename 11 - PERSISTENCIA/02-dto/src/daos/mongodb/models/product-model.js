import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  nameProd: { type: String, required: true },
  descriptionProd: { type: String, required: true },
  priceProd: { type: Number, required: true },
  stockProd: { type: Number, required: true },
  deleted: { type: Boolean, default: false },
});

export const ProductModel = model("products", ProductSchema);
