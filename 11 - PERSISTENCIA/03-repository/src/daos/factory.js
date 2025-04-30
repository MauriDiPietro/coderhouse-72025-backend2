import { productDaoFS } from "./filesystem/product-dao.js";
import { productDaoMongo } from "./mongodb/product-dao.js";
import { initMongoDB } from "./mongodb/connection.js";
import { initMySQLDB } from "./mysql/connection.js";
import { productDaoMySQL } from "./mysql/product-dao.js";

let productDao = null;
// let userDao = null;
let persistence = process.argv[2];  //process.env.PERSISTENCE

switch (persistence) {
    case "mysql":
        initMySQLDB().then(()=>console.log("conectado a mysql")).catch((error)=>console.log(error))
        productDao = productDaoMySQL;
        break
    case "fs":
        productDao = productDaoFS;
        // userDao = userDaoFS;
        break;
    case "mongo":
        initMongoDB().then(()=>console.log('conectado a mongodb')).catch((error)=>console.log(error));
        productDao = productDaoMongo;
        // userDao = userDaoMongo;
        break
    default:
        break;
}

export default { 
    productDao,
    // userDao
 };