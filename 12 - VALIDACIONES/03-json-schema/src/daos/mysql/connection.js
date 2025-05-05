import { Sequelize } from "sequelize";
import "dotenv/config";

export const db = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_DB_USER,
  process.env.MYSQL_DB_PASS,
  {
    host: process.env.MYSQL_DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

export const initMySQLDB = async () => {
  try {
    await db.authenticate();
  } catch (error) {
    throw new Error(error);
  }
};
