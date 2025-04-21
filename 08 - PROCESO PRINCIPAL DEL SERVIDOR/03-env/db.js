import { connect } from "mongoose";
import config from "./config.js";

export const initMongoDB = async () => {
  try {
    await connect(config.MONGO_URL);
  } catch (error) {
    throw new Error(`Error al conectar a la base de datos: ${error}`);
  }
};
