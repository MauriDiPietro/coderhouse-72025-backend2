import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    minLength: [2, "El nombre debe tener al menos 2 caracteres"],
    required: [true, "El nombre es obligatorio"],
    // match: []
  },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, min: [1, "El stock no puede ser negativo"], required: true },
  deleted: { type: Boolean, enum: [true, false], default: false },
});

export const ProductModel = model("products", ProductSchema);
