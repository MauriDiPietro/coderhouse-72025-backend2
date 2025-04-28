import { connect } from "mongoose";

class ConnectMongoDB {
  static #instance = null;

  constructor() {
    connect("mongodb://127.0.0.1:27017/coderhouse");
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new ConnectMongoDB();
      console.log("Conectando a la base de datos...");
    } else {
      console.log("Ya existe una instancia de la base de datos");
    }
    return this.#instance;
  }
}

const instance1 = ConnectMongoDB.getInstance();
const instance2 = ConnectMongoDB.getInstance();
const instance3 = ConnectMongoDB.getInstance();
